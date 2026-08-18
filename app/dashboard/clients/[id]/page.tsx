import Link from "next/link";
import { notFound } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { supabaseAdmin } from "@/lib/supabase/admin";

type ClientDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Client = {
  id: number;
  created_at: string | null;
  company_id: number | null;
  full_name: string | null;
  phone: string | null;
  email: string | null;
};

type Company = {
  id: number;
  name: string | null;
};

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

type Appointment = {
  id: number;
  created_at: string | null;
  company_id: number | null;
  client_id: number | null;
  service_name: string | null;
  employee_name: string | null;
  notes: string | null;
  start_at: string | null;
  end_at: string | null;
  status: string | null;
  source: string | null;
};

export default async function ClientDetailsPage({
  params,
}: ClientDetailsPageProps) {
  const { id } = await params;

  const clientId = Number(id);

  if (!Number.isFinite(clientId)) {
    notFound();
  }

  /*
   * 1. Récupérer le client
   */
  const { data: clientData, error: clientError } =
    await supabaseAdmin
      .from("clients")
      .select(`
        id,
        created_at,
        company_id,
        full_name,
        phone,
        email
      `)
      .eq("id", clientId)
      .maybeSingle();

  if (clientError || !clientData) {
    console.error(
      "Erreur récupération fiche client :",
      clientError,
    );

    notFound();
  }

  const client = clientData as Client;

  /*
   * 2. Récupérer l'entreprise
   */
  let company: Company | null = null;

  if (client.company_id) {
    const { data: companyData, error: companyError } =
      await supabaseAdmin
        .from("companies")
        .select("id, name")
        .eq("id", client.company_id)
        .maybeSingle();

    if (companyError) {
      console.error(
        "Erreur récupération entreprise :",
        companyError,
      );
    } else {
      company = (companyData ?? null) as Company | null;
    }
  }

  /*
   * 3. Récupérer les appels du client
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
      .eq("client_id", client.id)
      .order("created_at", { ascending: false });

  if (callsError) {
    console.error(
      "Erreur récupération appels client :",
      callsError,
    );
  }

  const calls = (callsData ?? []) as AiCall[];

  /*
   * 4. Récupérer les rendez-vous du client
   */
  const { data: appointmentsData, error: appointmentsError } =
    await supabaseAdmin
      .from("appointments")
      .select(`
        id,
        created_at,
        company_id,
        client_id,
        service_name,
        employee_name,
        notes,
        start_at,
        end_at,
        status,
        source
      `)
      .eq("client_id", client.id)
      .order("start_at", { ascending: false });

  if (appointmentsError) {
    console.error(
      "Erreur récupération rendez-vous client :",
      appointmentsError,
    );
  }

  const appointments =
    (appointmentsData ?? []) as Appointment[];

  /*
   * 5. Statistiques
   */
  const totalCalls = calls.length;
  const totalAppointments = appointments.length;

  const totalDuration = calls.reduce(
    (total, call) =>
      total + (call.duration_seconds ?? 0),
    0,
  );

  const latestCall = calls[0] ?? null;

  const latestCallDate = latestCall?.created_at
    ? formatDateTime(latestCall.created_at)
    : "Aucun appel";

  const clientName =
    client.full_name?.trim() || "Client inconnu";

  const companyName =
    company?.name?.trim() ||
    (client.company_id
      ? `Entreprise #${client.company_id}`
      : "Entreprise non renseignée");

  const phone =
    client.phone || "Téléphone non renseigné";

  const email =
    client.email || "E-mail non renseigné";

  return (
    <div className="flex min-h-screen bg-[#070B18] text-white">
      <Sidebar />

      <main className="min-w-0 flex-1 p-8">
        <Link
          href="/dashboard/clients"
          className="inline-flex text-sm font-semibold text-blue-400 transition hover:text-blue-300"
        >
          ← Retour aux clients
        </Link>

        <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div>
            <p className="text-sm font-medium text-blue-400">
              Fiche client
            </p>

            <h1 className="mt-2 text-5xl font-bold">
              {clientName}
            </h1>

            <p className="mt-3 text-lg text-slate-400">
              {companyName}
            </p>
          </div>

          <span className="inline-flex w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
            Client actif
          </span>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Appels"
            value={String(totalCalls)}
            description="Historique total"
          />

          <StatCard
            label="Rendez-vous"
            value={String(totalAppointments)}
            description="Rendez-vous enregistrés"
          />

          <StatCard
            label="Durée totale"
            value={formatDuration(totalDuration)}
            description="Temps de conversation"
          />

          <StatCard
            label="Dernier appel"
            value={latestCallDate}
            description="Dernier contact"
            small
          />
        </div>

        <section className="mt-6 rounded-3xl border border-white/10 bg-[#111827] p-6">
          <h2 className="text-xl font-bold">
            Informations du client
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <InfoItem
              label="Nom"
              value={clientName}
            />

            <InfoItem
              label="Entreprise"
              value={companyName}
            />

            <InfoItem
              label="Téléphone"
              value={phone}
            />

            <InfoItem
              label="E-mail"
              value={email}
            />
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#111827]">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="text-xl font-bold">
              Historique des appels
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Tous les appels Retell AI liés à ce client.
            </p>
          </div>

          <div className="hidden grid-cols-[1fr_1fr_.8fr_.8fr_.8fr] gap-4 border-b border-white/10 px-6 py-4 text-sm font-semibold text-slate-400 lg:grid">
            <span>Date</span>
            <span>Direction</span>
            <span>Durée</span>
            <span>Statut</span>
            <span>Retell</span>
          </div>

          {calls.length > 0 ? (
            calls.map((call) => (
              <Link
                key={call.id}
                href={`/dashboard/appels/${call.id}`}
                className="grid gap-4 border-b border-white/5 px-6 py-5 transition hover:bg-white/[.04] lg:grid-cols-[1fr_1fr_.8fr_.8fr_.8fr]"
              >
                <HistoryItem
                  mobileLabel="Date"
                  value={formatDateTime(call.created_at)}
                />

                <HistoryItem
                  mobileLabel="Direction"
                  value={formatDirection(call.direction)}
                />

                <HistoryItem
                  mobileLabel="Durée"
                  value={formatDuration(
                    call.duration_seconds,
                  )}
                />

                <div>
                  <p className="mb-1 text-xs text-slate-500 lg:hidden">
                    Statut
                  </p>

                  <StatusBadge
                    status={call.status}
                  />
                </div>

                <HistoryItem
                  mobileLabel="Retell"
                  value={
                    call.retell_call_id ||
                    "Non disponible"
                  }
                />

                {call.summary && (
                  <div className="lg:col-span-5">
                    <p className="line-clamp-2 text-sm leading-6 text-slate-500">
                      {call.summary}
                    </p>
                  </div>
                )}
              </Link>
            ))
          ) : (
            <div className="px-6 py-14 text-center text-slate-500">
              Aucun appel enregistré pour ce client.
            </div>
          )}
        </section>

        <section className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#111827]">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="text-xl font-bold">
              Rendez-vous
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Rendez-vous enregistrés pour ce client.
            </p>
          </div>

          <div className="hidden grid-cols-[1fr_1.2fr_1fr_.8fr] gap-4 border-b border-white/10 px-6 py-4 text-sm font-semibold text-slate-400 lg:grid">
            <span>Date</span>
            <span>Service</span>
            <span>Employé</span>
            <span>Statut</span>
          </div>

          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="grid gap-4 border-b border-white/5 px-6 py-5 lg:grid-cols-[1fr_1.2fr_1fr_.8fr]"
              >
                <HistoryItem
                  mobileLabel="Date"
                  value={formatDateTime(
                    appointment.start_at,
                  )}
                />

                <HistoryItem
                  mobileLabel="Service"
                  value={
                    appointment.service_name ||
                    "Non renseigné"
                  }
                />

                <HistoryItem
                  mobileLabel="Employé"
                  value={
                    appointment.employee_name ||
                    "Non attribué"
                  }
                />

                <div>
                  <p className="mb-1 text-xs text-slate-500 lg:hidden">
                    Statut
                  </p>

                  <AppointmentStatusBadge
                    status={appointment.status}
                  />
                </div>

                {appointment.notes && (
                  <div className="lg:col-span-4">
                    <p className="text-sm leading-6 text-slate-500">
                      {appointment.notes}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="px-6 py-14 text-center text-slate-500">
              Aucun rendez-vous enregistré pour ce client.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: string;
  description: string;
  small?: boolean;
};

function StatCard({
  label,
  value,
  description,
  small = false,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
      <p className="text-sm text-slate-400">
        {label}
      </p>

      <p
        className={`mt-3 font-bold text-white ${
          small ? "text-lg" : "text-3xl"
        }`}
      >
        {value}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}

type InfoItemProps = {
  label: string;
  value: string;
};

function InfoItem({
  label,
  value,
}: InfoItemProps) {
  return (
    <div className="rounded-2xl border border-white/[.07] bg-black/10 p-4">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-2 break-words font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

type HistoryItemProps = {
  mobileLabel: string;
  value: string;
};

function HistoryItem({
  mobileLabel,
  value,
}: HistoryItemProps) {
  return (
    <div>
      <p className="mb-1 text-xs text-slate-500 lg:hidden">
        {mobileLabel}
      </p>

      <p className="text-slate-300">
        {value}
      </p>
    </div>
  );
}

type StatusBadgeProps = {
  status: string | null;
};

function StatusBadge({
  status,
}: StatusBadgeProps) {
  const currentStatus =
    status || "completed";

  const normalizedStatus =
    currentStatus.toLowerCase();

  const styles =
    normalizedStatus === "completed" ||
    normalizedStatus === "confirmed"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
      : normalizedStatus === "pending" ||
          normalizedStatus === "ringing" ||
          normalizedStatus === "in_progress"
        ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
        : normalizedStatus === "failed" ||
            normalizedStatus === "cancelled"
          ? "border-red-400/20 bg-red-400/10 text-red-300"
          : "border-blue-400/20 bg-blue-400/10 text-blue-300";

  return (
    <span
      className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {formatCallStatus(currentStatus)}
    </span>
  );
}

function AppointmentStatusBadge({
  status,
}: StatusBadgeProps) {
  const currentStatus =
    status || "scheduled";

  const normalizedStatus =
    currentStatus.toLowerCase();

  const styles =
    normalizedStatus === "confirmed" ||
    normalizedStatus === "scheduled" ||
    normalizedStatus === "planifié"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
      : normalizedStatus === "urgent" ||
          normalizedStatus === "urgence" ||
          normalizedStatus === "cancelled"
        ? "border-red-400/20 bg-red-400/10 text-red-300"
        : "border-amber-400/20 bg-amber-400/10 text-amber-300";

  return (
    <span
      className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {formatAppointmentStatus(currentStatus)}
    </span>
  );
}

function formatDateTime(
  value: string | null,
) {
  if (!value) {
    return "Non renseigné";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("fr-CH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatDuration(
  duration: number | null,
) {
  if (
    duration === null ||
    duration === undefined ||
    duration <= 0
  ) {
    return "0 s";
  }

  const minutes =
    Math.floor(duration / 60);

  const seconds =
    Math.floor(duration % 60);

  if (minutes === 0) {
    return `${seconds} s`;
  }

  return `${minutes} min ${String(
    seconds,
  ).padStart(2, "0")} s`;
}

function formatDirection(
  direction: string | null,
) {
  if (!direction) {
    return "Non renseignée";
  }

  const normalizedDirection =
    direction.toLowerCase();

  if (normalizedDirection === "inbound") {
    return "Entrant";
  }

  if (normalizedDirection === "outbound") {
    return "Sortant";
  }

  return direction;
}

function formatCallStatus(status: string) {
  const normalizedStatus =
    status.toLowerCase();

  if (normalizedStatus === "completed") {
    return "Terminé";
  }

  if (
    normalizedStatus === "in_progress" ||
    normalizedStatus === "ringing"
  ) {
    return "En cours";
  }

  if (normalizedStatus === "pending") {
    return "En attente";
  }

  if (normalizedStatus === "failed") {
    return "Échoué";
  }

  if (normalizedStatus === "cancelled") {
    return "Annulé";
  }

  return status;
}

function formatAppointmentStatus(
  status: string,
) {
  const normalizedStatus =
    status.toLowerCase();

  if (
    normalizedStatus === "scheduled" ||
    normalizedStatus === "confirmed"
  ) {
    return "Confirmé";
  }

  if (
    normalizedStatus === "urgent" ||
    normalizedStatus === "urgence"
  ) {
    return "Urgent";
  }

  if (normalizedStatus === "pending") {
    return "En attente";
  }

  if (normalizedStatus === "cancelled") {
    return "Annulé";
  }

  return status;
}