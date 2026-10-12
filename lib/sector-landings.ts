export type SectorLandingConfig = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  openGraphLocale?: string;
  badge: string;
  heroTitle: string;
  heroSubtitle: string;
  intro: string;
  painTitle: string;
  painText: string;
  sectorSpecifics: string[];
  examples: string[];
};

const systemIntro =
  "VOXO AI conçoit un système connecté : acquisition et publicité, réponses sur vos canaux de messagerie, agents vocaux pour les appels, prise de rendez-vous, CRM et relances — adapté à votre métier et aux intégrations réellement configurées.";

export const sectorLandings: Record<string, SectorLandingConfig> = {
  "ia-garage-automobile-geneve": {
    slug: "ia-garage-automobile-geneve",
    metaTitle: "Système IA pour garage automobile à Genève | VOXO AI",
    metaDescription:
      "Acquisition, messages, appels, rendez-vous atelier et suivi des devis pour garages automobiles à Genève avec VOXO AI.",
    canonicalPath: "/fr/ia-garage-automobile-geneve",
    openGraphLocale: "fr_CH",
    badge: "Garage automobile · Genève",
    heroTitle: "Plus de demandes atelier. Moins d'appels manqués.",
    heroSubtitle: "Un système IA pour votre garage à Genève",
    intro: `${systemIntro} Pour un garage, cela signifie ne plus perdre une demande de vidange ou de devis parce que l'atelier est occupé.`,
    painTitle: "Occupé sous un véhicule, injoignable au téléphone",
    painText:
      "Les clients appellent, écrivent sur WhatsApp ou remplissent votre formulaire pendant que votre équipe est en intervention. Sans système, les demandes s'accumulent ou partent chez un concurrent.",
    sectorSpecifics: [
      "Campagnes locales (Meta / Google) orientées prise de rendez-vous atelier",
      "Réponses aux demandes fréquentes : horaires, adresse, types d'intervention",
      "Agent vocal pour accueillir, qualifier (marque, modèle, urgence) et orienter",
      "Prise de rendez-vous et rappels selon votre agenda (ex. Google Calendar si connecté)",
      "Fiches demandes / devis et relances dans le CRM ou tableau de bord configuré",
    ],
    examples: [
      "Demande de vidange ou de diagnostic",
      "Urgence panne — qualification et transmission au bon mécanicien",
      "Devis carrosserie ou pneus — suivi jusqu'à la relance",
    ],
  },
  "ia-immobilier-geneve": {
    slug: "ia-immobilier-geneve",
    metaTitle: "Système IA immobilier à Genève | VOXO AI",
    metaDescription:
      "Acquisition de prospects, qualification, messagerie, appels et suivi CRM pour agences immobilières à Genève.",
    canonicalPath: "/fr/ia-immobilier-geneve",
    openGraphLocale: "fr_CH",
    badge: "Immobilier · Genève",
    heroTitle: "Qualifiez plus de prospects. Répondez plus vite.",
    heroSubtitle: "Système IA pour agences immobilières",
    intro: `${systemIntro} En immobilier, la vitesse de réponse et le suivi des visites font la différence.`,
    painTitle: "Prospects chauds, équipe en visite ou en negotiation",
    painText:
      "Un lead Meta ou une demande sur votre site arrive pendant qu'un agent est sur le terrain. Sans qualification ni relance structurée, l'opportunité refroidit.",
    sectorSpecifics: [
      "Publicité et pages de conversion alignées sur vos biens ou mandats",
      "Messagerie : WhatsApp, Instagram, e-mail — réponses et collecte de critères",
      "Appels : agent vocal pour qualifier budget, secteur, délai",
      "Organisation des visites et synchronisation agenda selon configuration",
      "CRM : statuts prospect, visites, relances et historique des échanges",
    ],
    examples: [
      "Lead acheteur — type de bien, budget, quartier",
      "Demande locataire — dossier et disponibilités visite",
      "Rappel automatique ou relance après visite sans réponse",
    ],
  },
  "ia-restaurant-geneve": {
    slug: "ia-restaurant-geneve",
    metaTitle: "Système IA pour restaurants à Genève | VOXO AI",
    metaDescription:
      "Réservations, messages, appels et campagnes locales pour restaurants à Genève — système IA VOXO AI.",
    canonicalPath: "/fr/ia-restaurant-geneve",
    openGraphLocale: "fr_CH",
    badge: "Restauration · Genève",
    heroTitle: "Remplissez vos services. Libérez votre salle.",
    heroSubtitle: "Système IA pour restaurants et hôtels",
    intro: `${systemIntro} En restauration, chaque réservation ou message traité pendant le service compte.`,
    painTitle: "Service en salle, téléphone qui sonne en continu",
    painText:
      "Réservations, modifications, questions horaires : votre équipe ne peut pas tout gérer en plein rush. Les no-shows et messages sans réponse coûtent cher.",
    sectorSpecifics: [
      "Acquisition locale (événements, menus, offres) avec suivi des réservations",
      "Messagerie Instagram / WhatsApp pour réservations et infos pratiques",
      "Agent vocal hors rush ou en complément de l'accueil",
      "Confirmations et rappels de réservation selon vos outils",
      "Historique client et relances (privatisations, fidélisation)",
    ],
    examples: [
      "Réservation pour ce soir — couverts et nom",
      "Question allergène ou horaire — réponse immédiate ou escalade cuisine",
      "Campagne « mid-week » — mesure des réservations générées",
    ],
  },
  "ia-salon-coiffure-geneve": {
    slug: "ia-salon-coiffure-geneve",
    metaTitle: "Système IA salon de coiffure Genève | VOXO AI",
    metaDescription:
      "Prise de rendez-vous, WhatsApp, rappels et acquisition client pour salons de coiffure à Genève.",
    canonicalPath: "/fr/ia-salon-coiffure-geneve",
    openGraphLocale: "fr_CH",
    badge: "Salon de coiffure · Genève",
    heroTitle: "Agenda rempli. Moins de no-shows.",
    heroSubtitle: "Système IA pour salons et coiffure",
    intro: `${systemIntro} Les salons vivent du volume de rendez-vous et de la réactivité sur Instagram et WhatsApp.`,
    painTitle: "Ciseaux en main, messages et appels en attente",
    painText:
      "Les clientes réservent en soirée sur les réseaux ; le lendemain, les messages s'empilent pendant les coupes. Les créneaux libres ou les oublis de rappel font perdre du chiffre.",
    sectorSpecifics: [
      "Publicité locale (coiffure, coloration, barbier) avec conversion RDV",
      "Messagerie : Instagram, WhatsApp — prestations, tarifs indicatifs, créneaux",
      "Appels manqués — rappel structuré avec prestation souhaitée",
      "Agenda connecté et rappels SMS / e-mail si configurés",
      "Fiche cliente, historique prestations et relances (retouches, offres)",
    ],
    examples: [
      "RDV coloration — disponibilités et durée estimée",
      "Changement de dernière minute — reprogrammation",
      "Relance cliente inactive depuis 3 mois",
    ],
  },
  "ia-institut-beaute-geneve": {
    slug: "ia-institut-beaute-geneve",
    metaTitle: "Système IA institut de beauté Genève | VOXO AI",
    metaDescription:
      "Acquisition, messagerie, rendez-vous et CRM pour instituts de beauté et esthétique à Genève.",
    canonicalPath: "/fr/ia-institut-beaute-geneve",
    openGraphLocale: "fr_CH",
    badge: "Institut de beauté · Genève",
    heroTitle: "Des rendez-vous soignés. Un suivi sans faille.",
    heroSubtitle: "Système IA pour instituts & esthétique",
    intro: `${systemIntro} Les instituts combinent prise de RDV, conseils produits et fidélisation sur plusieurs canaux.`,
    painTitle: "Cabines occupées, demandes soins et devis en parallèle",
    painText:
      "Forfaits, soins visage, épilation : les questions arrivent par message pendant les soins. Sans centralisation, les devis non relancés et les RDV oubliés se multiplient.",
    sectorSpecifics: [
      "Campagnes ciblées (soins, forfaits saison) avec landing et suivi leads",
      "Réponses messagerie sur prestations, contre-indications simples, orientations",
      "Agent vocal pour RDV et informations pratiques",
      "Agenda multi-praticiens selon votre configuration réelle",
      "CRM : packs, séances restantes, relances personnalisées",
    ],
    examples: [
      "Première visite — type de peau et créneau",
      "Devis cure — suivi jusqu'à confirmation",
      "Rappel veille de rendez-vous",
    ],
  },
  "receptionniste-ia-geneve": {
    slug: "receptionniste-ia-geneve",
    metaTitle: "Système IA entreprises Genève | Consulting & agents | VOXO AI",
    metaDescription:
      "VOXO AI accompagne les entreprises genevoises : acquisition, agents IA messagerie et appels, rendez-vous, CRM et relances.",
    canonicalPath: "/fr/receptionniste-ia-geneve",
    openGraphLocale: "fr_CH",
    badge: "Genève · PME & services",
    heroTitle: "Votre système client complet, pensé pour Genève",
    heroSubtitle: "Consulting IA & automatisation",
    intro: `${systemIntro} Nous partons de vos canaux réels (téléphone, WhatsApp, publicité, site) pour construire un parcours du premier contact au suivi commercial.`,
    painTitle: "Trop de canaux, pas assez de suivi",
    painText:
      "Les PME genevoises reçoivent des demandes via Meta, Google, e-mail et téléphone. Sans système, la qualification et les relances prennent du retard.",
    sectorSpecifics: [
      "Audit consulting : processus, outils, priorités métier",
      "Acquisition & publicité avec pages de conversion",
      "Agents messagerie et vocaux avec transfert humain contextualisé",
      "Rendez-vous et agendas connectés lorsque disponibles",
      "CRM centralisé et automatisations de relance",
    ],
    examples: [
      "Lead publicitaire → qualification → RDV commercial",
      "Appel manqué → rappel IA → fiche CRM",
      "Relance devis après 48 h sans réponse",
    ],
  },
};

export const nationalReceptionistLanding: SectorLandingConfig = {
  slug: "receptionniste-ia",
  metaTitle: "Consulting & systèmes IA pour entreprises | VOXO AI Suisse",
  metaDescription:
    "Acquisition, publicité, messagerie, appels, rendez-vous, CRM et relances — VOXO AI conçoit votre système IA sur mesure en Suisse.",
  canonicalPath: "/fr/receptionniste-ia",
  badge: "Consulting & systèmes IA · Suisse",
  heroTitle: "Du premier contact au suivi client, un seul système",
  heroSubtitle: "Plus qu'un agent vocal : votre croissance orchestrée",
  intro: systemIntro,
  painTitle: "Des outils dispersés, des opportunités perdues",
  painText:
    "Publicité, messages, appels et tableurs ne se parlent pas. VOXO AI relie l'acquisition au traitement des demandes, à la qualification, aux rendez-vous et au CRM.",
  sectorSpecifics: [
    "Consulting IA : analyse de vos processus et plan par phases",
    "Acquisition & campagnes avec mesure des leads utiles",
    "Agents messagerie (WhatsApp, Instagram, e-mail, SMS selon config)",
    "Agents vocaux pour accueil, qualification et orientation",
    "Agendas, CRM et relances automatisées avec passage à l'humain",
  ],
  examples: [
    "Entreprise de services — devis et RDV",
    "Commerce local — campagnes Meta + WhatsApp",
    "Équipe commerciale — pipeline CRM et relances",
  ],
};
