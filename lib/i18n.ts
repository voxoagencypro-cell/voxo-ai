export const locales = ["fr", "de", "en"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

const dictionaries = {
  fr: {
    nav: {
      solution: "Solution",
      sectors: "Secteurs",
      pricing: "Tarifs",
      demo: "Démo",
      contact: "Contact",
      cta: "Réserver une démo",
    },

    hero: {
      badge: "Réceptionniste IA conçue en Suisse",
      title1: "Ne manquez plus",
      title2: "aucun appel.",
      text: "VOXO AI répond 24h/24, qualifie vos prospects et réserve automatiquement leurs rendez-vous dans votre agenda.",
      demo: "Tester la démo",
      call: "Réserver un appel",
      proof: "Installation rapide · Voix naturelle · Support suisse",
    },

    how: {
      eyebrow: "SIMPLE ET EFFICACE",
      title: "De l’appel au rendez-vous, automatiquement.",
      text: "Votre équipe garde le contrôle. VOXO AI s’occupe du reste.",
      items: [
        [
          "01",
          "Le client appelle",
          "Votre numéro reste inchangé ou est redirigé vers VOXO AI.",
        ],
        [
          "02",
          "L’IA répond",
          "Elle comprend la demande, répond aux questions et qualifie le besoin.",
        ],
        [
          "03",
          "Le rendez-vous est créé",
          "Les disponibilités sont vérifiées et l’agenda est mis à jour en temps réel.",
        ],
      ],
    },

    sectors: {
      eyebrow: "POUR VOTRE MÉTIER",
      title: "Une IA adaptée à votre activité.",
      items: [
        "Garages",
        "Artisans",
        "Régies immobilières",
        "Salons & instituts",
        "Restaurants & Hôtels",
        "Nettoyage & Services",
      ],
    },

    benefits: {
      eyebrow: "POURQUOI VOXO AI",
      title: "Plus de clients. Moins d’interruptions.",
      items: [
        [
          "Disponible 24h/24",
          "Chaque appel reçoit une réponse, même le soir et le week-end.",
        ],
        [
          "Agenda synchronisé",
          "Connexion avec Google Calendar et vos outils métier.",
        ],
        [
          "Conversation naturelle",
          "Une voix professionnelle qui s’adapte à votre entreprise.",
        ],
        [
          "Données exploitables",
          "Suivez les appels, demandes, réservations et opportunités.",
        ],
      ],
    },

    pricing: {
      eyebrow: "TARIFS TRANSPARENTS",
      title: "Choisissez l’offre adaptée à votre entreprise.",
      monthly: "/mois",
      popular: "Le plus choisi",
      start: "Commencer",
      plans: [
        {
          name: "STARTER",
          price: "249 CHF",
          desc: "Pour les indépendants et petites structures qui veulent automatiser leurs appels et leurs rendez-vous.",
          features: [
            "Réception des appels 24h/24 et 7j/7",
            "Jusqu’à 300 minutes d’appels par mois",
            "Jusqu’à 200 SMS par mois",
            "1 agenda connecté",
            "1 collaborateur",
            "Traitement en français",
            "Réponses aux questions concernant les horaires",
            "Réponses concernant les prestations",
            "Réponses concernant les tarifs",
            "Réponses aux questions générales",
            "Prise de rendez-vous",
            "Modification des rendez-vous par téléphone",
            "Annulation des rendez-vous par téléphone",
            "Confirmation des rendez-vous par SMS",
            "Collecte des informations de l’appelant",
            "Inscription automatique des rendez-vous dans l’agenda",
            "Transmission des informations relatives au rendez-vous à l’entreprise",
            "Dashboard basique",
            "Support standard",
          ],
        },
        {
          name: "PRO",
          price: "549 CHF",
          desc: "Pour les entreprises qui souhaitent automatiser davantage leur accueil client et gérer plusieurs collaborateurs.",
          features: [
            "Réception des appels 24h/24 et 7j/7",
            "Jusqu’à 1’000 minutes d’appels par mois",
            "Jusqu’à 600 SMS par mois",
            "Jusqu’à 7 agendas connectés",
            "Jusqu’à 7 collaborateurs",
            "Traitement en français et en anglais",
            "Réponses aux questions concernant les horaires",
            "Réponses concernant les prestations",
            "Réponses concernant les tarifs",
            "Réponses aux questions générales",
            "Prise de rendez-vous",
            "Modification des rendez-vous par téléphone",
            "Annulation des rendez-vous par téléphone",
            "Confirmation des rendez-vous par SMS",
            "Collecte des informations de l’appelant",
            "Inscription des rendez-vous dans les agendas configurés",
            "Gestion des rendez-vous selon les collaborateurs et agendas",
            "Transmission des informations au client professionnel",
            "CRM",
            "Fiches clients",
            "Historique client",
            "Résumé automatique des appels",
            "Qualification des prospects",
            "Rappels automatiques",
            "Analyse et classification de certaines données",
            "Workflows avancés",
            "Dashboard avancé",
            "Support prioritaire",
          ],
        },
        {
          name: "PERSONNALISÉ",
          price: "Sur devis",
          desc: "Pour les entreprises dont les besoins nécessitent une configuration sur mesure.",
          features: [
            "Nombre de minutes d’appels personnalisé",
            "Nombre de SMS personnalisé",
            "Nombre de collaborateurs personnalisé",
            "Nombre d’agendas personnalisé",
            "Plusieurs établissements",
            "Plusieurs agents IA",
            "Plusieurs langues",
            "CRM personnalisé",
            "WhatsApp",
            "Instagram",
            "Routage avancé des appels",
            "Workflows spécifiques",
            "Intégrations personnalisées",
            "Automatisations sur mesure",
            "Dashboard personnalisé",
            "Connexion à vos outils métier",
            "Accompagnement et support adaptés",
          ],
        },
      ],
    },

    faq: {
      eyebrow: "QUESTIONS FRÉQUENTES",
      title: "Tout ce qu’il faut savoir.",
      items: [
        [
          "Puis-je garder mon numéro ?",
          "Oui. Votre numéro peut être redirigé vers VOXO AI sans changer vos habitudes.",
        ],
        [
          "L’IA peut-elle prendre des rendez-vous ?",
          "Oui. Elle peut vérifier les disponibilités et créer un rendez-vous selon vos règles.",
        ],
        [
          "Est-ce personnalisable ?",
          "Oui. Le vocabulaire, les réponses, les horaires et les scénarios sont adaptés à votre entreprise.",
        ],
        [
          "Y a-t-il un engagement ?",
          "Les conditions finales seront précisées au lancement commercial. Le site est déjà prêt à intégrer la facturation Stripe.",
        ],
      ],
    },

    cta: {
      title: "Transformez vos appels en rendez-vous.",
      text: "Découvrez comment VOXO AI peut répondre pour votre entreprise.",
      button: "Réserver ma démonstration",
    },

    footer: {
      text: "Réception téléphonique intelligente pour les PME suisses.",
      legal: "Mentions légales",
      privacy: "Confidentialité",
    },
  },

  de: {
    nav: {
      solution: "Lösung",
      sectors: "Branchen",
      pricing: "Preise",
      demo: "Demo",
      contact: "Kontakt",
      cta: "Demo buchen",
    },

    hero: {
      badge: "KI-Rezeptionistin für Schweizer Unternehmen",
      title1: "Verpassen Sie",
      title2: "keinen Anruf.",
      text: "VOXO AI antwortet rund um die Uhr, qualifiziert Interessenten und bucht Termine direkt in Ihrem Kalender.",
      demo: "Demo testen",
      call: "Gespräch buchen",
      proof:
        "Schnelle Einrichtung · Natürliche Stimme · Schweizer Support",
    },

    how: {
      eyebrow: "EINFACH UND EFFEKTIV",
      title: "Vom Anruf zum Termin – automatisch.",
      text: "Ihr Team behält die Kontrolle. VOXO AI erledigt den Rest.",
      items: [
        [
          "01",
          "Der Kunde ruft an",
          "Ihre Nummer bleibt gleich oder wird an VOXO AI weitergeleitet.",
        ],
        [
          "02",
          "Die KI antwortet",
          "Sie versteht die Anfrage, beantwortet Fragen und qualifiziert den Bedarf.",
        ],
        [
          "03",
          "Der Termin wird erstellt",
          "Verfügbarkeiten werden geprüft und der Kalender aktualisiert.",
        ],
      ],
    },

    sectors: {
      eyebrow: "FÜR IHRE BRANCHE",
      title: "Eine KI für Ihren Arbeitsalltag.",
      items: [
        "Garagen",
        "Handwerker",
        "Immobilienverwaltungen",
        "Salons",
        "Restaurants & Hotels",
        "Reinigung & Dienstleistungen",
      ],
    },

    benefits: {
      eyebrow: "WARUM VOXO AI",
      title: "Mehr Kunden. Weniger Unterbrechungen.",
      items: [
        [
          "24/7 erreichbar",
          "Jeder Anruf wird beantwortet – auch abends und am Wochenende.",
        ],
        [
          "Kalender synchronisiert",
          "Verbindung mit Google Calendar und Ihren Geschäftstools.",
        ],
        [
          "Natürliche Gespräche",
          "Eine professionelle Stimme, abgestimmt auf Ihr Unternehmen.",
        ],
        [
          "Klare Daten",
          "Anrufe, Anfragen, Buchungen und Chancen im Blick behalten.",
        ],
      ],
    },

    pricing: {
      eyebrow: "KLARE PREISE",
      title: "Wählen Sie das passende Angebot für Ihr Unternehmen.",
      monthly: "/Monat",
      popular: "Am beliebtesten",
      start: "Starten",
      plans: [
        {
          name: "CORE",
          price: "249 CHF",
          desc: "Für Selbständige und kleine Unternehmen.",
          features: [
            "KI-Telefonannahme rund um die Uhr",
            "Eingehende Anrufe",
            "Kundenfragen beantworten",
            "Automatische Terminbuchung",
            "Kalender-Verfügbarkeiten",
            "Terminänderung / Stornierung",
            "SMS-Bestätigung",
            "1 Mitarbeiter",
            "1 Kalenderverbindung",
            "300 KI-Minuten inklusive",
            "200 SMS inklusive",
            "Basis-Dashboard",
            "Standard-Support",
          ],
        },
        {
          name: "PRO",
          price: "549 CHF",
          desc: "Für Unternehmen mit höheren Automatisierungsanforderungen.",
          features: [
            "Alle CORE-Funktionen",
            "Bis zu 5 Mitarbeiter",
            "Bis zu 5 Kalenderverbindungen",
            "1.000 KI-Minuten inklusive",
            "750 SMS inklusive",
            "CRM",
            "Kundenprofile",
            "Kundenhistorie",
            "Automatische Anrufzusammenfassungen",
            "Lead-Qualifizierung",
            "Automatische Erinnerungen",
            "Erweiterte Workflows",
            "Erweitertes Dashboard",
            "Priorisierter Support",
          ],
        },
      ],
    },

    faq: {
      eyebrow: "HÄUFIGE FRAGEN",
      title: "Alles Wichtige auf einen Blick.",
      items: [
        [
          "Kann ich meine Nummer behalten?",
          "Ja. Ihre bestehende Nummer kann an VOXO AI weitergeleitet werden.",
        ],
        [
          "Kann die KI Termine buchen?",
          "Ja. Sie prüft Verfügbarkeiten und erstellt Termine nach Ihren Regeln.",
        ],
        [
          "Ist alles anpassbar?",
          "Ja. Sprache, Antworten, Zeiten und Abläufe werden auf Ihr Unternehmen abgestimmt.",
        ],
        [
          "Gibt es eine Bindung?",
          "Die finalen Bedingungen werden zum Marktstart festgelegt. Stripe ist technisch vorbereitet.",
        ],
      ],
    },

    cta: {
      title: "Machen Sie aus Anrufen neue Termine.",
      text: "Erleben Sie, wie VOXO AI für Ihr Unternehmen antwortet.",
      button: "Demo vereinbaren",
    },

    footer: {
      text: "Intelligente Telefonannahme für Schweizer KMU.",
      legal: "Impressum",
      privacy: "Datenschutz",
    },
  },

  en: {
    nav: {
      solution: "Solution",
      sectors: "Industries",
      pricing: "Pricing",
      demo: "Demo",
      contact: "Contact",
      cta: "Book a demo",
    },

    hero: {
      badge: "AI receptionist built for Swiss businesses",
      title1: "Never miss",
      title2: "another call.",
      text: "VOXO AI answers 24/7, qualifies prospects and books appointments directly into your calendar.",
      demo: "Try the demo",
      call: "Book a call",
      proof: "Fast setup · Natural voice · Swiss support",
    },

    how: {
      eyebrow: "SIMPLE AND EFFECTIVE",
      title: "From call to appointment, automatically.",
      text: "Your team stays in control. VOXO AI handles the rest.",
      items: [
        [
          "01",
          "The customer calls",
          "Keep your current number or forward it to VOXO AI.",
        ],
        [
          "02",
          "AI answers",
          "It understands the request, answers questions and qualifies the need.",
        ],
        [
          "03",
          "The appointment is booked",
          "Availability is checked and your calendar updates in real time.",
        ],
      ],
    },

    sectors: {
      eyebrow: "BUILT FOR YOUR BUSINESS",
      title: "AI adapted to your daily operations.",
      items: [
        "Garages",
        "Tradespeople",
        "Property managers",
        "Salons",
        "Restaurants & Hotels",
        "Cleaning & Services",
      ],
    },

    benefits: {
      eyebrow: "WHY VOXO AI",
      title: "More customers. Fewer interruptions.",
      items: [
        [
          "Available 24/7",
          "Every caller gets an answer, including evenings and weekends.",
        ],
        [
          "Synced calendar",
          "Connect with Google Calendar and your business tools.",
        ],
        [
          "Natural conversation",
          "A professional voice tailored to your business.",
        ],
        [
          "Actionable data",
          "Track calls, requests, bookings and opportunities.",
        ],
      ],
    },

    pricing: {
      eyebrow: "CLEAR PRICING",
      title: "Choose the right plan for your business.",
      monthly: "/month",
      popular: "Most popular",
      start: "Get started",
      plans: [
        {
          name: "CORE",
          price: "249 CHF",
          desc: "For independent professionals and small businesses.",
          features: [
            "24/7 AI call handling",
            "Incoming calls",
            "Customer questions",
            "Automatic appointment booking",
            "Calendar availability",
            "Appointment changes / cancellations",
            "SMS confirmations",
            "1 team member",
            "1 calendar connection",
            "300 AI minutes included",
            "200 SMS included",
            "Basic dashboard",
            "Standard support",
          ],
        },
        {
          name: "PRO",
          price: "549 CHF",
          desc: "For businesses that want more advanced customer service automation.",
          features: [
            "Everything included in CORE",
            "Up to 5 team members",
            "Up to 5 calendar connections",
            "1,000 AI minutes included",
            "750 SMS included",
            "CRM",
            "Customer profiles",
            "Customer history",
            "Automatic call summaries",
            "Lead qualification",
            "Automatic reminders",
            "Advanced workflows",
            "Advanced dashboard",
            "Priority support",
          ],
        },
      ],
    },

    faq: {
      eyebrow: "FAQ",
      title: "Everything you need to know.",
      items: [
        [
          "Can I keep my number?",
          "Yes. Your existing number can be forwarded to VOXO AI.",
        ],
        [
          "Can the AI book appointments?",
          "Yes. It checks availability and creates bookings according to your rules.",
        ],
        [
          "Is it customizable?",
          "Yes. Vocabulary, answers, opening hours and workflows are tailored to your business.",
        ],
        [
          "Is there a commitment?",
          "Final commercial terms will be published at launch. The product is ready for Stripe integration.",
        ],
      ],
    },

    cta: {
      title: "Turn calls into booked appointments.",
      text: "See how VOXO AI can answer for your business.",
      button: "Book my demonstration",
    },

    footer: {
      text: "Intelligent call handling for Swiss small businesses.",
      legal: "Legal notice",
      privacy: "Privacy",
    },
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}