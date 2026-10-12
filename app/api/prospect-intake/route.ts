import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  CHANNEL_OPTIONS,
  EMPLOYEE_RANGES,
  isExclusiveNoneYet,
  PRIORITY_LABELS,
  PRIORITY_OPTIONS,
  type ProspectIntakePayload,
} from "@/lib/prospect-intake-types";
import {
  createProspectProfileCookie,
  createSiteAccessToken,
  hasSiteAccessConfigured,
  PROSPECT_PROFILE_COOKIE,
  SITE_ACCESS_COOKIE,
} from "@/lib/site-access";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePayload(body: ProspectIntakePayload): string | null {
  if (
    !body.companyName?.trim() ||
    !body.contactName?.trim() ||
    !body.email?.trim() ||
    !body.phone?.trim() ||
    !body.employeeRange
  ) {
    return "Champs obligatoires manquants.";
  }

  if (!isValidEmail(body.email.trim())) {
    return "Adresse e-mail invalide.";
  }

  if (!EMPLOYEE_RANGES.includes(body.employeeRange)) {
    return "Taille d'entreprise invalide.";
  }

  if (!Array.isArray(body.priorities) || body.priorities.length === 0) {
    return "Sélectionnez au moins un objectif.";
  }

  for (const p of body.priorities) {
    if (!PRIORITY_OPTIONS.includes(p)) {
      return "Objectif invalide.";
    }
  }

  if (!body.topPriority || !body.priorities.includes(body.topPriority)) {
    return "Priorité principale invalide.";
  }

  if (!Array.isArray(body.channels) || body.channels.length === 0) {
    return "Sélectionnez au moins un canal.";
  }

  for (const c of body.channels) {
    if (!CHANNEL_OPTIONS.includes(c)) {
      return "Canal invalide.";
    }
  }

  if (body.channels.includes("none_yet") && !isExclusiveNoneYet(body.channels)) {
    return "« Aucun pour le moment » ne peut pas être combiné avec d'autres canaux.";
  }

  return null;
}

async function persistIntake(
  prospectId: string,
  body: ProspectIntakePayload,
) {
  const primaryChannel = isExclusiveNoneYet(body.channels)
    ? "none_yet"
    : body.channels.find((c) => c !== "none_yet") ?? null;

  const row = {
    prospect_id: prospectId,
    submitted_at: new Date().toISOString(),
    locale: body.locale || "fr",
    company_name: body.companyName.trim(),
    contact_name: body.contactName.trim(),
    email: body.email.trim().toLowerCase(),
    phone: body.phone.trim(),
    employee_range: body.employeeRange,
    sector: null,
    priorities: body.priorities,
    channels: body.channels,
    primary_channel: primaryChannel,
    main_difficulty: body.optionalDetail?.trim() || null,
    primary_goal: PRIORITY_LABELS[body.topPriority],
    priority_other:
      body.priorities.includes("other") && body.optionalDetail?.trim()
        ? body.optionalDetail.trim()
        : null,
    marketing_consent: Boolean(body.marketingConsent),
    conditional_answers: {},
    raw_payload: body,
    status: "new",
  };

  const { error: intakeError } = await supabaseAdmin
    .from("prospect_intakes")
    .insert([row]);

  if (!intakeError) {
    return { table: "prospect_intakes" as const };
  }

  if (process.env.PROSPECT_INTAKES_REQUIRED === "true") {
    throw new Error(intakeError.message);
  }

  console.warn(
    "prospect_intakes indisponible, repli demo_requests:",
    intakeError.message,
  );

  const { error: demoError } = await supabaseAdmin.from("demo_requests").insert([
    {
      name: body.contactName.trim(),
      company: body.companyName.trim(),
      phone: body.phone.trim(),
      email: body.email.trim().toLowerCase(),
      sector: "—",
      message: `Priorité: ${PRIORITY_LABELS[body.topPriority]}\n---\n${JSON.stringify(body)}`,
      locale: body.locale || "fr",
      status: "new",
    },
  ]);

  if (demoError) {
    throw new Error(demoError.message);
  }

  return { table: "demo_requests" as const, intakeTableMissing: true };
}

export async function POST(request: Request) {
  try {
    if (!hasSiteAccessConfigured()) {
      return NextResponse.json(
        {
          error:
            "Configuration manquante : définissez SITE_ACCESS_SECRET dans l'environnement.",
        },
        { status: 503 },
      );
    }

    const body = (await request.json()) as ProspectIntakePayload;
    const validationError = validatePayload(body);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const prospectId = randomUUID();
    const persistResult = await persistIntake(prospectId, body);

    const accessToken = await createSiteAccessToken(prospectId);
    const profileToken = await createProspectProfileCookie({
      company: body.companyName.trim(),
      contactName: body.contactName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
    });

    if (!accessToken || !profileToken) {
      return NextResponse.json(
        { error: "Impossible de créer la session d'accès." },
        { status: 500 },
      );
    }

    const response = NextResponse.json({
      success: true,
      prospectId,
      storedIn: persistResult.table,
      intakeTableMissing:
        "intakeTableMissing" in persistResult
          ? persistResult.intakeTableMissing
          : false,
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: 60 * 60 * 24 * 180,
    };

    response.cookies.set(SITE_ACCESS_COOKIE, accessToken, cookieOptions);
    response.cookies.set(PROSPECT_PROFILE_COOKIE, profileToken, cookieOptions);

    return response;
  } catch (error) {
    console.error("Erreur API prospect-intake:", error);

    return NextResponse.json(
      {
        error:
          "Enregistrement impossible. Réessayez dans un instant ou contactez-nous.",
      },
      { status: 500 },
    );
  }
}
