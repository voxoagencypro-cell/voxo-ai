import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/dashboard/Sidebar";
import DemoStatusSelect from "@/components/dashboard/DemoStatusSelect";

type DemoRequest = {
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
};

export default async function DemoRequestsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmail =
    process.env.VOXO_ADMIN_EMAIL
      ?.trim()
      .toLowerCase();

  const userEmail =
    user?.email
      ?.trim()
      .toLowerCase();

  if (
    !userEmail ||
    !adminEmail ||
    userEmail !== adminEmail
  ) {
    redirect("/dashboard");
  }

  const { data, error } = await supabaseAdmin
    .from("demo_requests")
    .select(`
      id,
      name,
      company,
      phone,
      email,
      sector,
      message,
      locale,
      status,
      created_at
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(
      "Erreur récupération demandes de démo :",
      error,
    );
  }

  const requests = (data ?? []) as DemoRequest[];

  const newRequests = requests.filter(
    (request) =>
      !request.status ||
      request.status === "new",
  ).length;

  return (
    <div className="flex min-h-screen bg-[#070B18] text-white">
      <Sidebar />

      <main className="min-w-0 flex-1 p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-blue-400">
              ADMIN VOXO
            </p>

            <h1 className="mt-2 text-5xl font-bold">
              Demandes de démo
            </h1>

            <p className="mt-3 text-slate-400">
              Retrouvez toutes les entreprises ayant demandé
              une démonstration VOXO AI.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[.04] px-5 py-4">
              <p className="text-sm text-slate-400">
                Total
              </p>

              <p className="mt-1 text-3xl font-bold">
                {requests.length}
              </p>
            </div>

            <div className="rounded-2xl border border-blue-400/20 bg-blue-400/10 px-5 py-4">
              <p className="text-sm text-blue-300">
                Nouvelles
              </p>

              <p className="mt-1 text-3xl font-bold text-blue-300">
                {newRequests}
              </p>
            </div>
          </div>
        </div>

        <section className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#111827]">
          <div className="grid grid-cols-[1.1fr_1.1fr_.9fr_1fr_.8fr_.9fr_1fr] gap-4 border-b border-white/10 px-6 py-4 text-sm font-semibold text-slate-400">
            <span>Contact</span>
            <span>Entreprise</span>
            <span>Téléphone</span>
            <span>Secteur</span>
            <span>Statut</span>
            <span>Date</span>
            <span>Actions</span>
          </div>

          {requests.length > 0 ? (
            requests.map((request) => (
              <div
                key={request.id}
                className="grid grid-cols-[1.1fr_1.1fr_.9fr_1fr_.8fr_.9fr_1fr] gap-4 border-b border-white/5 px-6 py-5 transition hover:bg-white/[.04]"
              >
                <div>
                  <p className="font-semibold text-white">
                    {request.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {request.email}
                  </p>
                </div>

                <div className="text-slate-300">
                  {request.company}
                </div>

                <div className="text-slate-300">
                  {request.phone}
                </div>

                <div className="text-slate-300">
                  {request.sector}
                </div>

                <div>
                  <DemoStatusSelect
                    id={request.id}
                    status={
                      request.status === "contacted" ||
                      request.status === "converted" ||
                      request.status === "closed"
                        ? request.status
                        : "new"
                    }
                  />
                </div>

                <div className="text-slate-300">
                  {formatDateTime(request.created_at)}
                </div>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={`tel:${request.phone}`}
                    className="inline-flex items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-400/20"
                  >
                    Appeler
                  </a>

                  <a
                    href={`mailto:${request.email}?subject=${encodeURIComponent(
                      "Votre demande de démonstration VOXO AI"
                    )}`}
                    className="inline-flex items-center justify-center rounded-lg border border-blue-400/20 bg-blue-400/10 px-3 py-2 text-xs font-semibold text-blue-300 transition hover:bg-blue-400/20"
                  >
                    E-mail
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-16 text-center text-slate-400">
              Aucune demande de démo pour le moment.
            </div>
          )}
        </section>

        {requests.length > 0 && (
          <section className="mt-8 grid gap-4">
            {requests.map((request) => (
              <div
                key={`details-${request.id}`}
                className="rounded-2xl border border-white/10 bg-white/[.03] p-6"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <p className="text-lg font-semibold">
                      {request.name} — {request.company}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {request.email} • {request.phone}
                    </p>
                  </div>

                  <span className="text-sm text-slate-500">
                    {formatDateTime(request.created_at)}
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-medium text-slate-400">
                    Besoin exprimé
                  </p>

                  <p className="mt-2 leading-7 text-slate-300">
                    {request.message ||
                      "Aucun message renseigné."}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`tel:${request.phone}`}
                    className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
                  >
                    Appeler {request.name}
                  </a>

                  <a
                    href={`mailto:${request.email}?subject=${encodeURIComponent(
                      "Votre demande de démonstration VOXO AI"
                    )}`}
                    className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    Envoyer un e-mail
                  </a>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

function formatDateTime(
  value: string | null,
) {
  if (!value) {
    return "Date inconnue";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date inconnue";
  }

  return new Intl.DateTimeFormat("fr-CH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}