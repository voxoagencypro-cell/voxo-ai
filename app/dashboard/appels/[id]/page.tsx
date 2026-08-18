import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import Sidebar from "@/components/dashboard/Sidebar";

type CallDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
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
  updated_at: string | null;
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

export default async function CallDetailsPage({
  params,
}: CallDetailsPageProps) {
  const { id } = await params;

  /*
   * 1. Récupérer l'appel depuis ai_calls
   */
  const { data: callData, error: callError } =
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
        recording_url,
        updated_at
      `)
      .eq("id", id)
      .single();

  if (callError || !callData) {
    console.error("Erreur récupération appel :", callError);
    notFound();
  }

  const call = callData as AiCall;

  /*
   * 2. Récupérer le client
   */
  let client: Client | null = null;

  if (call.client_id) {
    const { data: clientData, error: clientError } =
      await supabaseAdmin
        .from("clients")
        .select(`
          id,
          full_name,
          phone,
          email
        `)
        .eq("id", call.client_id)
        .maybeSingle();

    if (clientError) {
      console.error(
        "Erreur récupération client :",
        clientError,
      );
    }

    client = (clientData ?? null) as Client | null;
  }

  /*
   * 3. Récupérer l'entreprise
   */
  let company: Company | null = null;

  if (call.company_id) {
    const { data: companyData, error: companyError } =
      await supabaseAdmin
        .from("companies")
        .select(`
          id,
          name
        `)
        .eq("id", call.company_id)
        .maybeSingle();

    if (companyError) {
      console.error(
        "Erreur récupération entreprise :",
        companyError,
      );
    }

    company = (companyData ?? null) as Company | null;
  }

  /*
   * 4. Chercher le rendez-vous lié au même client
   */
  let appointment: Appointment | null = null;

  if (call.client_id) {
    let appointmentQuery = supabaseAdmin
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
      .eq("client_id", call.client_id)
      .order("created_at", { ascending: false })
      .limit(1);

    if (call.company_id) {
      appointmentQuery = appointmentQuery.eq(
        "company_id",
        call.company_id,
      );
    }

    const {
      data: appointmentData,
      error: appointmentError,
    } = await appointmentQuery.maybeSingle();

    if (appointmentError) {
      console.error(
        "Erreur récupération rendez-vous :",
        appointmentError,
      );
    }

    appointment =
      (appointmentData ?? null) as Appointment | null;
  }

  const clientName =
    client?.full_name?.trim() || "Client inconnu";

  const phone =
    call.phone_number ||
    client?.phone ||
    "Non renseigné";

  const email =
    client?.email || "Non renseigné";

  const companyName =
    company?.name?.trim() ||
    (call.company_id
      ? `Entreprise #${call.company_id}`
      : "Entreprise non renseignée");

  const formattedCreatedAt =
    formatDateTime(call.created_at);

  const formattedDuration =
    formatDuration(call.duration_seconds);

  const formattedAppointment =
    formatDateTime(appointment?.start_at ?? null);

  const transcriptMessages =
    buildTranscriptMessages(
      call.transcript,
      call.summary || appointment?.notes || null,
    );

  return (
    <div className="flex min-h-screen bg-[#070B18] text-white">
      <Sidebar />

      <main className="min-w-0 flex-1 p-8">
        <Link
          href="/dashboard/appels"
          className="inline-flex text-sm font-semibold text-blue-400 transition hover:text-blue-300"
        >
          ← Retour aux appels
        </Link>

        <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div>
            <p className="text-sm font-medium text-blue-400">
              Détail de l’appel
            </p>

            <h1 className="mt-2 text-5xl font-bold">
              {clientName}
            </h1>

            <p className="mt-3 text-lg text-slate-400">
              {companyName}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {phone !== "Non renseigné" && (
                <a
                  href={`tel:${phone}`}
                  className="inline-flex rounded-xl border border-white/10 bg-white/[.04] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/[.08] hover:text-white"
                >
                  Appeler le client
                </a>
              )}

              {email !== "Non renseigné" && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex rounded-xl border border-white/10 bg-white/[.04] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/[.08] hover:text-white"
                >
                  Envoyer un e-mail
                </a>
              )}

              <Link
                href="/dashboard/rendez-vous"
                className="inline-flex rounded-xl border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20 hover:text-white"
              >
                Voir les rendez-vous
              </Link>
            </div>
          </div>

          <StatusBadge status={call.status} />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Durée"
            value={formattedDuration}
            description="Durée de la conversation"
          />

          <StatCard
            label="Direction"
            value={formatDirection(call.direction)}
            description="Type d’appel"
          />

          <StatCard
            label="Rendez-vous"
            value={appointment ? "Oui" : "Aucun"}
            description="Résultat de l’appel"
          />

          <StatCard
            label="Agent IA"
            value="Emma"
            description="Agent ayant traité l’appel"
          />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">
            <h2 className="text-xl font-bold">
              Informations du client
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <InfoItem
                label="Téléphone"
                value={phone}
              />

              <InfoItem
                label="E-mail"
                value={email}
              />

              <InfoItem
                label="Entreprise"
                value={companyName}
              />

              <InfoItem
                label="Date de l’appel"
                value={formattedCreatedAt}
              />
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">
                  Rendez-vous
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Rendez-vous correspondant au client.
                </p>
              </div>

              {appointment && (
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Enregistré
                </span>
              )}
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <InfoItem
                label="Service"
                value={
                  appointment?.service_name ||
                  "Non renseigné"
                }
              />

              <InfoItem
                label="Date et heure"
                value={
                  appointment
                    ? formattedAppointment
                    : "Aucun rendez-vous"
                }
              />

              <InfoItem
                label="Employé"
                value={
                  appointment?.employee_name ||
                  "Non attribué"
                }
              />

              <InfoItem
                label="Identifiant Retell"
                value={
                  call.retell_call_id ||
                  "Non disponible"
                }
              />
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-3xl border border-white/10 bg-[#111827] p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
            <div>
              <p className="text-sm font-medium text-blue-400">
                Analyse automatique
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Résumé IA
              </h2>
            </div>

            <span className="inline-flex w-fit rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
              VOXO AI
            </span>
          </div>

          <p className="mt-6 whitespace-pre-line leading-8 text-slate-300">
            {call.summary ||
              appointment?.notes ||
              "Aucun résumé n’est disponible pour cet appel."}
          </p>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-[#111827] p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold">
                Enregistrement audio
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Enregistrement audio Retell AI.
              </p>
            </div>

            {call.recording_url ? (
              <audio
                controls
                preload="metadata"
                className="w-full max-w-md"
              >
                <source src={call.recording_url} />

                Votre navigateur ne prend pas en charge
                la lecture audio.
              </audio>
            ) : (
              <span className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[.04] px-5 py-3 text-sm font-semibold text-slate-500">
                Audio indisponible
              </span>
            )}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-[#111827] p-6">
          <div>
            <p className="text-sm font-medium text-blue-400">
              Conversation
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Transcription complète
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Conversation entre le client et Emma IA.
            </p>
          </div>

          <div className="mt-7 space-y-4">
            {transcriptMessages.map((message, index) => (
              <TranscriptMessage
                key={`${message.speaker}-${index}`}
                speaker={message.speaker}
                text={message.text}
              />
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-[#111827] p-6">
          <h2 className="text-xl font-bold">
            Activité liée à l’appel
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <ActivityItem
              label="Appel enregistré"
              value={formattedCreatedAt}
              completed
            />

            <ActivityItem
              label="Rendez-vous créé"
              value={
                appointment
                  ? formattedAppointment
                  : "Aucun rendez-vous"
              }
              completed={Boolean(appointment)}
            />

            <ActivityItem
              label="Retell AI"
              value={
                call.retell_call_id
                  ? call.retell_call_id
                  : "Identifiant non disponible"
              }
              completed={Boolean(call.retell_call_id)}
            />
          </div>
        </section>
      </main>
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

      <p className="mt-3 break-words text-2xl font-bold text-white">
        {value}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}

type TranscriptMessageProps = {
  speaker: "client" | "assistant";
  text: string;
};

function TranscriptMessage({
  speaker,
  text,
}: TranscriptMessageProps) {
  const isAssistant = speaker === "assistant";

  return (
    <div
      className={`max-w-3xl rounded-2xl px-5 py-4 ${
        isAssistant
          ? "ml-auto border border-blue-400/15 bg-blue-500/10 text-blue-100"
          : "border border-white/[.07] bg-white/[.04] text-slate-300"
      }`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-wider ${
          isAssistant
            ? "text-blue-400"
            : "text-slate-500"
        }`}
      >
        {isAssistant ? "Emma IA" : "Client"}
      </p>

      <p className="mt-2 whitespace-pre-line leading-7">
        {text}
      </p>
    </div>
  );
}

type ActivityItemProps = {
  label: string;
  value: string;
  completed: boolean;
};

function ActivityItem({
  label,
  value,
  completed,
}: ActivityItemProps) {
  return (
    <div className="rounded-2xl border border-white/[.07] bg-black/10 p-5">
      <div className="flex items-center gap-3">
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
            completed
              ? "bg-emerald-400/10 text-emerald-300"
              : "bg-white/[.05] text-slate-500"
          }`}
        >
          {completed ? "✓" : "—"}
        </span>

        <p className="font-semibold text-white">
          {label}
        </p>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-500">
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
          normalizedStatus === "in_progress" ||
          normalizedStatus === "ringing"
        ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
        : normalizedStatus === "failed" ||
            normalizedStatus === "cancelled"
          ? "border-red-400/20 bg-red-400/10 text-red-300"
          : "border-blue-400/20 bg-blue-400/10 text-blue-300";

  return (
    <span
      className={`inline-flex w-fit rounded-full border px-4 py-2 text-sm font-semibold ${styles}`}
    >
      {formatStatus(currentStatus)}
    </span>
  );
}

type TranscriptMessage = {
  speaker: "client" | "assistant";
  text: string;
};

function buildTranscriptMessages(
  transcript: string | null,
  fallbackMessage: string | null,
): TranscriptMessage[] {
  const rawText = transcript?.trim();

  if (!rawText) {
    return [
      {
        speaker: "client",
        text:
          fallbackMessage ||
          "La transcription de cet appel n’est pas encore disponible.",
      },
      {
        speaker: "assistant",
        text:
          "Les informations de cet appel ont été enregistrées dans VOXO AI.",
      },
    ];
  }

  const lines = rawText
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const parsedMessages = lines.map(
    (line, index) => {
      const normalizedLine =
        line.toLowerCase();

      const isAssistant =
        normalizedLine.startsWith("emma:") ||
        normalizedLine.startsWith("assistant:") ||
        normalizedLine.startsWith("agent:");

      const isClient =
        normalizedLine.startsWith("client:") ||
        normalizedLine.startsWith("caller:") ||
        normalizedLine.startsWith("utilisateur:");

      const cleanedText = line.replace(
        /^(emma|assistant|agent|client|caller|utilisateur)\s*:\s*/i,
        "",
      );

      if (isAssistant) {
        return {
          speaker: "assistant" as const,
          text: cleanedText,
        };
      }

      if (isClient) {
        return {
          speaker: "client" as const,
          text: cleanedText,
        };
      }

      return {
        speaker:
          index % 2 === 0
            ? ("client" as const)
            : ("assistant" as const),
        text: line,
      };
    },
  );

  return parsedMessages.length > 0
    ? parsedMessages
    : [
        {
          speaker: "client",
          text: rawText,
        },
      ];
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

  return new Intl.DateTimeFormat(
    "fr-CH",
    {
      dateStyle: "long",
      timeStyle: "short",
    },
  ).format(date);
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

function formatStatus(status: string) {
  const normalizedStatus =
    status.toLowerCase();

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