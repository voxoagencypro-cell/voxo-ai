import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/admin";
import Sidebar from "@/components/dashboard/Sidebar";

type AiCall = {
  id: number;
  created_at: string | null;
  company_id: number | null;
  client_id: number | null;
  retell_call_id: string | null;
  phone_number: string | null;
  direction: string | null;
  duration_seconds: number | null;
  status: string | null;
  transcript: string | null;
  summary: string | null;
  recording_url: string | null;
};

type Client = {
  id: number;
  full_name: string | null;
  phone: string | null;
  email: string | null;
};

type Company = {
  id: number;
  name: string | null;
};

type CallWithRelations = AiCall & {
  client: Client | null;
  company: Company | null;
};

export default async function CallsPage() {
  /*
   * 1. Récupérer les appels
   */
  const { data: callsData, error: callsError } =
    await supabaseAdmin
      .from("ai_calls")
      .select(`
        id,
        created_at,
        company_id,
        client_id,
        retell_call_id,
        phone_number,
        direction,
        duration_seconds,
        status,
        transcript,
        summary,
        recording_url
      `)
      .order("created_at", { ascending: false });

  if (callsError) {
    console.error("Erreur Supabase appels :", callsError);
  }

  const calls = (callsData ?? []) as AiCall[];

  /*
   * 2. Récupérer les clients concernés
   */
  const clientIds = [
    ...new Set(
      calls
        .map((call) => call.client_id)
        .filter((id): id is number => id !== null),
    ),
  ];

  let clients: Client[] = [];

  if (clientIds.length > 0) {
    const { data: clientsData, error: clientsError } =
      await supabaseAdmin
        .from("clients")
        .select("id, full_name, phone, email")
        .in("id", clientIds);

    if (clientsError) {
      console.error(
        "Erreur récupération clients :",
        clientsError,
      );
    } else {
      clients = (clientsData ?? []) as Client[];
    }
  }

  /*
   * 3. Récupérer les entreprises concernées
   */
  const companyIds = [
    ...new Set(
      calls
        .map((call) => call.company_id)
        .filter((id): id is number => id !== null),
    ),
  ];

  let companies: Company[] = [];

  if (companyIds.length > 0) {
    const { data: companiesData, error: companiesError } =
      await supabaseAdmin
        .from("companies")
        .select("id, name")
        .in("id", companyIds);

    if (companiesError) {
      console.error(
        "Erreur récupération entreprises :",
        companiesError,
      );
    } else {
      companies = (companiesData ?? []) as Company[];
    }
  }

  /*
   * 4. Associer les relations
   */
  const callsWithRelations: CallWithRelations[] = calls.map(
    (call) => ({
      ...call,

      client:
        clients.find(
          (client) => client.id === call.client_id,
        ) ?? null,

      company:
        companies.find(
          (company) => company.id === call.company_id,
        ) ?? null,
    }),
  );

  return (
    <div className="flex min-h-screen bg-[#070B18] text-white">
      <Sidebar />

      <main className="min-w-0 flex-1 p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-blue-400">
              Historique
            </p>

            <h1 className="mt-2 text-5xl font-bold">
              Appels
            </h1>

            <p className="mt-3 text-slate-400">
              Retrouvez les appels enregistrés par VOXO AI et
              Retell AI.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[.04] px-5 py-4">
            <p className="text-sm text-slate-400">
              Total des appels
            </p>

            <p className="mt-1 text-3xl font-bold">
              {callsWithRelations.length}
            </p>
          </div>
        </div>

        <section className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#111827]">
          <div className="grid grid-cols-[1.3fr_1.2fr_.8fr_.8fr_.8fr] gap-4 border-b border-white/10 px-6 py-4 text-sm font-semibold text-slate-400">
            <span>Client</span>
            <span>Entreprise</span>
            <span>Direction</span>
            <span>Durée</span>
            <span>Statut</span>
          </div>

          {callsWithRelations.length > 0 ? (
            callsWithRelations.map((call) => {
              const clientName =
                call.client?.full_name?.trim() ||
                "Client inconnu";

              const phone =
                call.phone_number ||
                call.client?.phone ||
                "Téléphone non renseigné";

              const companyName =
                call.company?.name?.trim() ||
                (call.company_id
                  ? `Entreprise #${call.company_id}`
                  : "Non renseignée");

              return (
                <Link
                  key={call.id}
                  href={`/dashboard/appels/${call.id}`}
                  className="grid grid-cols-[1.3fr_1.2fr_.8fr_.8fr_.8fr] gap-4 border-b border-white/5 px-6 py-5 transition hover:bg-white/[.04]"
                >
                  <div>
                    <p className="font-semibold text-white">
                      {clientName}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {phone}
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      {formatDateTime(call.created_at)}
                    </p>
                  </div>

                  <div className="text-slate-300">
                    {companyName}
                  </div>

                  <div className="text-slate-300">
                    {formatDirection(call.direction)}
                  </div>

                  <div className="text-slate-300">
                    {formatDuration(call.duration_seconds)}
                  </div>

                  <div>
                    <StatusBadge status={call.status} />
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="px-6 py-16 text-center text-slate-400">
              Aucun appel enregistré pour le moment.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

type StatusBadgeProps = {
  status: string | null;
};

function StatusBadge({ status }: StatusBadgeProps) {
  const currentStatus = status || "completed";
  const normalizedStatus = currentStatus.toLowerCase();

  const styles =
    normalizedStatus === "completed" ||
    normalizedStatus === "confirmed" ||
    normalizedStatus === "terminé"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
      : normalizedStatus === "pending" ||
          normalizedStatus === "ringing" ||
          normalizedStatus === "in_progress"
        ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
        : normalizedStatus === "failed" ||
            normalizedStatus === "cancelled" ||
            normalizedStatus === "error"
          ? "border-red-400/20 bg-red-400/10 text-red-300"
          : "border-blue-400/20 bg-blue-400/10 text-blue-300";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {formatStatus(currentStatus)}
    </span>
  );
}

function formatStatus(status: string) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "completed") {
    return "Terminé";
  }

  if (normalizedStatus === "pending") {
    return "En attente";
  }

  if (
    normalizedStatus === "in_progress" ||
    normalizedStatus === "ringing"
  ) {
    return "En cours";
  }

  if (normalizedStatus === "failed") {
    return "Échoué";
  }

  if (normalizedStatus === "cancelled") {
    return "Annulé";
  }

  return status;
}

function formatDirection(direction: string | null) {
  if (!direction) {
    return "—";
  }

  const normalizedDirection = direction.toLowerCase();

  if (normalizedDirection === "inbound") {
    return "Entrant";
  }

  if (normalizedDirection === "outbound") {
    return "Sortant";
  }

  return direction;
}

function formatDuration(value: number | null) {
  if (!value || value <= 0) {
    return "0 s";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);

  if (minutes === 0) {
    return `${seconds} s`;
  }

  return `${minutes} min ${String(seconds).padStart(2, "0")} s`;
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
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}