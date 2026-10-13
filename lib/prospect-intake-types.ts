export const EMPLOYEE_RANGES = [
  "solo",
  "2-5",
  "6-10",
  "11-50",
  "51-200",
  "200+",
] as const;

export type EmployeeRange = (typeof EMPLOYEE_RANGES)[number];

export const EMPLOYEE_RANGE_LABELS: Record<EmployeeRange, string> = {
  solo: "Indépendant / seul",
  "2-5": "2 à 5 employés",
  "6-10": "6 à 10 employés",
  "11-50": "11 à 50 employés",
  "51-200": "51 à 200 employés",
  "200+": "Plus de 200 employés",
};

/** Objectifs étape 3 (ordre d’affichage : acquisition en premier). */
export const PRIORITY_OPTIONS = [
  "acquisition",
  "ads",
  "messages",
  "calls",
  "appointments",
  "followup",
  "organization",
  "other",
] as const;

export type PriorityOption = (typeof PRIORITY_OPTIONS)[number];

export const PRIORITY_LABELS: Record<PriorityOption, string> = {
  acquisition: "Trouver de nouveaux clients",
  ads: "Améliorer ma publicité",
  messages: "Répondre aux messages",
  calls: "Gérer les appels",
  appointments: "Organiser les rendez-vous",
  followup: "Suivre et relancer les clients",
  organization: "Simplifier l'organisation",
  other: "Autre",
};

export const CHANNEL_OPTIONS = [
  "phone",
  "whatsapp",
  "instagram",
  "facebook",
  "sms",
  "email",
  "website",
  "other",
  "none_yet",
] as const;

export type ChannelOption = (typeof CHANNEL_OPTIONS)[number];

export const CHANNEL_LABELS: Record<ChannelOption, string> = {
  phone: "Téléphone",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  facebook: "Facebook / Messenger",
  sms: "SMS",
  email: "E-mail",
  website: "Site internet",
  other: "Autre",
  none_yet: "Aucun pour le moment",
};

export type ProspectIntakePayload = {
  prospectId?: string;
  locale: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  employeeRange: EmployeeRange;
  priorities: PriorityOption[];
  topPriority: PriorityOption;
  channels: ChannelOption[];
  optionalDetail?: string;
  marketingConsent: boolean;
};

export function isExclusiveNoneYet(channels: ChannelOption[]): boolean {
  return channels.length === 1 && channels[0] === "none_yet";
}
