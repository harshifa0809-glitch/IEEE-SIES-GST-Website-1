import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLoaderData } from "react-router-dom";
import { ArrowLeft, Search, Users } from "lucide-react";
import logo from "../assets/siesLogo.webp";
import TeamSection from "./team";

const COUNCILS = ["Branch Counselor", "Senior Council", "Junior Council"];

/* =========================================================
   AMBIENT GLOW — same visual language as AboutEcosystem3D /
   Hero3D (cyan + violet radial glow, subtle grid) so this page
   doesn't feel like a plain, disconnected list view.
========================================================= */

function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-[-10%] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500 blur-[130px]"
      />
      <div className="absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-blue-600/[0.06] blur-[130px]" />
      <div className="absolute right-[-5%] top-[35%] h-[350px] w-[350px] rounded-full bg-violet-600/[0.05] blur-[120px]" />

      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />
    </div>
  );
}

export default function Teams() {
  const members = useLoaderData() || [];
  const [selectedCouncil, setSelectedCouncil] = useState("Branch Counselor");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      if (member.council !== selectedCouncil) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = member.name?.toLowerCase().includes(q);
        const matchesRole = member.team?.toLowerCase().includes(q);
        if (!matchesName && !matchesRole) return false;
      }
      return true;
    });
  }, [members, selectedCouncil, searchQuery]);

  return (
    <div className="relative min-h-screen bg-[var(--color-bg-primary)]">
      <div className="grid-bg" />
      <AmbientBackground />

      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <NavLink
            to="/"
            className="flex items-center gap-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Home</span>
          </NavLink>

          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-md" />
              <img
                src={logo}
                alt="IEEE SIES GST"
                className="relative w-8 h-8 object-contain"
              />
            </div>
            <span className="text-white font-bold text-sm hidden sm:inline">
              IEEE SIES GST
            </span>
          </div>
        </div>
      </header>

      <main className="relative pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-cyan-300" />
              </span>
              <Users size={11} className="text-cyan-300" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300">
                Our People
              </span>
            </div>

            <h1 className="section-title">Leadership & Council</h1>
            <p className="section-subtitle">
              Meet our distinguished faculty counselor, student leadership, and
              technical mentors steering IEEE SIES GST for the 2026–2027 term.
            </p>

            {/* Controls: Segmented Pill & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6">
              {/* Apple-style Segmented Control */}
              <div className="flex max-w-full overflow-x-auto p-1 rounded-2xl sm:rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md gap-1 no-scrollbar w-full sm:w-auto justify-start sm:justify-center">
                {COUNCILS.map((council) => {
                  const count = members.filter(
                    (m) => m.council === council,
                  ).length;
                  const active = selectedCouncil === council;
                  return (
                    <button
                      key={council}
                      onClick={() => setSelectedCouncil(council)}
                      className={`relative flex-shrink-0 whitespace-nowrap px-3.5 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 sm:gap-2 ${
                        active
                          ? "text-white"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="council-pill"
                          className="absolute inset-0 rounded-full bg-sky-500 shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{council}</span>
                      <span
                        className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                          active
                            ? "bg-white/25 text-white"
                            : "bg-white/10 text-slate-400"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search council..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all"
                />
              </div>
            </div>
          </motion.div>

          {/* Team Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCouncil}-${searchQuery}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <TeamSection members={filteredMembers} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
