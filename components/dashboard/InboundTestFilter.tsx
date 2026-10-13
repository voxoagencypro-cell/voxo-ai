import Link from "next/link";

type Props = {
  showTests: boolean;
};

export default function InboundTestFilter({ showTests }: Props) {
  const href = showTests
    ? "/dashboard/demandes-demo"
    : "/dashboard/demandes-demo?showTests=1";

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
        showTests
          ? "border-amber-400/30 bg-amber-400/10 text-amber-200"
          : "border-white/10 bg-white/[.04] text-slate-300 hover:bg-white/[.08]"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${showTests ? "bg-amber-400" : "bg-slate-500"}`}
        aria-hidden
      />
      {showTests ? "Masquer les tests" : "Afficher les tests"}
    </Link>
  );
}
