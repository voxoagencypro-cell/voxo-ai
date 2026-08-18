import { supabaseAdmin } from "@/lib/supabase/admin";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentAppointments from "@/components/dashboard/RecentAppointments";
import RealtimeRefresh from "@/components/dashboard/RealtimeRefresh";

export default async function DashboardPage() {
  const { data: appointments, error } = await supabaseAdmin
    .from("appointments")
    .select("id, client_id");

  if (error) {
    console.error("Erreur Supabase dashboard :", error);
  }

  const totalAppointments = appointments?.length ?? 0;

  const uniqueClients = new Set(
    appointments
      ?.map((appointment) => appointment.client_id)
      .filter((clientId) => clientId !== null && clientId !== undefined),
  ).size;

  return (
    <div className="flex min-h-screen bg-[#070B18] text-white">
      <RealtimeRefresh />

      <Sidebar />

      <main className="min-w-0 flex-1 p-8">
        <h1 className="mb-10 text-5xl font-bold">
          Dashboard VOXO AI
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Appels"
            value={String(totalAppointments)}
            subtitle="Simulations enregistrées"
          />

          <StatsCard
            title="Rendez-vous"
            value={String(totalAppointments)}
            subtitle="Supabase"
          />

          <StatsCard
            title="Clients"
            value={String(uniqueClients)}
            subtitle="Clients uniques"
          />

          <StatsCard
            title="Agents IA"
            value="1"
            subtitle="En ligne"
          />
        </div>

        <RecentAppointments />
      </main>
    </div>
  );
}