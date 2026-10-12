import { redirect } from "next/navigation";

/** Le calendrier opérationnel est exposé sous la route marketing locale. */
export default function DashboardCalendrierRedirect() {
  redirect("/fr/tarifs/calendrier");
}
