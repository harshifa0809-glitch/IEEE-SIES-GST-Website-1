import React from "react";
import { motion } from "framer-motion";
import siesLogo from "../assets/siesLogo.webp";

/* =========================================================
   ORBIT NODE — a small glowing dot that travels around a
   ring, matching the "live system" motif used in Hero3D /
   AboutEcosystem3D instead of a single static spinner.
========================================================= */

function OrbitRing({ size, duration, color, reverse = false, dotSize = 6 }) {
  return (
    <motion.div
      className="absolute rounded-full border"
      style={{
        width: size,
        height: size,
        borderColor: `${color}22`,
        borderTopColor: color,
      }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <span
        className="absolute rounded-full"
        style={{
          width: dotSize,
          height: dotSize,
          background: color,
          top: -dotSize / 2,
          left: "50%",
          marginLeft: -dotSize / 2,
          boxShadow: `0 0 8px 2px ${color}`,
        }}
      />
    </motion.div>
  );
}

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Ambient background — same visual language as the rest of the site */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[110px]"
        />
        <div className="absolute left-[15%] top-[20%] h-[220px] w-[220px] rounded-full bg-violet-600/10 blur-[100px]" />
        <div className="absolute right-[15%] bottom-[20%] h-[220px] w-[220px] rounded-full bg-blue-600/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Central Logo Container */}
      <div className="relative flex h-56 w-56 items-center justify-center">
        {/* Layered glow — two colors instead of one flat blur circle */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-40 w-40 rounded-full bg-cyan-400 blur-[70px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1.3, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="absolute h-32 w-32 rounded-full bg-violet-500 blur-[70px]"
        />

        {/* Orbit rings with travelling nodes */}
        <OrbitRing size={224} duration={7} color="#22F3FF" />
        <OrbitRing size={184} duration={5} color="#A855F7" reverse dotSize={5} />
        <OrbitRing size={150} duration={9} color="#3B82F6" dotSize={4} />

        {/* Breathing Logo */}
        <motion.img
          src={siesLogo}
          alt="IEEE SIES GST Loading"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 h-28 w-28 object-contain drop-shadow-[0_0_20px_rgba(34,243,255,0.35)] md:h-32 md:w-32"
        />
      </div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 flex flex-col items-center"
      >
        <span className="font-tech text-lg font-bold tracking-[0.25em] text-white sm:text-xl">
          IEEE SIES GST
        </span>
        <span className="mt-1.5 animate-pulse text-xs tracking-widest text-cyan-300/70">
          INITIALIZING
        </span>

        {/* Progress Bar */}
        <div className="mt-5 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-violet-400 shadow-[0_0_8px_rgba(34,243,255,0.6)]"
          />
        </div>
      </motion.div>
    </div>
  );
}