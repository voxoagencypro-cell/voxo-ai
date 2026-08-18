import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/admin";

type Appointment = {
  id: number;
  created_at: string | null;
  company_id: number | null;
  client_id: number | null;
  service_name: string | null;
  employee_name: string | null;
  notes: string | null;
  clients:
    | {
        full_name: string | null;
      }
    | {
        full_name: string | null;
      }[]
    | null;
};

export default async function RecentAppointments() {
  const { data, error } = await supabaseAdmin
    .from("appointments")
    .select(`
      id,
      created_at,
      company_id,
      client_id,
      service_name,
      employee_name,
      notes,
      clients (
        full_name
      )
    `)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Erreur Supabase rendez-vous récents :", error);
  }

  const appointments = (data ?? []) as Appointment[];

  return (
    <section className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#111827]">
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 px-6 py-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Derniers rendez-vous
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Les derniers rendez-vous enregistrés par VOXO AI.
          </p>
        </div>

        <Link
          href="/dashboard/rendez-vous"
          className="inline-flex w-fit items-center rounded-xl border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20 hover:text-white"
        >
          Voir tous les rendez-vous
          <span className="ml-2">→</span>
        </Link>
      </div>

      {appointments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[.02] text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Entreprise</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Employé</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Heure</th>
                <th className="px-6 py-4">Notes</th>
                <th className="px-6 py-4 text-right">Détails</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => {
                const clientName = getClientName(appointment.clients);

                return (
                  <tr
                    key={appointment.id}
                    className="border-b border-white/5 transition hover:bg-white/[.035]"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-blue-400/20 bg-blue-500/10 text-sm font-bold text-blue-300">
                          {getInitials(clientName)}
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            {clientName || "Client inconnu"}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Client #{appointment.client_id ?? "—"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-300">
                      {appointment.company_id
                        ? `Entreprise #${appointment.company_id}`
                        : "Non renseignée"}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-300">
                      {appointment.service_name || "Non renseigné"}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-300">
                      {appointment.employee_name || "Non attribué"}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-300">
                      {formatDate(appointment.created_at)}
                    </td>

                    <td className="px-6 py-5 text-sm font-semibold text-white">
                      {formatTime(appointment.created_at)}
                    </td>

                    <td className="max-w-[250px] truncate px-6 py-5 text-sm text-slate-400">
                      {appointment.notes || "—"}
                    </td>

                    <td className="px-6 py-5 text-right">
                      <Link
                        href={`/dashboard/appels/${appointment.id}`}
                        className="inline-flex items-center rounded-xl border border-white/10 bg-white/[.04] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-400/20 hover:bg-blue-500/10 hover:text-white"
                      >
                        Ouvrir
                        <span className="ml-2 text-blue-400">→</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-6 py-16 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-blue-400/15 bg-blue-500/10 text-2xl">
            📅
          </div>

          <h3 className="mt-5 text-lg font-semibold text-white">
            Aucun rendez-vous
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Les nouveaux rendez-vous apparaîtront automatiquement ici.
          </p>
        </div>
      )}
    </section>
  );
}

function getClientName(
  clients:
    | {
        full_name: string | null;
      }
    | {
        full_name: string | null;
      }[]
    | null,
) {
  if (!clients) {
    return null;
  }

  if (Array.isArray(clients)) {
    return clients[0]?.full_name ?? null;
  }

  return clients.full_name;
}

function getInitials(name: string | null) {
  if (!name?.trim()) {
    return "?";
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function formatDate(value: string | null) {
  if (!value) {
    return "Date inconnue";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date inconnue";
  }

  return new Intl.DateTimeFormat("fr-CH", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatTime(value: string | null) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("fr-CH", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}