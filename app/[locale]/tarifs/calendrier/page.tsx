import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/admin";
import Sidebar from "@/components/dashboard/Sidebar";

type Appointment = {
  id: number;
  company_id: number | null;
  client_id: number | null;
  service_name: string | null;
  employee_name: string | null;
  start_at: string | null;
  end_at: string | null;
  status: string | null;
};

type Client = {
  id: number;
  full_name: string | null;
};

type Company = {
  id: number;
  name: string | null;
};

type CalendarAppointment = Appointment & {
  client: Client | null;
  company: Company | null;
};

type CalendarPageProps = {
  searchParams: Promise<{
    year?: string;
    month?: string;
  }>;
};

const monthNames = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const weekDays = [
  "Lun",
  "Mar",
  "Mer",
  "Jeu",
  "Ven",
  "Sam",
  "Dim",
];

export default async function CalendarPage({
  searchParams,
}: CalendarPageProps) {
  const params = await searchParams;

  const today = new Date();

  const requestedYear = Number(params.year);
  const requestedMonth = Number(params.month);

  const year =
    Number.isInteger(requestedYear) &&
    requestedYear >= 2000 &&
    requestedYear <= 2100
      ? requestedYear
      : today.getFullYear();

  const month =
    Number.isInteger(requestedMonth) &&
    requestedMonth >= 1 &&
    requestedMonth <= 12
      ? requestedMonth - 1
      : today.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const monthStart = new Date(
    year,
    month,
    1,
    0,
    0,
    0,
    0,
  ).toISOString();

  const monthEnd = new Date(
    year,
    month + 1,
    1,
    0,
    0,
    0,
    0,
  ).toISOString();

  /*
   * 1. Récupérer les rendez-vous du mois
   */
  const { data: appointmentsData, error: appointmentsError } =
    await supabaseAdmin
      .from("appointments")
      .select(`
        id,
        company_id,
        client_id,
        service_name,
        employee_name,
        start_at,
        end_at,
        status
      `)
      .gte("start_at", monthStart)
      .lt("start_at", monthEnd)
      .order("start_at", { ascending: true });

  if (appointmentsError) {
    console.error(
      "Erreur Supabase calendrier :",
      appointmentsError,
    );
  }

  const appointments =
    (appointmentsData ?? []) as Appointment[];

  /*
   * 2. Récupérer les clients
   */
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
        .select("id, full_name")
        .in("id", clientIds);

    if (clientsError) {
      console.error(
        "Erreur récupération clients calendrier :",
        clientsError,
      );
    } else {
      clients = (clientsData ?? []) as Client[];
    }
  }

  /*
   * 3. Récupérer les entreprises
   */
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
        "Erreur récupération entreprises calendrier :",
        companiesError,
      );
    } else {
      companies = (companiesData ?? []) as Company[];
    }
  }

  /*
   * 4. Associer clients et entreprises
   */
  const calendarAppointments: CalendarAppointment[] =
    appointments.map((appointment) => ({
      ...appointment,

      client:
        clients.find(
          (client) => client.id === appointment.client_id,
        ) ?? null,

      company:
        companies.find(
          (company) =>
            company.id === appointment.company_id,
        ) ?? null,
    }));

  /*
   * 5. Grouper les rendez-vous par date
   */
  const appointmentsByDate = new Map<
    string,
    CalendarAppointment[]
  >();

  for (const appointment of calendarAppointments) {
    if (!appointment.start_at) {
      continue;
    }

    const dateKey = formatDateFromIso(
      appointment.start_at,
    );

    const currentAppointments =
      appointmentsByDate.get(dateKey) ?? [];

    currentAppointments.push(appointment);

    appointmentsByDate.set(
      dateKey,
      currentAppointments,
    );
  }

  /*
   * 6. Construire les cases du calendrier
   */
  const firstWeekDay = firstDay.getDay();

  const mondayBasedOffset =
    firstWeekDay === 0
      ? 6
      : firstWeekDay - 1;

  const calendarCells: Array<number | null> = [];

  for (
    let index = 0;
    index < mondayBasedOffset;
    index += 1
  ) {
    calendarCells.push(null);
  }

  for (
    let day = 1;
    day <= lastDay.getDate();
    day += 1
  ) {
    calendarCells.push(day);
  }

  while (calendarCells.length % 7 !== 0) {
    calendarCells.push(null);
  }

  const previousMonthDate =
    new Date(year, month - 1, 1);

  const nextMonthDate =
    new Date(year, month + 1, 1);

  const previousMonthUrl =
    buildCalendarUrl(
      previousMonthDate.getFullYear(),
      previousMonthDate.getMonth(),
    );

  const nextMonthUrl =
    buildCalendarUrl(
      nextMonthDate.getFullYear(),
      nextMonthDate.getMonth(),
    );

  const todayUrl =
    buildCalendarUrl(
      today.getFullYear(),
      today.getMonth(),
    );

  const totalAppointments =
    calendarAppointments.length;

  return (
    <div className="flex min-h-screen bg-[#070B18] text-white">
      <Sidebar />

      <main className="min-w-0 flex-1 p-8">
        <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
          <div>
            <p className="text-sm font-medium text-blue-400">
              Agenda
            </p>

            <h1 className="mt-2 text-5xl font-bold">
              Calendrier
            </h1>

            <p className="mt-3 text-slate-400">
              Consultez tous les rendez-vous
              enregistrés par VOXO AI.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={todayUrl}
              className="rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/[.08] hover:text-white"
            >
              Aujourd’hui
            </Link>

            <Link
              href={previousMonthUrl}
              aria-label="Mois précédent"
              className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[.04] text-xl transition hover:bg-white/[.08]"
            >
              ←
            </Link>

            <div className="min-w-48 rounded-2xl border border-white/10 bg-white/[.04] px-5 py-3 text-center">
              <p className="text-xs text-slate-500">
                Mois affiché
              </p>

              <p className="mt-1 text-xl font-bold">
                {monthNames[month]} {year}
              </p>
            </div>

            <Link
              href={nextMonthUrl}
              aria-label="Mois suivant"
              className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[.04] text-xl transition hover:bg-white/[.08]"
            >
              →
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <SummaryCard
            label="Rendez-vous du mois"
            value={String(totalAppointments)}
          />

          <SummaryCard
            label="Jours occupés"
            value={String(
              appointmentsByDate.size,
            )}
          />

          <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-[#111827] px-5 py-4 text-xs">
            <StatusLegend
              label="Confirmé"
              className="bg-emerald-400"
            />

            <StatusLegend
              label="En attente"
              className="bg-amber-400"
            />

            <StatusLegend
              label="Annulé"
              className="bg-red-400"
            />
          </div>
        </div>

        <section className="mt-8 overflow-x-auto rounded-3xl border border-white/10 bg-[#111827]">
          <div className="min-w-[1000px]">
            <div className="grid grid-cols-7 border-b border-white/10 bg-white/[.02]">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="border-r border-white/10 px-4 py-4 text-center text-sm font-semibold text-slate-400 last:border-r-0"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {calendarCells.map(
                (day, index) => {
                  if (!day) {
                    return (
                      <div
                        key={`empty-${index}`}
                        className="min-h-44 border-b border-r border-white/10 bg-black/10"
                      />
                    );
                  }

                  const dateKey =
                    formatDateKey(
                      year,
                      month,
                      day,
                    );

                  const dayAppointments =
                    appointmentsByDate.get(
                      dateKey,
                    ) ?? [];

                  const isToday =
                    day === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear();

                  return (
                    <div
                      key={dateKey}
                      className="min-h-44 border-b border-r border-white/10 p-3 transition hover:bg-white/[.025]"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`grid h-8 w-8 place-items-center rounded-full text-sm font-semibold ${
                            isToday
                              ? "bg-blue-600 text-white"
                              : "text-white"
                          }`}
                        >
                          {day}
                        </span>

                        {dayAppointments.length >
                          0 && (
                          <span className="rounded-full bg-blue-500/15 px-2 py-1 text-xs font-semibold text-blue-300">
                            {
                              dayAppointments.length
                            }
                          </span>
                        )}
                      </div>

                      <div className="mt-3 space-y-2">
                        {dayAppointments
                          .slice(0, 3)
                          .map(
                            (appointment) => (
                              <AppointmentCard
                                key={
                                  appointment.id
                                }
                                appointment={
                                  appointment
                                }
                              />
                            ),
                          )}

                        {dayAppointments.length >
                          3 && (
                          <p className="px-2 text-xs text-slate-500">
                            +{" "}
                            {dayAppointments.length -
                              3}{" "}
                            autres
                          </p>
                        )}
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

type AppointmentCardProps = {
  appointment: CalendarAppointment;
};

function AppointmentCard({
  appointment,
}: AppointmentCardProps) {
  const normalizedStatus =
    appointment.status?.toLowerCase() ||
    "pending";

  const styles =
    normalizedStatus === "confirmed" ||
    normalizedStatus === "scheduled" ||
    normalizedStatus === "planifié"
      ? "border-emerald-400/20 bg-emerald-400/10 hover:bg-emerald-400/15"
      : normalizedStatus === "cancelled" ||
          normalizedStatus === "annulé"
        ? "border-red-400/20 bg-red-400/10 hover:bg-red-400/15"
        : "border-amber-400/20 bg-amber-400/10 hover:bg-amber-400/15";

  const clientName =
    appointment.client?.full_name ||
    "Client inconnu";

  const companyName =
    appointment.company?.name ||
    (appointment.company_id
      ? `Entreprise #${appointment.company_id}`
      : null);

  return (
    <Link
      href="/dashboard/rendez-vous"
      className={`block rounded-xl border px-3 py-2 transition ${styles}`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-white">
          {formatTime(
            appointment.start_at,
          )}
        </p>

        <span className="h-2 w-2 rounded-full bg-current opacity-70" />
      </div>

      <p className="mt-1 truncate text-sm font-semibold text-white">
        {clientName}
      </p>

      <p className="mt-1 truncate text-xs text-slate-300">
        {appointment.service_name ||
          "Service non renseigné"}
      </p>

      {companyName && (
        <p className="mt-1 truncate text-xs text-slate-500">
          {companyName}
        </p>
      )}

      {appointment.employee_name && (
        <p className="mt-1 truncate text-xs text-slate-500">
          {appointment.employee_name}
        </p>
      )}
    </Link>
  );
}

type SummaryCardProps = {
  label: string;
  value: string;
};

function SummaryCard({
  label,
  value,
}: SummaryCardProps) {
  return (
    <div className="min-w-44 rounded-2xl border border-white/10 bg-[#111827] px-5 py-4">
      <p className="text-sm text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}

type StatusLegendProps = {
  label: string;
  className: string;
};

function StatusLegend({
  label,
  className,
}: StatusLegendProps) {
  return (
    <div className="flex items-center gap-2 text-slate-400">
      <span
        className={`h-2.5 w-2.5 rounded-full ${className}`}
      />

      <span>{label}</span>
    </div>
  );
}

function formatDateKey(
  year: number,
  monthIndex: number,
  day: number,
) {
  return `${year}-${String(
    monthIndex + 1,
  ).padStart(2, "0")}-${String(
    day,
  ).padStart(2, "0")}`;
}

function formatDateFromIso(
  value: string,
) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

function formatTime(
  value: string | null,
) {
  if (!value) {
    return "Heure inconnue";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Heure inconnue";
  }

  return new Intl.DateTimeFormat(
    "fr-CH",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  ).format(date);
}

function buildCalendarUrl(
  year: number,
  monthIndex: number,
) {
  return `/dashboard/calendrier?year=${year}&month=${
    monthIndex + 1
  }`;
}