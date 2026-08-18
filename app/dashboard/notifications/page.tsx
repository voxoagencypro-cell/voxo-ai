import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";
import RealtimeRefresh from "@/components/dashboard/RealtimeRefresh";
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

type Notification = {
  id: string;
  appointmentId: number;
  type: "appointment" | "call" | "urgent";
  title: string;
  description: string;
  createdAt: string | null;
  clientName: string;
  company: string;
};

export default async function NotificationsPage() {
  /*
   * 1. Récupérer les rendez-vous
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
      .order("created_at", { ascending: false })
      .limit(30);

  if (appointmentsError) {
    console.error(
      "Erreur Supabase notifications :",
      appointmentsError,
    );
  }

  const appointments = (appointmentsData ?? []) as Appointment[];

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
        "Erreur récupération entreprises :",
        companiesError,
      );
    } else {
      companies = (companiesData ?? []) as Company[];
    }
  }

  /*
   * 4. Associer client + entreprise aux rendez-vous
   */
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

  /*
   * 5. Construire les notifications
   */
  const notifications = buildNotifications(
    appointmentsWithRelations,
  );

  const appointmentNotifications = notifications.filter(
    (notification) => notification.type === "appointment",
  ).length;

  const callNotifications = notifications.filter(
    (notification) => notification.type === "call",
  ).length;

  const urgentNotifications = notifications.filter(
    (notification) => notification.type === "urgent",
  ).length;

  return (
    <div className="flex min-h-screen bg-[#070B18] text-white">
      <RealtimeRefresh />
      <Sidebar />

      <main className="min-w-0 flex-1 p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-blue-400">
              Centre d’activité
            </p>

            <h1 className="mt-2 text-5xl font-bold">
              Notifications
            </h1>

            <p className="mt-3 text-slate-400">
              Suivez les nouveaux appels et rendez-vous générés
              par VOXO AI.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[.04] px-5 py-4">
            <p className="text-sm text-slate-400">
              Activités récentes
            </p>

            <p className="mt-1 text-3xl font-bold">
              {notifications.length}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <SummaryCard
            label="Rendez-vous"
            value={appointmentNotifications}
            description="Nouveaux rendez-vous"
          />

          <SummaryCard
            label="Appels"
            value={callNotifications}
            description="Activités enregistrées"
          />

          <SummaryCard
            label="Urgences"
            value={urgentNotifications}
            description="Demandes prioritaires"
            urgent
          />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.6fr_.8fr]">
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827]">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold">
                  Activité récente
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Les notifications sont mises à jour
                  automatiquement.
                </p>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>

                Temps réel actif
              </span>
            </div>

            {notifications.length > 0 ? (
              <div>
                {notifications.map((notification) => (
                  <NotificationRow
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </div>
            ) : (
              <div className="px-6 py-20 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-blue-500/10 text-2xl">
                  🔔
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  Aucune notification
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Les nouveaux rendez-vous apparaîtront ici.
                </p>
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-blue-400">
                Agent IA
              </p>

              <div className="mt-5 flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-500/15 text-xl font-bold text-blue-300">
                  E
                </div>

                <div>
                  <h2 className="text-lg font-bold">
                    Emma IA
                  </h2>

                  <p className="mt-1 flex items-center gap-2 text-sm text-emerald-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    En ligne
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <StatusRow
                  label="Supabase"
                  value="Connecté"
                  connected
                />

                <StatusRow
                  label="Realtime"
                  value="Connecté"
                  connected
                />

                <StatusRow
                  label="Retell AI"
                  value="En attente"
                />

                <StatusRow
                  label="Google Calendar"
                  value="Non connecté"
                />
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">
              <h2 className="text-lg font-bold">
                Accès rapide
              </h2>

              <div className="mt-5 space-y-3">
                <QuickLink
                  href="/dashboard/appels"
                  label="Voir tous les appels"
                />

                <QuickLink
                  href="/dashboard/rendez-vous"
                  label="Voir les rendez-vous"
                />

                <QuickLink
                  href="/dashboard/calendrier"
                  label="Ouvrir le calendrier"
                />

                <QuickLink
                  href="/dashboard/agents"
                  label="Voir Emma IA"
                />
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

function buildNotifications(
  appointments: AppointmentWithRelations[],
): Notification[] {
  const notifications: Notification[] = [];

  for (const appointment of appointments) {
    const clientName =
      appointment.client?.full_name?.trim() ||
      "Client inconnu";

    const company =
      appointment.company?.name?.trim() ||
      (appointment.company_id
        ? `Entreprise #${appointment.company_id}`
        : "Entreprise non renseignée");

    const service =
      appointment.service_name?.trim() ||
      "Rendez-vous";

    const normalizedStatus =
      appointment.status?.toLowerCase() || "";

    /*
     * Notification urgence
     */
    if (
      normalizedStatus === "urgent" ||
      normalizedStatus === "urgence"
    ) {
      notifications.push({
        id: `${appointment.id}-urgent`,
        appointmentId: appointment.id,
        type: "urgent",
        title: "Demande urgente détectée",
        description: `${service} nécessite une prise en charge prioritaire.`,
        createdAt: appointment.created_at,
        clientName,
        company,
      });
    }

    /*
     * Notification rendez-vous
     */
    if (appointment.start_at) {
      notifications.push({
        id: `${appointment.id}-appointment`,
        appointmentId: appointment.id,
        type: "appointment",
        title: "Nouveau rendez-vous",
        description: `${service} prévu le ${formatAppointmentDateTime(
          appointment.start_at,
        )}.`,
        createdAt: appointment.created_at,
        clientName,
        company,
      });
    }

    /*
     * Notification activité / appel
     */
    notifications.push({
      id: `${appointment.id}-call`,
      appointmentId: appointment.id,
      type: "call",
      title: "Nouvelle activité",
      description:
        appointment.notes?.trim() ||
        `${service} enregistré dans VOXO AI.`,
      createdAt: appointment.created_at,
      clientName,
      company,
    });
  }

  return notifications
    .sort((first, second) => {
      const firstDate = first.createdAt
        ? new Date(first.createdAt).getTime()
        : 0;

      const secondDate = second.createdAt
        ? new Date(second.createdAt).getTime()
        : 0;

      return secondDate - firstDate;
    })
    .slice(0, 30);
}

type NotificationRowProps = {
  notification: Notification;
};

function NotificationRow({
  notification,
}: NotificationRowProps) {
  const appearance = getNotificationAppearance(
    notification.type,
  );

  return (
    <Link
      href={`/dashboard/rendez-vous`}
      className="flex gap-4 border-b border-white/5 px-6 py-5 transition hover:bg-white/[.035]"
    >
      <div
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border text-xl ${appearance.styles}`}
      >
        {appearance.icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
          <div>
            <p className="font-semibold text-white">
              {notification.title}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              {notification.clientName}

              <span className="mx-2 text-slate-700">
                •
              </span>

              {notification.company}
            </p>
          </div>

          <span className="shrink-0 text-xs text-slate-500">
            {formatRelativeTime(notification.createdAt)}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
          {notification.description}
        </p>
      </div>
    </Link>
  );
}

function getNotificationAppearance(
  type: Notification["type"],
) {
  if (type === "appointment") {
    return {
      icon: "📅",
      styles:
        "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    };
  }

  if (type === "urgent") {
    return {
      icon: "⚠️",
      styles:
        "border-red-400/20 bg-red-400/10 text-red-300",
    };
  }

  return {
    icon: "📞",
    styles:
      "border-violet-400/20 bg-violet-400/10 text-violet-300",
  };
}

type SummaryCardProps = {
  label: string;
  value: number;
  description: string;
  urgent?: boolean;
};

function SummaryCard({
  label,
  value,
  description,
  urgent = false,
}: SummaryCardProps) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        urgent
          ? "border-red-400/15 bg-red-400/[.06]"
          : "border-white/10 bg-[#111827]"
      }`}
    >
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

type StatusRowProps = {
  label: string;
  value: string;
  connected?: boolean;
};

function StatusRow({
  label,
  value,
  connected = false,
}: StatusRowProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/[.07] bg-black/10 px-4 py-3">
      <span className="text-sm text-slate-400">
        {label}
      </span>

      <span
        className={`text-xs font-semibold ${
          connected
            ? "text-emerald-300"
            : "text-amber-300"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

type QuickLinkProps = {
  href: string;
  label: string;
};

function QuickLink({
  href,
  label,
}: QuickLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl border border-white/[.07] bg-black/10 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-blue-400/20 hover:bg-blue-500/10 hover:text-white"
    >
      {label}

      <span className="text-blue-400">
        →
      </span>
    </Link>
  );
}

function formatAppointmentDateTime(
  value: string | null,
) {
  if (!value) {
    return "date non renseignée";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("fr-CH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatRelativeTime(value: string | null) {
  if (!value) {
    return "Date inconnue";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date inconnue";
  }

  const difference = Date.now() - date.getTime();
  const minutes = Math.floor(difference / 60000);

  if (minutes < 1) {
    return "À l’instant";
  }

  if (minutes < 60) {
    return `Il y a ${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `Il y a ${hours} h`;
  }

  return new Intl.DateTimeFormat("fr-CH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}