import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MarketingEyebrow,
  MarketingH1,
  MarketingLead,
} from "@/components/marketing-primitives";
import { VoxoContainer } from "@/components/voxo/container";

export function InnerPage({
  locale,
  eyebrow,
  title,
  text,
  children,
  compactTop = false,
}: {
  locale: string;
  eyebrow: string;
  title: string;
  text: string;
  children: React.ReactNode;
  compactTop?: boolean;
}) {
  return (
    <main className={`min-h-screen ${compactTop ? "pt-8" : "pt-[72px] sm:pt-[78px]"}`}>
      <section className="relative overflow-hidden border-b border-white/[0.07] py-12 sm:py-14 lg:py-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[min(100%,42rem)] -translate-x-1/2 bg-brand-500/[0.08] blur-[100px]" />
        <VoxoContainer className="relative">
          <Button href={`/${locale}`} variant="ghost" className="-ml-2 h-10 text-sm">
            <ArrowLeft className="mr-2" size={16} />
            VOXO AI
          </Button>
          <MarketingEyebrow>{eyebrow}</MarketingEyebrow>
          <MarketingH1 className="mt-3 max-w-3xl">{title}</MarketingH1>
          <MarketingLead>{text}</MarketingLead>
        </VoxoContainer>
      </section>
      <VoxoContainer className="py-12 sm:py-14">{children}</VoxoContainer>
    </main>
  );
}
