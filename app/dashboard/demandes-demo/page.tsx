import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import DemoStatusSelect from "@/components/dashboard/DemoStatusSelect";
import InboundTestFilter from "@/components/dashboard/InboundTestFilter";
import {
  filterLeadsForView,
  isNewLead,
  mergeInboundLeads,
  type DemoRequestRow,
  type ProspectIntakeRow,
} from "@/lib/admin-inbound-leads";
import { getAdminEmail, getVerifiedUser, isAdminUser } from "@/lib/dashboard-auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

export default async function DemoRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ showTests?: string }>;
}) {
  const { showTests: showTestsParam } = await searchParams;
  const showTests =
    showTestsParam === "1" || showTestsParam === "true";

  const user = await getVerifiedUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAdminUser(user) || !getAdminEmail()) {
    redirect("/dashboard");
  }

  const [demoRes, intakeRes] = await Promise.all([
    supabaseAdmin
      .from("demo_requests")
      .select(
        `
        id,
        name,
        company,
        phone,
        email,
        sector,
        message,
        locale,
        status,
        created_at,
        is_test
      `,
      )
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("prospect_intakes")
      .select(
        `
        id,
        company_name,
        contact_name,
        phone,
        email,
        employee_range,
        sector,
        priorities,
        channels,
        primary_channel,
        main_difficulty,
        primary_goal,
        priority_other,
        marketing_consent,
        locale,
        status,
        submitted_at,
        is_test
      `,
      )
      .order("submitted_at", { ascending: false }),
  ]);

  if (demoRes.error) {
    console.error("Erreur récupération demo_requests :", demoRes.error);
  }
  if (intakeRes.error) {
    console.error("Erreur récupération prospect_intakes :", intakeRes.error);
  }

  const allLeads = mergeInboundLeads(
    (demoRes.data ?? []) as DemoRequestRow[],
    (intakeRes.data ?? []) as ProspectIntakeRow[],
  );

  const visibleLeads = filterLeadsForView(allLeads, showTests);

  const totalNonTest = allLeads.filter((l) => !l.isTest).length;
  const newNonTest = allLeads.filter(
    (l) => !l.isTest && isNewLead(l.status),
  ).length;

  return (
    <div className="flex min-h-screen bg-[#070B18] text-white">
      <Sidebar />

      <main className="min-w-0 flex-1 p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-blue-400">ADMIN VOXO</p>

            <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
              Demandes entrantes
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Demandes de démo et formulaires portail (5 étapes), avec statuts
              et réponses lisibles — sans données de test par défaut.
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <InboundTestFilter showTests={showTests} />

            <div className="flex gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[.04] px-5 py-4">
                <p className="text-sm text-slate-400">Total (hors tests)</p>
                <p className="mt-1 text-3xl font-bold">{totalNonTest}</p>
              </div>

              <div className="rounded-2xl border border-blue-400/20 bg-blue-400/10 px-5 py-4">
                <p className="text-sm text-blue-300">Nouvelles (hors tests)</p>
                <p className="mt-1 text-3xl font-bold text-blue-300">
                  {newNonTest}
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10 overflow-x-auto rounded-2xl border border-white/10 bg-[#111827]">
          <div className="min-w-[960px] grid grid-cols-[1fr_1fr_1fr_.9fr_.8fr_.9fr_1fr] gap-4 border-b border-white/10 px-6 py-4 text-sm font-semibold text-slate-400">
            <span>Type</span>
            <span>Contact</span>
            <span>Entreprise</span>
            <span>Téléphone</span>
            <span>Statut</span>
            <span>Date</span>
            <span>Actions</span>
          </div>

          {visibleLeads.length > 0 ? (
            visibleLeads.map((lead) => (
              <div
                key={`${lead.source}-${lead.id}`}
                className="min-w-[960px] grid grid-cols-[1fr_1fr_1fr_.9fr_.8fr_.9fr_1fr] gap-4 border-b border-white/5 px-6 py-5 transition hover:bg-white/[.04]"
              >
                <div className="flex flex-col gap-1">
                  <KindBadge kind={lead.kindLabel} />
                  {lead.isTest && (
                    <span className="text-[11px] font-medium uppercase tracking-wide text-amber-400/90">
                      Test
                    </span>
                  )}
                </div>

                <div>
                  <p className="font-semibold text-white">{lead.contactName}</p>
                  <p className="mt-1 text-sm text-slate-500">{lead.email}</p>
                </div>

                <div className="text-slate-300">{lead.company}</div>

                <div className="text-slate-300">{lead.phone}</div>

                <div>
                  <DemoStatusSelect
                    id={lead.id}
                    source={lead.source}
                    status={
                      lead.status === "contacted" ||
                      lead.status === "converted" ||
                      lead.status === "closed"
                        ? lead.status
                        : "new"
                    }
                  />
                </div>

                <div className="text-slate-300">
                  {formatDateTime(lead.occurredAt)}
                </div>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={`tel:${lead.phone}`}
                    className="inline-flex items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-400/20"
                  >
                    Appeler
                  </a>

                  <a
                    href={`mailto:${lead.email}?subject=${encodeURIComponent(
                      lead.kindLabel === "Demande de démo"
                        ? "Votre demande de démonstration VOXO AI"
                        : "Suite à votre demande sur VOXO AI",
                    )}`}
                    className="inline-flex items-center justify-center rounded-lg border border-blue-400/20 bg-blue-400/10 px-3 py-2 text-xs font-semibold text-blue-300 transition hover:bg-blue-400/20"
                  >
                    E-mail
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-16 text-center text-slate-400">
              {showTests
                ? "Aucune demande enregistrée."
                : "Aucune demande (hors tests). Activez « Afficher les tests » pour voir les entrées de test."}
            </div>
          )}
        </section>

        {visibleLeads.length > 0 && (
          <section className="mt-8 grid gap-4">
            {visibleLeads.map((lead) => (
              <article
                key={`details-${lead.source}-${lead.id}`}
                className="rounded-2xl border border-white/10 bg-white/[.03] p-6"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <KindBadge kind={lead.kindLabel} />
                      {lead.isTest && (
                        <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-xs font-medium text-amber-200">
                          Test
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-lg font-semibold">
                      {lead.contactName} — {lead.company}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {lead.email} • {lead.phone}
                    </p>
                  </div>

                  <span className="text-sm text-slate-500">
                    {formatDateTime(lead.occurredAt)}
                  </span>
                </div>

                <p className="mt-4 text-sm text-slate-400">{lead.summaryLine}</p>

                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  {lead.detailFields.map((field) => (
                    <div
                      key={`${lead.id}-${field.label}`}
                      className="rounded-xl border border-white/[0.06] bg-black/20 p-4"
                    >
                      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {field.label}
                      </dt>
                      <dd className="mt-2 text-sm leading-6 text-slate-200">
                        {field.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`tel:${lead.phone}`}
                    className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
                  >
                    Appeler {lead.contactName}
                  </a>

                  <a
                    href={`mailto:${lead.email}`}
                    className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    Envoyer un e-mail
                  </a>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

function KindBadge({
  kind,
}: {
  kind: "Demande de démo" | "Formulaire portail";
}) {
  const isDemo = kind === "Demande de démo";
  return (
    <span
      className={`inline-flex w-fit rounded-lg px-2.5 py-1 text-xs font-semibold ${
        isDemo
          ? "bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20"
          : "bg-violet-400/10 text-violet-200 ring-1 ring-violet-400/20"
      }`}
    >
      {kind}
    </span>
  );
}

function formatDateTime(value: string | null) {
  if (!value) {
    return "Date inconnue";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date inconnue";
  }

  return new Intl.DateTimeFormat("fr-CH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
