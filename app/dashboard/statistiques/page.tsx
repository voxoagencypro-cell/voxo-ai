import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";
import { supabaseAdmin } from "@/lib/supabase/admin";

type AiCall = {
  id: number;
  created_at: string | null;
  client_id: number | null;
  duration_seconds: number | null;
  status: string | null;
};

type Appointment = {
  id: number;
  created_at: string | null;
  client_id: number | null;
  service_name: string | null;
  start_at: string | null;
  status: string | null;
};

type DailyStat = {
  date: string;
  label: string;
  calls: number;
  appointments: number;
};

export default async function StatisticsPage() {
  /*
   * 1. Appels IA
   */
  const { data: callsData, error: callsError } =
    await supabaseAdmin
      .from("ai_calls")
      .select(`
        id,
        created_at,
        client_id,
        duration_seconds,
        status
      `)
      .order("created_at", { ascending: true });

  if (callsError) {
    console.error(
      "Erreur Supabase statistiques appels :",
      callsError,
    );
  }

  const calls = (callsData ?? []) as AiCall[];

  /*
   * 2. Rendez-vous
   */
  const { data: appointmentsData, error: appointmentsError } =
    await supabaseAdmin
      .from("appointments")
      .select(`
        id,
        created_at,
        client_id,
        service_name,
        start_at,
        status
      `)
      .order("created_at", { ascending: true });

  if (appointmentsError) {
    console.error(
      "Erreur Supabase statistiques rendez-vous :",
      appointmentsError,
    );
  }

  const appointments =
    (appointmentsData ?? []) as Appointment[];

  /*
   * 3. Clients
   */
  const { count: totalClients, error: clientsError } =
    await supabaseAdmin
      .from("clients")
      .select("id", {
        count: "exact",
        head: true,
      });

  if (clientsError) {
    console.error(
      "Erreur Supabase statistiques clients :",
      clientsError,
    );
  }

  /*
   * 4. Statistiques principales
   */
  const totalCalls = calls.length;

  const confirmedAppointments =
    appointments.filter((appointment) => {
      const status =
        appointment.status?.toLowerCase() || "";

      return (
        status === "confirmed" ||
        status === "confirmé" ||
        status === "scheduled" ||
        status === "planifié"
      );
    }).length;

  const conversionRate =
    totalCalls > 0
      ? Math.round(
          (confirmedAppointments / totalCalls) * 100,
        )
      : 0;

  const validDurations = calls
    .map((call) => call.duration_seconds)
    .filter(
      (duration): duration is number =>
        typeof duration === "number" &&
        Number.isFinite(duration) &&
        duration > 0,
    );

  const averageDurationSeconds =
    validDurations.length > 0
      ? Math.round(
          validDurations.reduce(
            (total, duration) => total + duration,
            0,
          ) / validDurations.length,
        )
      : 0;

  /*
   * 5. Services les plus demandés
   */
  const serviceCounts =
    new Map<string, number>();

  for (const appointment of appointments) {
    const service =
      appointment.service_name?.trim() ||
      "Non renseigné";

    serviceCounts.set(
      service,
      (serviceCounts.get(service) ?? 0) + 1,
    );
  }

  const topServices =
    Array.from(serviceCounts.entries())
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

  /*
   * 6. Activité des 7 derniers jours
   */
  const dailyStats =
    buildLastSevenDaysStats(
      calls,
      appointments,
    );

  const maxActivity = Math.max(
    ...dailyStats.flatMap((day) => [
      day.calls,
      day.appointments,
    ]),
    1,
  );

  return (
    <div className="flex min-h-screen bg-[#070B18] text-white">
      <Sidebar />

      <main className="min-w-0 flex-1 p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-blue-400">
              Analyse
            </p>

            <h1 className="mt-2 text-5xl font-bold">
              Statistiques
            </h1>

            <p className="mt-3 text-slate-400">
              Analysez les performances de VOXO AI,
              les appels et les rendez-vous.
            </p>
          </div>

          <Link
            href="/dashboard/appels"
            className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[.04] px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/[.08] hover:text-white"
          >
            Voir tous les appels
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          <StatCard
            label="Appels"
            value={String(totalCalls)}
            description="Total enregistré"
          />

          <StatCard
            label="Rendez-vous"
            value={String(
              confirmedAppointments,
            )}
            description="Confirmés"
          />

          <StatCard
            label="Conversion"
            value={`${conversionRate} %`}
            description="Appels avec rendez-vous"
          />

          <StatCard
            label="Durée moyenne"
            value={formatDuration(
              averageDurationSeconds,
            )}
            description="Par conversation"
          />

          <StatCard
            label="Clients"
            value={String(totalClients ?? 0)}
            description="Clients enregistrés"
          />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-xl font-bold">
                  Activité des 7 derniers jours
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Appels et rendez-vous enregistrés
                  chaque jour.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <LegendItem
                  label="Appels"
                  className="bg-blue-500"
                />

                <LegendItem
                  label="Rendez-vous"
                  className="bg-emerald-400"
                />
              </div>
            </div>

            <div className="mt-8 overflow-x-auto">
              <div className="flex min-w-[650px] items-end gap-4">
                {dailyStats.map((day) => {
                  const callHeight =
                    day.calls === 0
                      ? 6
                      : Math.max(
                          (day.calls / maxActivity) *
                            220,
                          20,
                        );

                  const appointmentHeight =
                    day.appointments === 0
                      ? 4
                      : Math.max(
                          (day.appointments /
                            maxActivity) *
                            220,
                          14,
                        );

                  return (
                    <div
                      key={day.date}
                      className="flex min-w-16 flex-1 flex-col items-center"
                    >
                      <div className="flex h-64 items-end gap-2">
                        <div
                          title={`${day.calls} appel(s)`}
                          className="w-5 rounded-t-lg bg-blue-500 transition hover:opacity-80"
                          style={{
                            height: `${callHeight}px`,
                          }}
                        />

                        <div
                          title={`${day.appointments} rendez-vous`}
                          className="w-5 rounded-t-lg bg-emerald-400 transition hover:opacity-80"
                          style={{
                            height: `${appointmentHeight}px`,
                          }}
                        />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-white">
                        {day.label}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {day.calls} appel
                        {day.calls > 1 ? "s" : ""}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">
            <h2 className="text-xl font-bold">
              Services les plus demandés
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Classement selon les rendez-vous
              enregistrés.
            </p>

            <div className="mt-7 space-y-5">
              {topServices.length > 0 ? (
                topServices.map(
                  (service, index) => {
                    const percentage =
                      appointments.length > 0
                        ? Math.round(
                            (service.count /
                              appointments.length) *
                              100,
                          )
                        : 0;

                    return (
                      <div key={service.name}>
                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-white">
                              {index + 1}.{" "}
                              {service.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {service.count} demande
                              {service.count > 1
                                ? "s"
                                : ""}
                            </p>
                          </div>

                          <span className="text-sm font-semibold text-blue-300">
                            {percentage} %
                          </span>
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[.06]">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  },
                )
              ) : (
                <p className="py-10 text-center text-slate-500">
                  Aucun service enregistré.
                </p>
              )}
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <PerformanceCard
            title="Rendez-vous confirmés"
            value={String(
              confirmedAppointments,
            )}
            description="Rendez-vous enregistrés dans Supabase"
          />

          <PerformanceCard
            title="Appels avec durée"
            value={String(
              validDurations.length,
            )}
            description="Appels contenant une durée"
          />

          <PerformanceCard
            title="Jours actifs"
            value={String(
              dailyStats.filter(
                (day) =>
                  day.calls > 0 ||
                  day.appointments > 0,
              ).length,
            )}
            description="Sur les 7 derniers jours"
          />
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

      <p className="mt-3 text-3xl font-bold text-white">
        {value}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}

type PerformanceCardProps = {
  title: string;
  value: string;
  description: string;
};

function PerformanceCard({
  title,
  value,
  description,
}: PerformanceCardProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <p className="mt-3 text-4xl font-bold">
        {value}
      </p>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </section>
  );
}

type LegendItemProps = {
  label: string;
  className: string;
};

function LegendItem({
  label,
  className,
}: LegendItemProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-2.5 w-2.5 rounded-full ${className}`}
      />

      <span>{label}</span>
    </div>
  );
}

function buildLastSevenDaysStats(
  calls: AiCall[],
  appointments: Appointment[],
): DailyStat[] {
  const days: DailyStat[] = [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (
    let offset = 6;
    offset >= 0;
    offset -= 1
  ) {
    const date = new Date(today);

    date.setDate(
      today.getDate() - offset,
    );

    const dateKey =
      formatDateKey(date);

    days.push({
      date: dateKey,

      label: new Intl.DateTimeFormat(
        "fr-CH",
        {
          weekday: "short",
        },
      )
        .format(date)
        .replace(".", ""),

      calls: 0,
      appointments: 0,
    });
  }

  const daysMap = new Map(
    days.map((day) => [
      day.date,
      day,
    ]),
  );

  for (const call of calls) {
    if (!call.created_at) {
      continue;
    }

    const dateKey =
      formatDateKey(
        new Date(call.created_at),
      );

    const currentDay =
      daysMap.get(dateKey);

    if (!currentDay) {
      continue;
    }

    currentDay.calls += 1;
  }

  for (
    const appointment
    of appointments
  ) {
    const value =
      appointment.start_at ||
      appointment.created_at;

    if (!value) {
      continue;
    }

    const dateKey =
      formatDateKey(
        new Date(value),
      );

    const currentDay =
      daysMap.get(dateKey);

    if (!currentDay) {
      continue;
    }

    currentDay.appointments += 1;
  }

  return days;
}

function formatDateKey(
  date: Date,
) {
  return `${date.getFullYear()}-${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

function formatDuration(
  totalSeconds: number,
) {
  if (
    !totalSeconds ||
    totalSeconds <= 0
  ) {
    return "0 s";
  }

  const minutes =
    Math.floor(totalSeconds / 60);

  const seconds =
    totalSeconds % 60;

  if (minutes === 0) {
    return `${seconds} s`;
  }

  return `${minutes} min ${String(
    seconds,
  ).padStart(2, "0")} s`;
}