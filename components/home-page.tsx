"use client";

import { useState } from "react";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Headphones,
  Hammer,
  HeartPulse,
  MessageSquareText,
  Quote,
  PhoneCall,
  Play,
  RotateCcw,
  Scissors,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Wrench,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PhoneDemo } from "@/components/phone-demo";
import { Reveal } from "@/components/reveal";
import type { Locale } from "@/lib/i18n";

export function HomePage({ locale, d }: { locale: Locale; d: any }) {
  const [demoScenario, setDemoScenario] = useState(0);

  const stepIcons = [PhoneCall, MessageSquareText, CalendarDays, CheckCircle2];
  const sectorIcons = [Wrench, Building2, Building2, Scissors, Hammer];
  const demoActionIcons = [PhoneCall, MessageSquareText, CalendarDays, CheckCircle2];
  const activeDemo = d.demoInteractive.scenarios[demoScenario];

  return (
    <main className="overflow-hidden bg-[#02050b]">
      <section className="hero-noise relative min-h-[900px] overflow-hidden border-b border-white/[.08] pt-[82px]">
        <div className="hero-grid absolute inset-0" />

        <motion.div
          aria-hidden
          animate={{
            opacity: [0.18, 0.34, 0.18],
            scale: [0.96, 1.05, 0.96],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[47%] top-20 h-[660px] w-[760px] rounded-full bg-brand-600/[.20] blur-[160px]"
        />

        <motion.div
          aria-hidden
          animate={{ x: [-14, 14, -14], opacity: [0.28, 0.62, 0.28] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="voice-wave absolute left-[40%] top-[315px] h-[260px] w-[54%]"
        />

        <div className="relative mx-auto grid max-w-[1480px] gap-12 px-5 pb-12 pt-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-10 lg:pb-10 lg:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="relative z-20 max-w-[720px] pb-2 lg:pb-10"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[.11] bg-white/[.045] px-4 py-2 text-xs font-semibold tracking-wide text-zinc-200 shadow-[0_10px_45px_rgba(0,0,0,.22)] backdrop-blur-xl">
              <span>🇨🇭</span>
              {d.hero.badge}
            </div>

            <h1 className="mt-7 text-balance text-5xl font-semibold leading-[.96] tracking-[-.055em] sm:text-7xl lg:text-[72px] xl:text-[82px]">
              {d.hero.title1}
              <br />
              <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-blue-600 bg-clip-text text-transparent">
                {d.hero.title2}
              </span>
            </h1>

            <p className="mt-7 max-w-[650px] text-lg leading-8 text-zinc-300 sm:text-xl">
              {d.hero.text}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                href={`/${locale}/demo`}
                className="h-14 px-8 text-base shadow-[0_18px_55px_rgba(24,94,255,.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(24,94,255,.48)]"
              >
                <Play className="mr-2 fill-current" size={17} />
                {d.hero.demo}
              </Button>

              <Button
                href="#tarifs"
                variant="outline"
                className="h-14 px-8 text-base backdrop-blur-xl transition hover:-translate-y-0.5"
              >
                {d.hero.offers}
              </Button>
            </div>

            <div className="mt-8 grid max-w-[650px] gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/[.09] bg-white/[.035] px-4 py-4 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-brand-400">
                  <Clock3 size={17} />
                  <span className="text-sm font-semibold text-white">{d.hero.cards[0][0]}</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-zinc-400">
                  {d.hero.cards[0][1]}
                </p>
              </div>

              <div className="rounded-2xl border border-white/[.09] bg-white/[.035] px-4 py-4 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-brand-400">
                  <CalendarDays size={17} />
                  <span className="text-sm font-semibold text-white">{d.hero.cards[1][0]}</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-zinc-400">
                  {d.hero.cards[1][1]}
                </p>
              </div>

              <div className="rounded-2xl border border-white/[.09] bg-white/[.035] px-4 py-4 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-brand-400">
                  <ShieldCheck size={17} />
                  <span className="text-sm font-semibold text-white">{d.hero.cards[2][0]}</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-zinc-400">
                  {d.hero.cards[2][1]}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 46, rotate: 1.5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{
              duration: 0.95,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 flex min-h-[610px] items-center justify-center lg:min-h-[680px]"
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-400/10 bg-brand-500/[.08] blur-2xl" />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative origin-center scale-[0.82] sm:scale-[0.88] lg:translate-x-8 lg:scale-[0.9] xl:translate-x-12 xl:scale-[0.94]"
            >
              <PhoneDemo />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="absolute right-2 top-24 hidden rounded-2xl border border-white/[.10] bg-[#07101b]/90 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,.38)] backdrop-blur-xl xl:block"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                  <span className="relative h-3 w-3 rounded-full bg-emerald-300" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {d.hero.online}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {d.hero.instant}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.05 }}
              className="absolute bottom-24 left-4 hidden rounded-2xl border border-white/[.10] bg-[#07101b]/90 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,.38)] backdrop-blur-xl xl:block"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300">
                  <CheckCircle2 size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {d.hero.confirmed}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {d.hero.tomorrow}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-8 right-8 hidden rounded-2xl border border-white/[.10] bg-[#07101b]/90 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,.38)] backdrop-blur-xl xl:block"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500/10 text-brand-300">
                  <Sparkles size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">4,9/5</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {d.hero.smooth}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative mx-auto max-w-[1480px] px-5 pb-7 lg:px-10">
          <div className="grid items-center gap-6 rounded-[24px] border border-white/[.09] bg-[#07101b]/88 px-7 py-6 shadow-[0_28px_80px_rgba(0,0,0,.35)] backdrop-blur-xl md:grid-cols-[1.2fr_repeat(4,1fr)]">
            <p className="text-sm leading-6 text-zinc-200">
              {d.hero.builtFor}
            </p>

            {d.hero.clientTypes.map((name: string) => (
              <div
                key={name}
                className="text-center text-sm font-semibold tracking-[.13em] text-zinc-400"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="solution" className="bg-[#f7f9fc] py-24 text-[#09101d]">
        <div className="mx-auto grid max-w-[1480px] gap-10 px-5 lg:grid-cols-[.8fr_1.55fr_.72fr] lg:px-10">
          <Reveal>
            <div>
              <p className="text-xs font-bold tracking-[.12em] text-brand-600">
                {d.how.eyebrow}
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {d.how.title}
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                {d.how.text}
              </p>

              <a
                href="#secteurs"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
              >
                {d.how.discover}
                <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>

          <div className="relative grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <div className="pointer-events-none absolute left-[8%] right-[8%] top-8 hidden h-px bg-gradient-to-r from-transparent via-brand-300/60 to-transparent xl:block" />

            {d.how.steps.map((step: string[], index: number) => {
              const Icon = stepIcons[index];
              const [title, stepText] = step;
              return (
              <Reveal key={title}>
                <div className="group relative text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-brand-200 bg-white text-brand-600 shadow-[0_16px_40px_rgba(37,99,235,.12)] transition duration-300 group-hover:-translate-y-1 group-hover:border-brand-400">
                    <Icon size={27} />
                  </div>

                  <h3 className="mt-5 font-semibold">{title}</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {stepText}
                  </p>
                </div>
              </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="rounded-[28px] border border-white/[.08] bg-[#07101b] p-7 text-white shadow-[0_24px_70px_rgba(0,0,0,.18)]">
              <h3 className="text-center font-semibold">
                {d.how.metricsTitle}
              </h3>

              <div className="mt-7 space-y-5">
                <Metric
                  icon={PhoneCall}
                  value={d.how.metrics[0][0]}
                  label={d.how.metrics[0][1]}
                />
                <Metric
                  icon={CalendarDays}
                  value={d.how.metrics[1][0]}
                  label={d.how.metrics[1][1]}
                />
                <Metric
                  icon={Clock3}
                  value={d.how.metrics[2][0]}
                  label={d.how.metrics[2][1]}
                />
              </div>

              <p className="mt-6 text-center text-[11px] leading-5 text-zinc-500">
                {d.how.metricsNote}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-[1480px] px-5 lg:px-10">
          <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
            <Trust
              icon={ShieldCheck}
              title={d.how.trust[0][0]}
              text={d.how.trust[0][1]}
            />
            <Trust
              icon={CheckCircle2}
              title={d.how.trust[1][0]}
              text={d.how.trust[1][1]}
            />
            <Trust
              icon={Headphones}
              title={d.how.trust[2][0]}
              text={d.how.trust[2][1]}
            />
            <Trust
              icon={Sparkles}
              title={d.how.trust[3][0]}
              text={d.how.trust[3][1]}
            />
          </div>
        </div>
      </section>

      <div className="relative h-36 overflow-hidden bg-gradient-to-b from-[#f7f9fc] via-white to-[#02050b]">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
      </div>

      <section id="secteurs" className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,93,255,.14),transparent_38%)]" />
        <div className="pointer-events-none absolute left-1/2 top-20 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand-600/[.08] blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Heading
              eyebrow={d.sectors.eyebrow}
              title={d.sectors.title}
              text={d.sectors.text}
            />

            <div className="max-w-sm rounded-2xl border border-white/[.08] bg-white/[.03] px-5 py-4 text-sm leading-6 text-zinc-400 backdrop-blur-xl">
              {d.sectors.note}
            </div>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {d.sectors.items.map((sector: any, index: number) => {
              const Icon = sectorIcons[index];
              const { title, description, bullets, example } = sector;

              return (
                <Reveal key={title}>
                  <motion.article
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="group relative h-full overflow-hidden rounded-[32px] border border-white/[.08] bg-[#07101b]/78 p-7 shadow-[0_28px_90px_rgba(0,0,0,.24)] backdrop-blur-xl"
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-500/0 blur-3xl transition duration-500 group-hover:bg-brand-500/25" />
                    <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/0 to-transparent transition duration-500 group-hover:via-brand-400/60" />

                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <span className="grid h-14 w-14 place-items-center rounded-2xl border border-brand-400/20 bg-brand-500/10 text-brand-400 shadow-[0_14px_40px_rgba(22,91,255,.16)] transition duration-300 group-hover:scale-105 group-hover:bg-brand-500/15">
                          <Icon size={27} />
                        </span>

                        <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[.08] px-3 py-1.5 text-[11px] font-medium text-emerald-300">
                          {d.sectors.available}
                        </span>
                      </div>

                      <h3 className="mt-7 text-2xl font-semibold text-white">
                        {title}
                      </h3>

                      <p className="mt-3 min-h-[72px] text-sm leading-6 text-zinc-400">
                        {description}
                      </p>

                      <div className="mt-6 rounded-2xl border border-white/[.07] bg-black/20 p-4">
                        <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[.14em] text-brand-400">
                          <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.7)]" />
                          {d.sectors.callExample}
                        </div>

                        <div className="mt-4 space-y-3">
                          <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-white/[.06] px-4 py-3 text-sm leading-6 text-zinc-300">
                            {example[0]}
                          </div>

                          <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-brand-500/15 px-4 py-3 text-sm leading-6 text-brand-100">
                            {example[1]}
                          </div>
                        </div>
                      </div>

                      <ul className="mt-6 space-y-3">
                      {bullets.map((item: string) => (
                          <li
                            key={item}
                            className="flex items-center gap-3 text-sm text-zinc-300"
                          >
                            <CheckCircle2
                              size={17}
                              className="shrink-0 text-brand-400"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <a
                        href={`/${locale}/demo`}
                        className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-400 transition duration-300 group-hover:gap-3"
                      >
                        {d.sectors.test}
                        <ArrowRight size={16} />
                      </a>
                    </div>
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="demo" className="relative overflow-hidden border-y border-white/[.07] bg-white/[.018] py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(30,93,255,.16),transparent_44%)]" />
        <div className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-brand-600/[.08] blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold tracking-[.22em] text-brand-400">
              {d.demoInteractive.eyebrow}
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-.035em] sm:text-6xl">
              {d.demoInteractive.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
              {d.demoInteractive.text}
            </p>
          </div>

          <div className="mx-auto mt-12 flex w-fit flex-wrap justify-center gap-2 rounded-2xl border border-white/[.08] bg-white/[.035] p-2 backdrop-blur-xl">
            {d.demoInteractive.scenarios.map((scenario: any, index: number) => (
              <button
                key={scenario.label}
                type="button"
                onClick={() => setDemoScenario(index)}
                className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  demoScenario === index
                    ? "bg-brand-gradient text-white shadow-[0_12px_35px_rgba(25,94,255,.30)]"
                    : "text-zinc-400 hover:bg-white/[.05] hover:text-white"
                }`}
              >
                {scenario.label}
              </button>
            ))}
          </div>

          <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-[1.08fr_.92fr]">
            <motion.div
              key={`${activeDemo.label}-call`}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-[34px] border border-white/[.09] bg-[#07101b]/90 p-6 shadow-[0_32px_110px_rgba(0,0,0,.35)] backdrop-blur-xl sm:p-8"
            >
              <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-brand-500/10 blur-3xl" />

              <div className="relative flex items-center justify-between gap-4 border-b border-white/[.08] pb-6">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-brand-400/20 bg-brand-500/10 text-brand-400">
                    <PhoneCall size={23} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-[.16em] text-brand-400">
                      {d.demoInteractive.liveCall}
                    </p>
                    <h3 className="mt-1 font-semibold text-white">
                      {activeDemo.company}
                    </h3>
                  </div>
                </div>

                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[.08] px-3 py-2 text-xs font-medium text-emerald-300">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </span>
                  {d.demoInteractive.conversation}
                </span>
              </div>

              <div className="relative mt-7 rounded-[26px] border border-white/[.07] bg-black/20 p-5 sm:p-6">
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>Emma IA</span>
                  <span>00:24</span>
                </div>

                <div className="mt-6 flex h-20 items-end justify-center gap-1.5">
                  {[28, 48, 66, 40, 76, 56, 82, 44, 70, 52, 64, 36].map(
                    (height, index) => (
                      <motion.span
                        key={index}
                        animate={{
                          height: [`${height * 0.55}%`, `${height}%`, `${height * 0.65}%`],
                        }}
                        transition={{
                          duration: 1.1 + index * 0.04,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-2 rounded-full bg-gradient-to-t from-brand-600 to-cyan-300 shadow-[0_0_16px_rgba(45,127,255,.32)]"
                      />
                    )
                  )}
                </div>

                <div className="mt-7 space-y-4">
                  <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-white/[.06] px-4 py-3 text-sm leading-6 text-zinc-300">
                    « {activeDemo.caller} »
                  </div>

                  <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-brand-500/15 px-4 py-3 text-sm leading-6 text-brand-100">
                    « {activeDemo.reply} »
                  </div>
                </div>
              </div>

              <div className="relative mt-5 rounded-2xl border border-emerald-400/15 bg-emerald-400/[.07] p-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300">
                    <CheckCircle2 size={19} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-emerald-200">
                      {d.demoInteractive.actionDone}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-zinc-400">
                      {activeDemo.result}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              key={`${activeDemo.label}-steps`}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-[34px] border border-white/[.09] bg-white/[.03] p-6 backdrop-blur-xl sm:p-8"
            >
              <p className="text-xs font-semibold tracking-[.18em] text-brand-400">
                {d.demoInteractive.whatAiDoes}
              </p>

              <div className="mt-7 space-y-3">
                {d.demoInteractive.actions.map((action: string[], index: number) => {
                  const Icon = demoActionIcons[index];
                  const [title, description] = action;
                  return (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * index }}
                    className="flex gap-4 rounded-2xl border border-white/[.07] bg-black/10 p-4"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brand-400/15 bg-brand-500/10 text-brand-400">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-zinc-500">
                        {description}
                      </p>
                    </div>
                  </motion.div>
                  );
                })}
              </div>

              <Button
                href={`/${locale}/demo`}
                className="mt-7 h-14 w-full text-base shadow-[0_18px_55px_rgba(24,94,255,.30)]"
              >
                <Play className="mr-2 fill-current" size={17} />
                {d.demoInteractive.realDemo}
              </Button>

              <p className="mt-4 text-center text-xs leading-5 text-zinc-500">
                {d.demoInteractive.retellNote}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Pricing locale={locale} d={d.pricing} />
      <Faq d={d.faq} />

      <section className="px-5 pb-24 lg:px-8">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[38px] border border-brand-400/25 bg-[radial-gradient(circle_at_50%_0%,rgba(23,104,255,.24),transparent_55%),#07101b] px-7 py-16 text-center shadow-glow sm:px-12 sm:py-24">
            <Sparkles className="mx-auto text-brand-400" />
            <h2 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              {d.cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">{d.cta.text}</p>
            <Button href={`/${locale}/contact`} className="mt-9">
              {d.cta.button}
              <ArrowRight className="ml-2" size={17} />
            </Button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function Metric({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  return (
    <div className="flex items-center gap-4 border-b border-white/[.08] pb-5 last:border-0 last:pb-0">
      <span className="grid h-10 w-10 place-items-center rounded-full border border-brand-400/35 bg-brand-500/10 text-brand-400">
        <Icon size={19} />
      </span>
      <div>
        <div className="text-2xl font-semibold text-brand-400">{value}</div>
        <p className="text-xs text-zinc-400">{label}</p>
      </div>
    </div>
  );
}

function Trust({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <div className="flex items-center gap-4">
      <Icon className="shrink-0 text-[#101827]" />
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 text-xs text-slate-500">{text}</p>
      </div>
    </div>
  );
}

function Heading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <Reveal>
      <p className="text-xs font-semibold tracking-[.22em] text-brand-400">{eyebrow}</p>
      <h2 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-[-.035em] sm:text-6xl">{title}</h2>
      {text && <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-500">{text}</p>}
    </Reveal>
  );
}

function Pricing({ locale, d }: { locale: Locale; d: any }) {
  return (
    <section
      id="tarifs"
      className="relative overflow-hidden border-y border-white/[.07] py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand-600/[.10] blur-[150px]" />

      <div className="relative mx-auto max-w-[1480px] px-5 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[.22em] text-brand-400">
            {d.eyebrow}
          </p>

          <h2 className="mx-auto mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-[-.035em] sm:text-5xl">
            {d.title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-400">
            {d.subtitle}
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {d.plans.map((p: any, i: number) => {
            const isPro = i === 1;
            const isCustom = i === 2;

            return (
              <Reveal key={p.name}>
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-[28px] border p-6 sm:p-7 ${
                    isPro
                      ? "border-brand-400/45 bg-[radial-gradient(circle_at_50%_0%,rgba(31,103,255,.18),transparent_48%),rgba(19,43,88,.34)] shadow-[0_30px_100px_rgba(24,94,255,.20)]"
                      : "border-white/[.09] bg-white/[.028]"
                  }`}
                >
                  {isPro && (
                    <span className="absolute right-5 top-5 rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold text-white shadow-[0_10px_35px_rgba(25,94,255,.35)]">
                      {d.popular}
                    </span>
                  )}

                  <p className="text-xs font-semibold tracking-[.14em] text-brand-400">
                    {d.labels[i]}
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold text-white">
                    {p.name}
                  </h3>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-zinc-400">
                    {p.desc}
                  </p>

                  <div className="mt-7 flex min-h-[58px] items-end gap-2">
                    <span
                      className={`font-semibold tracking-[-.04em] text-white ${
                        isCustom ? "text-4xl" : "text-5xl"
                      }`}
                    >
                      {p.price}
                    </span>

                    {!isCustom && (
                      <span className="pb-1.5 text-sm text-zinc-500">
                        {d.monthly}
                      </span>
                    )}
                  </div>

                  <div className="my-7 h-px bg-white/[.08]" />

                  <ul className="flex-1 space-y-2.5">
                    {p.features.map((feature: string) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-zinc-300"
                      >
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-400">
                          <Check size={13} strokeWidth={3} />
                        </span>

                        <span className="leading-5">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    href={
                      isCustom
                        ? `/${locale}/contact`
                        : `/${locale}/checkout?plan=${p.name.toLowerCase()}`
                    }
                    variant={isPro ? "brand" : "outline"}
                    className={`mt-7 h-12 w-full text-sm ${
                      isPro
                        ? "shadow-[0_18px_55px_rgba(24,94,255,.32)]"
                        : ""
                    }`}
                  >
                    {isCustom ? d.quote : d.start}
                    <ArrowRight className="ml-2" size={16} />
                  </Button>

                  <p className="mt-3 text-center text-[11px] text-zinc-500">
                    {d.notes[i]}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Faq({ d }: { d: any }) {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <Heading eyebrow={d.eyebrow} title={d.title} />
        <div className="mt-12 divide-y divide-white/[.08] border-y border-white/[.08]">
          {d.items.map((item: string[]) => (
            <details key={item[0]} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium">
                {item[0]}
                <span className="text-brand-400 transition group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-2xl pt-4 leading-7 text-zinc-500">{item[1]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}