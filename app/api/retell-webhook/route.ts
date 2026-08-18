import { NextResponse } from "next/server";
import Retell from "retell-sdk";
import { supabaseAdmin } from "@/lib/supabase/admin";

type RetellWebhookPayload = {
  event:
    | "call_started"
    | "call_ended"
    | "call_analyzed"
    | "transcript_updated"
    | string;
  call?: RetellCall;
};

type RetellCall = {
  call_id?: string;
  agent_id?: string;
  call_type?: string;
  direction?: string;

  from_number?: string;
  to_number?: string;

  start_timestamp?: number;
  end_timestamp?: number;

  call_status?: string;
  disconnection_reason?: string;

  transcript?: string;
  recording_url?: string;

  metadata?: Record<string, unknown>;
  retell_llm_dynamic_variables?: Record<string, unknown>;

  call_analysis?: {
    call_summary?: string;
    call_successful?: boolean;
    user_sentiment?: string;
    custom_analysis_data?: Record<string, unknown>;
  };
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RETELL_API_KEY;

    if (!apiKey) {
      console.error("RETELL_API_KEY manquante.");

      return NextResponse.json(
        { error: "Configuration Retell manquante." },
        { status: 500 },
      );
    }

    /*
     * La signature Retell doit être vérifiée
     * avec le corps brut de la requête.
     */
    const rawBody = await request.text();
    const signature = request.headers.get("x-retell-signature");

    if (!signature) {
      console.error("Signature Retell absente.");

      return NextResponse.json(
        { error: "Signature absente." },
        { status: 401 },
      );
    }

    const isValidSignature = Retell.verify(
      rawBody,
      apiKey,
      signature,
    );

    if (!isValidSignature) {
      console.error("Signature Retell invalide.");

      return NextResponse.json(
        { error: "Signature invalide." },
        { status: 401 },
      );
    }

    const payload = JSON.parse(
      rawBody,
    ) as RetellWebhookPayload;

    const { event, call } = payload;

    if (!call?.call_id) {
      console.error(
        "Payload Retell incomplet :",
        payload,
      );

      return NextResponse.json(
        { error: "Call ID manquant." },
        { status: 400 },
      );
    }

    console.log(
      `Webhook Retell reçu : ${event} — ${call.call_id}`,
    );

    /*
     * On n'enregistre pas encore call_started car les
     * informations finales ne sont pas disponibles.
     */
    if (event === "call_started") {
      return new NextResponse(null, { status: 204 });
    }

    /*
     * call_ended permet d'enregistrer rapidement l'appel.
     * call_analyzed met ensuite à jour l'appel avec
     * la transcription, le résumé et l'analyse finale.
     */
    if (
      event !== "call_ended" &&
      event !== "call_analyzed"
    ) {
      return new NextResponse(null, { status: 204 });
    }

    const analysis =
      call.call_analysis?.custom_analysis_data ?? {};

    const dynamicVariables =
      call.retell_llm_dynamic_variables ?? {};

    const metadata =
      call.metadata ?? {};

    const callerName = firstString(
      analysis.caller_name,
      analysis.customer_name,
      analysis.client_name,
      dynamicVariables.caller_name,
      dynamicVariables.customer_name,
      metadata.caller_name,
      metadata.customer_name,
    );

    const company = firstString(
      analysis.company,
      analysis.company_name,
      dynamicVariables.company,
      dynamicVariables.company_name,
      metadata.company,
    );

    const service = firstString(
      analysis.service,
      analysis.requested_service,
      analysis.appointment_service,
      dynamicVariables.service,
      dynamicVariables.requested_service,
      metadata.service,
    );

    const appointmentDate = firstString(
      analysis.appointment_date,
      analysis.date,
      analysis.booking_date,
      dynamicVariables.appointment_date,
      dynamicVariables.booking_date,
      metadata.appointment_date,
    );

    const appointmentTime = firstString(
      analysis.appointment_time,
      analysis.time,
      analysis.booking_time,
      dynamicVariables.appointment_time,
      dynamicVariables.booking_time,
      metadata.appointment_time,
    );

    const phone = firstString(
      analysis.phone,
      analysis.phone_number,
      dynamicVariables.phone,
      dynamicVariables.phone_number,
      metadata.phone,
      call.from_number,
    );

    const email = firstString(
      analysis.email,
      dynamicVariables.email,
      metadata.email,
    );

    const summary =
      call.call_analysis?.call_summary ??
      firstString(
        analysis.summary,
        analysis.call_summary,
      ) ??
      null;

    const duration = calculateDuration(
      call.start_timestamp,
      call.end_timestamp,
    );

    const appointmentStatus =
      getAppointmentStatus(
        call.call_analysis?.call_successful,
        call.call_status,
        call.disconnection_reason,
        appointmentDate,
      );

    /*
     * ============================
     * 1. TABLE ai_calls
     * ============================
     *
     * Cette table alimente :
     * Dashboard > Appels
     */
    const aiCallData = {
      retell_call_id: call.call_id,

      phone_number:
        call.direction === "outbound"
          ? call.to_number ?? null
          : call.from_number ?? null,

      direction:
        call.direction ??
        (call.call_type === "phone_call"
          ? "inbound"
          : null),

      duration_seconds: duration,

      status:
        call.call_status === "ended"
          ? "completed"
          : call.call_status ?? "pending",

      transcript:
        call.transcript ?? null,

      summary,

      recording_url:
        call.recording_url ?? null,
    };

    const {
      data: existingAiCall,
      error: aiCallSearchError,
    } = await supabaseAdmin
      .from("ai_calls")
      .select("id")
      .eq("retell_call_id", call.call_id)
      .maybeSingle();

    if (aiCallSearchError) {
      console.error(
        "Erreur recherche ai_calls :",
        aiCallSearchError,
      );

      return NextResponse.json(
        { error: "Erreur recherche appel." },
        { status: 500 },
      );
    }

    if (existingAiCall?.id) {
      const { error: aiCallUpdateError } =
        await supabaseAdmin
          .from("ai_calls")
          .update(aiCallData)
          .eq("id", existingAiCall.id);

      if (aiCallUpdateError) {
        console.error(
          "Erreur mise à jour ai_calls :",
          aiCallUpdateError,
        );

        return NextResponse.json(
          { error: "Erreur mise à jour appel." },
          { status: 500 },
        );
      }

      console.log(
        "Appel ai_calls mis à jour :",
        call.call_id,
      );
    } else {
      const { error: aiCallInsertError } =
        await supabaseAdmin
          .from("ai_calls")
          .insert(aiCallData);

      if (aiCallInsertError) {
        console.error(
          "Erreur insertion ai_calls :",
          aiCallInsertError,
        );

        return NextResponse.json(
          { error: "Erreur insertion appel." },
          { status: 500 },
        );
      }

      console.log(
        "Nouvel appel enregistré dans ai_calls :",
        call.call_id,
      );
    }

    /*
     * ============================
     * 2. TABLE appointments
     * ============================
     *
     * On garde ton fonctionnement actuel
     * pour ne pas casser les rendez-vous.
     */
    const appointmentData = {
      retell_call_id: call.call_id,

      agent_name: "Emma",

      caller_name:
        callerName ?? "Client inconnu",

      company:
        company ?? null,

      phone:
        phone ?? null,

      email:
        email ?? null,

      service:
        service ?? null,

      appointment_date:
        appointmentDate ?? null,

      appointment_time:
        appointmentTime ?? null,

      status:
        appointmentStatus,

      source:
        call.call_type || "retell",

      duration,

      transcript:
        call.transcript ?? null,

      recording_url:
        call.recording_url ?? null,

      summary,

      message:
        summary ??
        call.transcript ??
        null,

      notification_sent:
        false,
    };

    /*
     * Recherche d'un rendez-vous/appel existant
     * pour éviter le doublon entre call_ended
     * et call_analyzed.
     */
    const {
      data: existingAppointment,
      error: searchError,
    } = await supabaseAdmin
      .from("appointments")
      .select("id")
      .eq("retell_call_id", call.call_id)
      .maybeSingle();

    if (searchError) {
      console.error(
        "Erreur recherche appointment Supabase :",
        searchError,
      );

      return NextResponse.json(
        { error: "Erreur de recherche Supabase." },
        { status: 500 },
      );
    }

    if (existingAppointment?.id) {
      const { error: updateError } =
        await supabaseAdmin
          .from("appointments")
          .update(appointmentData)
          .eq("id", existingAppointment.id);

      if (updateError) {
        console.error(
          "Erreur mise à jour appointments :",
          updateError,
        );

        return NextResponse.json(
          {
            error:
              "Erreur de mise à jour Supabase.",
          },
          { status: 500 },
        );
      }

      console.log(
        "Appointment Retell mis à jour :",
        call.call_id,
      );
    } else {
      const { error: insertError } =
        await supabaseAdmin
          .from("appointments")
          .insert(appointmentData);

      if (insertError) {
        console.error(
          "Erreur insertion appointments :",
          insertError,
        );

        return NextResponse.json(
          {
            error:
              "Erreur d'insertion Supabase.",
          },
          { status: 500 },
        );
      }

      console.log(
        "Nouvel appointment Retell enregistré :",
        call.call_id,
      );
    }

    return new NextResponse(null, {
      status: 204,
    });
  } catch (error) {
    console.error(
      "Erreur webhook Retell :",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Erreur interne du webhook.",
      },
      { status: 500 },
    );
  }
}

function firstString(
  ...values: unknown[]
): string | null {
  for (const value of values) {
    if (
      typeof value === "string" &&
      value.trim().length > 0
    ) {
      return value.trim();
    }
  }

  return null;
}

function calculateDuration(
  startTimestamp?: number,
  endTimestamp?: number,
): number | null {
  if (
    typeof startTimestamp !== "number" ||
    typeof endTimestamp !== "number" ||
    endTimestamp < startTimestamp
  ) {
    return null;
  }

  return Math.round(
    (endTimestamp - startTimestamp) /
      1000,
  );
}

function getAppointmentStatus(
  callSuccessful:
    | boolean
    | undefined,
  callStatus:
    | string
    | undefined,
  disconnectionReason:
    | string
    | undefined,
  appointmentDate:
    | string
    | null,
): string {
  if (appointmentDate) {
    return "confirmed";
  }

  if (
    callSuccessful === false ||
    disconnectionReason ===
      "dial_failed" ||
    disconnectionReason ===
      "dial_no_answer" ||
    disconnectionReason ===
      "dial_busy"
  ) {
    return "failed";
  }

  if (
    callStatus === "ended" ||
    callStatus === "registered"
  ) {
    return "completed";
  }

  return "pending";
}