import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import {
  ArrowRight,
  Cpu,
  Globe2,
  Lightbulb,
  Network,
  Users,
  Zap,
  Radio,
  Sparkles,
} from "lucide-react";

import mtts from "../assets/mtts.png";
import cs from "../assets/cs.png";
import wie from "../assets/wie.png";

import AboutEcosystem3D from "../components/AboutEcosystem3D";

/* =========================================================
   SOCIETY DATA
========================================================= */

const societies = [
  {
    key: "cs",
    name: "IEEE Computer Society",
    shortName: "COMPUTER SOCIETY",
    logo: cs,
    description:
      "Empowering students through computing, software development, artificial intelligence and emerging technologies.",
    color: "from-blue-500 to-cyan-400",
    glow: "bg-cyan-400",
    icon: Cpu,
  },
  {
    key: "mtts",
    name: "IEEE MTT-S",
    shortName: "MICROWAVE THEORY & TECH",
    logo: mtts,
    description:
      "Exploring microwave engineering, RF technology, communication systems and advanced electronics.",
    color: "from-cyan-400 to-teal-300",
    glow: "bg-teal-400",
    icon: Network,
  },
  {
    key: "wie",
    name: "IEEE Women in Engineering",
    shortName: "WOMEN IN ENGINEERING",
    logo: wie,
    description:
      "Building an inclusive community that inspires, supports and empowers women in engineering.",
    color: "from-violet-500 to-pink-400",
    glow: "bg-violet-400",
    icon: Users,
  },
];

/* =========================================================
   FLOATING BACKGROUND PARTICLES
========================================================= */

function FloatingParticles() {
  const particles = Array.from({
    length: 32,
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, index) => {
        const size = 1 + (index % 3);

        const left = (index * 37) % 100;

        const top = (index * 61) % 100;

        const duration = 5 + (index % 5);

        const delay = (index % 6) * 0.6;

        return (
          <motion.span
            key={index}
            className="absolute rounded-full bg-cyan-300"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              opacity: 0.15 + (index % 4) * 0.06,
            }}
            animate={{
              y: [-12, 12, -12],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

/* =========================================================
   SOCIETY CARD
========================================================= */

function SocietyCard({ society, index = 0 }) {
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);

  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, {
    stiffness: 180,
    damping: 20,
  });

  const rotateY = useSpring(mouseX, {
    stiffness: 180,
    damping: 20,
  });

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = event.clientX - rect.left;

    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;

    const centerY = rect.height / 2;

    mouseX.set(((x - centerX) / centerX) * 7);

    mouseY.set(((centerY - y) / centerY) * 7);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const Icon = society.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
      }}
      whileHover={{
        scale: 1.025,
        z: 10,
      }}
      className="group relative w-full"
    >
      <div
        className={`absolute -inset-1 rounded-[28px] bg-gradient-to-r ${society.color} opacity-0 blur-2xl transition duration-500 group-hover:opacity-25`}
      />

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#061019]/90 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-500 group-hover:border-cyan-300/25">
        <div
          className={`absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r ${society.color}`}
        />

        <div
          className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full ${society.glow}/10 blur-3xl`}
        />

        <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl" />

        <div className="absolute right-4 top-4 flex items-center gap-1.5 opacity-40">
          <span className="h-1 w-1 rounded-full bg-cyan-300" />
          <span className="h-1 w-1 rounded-full bg-cyan-300" />
          <span className="h-1 w-1 rounded-full bg-cyan-300" />
        </div>

        <div className="relative z-10 flex items-start justify-between">
          <motion.div
            whileHover={{
              rotate: -3,
              scale: 1.06,
            }}
            className="flex h-[68px] w-[68px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] p-3 shadow-inner"
          >
            <img
              src={society.logo}
              alt={society.name}
              className="h-full w-full object-contain"
            />
          </motion.div>

          <div className="rounded-xl border border-cyan-400/15 bg-cyan-400/5 p-2.5 text-cyan-300 transition duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10">
            <Icon size={18} />
          </div>
        </div>

        <div className="relative z-10 mt-6 flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${society.color} shadow-[0_0_8px_rgba(34,211,238,0.5)]`}
          />

          <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-slate-500">
            {society.shortName}
          </span>
        </div>

        <div className="relative z-10 mt-2">
          <h3 className="text-xl font-bold tracking-tight text-white">
            {society.name}
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {society.description}
          </p>
        </div>

        <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4">
          <div className="flex items-center gap-2">
            <Radio size={12} className="text-cyan-400/70" />

            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
              Student Branch
            </span>
          </div>

          <motion.div
            whileHover={{
              x: 3,
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition group-hover:border-cyan-400/40 group-hover:text-cyan-300"
          >
            <ArrowRight size={15} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   MAIN ABOUT US
========================================================= */

export default function AboutUs() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#02070d] pt-32 pb-24 sm:pt-36 sm:pb-28"
    >
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.035, 0.065, 0.035],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-cyan-500 blur-[130px]"
        />

        <div className="absolute bottom-0 left-0 h-[450px] w-[450px] rounded-full bg-blue-600/[0.035] blur-[130px]" />

        <div className="absolute right-0 top-1/2 h-[350px] w-[350px] rounded-full bg-violet-600/[0.02] blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(transparent 50%, rgba(34,211,238,0.15) 50%)",
            backgroundSize: "100% 6px",
          }}
        />
      </div>

      <FloatingParticles />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />

              <span className="relative h-1.5 w-1.5 rounded-full bg-cyan-300" />
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300">
              Who We Are
            </span>
          </motion.div>

          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Advancing Technology
            <br />
            <span className="bg-gradient-to-r from-slate-200 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              for Humanity.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            IEEE SIES GST Student Branch is a community of passionate
            innovators, engineers and technology enthusiasts working together to
            learn, build and create meaningful impact.
          </p>
        </motion.div>

        {/* =================================================
            MISSION CARDS
        ================================================= */}

        <div className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-3">
          {/* INNOVATE */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            whileHover={{
              y: -6,
              scale: 1.015,
            }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/25 hover:bg-cyan-400/[0.035]"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/5 blur-2xl transition group-hover:bg-cyan-400/10" />

            <div className="relative z-10">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/5 text-cyan-300 transition duration-300 group-hover:scale-110 group-hover:bg-cyan-400/10">
                <Lightbulb size={19} />
              </div>

              <h3 className="font-bold text-white">Innovate</h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Turn ideas into meaningful technological solutions.
              </p>
            </div>
          </motion.div>

          {/* CONNECT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            whileHover={{
              y: -6,
              scale: 1.015,
            }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/25 hover:bg-cyan-400/[0.035]"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-400/5 blur-2xl transition group-hover:bg-blue-400/10" />

            <div className="relative z-10">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/5 text-cyan-300 transition duration-300 group-hover:scale-110 group-hover:bg-cyan-400/10">
                <Globe2 size={19} />
              </div>

              <h3 className="font-bold text-white">Connect</h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Build a global network of students and professionals.
              </p>
            </div>
          </motion.div>

          {/* IMPACT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            whileHover={{
              y: -6,
              scale: 1.015,
            }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/25 hover:bg-cyan-400/[0.035]"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-400/5 blur-2xl transition group-hover:bg-violet-400/10" />

            <div className="relative z-10">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/5 text-cyan-300 transition duration-300 group-hover:scale-110 group-hover:bg-cyan-400/10">
                <Zap size={19} />
              </div>

              <h3 className="font-bold text-white">Impact</h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Use technology to create positive change.
              </p>
            </div>
          </motion.div>
        </div>

        {/* =================================================
            3D ECOSYSTEM
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 1,
          }}
          className="mt-24"
        >
          {/* TITLE */}

          <div className="mb-8 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <Sparkles size={13} className="text-cyan-400" />

              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                Our Ecosystem
              </span>

              <Sparkles size={13} className="text-cyan-400" />
            </div>

            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              One Branch. Multiple Communities.
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">
              Different domains. One connected ecosystem of technology,
              innovation and people.
            </p>
          </div>

          {/* =================================================
              3D SCENE CONTAINER
          ================================================= */}

          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-cyan-400/10 bg-[#020b13]/30 shadow-[0_0_100px_rgba(0,200,255,0.05)]">
            {/* Top HUD */}

            <div className="pointer-events-none absolute left-6 right-6 top-5 z-20 flex items-center justify-between">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />

                <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-cyan-300/70">
                  IEEE NETWORK
                </span>
              </div>

              <div className="hidden rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[8px] font-medium uppercase tracking-[0.2em] text-slate-500 backdrop-blur-md sm:block">
                3D ECOSYSTEM // ONLINE
              </div>
            </div>

            {/* 3D — AboutEcosystem3D.jsx already renders its own
                node labels (Computer Society / MTT-S / WIE) and the
                center IEEE badge internally, so nothing else needs
                to be layered on top of it here. */}

            <AboutEcosystem3D />

            {/* Bottom status */}

            <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2">
              <motion.div
                animate={{
                  opacity: [0.4, 0.9, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="rounded-full border border-cyan-400/10 bg-black/30 px-5 py-2 text-[8px] font-semibold uppercase tracking-[0.25em] text-cyan-400/60 backdrop-blur-md"
              >
                ● Connected Ecosystem
              </motion.div>
            </div>
          </div>

          {/* =================================================
              MOBILE SOCIETY CARDS
          ================================================= */}

          <div className="mt-8 grid gap-5 lg:hidden">
            {societies.map((society, index) => (
              <SocietyCard key={society.key} society={society} index={index} />
            ))}
          </div>
        </motion.div>

        {/* =================================================
            FINAL STATEMENT
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="mx-auto mt-24 max-w-4xl text-center"
        >
          <div className="relative h-px w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent">
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-0 top-0 h-px w-24 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
            />
          </div>

          <p className="mt-10 text-lg font-medium leading-8 text-slate-300 sm:text-xl">
            "The best way to predict the future is to{" "}
            <span className="text-cyan-300">create it.</span>"
          </p>

          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="h-1 w-1 rounded-full bg-cyan-400" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-600">
              IEEE SIES GST Student Branch
            </p>

            <span className="h-1 w-1 rounded-full bg-cyan-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
