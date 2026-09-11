import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  Menu,
  X,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Radio,
} from "lucide-react";
import { motion } from "framer-motion";

import logo from "../assets/siesLogo.webp";
import csLogo from "../assets/cs.webp";
import mttsLogo from "../assets/mtts.webp";
import wieLogo from "../assets/wie.webp";

import Hero3D from "./Hero3D";

gsap.registerPlugin(ScrollToPlugin);

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    const sections = document.querySelectorAll("section[id], footer[id]");

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach((section) => observer.observe(section));

    const navLinks = document.querySelectorAll(".nav-link, .scroll-indicator");

    const handleNavClick = (e) => {
      const href = e.currentTarget.getAttribute("href");

      if (href && href.startsWith("#")) {
        e.preventDefault();

        const target = document.querySelector(href);

        if (target) {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: target,
              offsetY: 80,
            },
            ease: "power2.inOut",
          });
        }
      }
    };

    navLinks.forEach((link) => link.addEventListener("click", handleNavClick));

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    tl.fromTo(
      ".hero-badge",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
    );

    tl.fromTo(
      ".hero-kicker",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      },
      "-=0.3",
    );

    tl.fromTo(
      ".hero-title",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
      },
      "-=0.25",
    );

    tl.fromTo(
      ".student-branch",
      {
        opacity: 0,
        x: -20,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
      },
      "-=0.4",
    );

    tl.fromTo(
      ".hero-tagline",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      "-=0.3",
    );

    tl.fromTo(
      ".hero-keywords",
      {
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      },
      "-=0.3",
    );

    tl.fromTo(
      ".hero-buttons",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      "-=0.25",
    );

    tl.fromTo(
      ".hero-stats",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      },
      "-=0.3",
    );

    tl.fromTo(
      ".hero-3d-wrapper",
      {
        opacity: 0,
        scale: 0.75,
        x: 80,
      },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=1",
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);

      navLinks.forEach((link) =>
        link.removeEventListener("click", handleNavClick),
      );

      observer.disconnect();
    };
  }, []);

  const isActive = (sectionId) => activeSection === sectionId;

  const scrollToSection = (id) => {
    const target = document.querySelector(id);

    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: target,
          offsetY: 80,
        },
        ease: "power2.inOut",
      });
    }

    setIsMenuOpen(false);
  };

  return (
    <>
      {/* =====================================================
          PREMIUM NAVBAR
      ===================================================== */}

      <nav
        className={`navbar transition-all duration-500 ${
          scrolled
            ? "scrolled border-b border-white/10 bg-[#020810]/90 backdrop-blur-2xl shadow-2xl shadow-black/30"
            : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 relative">
          {/* LOGO */}

          <NavLink to="/" className="group z-50 flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <img
                src={logo}
                alt="IEEE SIES GST"
                className="relative h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10"
              />
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-base font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-300 sm:text-lg">
                IEEE SIES GST
              </span>

              {/* SOCIETY LOGOS */}

              <div className="hidden items-center gap-2.5 border-l border-white/10 pl-3 lg:flex">
                <img
                  src={csLogo}
                  alt="Computer Society"
                  title="IEEE Computer Society"
                  className="h-5 w-auto max-w-[48px] object-contain opacity-70 transition-all duration-300 hover:scale-110 hover:opacity-100"
                />

                <img
                  src={mttsLogo}
                  alt="MTT-S"
                  title="IEEE MTT-S Society"
                  className="h-5 w-auto object-contain opacity-70 transition-all duration-300 hover:scale-110 hover:opacity-100"
                />

                <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-white/95 p-0.5 opacity-70 shadow-sm transition-all duration-300 hover:scale-110 hover:opacity-100">
                  <img
                    src={wieLogo}
                    alt="Women in Engineering"
                    title="IEEE Women in Engineering"
                    className="h-full w-full object-contain"
                  />
                </span>
              </div>
            </div>
          </NavLink>

          {/* DESKTOP NAV */}

          <ul className="nav-menu hidden md:flex">
            {[
              ["home", "Home"],
              ["aboutus", "About"],
              ["events", "Events"],
              ["gallery", "Gallery"],
              ["youtube", "YouTube"],
              ["faqs", "FAQs"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`nav-link relative ${
                    isActive(id) ? "active" : ""
                  }`}
                >
                  {label}

                  {isActive(id) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* RIGHT SIDE */}

          <div className="flex items-center gap-3">
            <NavLink
              to="/team"
              className="group hidden items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-xs font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-500/10 md:inline-flex"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/60 transition-transform group-hover:scale-125" />
              Our Team
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </NavLink>

            {/* MOBILE MENU BUTTON */}

            <button
              className="relative z-50 rounded-xl border border-white/10 bg-white/[0.04] p-2 text-white transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* MOBILE MENU */}

          <div
            className={`fixed inset-0 z-40 flex flex-col items-center overflow-y-auto bg-[#020810]/95 px-6 pb-10 pt-28 backdrop-blur-2xl transition-all duration-500 md:hidden ${
              isMenuOpen
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-5 opacity-0"
            }`}
          >
            {/* Mobile glow */}

            <div className="pointer-events-none absolute left-1/2 top-20 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />

            <div className="relative mb-10 text-center">
              <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400">
                IEEE SIES GST
              </div>

              <div className="text-2xl font-bold text-white">Navigation</div>
            </div>

            <ul className="relative flex w-full max-w-xs flex-col gap-2">
              {[
                ["home", "Home"],
                ["aboutus", "About Us"],
                ["events", "Events"],
                ["gallery", "Gallery"],
                ["youtube", "YouTube"],
                ["faqs", "FAQs"],
                ["contact", "Contact"],
              ].map(([id, label]) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(`#${id}`)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left text-sm transition-all duration-300 ${
                      isActive(id)
                        ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                        : "border-white/5 bg-white/[0.025] text-white/70 hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <span>{label}</span>

                    <ArrowRight
                      size={15}
                      className={
                        isActive(id) ? "text-cyan-400" : "text-white/30"
                      }
                    />
                  </button>
                </li>
              ))}

              <li className="mt-5">
                <NavLink
                  to="/team"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-6 py-4 text-sm font-semibold text-cyan-300 transition-all duration-300 hover:bg-cyan-400/15"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Meet Our Team
                  <ArrowRight size={15} />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section
        className="hero-container relative min-h-[calc(100vh-20px)] overflow-hidden"
        id="home"
      >
        {/* =================================================
            BACKGROUND EFFECTS
        ================================================= */}

        <div className="pointer-events-none absolute left-[3%] top-[18%] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="pointer-events-none absolute bottom-[5%] right-[3%] h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/[0.035] blur-[150px]" />

        {/* GRID */}

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* TOP TECH LINE */}

        <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

        {/* =================================================
            MAIN HERO
        ================================================= */}

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-20px)] max-w-7xl items-center px-6 lg:px-10">
          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-4">
            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="flex flex-col items-center pt-16 text-center lg:items-start lg:pt-10 lg:text-left">
              {/* STATUS BADGE */}

              <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/[0.035] px-4 py-2 shadow-lg shadow-cyan-950/20 backdrop-blur-xl">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                </span>

                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-300 sm:text-xs">
                  IEEE SIES GST • STB99061
                </span>

                <span className="hidden h-3 w-px bg-white/10 sm:block" />

                <span className="hidden text-[9px] font-mono uppercase tracking-widest text-slate-500 sm:block">
                  Active
                </span>
              </div>

              {/* KICKER */}

              <div className="hero-kicker mb-4 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-slate-500">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                Engineering the Future
                <span className="hidden h-px w-8 bg-cyan-400/40 sm:block" />
              </div>

              {/* TITLE */}

              <h1 className="hero-title leading-[0.88]">
                <span className="block font-display text-[clamp(3.5rem,8vw,7rem)] font-black tracking-[-0.065em] text-white">
                  IEEE
                </span>

                <span className="block bg-gradient-to-r from-white via-slate-200 to-sky-400 bg-clip-text font-display text-[clamp(3.5rem,8vw,7rem)] font-black tracking-[-0.065em] text-transparent">
                  SIES GST
                </span>
              </h1>

              {/* STUDENT BRANCH */}

              <div className="student-branch mt-6 flex items-center gap-3">
                <span className="h-px w-8 bg-cyan-400/60" />

                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 sm:text-sm">
                  Student Branch • 2026–2027
                </span>

                <span className="h-px w-8 bg-cyan-400/60" />
              </div>

              {/* DESCRIPTION */}

              <p className="hero-tagline mt-6 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base lg:text-lg">
                Advancing technological innovation and academic excellence at
                SIES Graduate School of Technology.
                <span className="text-slate-500">
                  {" "}
                  Where student passion meets global engineering standards.
                </span>
              </p>

              {/* KEYWORDS */}

              <div className="hero-keywords mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
                {["Innovation", "Technology", "Leadership", "Community"].map(
                  (item, index) => (
                    <motion.span
                      key={item}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-mono text-slate-400 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/25 hover:bg-cyan-400/[0.05] hover:text-cyan-300 sm:text-xs"
                    >
                      <span className="mr-1.5 text-cyan-400/60">
                        0{index + 1}
                      </span>
                      {item}
                    </motion.span>
                  ),
                )}
              </div>

              {/* BUTTONS */}

              <div className="hero-buttons mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <motion.a
                  href="#events"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-sky-500/20 transition-all duration-300 hover:shadow-sky-500/40"
                >
                  <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />

                  <span className="relative">Explore Events</span>

                  <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>

                <NavLink
                  to="/team"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.08]"
                >
                  Meet the Council
                  <ArrowRight className="h-4 w-4 text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400" />
                </NavLink>
              </div>

              {/* STATS */}

              <div className="hero-stats mt-9 flex items-center gap-5 sm:gap-8">
                <div className="group">
                  <div className="text-xl font-bold text-white transition-colors group-hover:text-cyan-300 sm:text-2xl">
                    150+
                  </div>

                  <div className="text-[9px] font-mono uppercase tracking-widest text-slate-500 sm:text-[10px]">
                    Members
                  </div>
                </div>

                <div className="h-8 w-px bg-white/10" />

                <div className="group">
                  <div className="text-xl font-bold text-white transition-colors group-hover:text-cyan-300 sm:text-2xl">
                    3
                  </div>

                  <div className="text-[9px] font-mono uppercase tracking-widest text-slate-500 sm:text-[10px]">
                    Chapters
                  </div>
                </div>

                <div className="h-8 w-px bg-white/10" />

                <div className="group">
                  <div className="text-xl font-bold text-white transition-colors group-hover:text-cyan-300 sm:text-2xl">
                    20+
                  </div>

                  <div className="text-[9px] font-mono uppercase tracking-widest text-slate-500 sm:text-[10px]">
                    Events
                  </div>
                </div>

                <div className="hidden h-8 w-px bg-white/10 sm:block" />

                <div className="hidden sm:block">
                  <div className="flex items-center gap-1.5">
                    <Radio className="h-3.5 w-3.5 text-cyan-400" />

                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                      Live
                    </span>
                  </div>

                  <div className="mt-0.5 text-[9px] font-mono uppercase tracking-widest text-slate-500">
                    Network
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT 3D AREA
            ================================================= */}

            <div className="hero-3d-wrapper relative flex h-[420px] items-center justify-center sm:h-[500px] lg:h-[650px] lg:justify-end">
              {/* LARGE HALOS */}

              <motion.div
                animate={{
                  scale: [1, 1.04, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute h-[280px] w-[280px] rounded-full border border-cyan-400/10 sm:h-[380px] sm:w-[380px] lg:h-[520px] lg:w-[520px]"
              />

              <motion.div
                animate={{
                  scale: [1.05, 1, 1.05],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute h-[220px] w-[220px] rounded-full border border-blue-400/10 sm:h-[300px] sm:w-[300px] lg:h-[420px] lg:w-[420px]"
              />

              <div className="absolute h-[150px] w-[150px] rounded-full border border-white/5 sm:h-[220px] sm:w-[220px] lg:h-[320px] lg:w-[320px]" />

              {/* 3D OBJECT */}

              <div className="relative h-[420px] w-[420px] sm:h-[500px] sm:w-[500px] lg:h-[620px] lg:w-[620px]">
                <Hero3D />
              </div>

              {/* FLOATING CARD — NETWORK */}

              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-[5%] top-[16%] rounded-2xl border border-cyan-400/15 bg-black/40 px-4 py-3 shadow-xl shadow-cyan-950/20 backdrop-blur-xl sm:right-[8%] lg:right-[2%]"
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                    <span className="relative h-2 w-2 rounded-full bg-cyan-400" />
                  </span>

                  <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-400">
                    Network
                  </span>
                </div>

                <div className="mt-1 text-xs font-semibold text-white">
                  Connected
                </div>
              </motion.div>

              {/* FLOATING CARD — INNOVATION */}

              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[18%] left-[5%] rounded-2xl border border-blue-400/15 bg-black/40 px-4 py-3 shadow-xl shadow-blue-950/20 backdrop-blur-xl lg:left-[2%]"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-blue-400" />

                  <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400">
                    Innovation
                  </span>
                </div>

                <div className="mt-1 text-xs font-semibold text-white">
                  Active
                </div>
              </motion.div>

              {/* SMALL STATUS CARD */}

              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[8%] right-[10%] hidden rounded-xl border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-xl sm:block"
              >
                <div className="text-[8px] font-mono uppercase tracking-[0.2em] text-slate-500">
                  Future
                </div>

                <div className="mt-0.5 text-[10px] font-semibold text-slate-300">
                  In Progress
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* =================================================
            SCROLL INDICATOR
        ================================================= */}

        <a
          href="#aboutus"
          className="scroll-indicator group absolute bottom-5 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 sm:bottom-7"
          aria-label="Scroll to about us"
        >
          <div className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-white/15 p-1 transition-all duration-300 group-hover:border-cyan-400/50 group-hover:bg-cyan-400/5">
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/70"
            />
          </div>

          <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-slate-600 transition-colors duration-300 group-hover:text-slate-300">
            Scroll
            <ChevronDown size={11} />
          </div>
        </a>

        {/* BOTTOM TECH LINE */}

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>
    </>
  );
};

export default Hero;
