import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/admin";
import Sidebar from "@/components/dashboard/Sidebar";

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

export default async function AppointmentsPage() {
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
      .order("start_at", { ascending: true });

  if (appointmentsError) {
    console.error(
      "Erreur Supabase rendez-vous :",
      appointmentsError,
    );
  }

  const appointments =
    (appointmentsData ?? []) as Appointment[];

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
      console.error(
        "Erreur récupération clients :",
        clientsError,
      );
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

  const appointmentsWithRelations: AppointmentWithRelations[] =
    appointments.map((appointment) => ({
      ...appointment,
      client:
        clients.find(
          (client) => client.id === appointment.client_id,
        ) ?? null,
      company:
        companies.find(
          (company) => company.id === appointment.company_id,
        ) ?? null,
    }));

  const confirmedAppointments =
    appointmentsWithRelations.filter((appointment) => {
      const status =
        appointment.status?.toLowerCase() || "";

      return (
        status === "confirmed" ||
        status === "confirmé" ||
        status === "scheduled" ||
        status === "planifié"
      );
    }).length;

  const urgentAppointments =
    appointmentsWithRelations.filter((appointment) => {
      const status =
        appointment.status?.toLowerCase() || "";

      return (
        status === "urgent" ||
        status === "urgence"
      );
    }).length;

  return (
    <div className="flex min-h-screen bg-[#070B18] text-white">
      <Sidebar />

      <main className="min-w-0 flex-1 p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-blue-400">
              Agenda
            </p>

            <h1 className="mt-2 text-5xl font-bold">
              Rendez-vous
            </h1>

            <p className="mt-3 text-slate-400">
              Consultez les rendez-vous enregistrés par VOXO AI.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <SummaryCard
              label="Total"
              value={appointmentsWithRelations.length}
            />

            <SummaryCard
              label="Confirmés"
              value={confirmedAppointments}
            />

            <SummaryCard
              label="Urgents"
              value={urgentAppointments}
            />
          </div>
        </div>

        <section className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#111827]">
          <div className="grid grid-cols-[1.2fr_1.2fr_1fr_.9fr_.9fr] gap-4 border-b border-white/10 px-6 py-4 text-sm font-semibold text-slate-400">
            <span>Client</span>
            <span>Service</span>
            <span>Entreprise</span>
            <span>Date / heure</span>
            <span>Statut</span>
          </div>

          {appointmentsWithRelations.length > 0 ? (
            appointmentsWithRelations.map((appointment) => {
              const clientName =
                appointment.client?.full_name?.trim() ||
                "Client inconnu";

              const companyName =
                appointment.company?.name?.trim() ||
                (appointment.company_id
                  ? `Entreprise #${appointment.company_id}`
                  : "Entreprise non renseignée");

              return (
                <Link
                  key={appointment.id}
                  href="/dashboard/rendez-vous"
                  className="grid grid-cols-[1.2fr_1.2fr_1fr_.9fr_.9fr] gap-4 border-b border-white/5 px-6 py-5 transition hover:bg-white/[.04]"
                >
                  <div>
                    <p className="font-semibold text-white">
                      {clientName}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {appointment.client?.phone ||
                        "Téléphone non renseigné"}
                    </p>
                  </div>

                  <div className="text-slate-300">
                    {appointment.service_name ||
                      "Service non renseigné"}
                  </div>

                  <div className="text-slate-300">
                    {companyName}
                  </div>

                  <div className="text-slate-300">
                    {formatDateTime(appointment.start_at)}
                  </div>

                  <div>
                    <StatusBadge
                      status={appointment.status}
                    />
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="px-6 py-16 text-center text-slate-400">
              Aucun rendez-vous enregistré.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

type SummaryCardProps = {
  label: string;
  value: number;
};

function SummaryCard({
  label,
  value,
}: SummaryCardProps) {
  return (
    <div className="min-w-28 rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3">
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold">
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
    status || "scheduled";

  const normalizedStatus =
    currentStatus.toLowerCase();

  const styles =
    normalizedStatus === "confirmed" ||
    normalizedStatus === "confirmé" ||
    normalizedStatus === "scheduled" ||
    normalizedStatus === "planifié"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
      : normalizedStatus === "urgent" ||
          normalizedStatus === "urgence"
        ? "border-red-400/20 bg-red-400/10 text-red-300"
        : normalizedStatus === "cancelled" ||
            normalizedStatus === "annulé"
          ? "border-red-400/20 bg-red-400/10 text-red-300"
          : "border-amber-400/20 bg-amber-400/10 text-amber-300";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {formatStatus(currentStatus)}
    </span>
  );
}

function formatStatus(status: string) {
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

  if (
    normalizedStatus === "cancelled" ||
    normalizedStatus === "annulé"
  ) {
    return "Annulé";
  }

  if (
    normalizedStatus === "pending"
  ) {
    return "En attente";
  }

  return status;
}

function formatDateTime(
  value: string | null,
) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("fr-CH", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}