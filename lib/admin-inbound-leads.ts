import {
  CHANNEL_LABELS,
  EMPLOYEE_RANGE_LABELS,
  PRIORITY_LABELS,
  type ChannelOption,
  type EmployeeRange,
  type PriorityOption,
} from "@/lib/prospect-intake-types";

export type InboundLeadSource = "demo_request" | "prospect_intake";

export type InboundStatus =
  | "new"
  | "contacted"
  | "scheduled"
  | "converted"
  | "closed";

export type DemoRequestRow = {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  sector: string;
  message: string | null;
  locale: string | null;
  status: string | null;
  created_at: string | null;
  is_test?: boolean | null;
};

export type ProspectIntakeRow = {
  id: string;
  company_name: string;
  contact_name: string;
  phone: string;
  email: string;
  employee_range: string;
  sector: string | null;
  priorities: unknown;
  channels: unknown;
  primary_channel: string | null;
  main_difficulty: string | null;
  primary_goal: string | null;
  priority_other: string | null;
  marketing_consent: boolean | null;
  locale: string | null;
  status: string | null;
  submitted_at: string | null;
  is_test?: boolean | null;
};

export type InboundLead = {
  id: string;
  source: InboundLeadSource;
  kindLabel: "Demande de démo" | "Formulaire portail";
  isTest: boolean;
  contactName: string;
  company: string;
  phone: string;
  email: string;
  locale: string | null;
  status: InboundStatus;
  occurredAt: string | null;
  summaryLine: string;
  detailFields: { label: string; value: string }[];
};

export function isTestRow(isTest: boolean | null | undefined): boolean {
  return isTest === true;
}

export function normalizeStatus(value: string | null | undefined): InboundStatus {
  if (
    value === "contacted" ||
    value === "scheduled" ||
    value === "converted" ||
    value === "closed"
  ) {
    return value;
  }
  return "new";
}

export function isNewLead(status: InboundStatus): boolean {
  return status === "new";
}

function formatStringList(
  values: unknown,
  labels: Record<string, string>,
): string {
  if (!Array.isArray(values) || values.length === 0) {
    return "—";
  }
  return values
    .map((v) => labels[String(v)] ?? String(v))
    .join(", ");
}

/** Affiche le message démo sans JSON ni original_intake_message. */
export function formatDemoRequestMessage(message: string | null): string {
  if (!message?.trim()) {
    return "Aucun message renseigné.";
  }

  const withoutPayload = message.split("\n---\n")[0]?.trim() ?? "";
  if (withoutPayload) {
    return withoutPayload;
  }

  const trimmed = message.trim();
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return "Message archivé (contenu non affiché).";
  }

  return message.trim();
}

export function mapDemoRequest(row: DemoRequestRow): InboundLead {
  const status = normalizeStatus(row.status);
  const readableMessage = formatDemoRequestMessage(row.message);

  return {
    id: row.id,
    source: "demo_request",
    kindLabel: "Demande de démo",
    isTest: isTestRow(row.is_test),
    contactName: row.name,
    company: row.company,
    phone: row.phone,
    email: row.email,
    locale: row.locale,
    status,
    occurredAt: row.created_at,
    summaryLine: readableMessage,
    detailFields: [
      { label: "Secteur", value: row.sector || "—" },
      { label: "Besoin exprimé", value: readableMessage },
      { label: "Langue", value: row.locale || "—" },
    ],
  };
}

export function mapProspectIntake(row: ProspectIntakeRow): InboundLead {
  const status = normalizeStatus(row.status);
  const employeeLabel =
    EMPLOYEE_RANGE_LABELS[row.employee_range as EmployeeRange] ??
    row.employee_range;
  const objectives = formatStringList(row.priorities, PRIORITY_LABELS);
  const channels = formatStringList(row.channels, CHANNEL_LABELS);
  const primaryGoal =
    row.primary_goal?.trim() ||
    (row.priorities &&
    Array.isArray(row.priorities) &&
    row.priorities[0]
      ? PRIORITY_LABELS[row.priorities[0] as PriorityOption] ?? "—"
      : "—");

  const detailFields: { label: string; value: string }[] = [
    { label: "Taille de l'entreprise", value: employeeLabel },
    { label: "Objectifs sélectionnés", value: objectives },
    { label: "Priorité principale", value: primaryGoal },
    { label: "Canaux utilisés", value: channels },
  ];

  if (row.main_difficulty?.trim()) {
    detailFields.push({
      label: "Précision / difficulté",
      value: row.main_difficulty.trim(),
    });
  }
  if (row.priority_other?.trim()) {
    detailFields.push({
      label: "Autre objectif (précision)",
      value: row.priority_other.trim(),
    });
  }
  if (row.sector?.trim()) {
    detailFields.push({ label: "Secteur", value: row.sector.trim() });
  }

  detailFields.push({
    label: "Consentement marketing",
    value: row.marketing_consent ? "Oui" : "Non",
  });
  detailFields.push({
    label: "Langue",
    value: row.locale || "—",
  });

  const primaryChannel = row.primary_channel
    ? CHANNEL_LABELS[row.primary_channel as ChannelOption] ??
      row.primary_channel
    : null;
  if (primaryChannel) {
    detailFields.splice(3, 0, {
      label: "Canal principal",
      value: primaryChannel,
    });
  }

  return {
    id: row.id,
    source: "prospect_intake",
    kindLabel: "Formulaire portail",
    isTest: isTestRow(row.is_test),
    contactName: row.contact_name,
    company: row.company_name,
    phone: row.phone,
    email: row.email,
    locale: row.locale,
    status,
    occurredAt: row.submitted_at,
    summaryLine: primaryGoal,
    detailFields,
  };
}

export function mergeInboundLeads(
  demos: DemoRequestRow[],
  intakes: ProspectIntakeRow[],
): InboundLead[] {
  const combined = [
    ...demos.map(mapDemoRequest),
    ...intakes.map(mapProspectIntake),
  ];

  combined.sort((a, b) => {
    const ta = a.occurredAt ? new Date(a.occurredAt).getTime() : 0;
    const tb = b.occurredAt ? new Date(b.occurredAt).getTime() : 0;
    return tb - ta;
  });

  return combined;
}

export function filterLeadsForView(
  leads: InboundLead[],
  showTests: boolean,
): InboundLead[] {
  if (showTests) {
    return leads;
  }
  return leads.filter((lead) => !lead.isTest);
}
