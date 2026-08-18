import Sidebar from "@/components/dashboard/Sidebar";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-[#070B18] text-white">
      <Sidebar />

      <main className="min-w-0 flex-1 p-8">
        <div>
          <p className="text-sm font-medium text-blue-400">
            Configuration
          </p>

          <h1 className="mt-2 text-5xl font-bold">
            Paramètres
          </h1>

          <p className="mt-3 text-slate-400">
            Configurez votre agent IA et les connexions de VOXO AI.
          </p>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-2">
          <SettingsCard
            title="Emma IA"
            description="Configuration générale de votre réceptionniste."
          >
            <Field
              label="Nom de l’agent"
              defaultValue="Emma"
            />

            <SelectField
              label="Langue"
              defaultValue="fr"
              options={[
                { value: "fr", label: "Français" },
                { value: "de", label: "Allemand" },
                { value: "it", label: "Italien" },
                { value: "en", label: "Anglais" },
              ]}
            />

            <SelectField
              label="Voix"
              defaultValue="female"
              options={[
                { value: "female", label: "Voix féminine" },
                { value: "male", label: "Voix masculine" },
              ]}
            />

            <TextAreaField
              label="Prompt système"
              defaultValue="Tu es Emma, la réceptionniste téléphonique de VOXO AI. Tu réponds avec professionnalisme, identifies le besoin du client et proposes un rendez-vous adapté."
            />
          </SettingsCard>

          <SettingsCard
            title="Retell AI"
            description="Connexion de l’agent téléphonique."
          >
            <Field
              label="API Key"
              placeholder="retell_..."
              type="password"
            />

            <Field
              label="Agent ID"
              placeholder="agent_..."
            />

            <Field
              label="Numéro de téléphone"
              placeholder="+41 22 000 00 00"
            />

            <ConnectionStatus
              label="Statut Retell"
              status="En attente"
              connected={false}
            />
          </SettingsCard>

          <SettingsCard
            title="Google Calendar"
            description="Synchronisation automatique des rendez-vous."
          >
            <Field
              label="Calendar ID"
              placeholder="example@group.calendar.google.com"
            />

            <SelectField
              label="Calendrier principal"
              defaultValue="principal"
              options={[
                {
                  value: "principal",
                  label: "Calendrier principal",
                },
                {
                  value: "patricia",
                  label: "Patricia",
                },
                {
                  value: "adriana",
                  label: "Adriana",
                },
              ]}
            />

            <ToggleRow
              label="Créer automatiquement les événements"
              description="Ajoute chaque rendez-vous VOXO AI dans Google Calendar."
              enabled
            />

            <ConnectionStatus
              label="Connexion Google"
              status="Non connecté"
              connected={false}
            />
          </SettingsCard>

          <SettingsCard
            title="Supabase"
            description="État de la base de données."
          >
            <Field
              label="URL du projet"
              defaultValue="Configurée dans .env.local"
              disabled
            />

            <Field
              label="Clé publique"
              defaultValue="Configurée dans .env.local"
              disabled
            />

            <ConnectionStatus
              label="Base de données"
              status="Connectée"
              connected
            />

            <ConnectionStatus
              label="Realtime"
              status="Connecté"
              connected
            />
          </SettingsCard>

          <SettingsCard
            title="n8n"
            description="Automatisations et webhooks."
          >
            <Field
              label="Webhook URL"
              placeholder="https://n8n.example.com/webhook/..."
            />

            <ToggleRow
              label="Activer les automatisations"
              description="Envoie les nouveaux appels et rendez-vous vers n8n."
              enabled={false}
            />

            <ConnectionStatus
              label="Connexion n8n"
              status="Non connecté"
              connected={false}
            />
          </SettingsCard>

          <SettingsCard
            title="Notifications"
            description="Choisissez les notifications à recevoir."
          >
            <ToggleRow
              label="Notifications par e-mail"
              description="Recevoir un résumé après chaque appel."
              enabled
            />

            <ToggleRow
              label="Nouveau rendez-vous"
              description="Recevoir une alerte lorsqu’un rendez-vous est créé."
              enabled
            />

            <ToggleRow
              label="Appel manqué"
              description="Recevoir une alerte lorsqu’un appel n’aboutit pas."
              enabled={false}
            />

            <ToggleRow
              label="Résumé quotidien"
              description="Recevoir les statistiques de la journée."
              enabled={false}
            />
          </SettingsCard>

          <SettingsCard
            title="Entreprise"
            description="Personnalisez le tableau de bord."
          >
            <Field
              label="Nom de l’entreprise"
              defaultValue="VOXO AI"
            />

            <Field
              label="E-mail"
              placeholder="contact@voxo-ai.ch"
              type="email"
            />

            <Field
              label="Téléphone"
              placeholder="+41 22 000 00 00"
            />

            <Field
              label="Site internet"
              placeholder="https://voxo-ai.ch"
            />
          </SettingsCard>

          <SettingsCard
            title="Sécurité"
            description="Accès et protection du compte."
          >
            <ToggleRow
              label="Authentification à deux facteurs"
              description="Ajoute une protection supplémentaire au compte."
              enabled={false}
            />

            <ToggleRow
              label="Alertes de connexion"
              description="Recevoir un e-mail lors d’une nouvelle connexion."
              enabled
            />

            <button
              type="button"
              className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-left text-sm font-semibold text-red-300 transition hover:bg-red-400/15"
            >
              Déconnecter toutes les sessions
            </button>
          </SettingsCard>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Enregistrer les modifications
          </button>
        </div>
      </main>
    </div>
  );
}

type SettingsCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

function SettingsCard({
  title,
  description,
  children,
}: SettingsCardProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111827] p-6">
      <h2 className="text-xl font-bold">
        {title}
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>

      <div className="mt-6 space-y-5">
        {children}
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
};

function Field({
  label,
  defaultValue,
  placeholder,
  type = "text",
  disabled = false,
}: FieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-300">
        {label}
      </span>

      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 disabled:cursor-not-allowed disabled:text-slate-500"
      />
    </label>
  );
}

type TextAreaFieldProps = {
  label: string;
  defaultValue?: string;
};

function TextAreaField({
  label,
  defaultValue,
}: TextAreaFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-300">
        {label}
      </span>

      <textarea
        defaultValue={defaultValue}
        rows={6}
        className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 leading-7 text-white outline-none transition focus:border-blue-500"
      />
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  defaultValue: string;
  options: Array<{
    value: string;
    label: string;
  }>;
};

function SelectField({
  label,
  defaultValue,
  options,
}: SelectFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-300">
        {label}
      </span>

      <select
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-xl border border-white/10 bg-[#0B1120] px-4 py-3 text-white outline-none transition focus:border-blue-500"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

type ToggleRowProps = {
  label: string;
  description: string;
  enabled: boolean;
};

function ToggleRow({
  label,
  description,
  enabled,
}: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-2xl border border-white/[.07] bg-black/10 p-4">
      <div>
        <p className="font-semibold text-white">
          {label}
        </p>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        aria-label={label}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          enabled ? "bg-blue-600" : "bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

type ConnectionStatusProps = {
  label: string;
  status: string;
  connected: boolean;
};

function ConnectionStatus({
  label,
  status,
  connected,
}: ConnectionStatusProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/[.07] bg-black/10 p-4">
      <div className="flex items-center gap-3">
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            connected ? "bg-emerald-400" : "bg-amber-400"
          }`}
        />

        <p className="font-semibold text-white">
          {label}
        </p>
      </div>

      <span
        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
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