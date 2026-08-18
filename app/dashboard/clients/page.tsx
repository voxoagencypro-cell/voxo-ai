import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/admin";
import Sidebar from "@/components/dashboard/Sidebar";

type Client = {
  id: number;
  created_at: string | null;
  company_id: number | null;
  full_name: string | null;
  phone: string | null;
  email: string | null;
};

type Company = {
  id: number;
  name: string | null;
};

type AiCall = {
  id: number;
  created_at: string | null;
  client_id: number | null;
};

type ClientSummary = Client & {
  company: Company | null;
  callCount: number;
  lastCallAt: string | null;
};

export default async function ClientsPage() {
  const { data: clientsData, error: clientsError } =
    await supabaseAdmin
      .from("clients")
      .select(`
        id,
        created_at,
        company_id,
        full_name,
        phone,
        email
      `)
      .order("created_at", { ascending: false });

  if (clientsError) {
    console.error(
      "Erreur récupération clients :",
      clientsError,
    );
  }

  const clients = (clientsData ?? []) as Client[];

  const companyIds = [
    ...new Set(
      clients
        .map((client) => client.company_id)
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

  const clientIds = clients.map((client) => client.id);

  let calls: AiCall[] = [];

  if (clientIds.length > 0) {
    const { data: callsData, error: callsError } =
      await supabaseAdmin
        .from("ai_calls")
        .select(`
          id,
          created_at,
          client_id
        `)
        .in("client_id", clientIds)
        .order("created_at", { ascending: false });

    if (callsError) {
      console.error(
        "Erreur récupération appels :",
        callsError,
      );
    } else {
      calls = (callsData ?? []) as AiCall[];
    }
  }

  const clientsWithSummary: ClientSummary[] =
    clients.map((client) => {
      const clientCalls = calls.filter(
        (call) => call.client_id === client.id,
      );

      const lastCallAt =
        clientCalls.find((call) => call.created_at)
          ?.created_at ?? null;

      return {
        ...client,

        company:
          companies.find(
            (company) =>
              company.id === client.company_id,
          ) ?? null,

        callCount: clientCalls.length,

        lastCallAt,
      };
    });

  return (
    <div className="flex min-h-screen bg-[#070B18] text-white">
      <Sidebar />

      <main className="min-w-0 flex-1 p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-blue-400">
              CRM
            </p>

            <h1 className="mt-2 text-5xl font-bold">
              Clients
            </h1>

            <p className="mt-3 text-slate-400">
              Retrouvez tous les clients enregistrés dans
              VOXO AI.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[.04] px-5 py-4">
            <p className="text-sm text-slate-400">
              Clients
            </p>

            <p className="mt-1 text-3xl font-bold">
              {clientsWithSummary.length}
            </p>
          </div>
        </div>

        <section className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#111827]">
          <div className="grid grid-cols-[1.2fr_1.2fr_1fr_.7fr_1fr] gap-4 border-b border-white/10 px-6 py-4 text-sm font-semibold text-slate-400">
            <span>Client</span>
            <span>Entreprise</span>
            <span>Contact</span>
            <span>Appels</span>
            <span>Dernier appel</span>
          </div>

          {clientsWithSummary.length > 0 ? (
            clientsWithSummary.map((client) => (
              <Link
                key={client.id}
                href={`/dashboard/clients/${client.id}`}
                className="grid grid-cols-[1.2fr_1.2fr_1fr_.7fr_1fr] gap-4 border-b border-white/5 px-6 py-5 transition hover:bg-white/[.04]"
              >
                <div>
                  <p className="font-semibold text-white">
                    {client.full_name ||
                      "Client inconnu"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {client.email ||
                      "E-mail non renseigné"}
                  </p>
                </div>

                <div className="text-slate-300">
                  {client.company?.name ||
                    (client.company_id
                      ? `Entreprise #${client.company_id}`
                      : "Non renseignée")}
                </div>

                <div className="text-slate-300">
                  {client.phone ||
                    "Téléphone non renseigné"}
                </div>

                <div>
                  <span className="inline-flex min-w-10 justify-center rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-sm font-semibold text-blue-300">
                    {client.callCount}
                  </span>
                </div>

                <div className="text-slate-300">
                  {formatDateTime(client.lastCallAt)}
                </div>
              </Link>
            ))
          ) : (
            <div className="px-6 py-16 text-center text-slate-400">
              Aucun client enregistré pour le moment.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function formatDateTime(
  value: string | null,
) {
  if (!value) {
    return "Aucun appel";
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