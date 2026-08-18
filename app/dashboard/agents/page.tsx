import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";
import { supabaseAdmin } from "@/lib/supabase/admin";

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

type AppointmentWithRelations = Appointment & {
  client: Client | null;
  company: Company | null;
};

export default async function AgentsPage() {
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
      .order("created_at", { ascending: false });

  if (appointmentsError) {
    console.error("Erreur Supabase agents :", appointmentsError);
  }

  const appointments = (appointmentsData ?? []) as Appointment[];

  const clientIds = [
    ...new Set(
      appointments
        .map((appointment) => appointment.client_id)
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
      console.error("Erreur récupération clients :", clientsError);
    } else {
      clients = (clientsData ?? []) as Client[];
    }
  }

  const companyIds = [
    ...new Set(
      appointments
        .map((appointment) => appointment.company_id)
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

  const calls: AppointmentWithRelations[] = appointments.map(
    (appointment) => ({
      ...appointment,
      client:
        clients.find(
          (client) => client.id === appointment.client_id,
        ) ?? null,
      company:
        companies.find(
          (company) => company.id === appointment.company_id,
        ) ?? null,
    }),
  );

  const totalCalls = calls.length;

  const appointmentsTaken = calls.filter(
    (call) => call.start_at,
  ).length;

  const confirmedAppointments = calls.filter((call) => {
    const status = call.status?.toLowerCase() || "";

    return (
      status === "confirmed" ||
      status === "confirmé" ||
      status === "scheduled" ||
      status === "planifié"
    );
  }).length;

  const successRate =
    totalCalls > 0
      ? Math.round((appointmentsTaken / totalCalls) * 100)
      : 0;

  const recentCalls = calls.slice(0, 6);

  return (
    <div className="flex min-h-screen bg-[#070B18] text-white">
      <Sidebar />

      <main className="min-w-0 flex-1 p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-blue-400">
              Intelligence artificielle
            </p>

            <h1 className="mt-2 text-5xl font-bold">
              Agents IA
            </h1>

            <p className="mt-3 text-slate-400">
              Suivez l’activité et les performances de votre
              réceptionniste IA.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-300">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            Emma est en ligne
          </span>
        </div>

        <section className="mt-10 rounded-3xl border border-white/10 bg-[#111827] p-6">
          <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
            <div className="flex items-center gap-5">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-blue-500/15 text-2xl font-bold text-blue-300">
                E
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  Emma IA
                </h2>

                <p className="mt-1 text-slate-400">
                  Réceptionniste téléphonique VOXO AI
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-xl border border-white/10 bg-white/[.04] px-4 py-2 text-sm text-slate-300">
                Français
              </span>

              <span className="rounded-xl border border-white/10 bg-white/[.04] px-4 py-2 text-sm text-slate-300">
                Retell AI
              </span>

              <span className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                En service
              </span>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Appels"
            value={String(totalCalls)}
            description="Total enregistrés"
          />

          <StatCard
            label="Rendez-vous"
            value={String(appointmentsTaken)}
            description="Pris par Emma"
          />

          <StatCard
            label="Confirmés"
            value={String(confirmedAppointments)}
            description="Rendez-vous validés"
          />

          <StatCard
            label="Taux de réussite"
            value={`${successRate} %`}
            description="Appels avec rendez-vous"
          />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.5fr]">
          <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">
            <h2 className="text-xl font-bold">
              Configuration
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              État actuel des connexions de l’agent.
            </p>

            <div className="mt-7 space-y-4">
              <ConnectionItem
                label="Supabase"
                description="Base de données connectée"
                status="Connecté"
                connected
              />

              <ConnectionItem
                label="Realtime"
                description="Mise à jour automatique"
                status="Connecté"
                connected
              />

              <ConnectionItem
                label="Retell AI"
                description="Compte téléphonique à activer"
                status="En attente"
              />

              <ConnectionItem
                label="Google Calendar"
                description="Synchronisation à configurer"
                status="Non connecté"
              />

              <ConnectionItem
                label="n8n"
                description="Automatisations à connecter"
                status="Non connecté"
              />
            </div>
          </section>

          <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827]">
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 px-6 py-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold">
                  Activité récente
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Derniers appels traités par Emma.
                </p>
              </div>

              <Link
                href="/dashboard/appels"
                className="text-sm font-semibold text-blue-400 transition hover:text-blue-300"
              >
                Voir tous les appels →
              </Link>
            </div>

            {recentCalls.length > 0 ? (
              recentCalls.map((call) => {
                const clientName =
                  call.client?.full_name?.trim() ||
                  "Client inconnu";

                const companyName =
                  call.company?.name?.trim() ||
                  (call.company_id
                    ? `Entreprise #${call.company_id}`
                    : "Entreprise non renseignée");

                return (
                  <Link
                    key={call.id}
                    href="/dashboard/rendez-vous"
                    className="grid gap-4 border-b border-white/5 px-6 py-5 transition hover:bg-white/[.04] md:grid-cols-[1.2fr_1fr_.9fr_.8fr]"
                  >
                    <div>
                      <p className="font-semibold text-white">
                        {clientName}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {companyName}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Service
                      </p>

                      <p className="mt-1 text-slate-300">
                        {call.service_name || "Non renseigné"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Rendez-vous
                      </p>

                      <p className="mt-1 text-slate-300">
                        {formatDateTime(call.start_at)}
                      </p>
                    </div>

                    <div>
                      <StatusBadge status={call.status} />
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="px-6 py-16 text-center text-slate-500">
                Aucun appel enregistré.
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: string;
  description: string;
};

function StatCard({
  label,
  value,
  description,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
      <p className="text-sm text-slate-400">
        {label}
      </p>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}

type ConnectionItemProps = {
  label: string;
  description: string;
  status: string;
  connected?: boolean;
};

function ConnectionItem({
  label,
  description,
  status,
  connected = false,
}: ConnectionItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/[.07] bg-black/10 p-4">
      <div>
        <p className="font-semibold text-white">
          {label}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      <span
        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
          connected
            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
            : "border-amber-400/20 bg-amber-400/10 text-amber-300"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

type StatusBadgeProps = {
  status: string | null;
};

function StatusBadge({ status }: StatusBadgeProps) {
  const currentStatus = status || "scheduled";
  const normalizedStatus = currentStatus.toLowerCase();

  const styles =
    normalizedStatus === "confirmed" ||
    normalizedStatus === "confirmé" ||
    normalizedStatus === "scheduled" ||
    normalizedStatus === "planifié"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
      : normalizedStatus === "pending" ||
          normalizedStatus === "en attente"
        ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
        : "border-red-400/20 bg-red-400/10 text-red-300";

  return (
    <span
      className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {currentStatus}
    </span>
  );
}

function formatDateTime(value: string | null) {
  if (!value) {
    return "Non planifié";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("fr-CH", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}