import { redirect } from "next/navigation";
import { getVerifiedUser } from "@/lib/dashboard-auth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getVerifiedUser();

  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}