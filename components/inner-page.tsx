import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MarketingEyebrow,
  MarketingH1,
  MarketingLead,
} from "@/components/marketing-primitives";

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
    <main className={`min-h-screen bg-[#02050b] ${compactTop ? "pt-8" : "pt-[72px] sm:pt-20"}`}>
      <section className="relative overflow-hidden border-b border-white/[.07] px-5 py-12 sm:py-14 lg:px-8 lg:py-16">
        <div className="absolute left-1/2 top-0 h-64 w-2/3 max-w-3xl -translate-x-1/2 bg-brand-500/[.07] blur-[100px]" />
        <div className="relative mx-auto max-w-5xl">
          <Button href={`/${locale}`} variant="ghost" className="-ml-2 h-10 text-sm">
            <ArrowLeft className="mr-2" size={16} />
            VOXO AI
          </Button>
          <MarketingEyebrow>{eyebrow}</MarketingEyebrow>
          <MarketingH1 className="mt-3 max-w-3xl">{title}</MarketingH1>
          <MarketingLead>{text}</MarketingLead>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-5 py-12 sm:py-14 lg:px-8">
        {children}
      </section>
    </main>
  );
}
