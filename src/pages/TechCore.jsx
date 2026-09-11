import React from "react";
import { motion } from "framer-motion";
import { Cpu, Globe2, Zap, Network } from "lucide-react";
import TechCore3D from "../components/TechCore3D";

const features = [
  {
    icon: Cpu,
    title: "Innovation",
    text: "Turning ideas into real technology.",
  },
  {
    icon: Globe2,
    title: "Global Community",
    text: "Connecting students with the world of engineering.",
  },
  {
    icon: Zap,
    title: "Future Ready",
    text: "Learning technologies that shape tomorrow.",
  },
  {
    icon: Network,
    title: "Collaboration",
    text: "Building together, learning together.",
  },
];

export default function TechCore() {
  return (
    <section id="tech-core" className="relative overflow-hidden py-24 sm:py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-blue-500/10 blur-[130px]" />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            Engineering the Future
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Where{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Ideas
            </span>{" "}
            Become Innovation
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            IEEE SIES GST brings together technology, creativity and
            collaboration to build the engineers of tomorrow.
          </p>
        </motion.div>

        {/* Main section */}
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Our Vision
              </p>

              <h3 className="text-3xl font-bold text-white sm:text-4xl">
                Technology is not just what we learn.
                <span className="mt-2 block text-slate-400">
                  It is what we create.
                </span>
              </h3>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                From workshops and technical events to projects and
                competitions, IEEE SIES GST creates an environment where
                students can experiment, build and grow.
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                    whileHover={{ y: -4 }}
                    className="group rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/[0.05]"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={19} />
                    </div>

                    <h4 className="font-semibold text-white">
                      {feature.title}
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {feature.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* 3D CORE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="order-1 lg:order-2"
          >
            <div className="relative mx-auto h-[430px] w-full max-w-[600px] sm:h-[520px] lg:h-[600px]">
              {/* Glow behind 3D object */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-[90px]" />

              <TechCore3D />

              {/* floating label */}
              <div className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full border border-cyan-400/20 bg-black/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300 backdrop-blur-xl">
                IEEE Technology Core
              </div>

              {/* bottom label */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 backdrop-blur-xl">
                Connect • Create • Innovate
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
