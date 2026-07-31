"use client";

import { motion } from "framer-motion";
import { BatteryFull, Mic, Signal, Sparkles, Wifi } from "lucide-react";

const levels = [22, 40, 56, 34, 68, 46, 78, 52, 64, 42, 72, 50, 36, 58, 30, 66, 44];

export function PhoneDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 5 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[430px]"
    >
      <motion.div
        aria-hidden
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.96, 1.05, 0.96] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-12 rounded-full bg-brand-500/25 blur-[90px]"
      />

      <div className="relative rounded-[64px] border border-white/25 bg-gradient-to-br from-zinc-300 via-zinc-600 to-zinc-950 p-[3px] shadow-[0_40px_120px_rgba(0,90,255,.35)]">
        <div className="relative min-h-[640px] overflow-hidden rounded-[61px] border border-black bg-[#020714] px-6 pb-7 pt-4">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(36,109,255,.22),transparent_34%),linear-gradient(180deg,rgba(255,255,255,.035),transparent_28%)]" />

          <div className="relative z-10 flex items-center justify-between px-1 text-[11px] font-semibold text-white/85">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Signal size={13} strokeWidth={2.5} />
              <Wifi size={13} strokeWidth={2.5} />
              <BatteryFull size={15} strokeWidth={2.5} />
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-1 h-7 w-28 rounded-full bg-black shadow-inner" />

          <div className="relative z-10 mt-8 text-center">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(45,114,255,.15)",
                  "0 0 0 18px rgba(45,114,255,0)",
                  "0 0 0 0 rgba(45,114,255,0)",
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-brand-gradient shadow-[0_18px_55px_rgba(35,104,255,.38)]"
            >
              <Sparkles size={28} className="text-white" />
            </motion.div>

            <h3 className="mt-5 text-3xl font-semibold italic tracking-tight text-white">
              VOXO <span className="text-brand-400">AI</span>
            </h3>
            <p className="mt-1 text-sm text-zinc-400">Réceptionniste IA</p>

            <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,.85)]" />
              En ligne
            </span>
          </div>

          <div className="relative z-10 mt-9 flex h-20 items-center justify-center gap-1.5">
            {levels.map((height, index) => (
              <motion.span
                key={index}
                className="w-[5px] rounded-full bg-gradient-to-t from-brand-600 via-brand-400 to-cyan-300 shadow-[0_0_14px_rgba(59,130,246,.75)]"
                animate={{
                  height: [height * 0.55, height, height * 0.7, height * 0.95, height * 0.55],
                  opacity: [0.55, 1, 0.72, 0.95, 0.55],
                }}
                transition={{
                  duration: 1.2 + (index % 4) * 0.12,
                  repeat: Infinity,
                  delay: index * 0.045,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="relative z-10 mt-8 space-y-4 text-[13px] leading-relaxed">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
              className="mr-10 rounded-2xl rounded-bl-md border border-white/[.07] bg-white/[.07] p-4 text-zinc-100 shadow-lg backdrop-blur"
            >
              Bonjour, Garage Martin.
              <br />
              Comment puis-je vous aider ?
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.72 }}
              className="ml-10 rounded-2xl rounded-br-md bg-brand-gradient p-4 text-white shadow-[0_18px_40px_rgba(29,96,255,.28)]"
            >
              Je voudrais prendre rendez-vous pour une vidange demain matin.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex items-center justify-center gap-2 pt-2 text-xs text-zinc-400"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-500" />
              </span>
              VOXO vérifie les disponibilités...
            </motion.div>
          </div>

          <div className="absolute inset-x-0 bottom-7 z-10 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="grid h-14 w-14 place-items-center rounded-full border border-brand-300/30 bg-brand-gradient text-white shadow-[0_0_40px_rgba(37,99,235,.55)]"
            >
              <Mic size={24} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}