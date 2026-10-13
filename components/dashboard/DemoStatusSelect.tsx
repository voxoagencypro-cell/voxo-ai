"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type DemoStatus = "new" | "contacted" | "converted" | "closed";

type LeadSource = "demo_request" | "prospect_intake";

type Props = {
  id: number | string;
  status: DemoStatus;
  source: LeadSource;
};

export default function DemoStatusSelect({
  id,
  status,
  source,
}: Props) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [saving, setSaving] = useState(false);

  async function handleChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const newStatus = event.target.value as DemoStatus;

    setCurrentStatus(newStatus);
    setSaving(true);

    try {
      const response = await fetch("/api/demo-request-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status: newStatus,
          source,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      setCurrentStatus(status);
      alert("Impossible de modifier le statut.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={saving}
      className="rounded-xl border border-white/10 bg-[#111827] px-3 py-2 text-sm text-white outline-none disabled:opacity-50"
    >
      <option value="new">Nouveau</option>
      <option value="contacted">Contacté</option>
      <option value="converted">Converti</option>
      <option value="closed">Fermé</option>
    </select>
  );
}