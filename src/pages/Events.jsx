import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Search,
  Sparkles,
  X,
} from "lucide-react";

/* =========================================================
   EVENT IMAGES
========================================================= */

import techopedia15Poster from "../assets/events/techopedia15_fest_poster.jpg";
import studyAbroadFlyer from "../assets/events/study_abroad_banner.jpg";
import lte5gFlyer from "../assets/events/lte_5g_flyer.jpg";
import aiProductFlyer from "../assets/events/ai_product_flyer.jpg";
import industrialAuditFlyer from "../assets/events/industrial_audit_flyer.jpg";
import solarAiFlyer from "../assets/events/solar_ai_flyer.jpg";
import softSkillsFlyer from "../assets/events/soft_skills_flyer.jpg";

/* =========================================================
   FALLBACK IMAGE
========================================================= */

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80";

/* =========================================================
   EVENT DATA
========================================================= */

const events = [
  {
    id: 1,
    title: "TechoPedia 15",
    category: "Technical",
    date: "15 August 2026",
    time: "10:00 AM",
    location: "SIES GST",
    image: techopedia15Poster,
    description:
      "A technology-focused event designed to encourage students to explore emerging technologies, problem solving and innovation.",
    featured: true,
  },

  {
    id: 2,
    title: "Study Abroad Opportunities",
    category: "Career",
    date: "22 August 2026",
    time: "11:00 AM",
    location: "SIES GST",
    image: studyAbroadFlyer,
    description:
      "An informative session covering opportunities, pathways and important considerations for students planning higher education abroad.",
  },

  {
    id: 3,
    title: "LTE, 5G & 6G Technologies",
    category: "Technical",
    date: "28 August 2026",
    time: "2:00 PM",
    location: "SIES GST",
    image: lte5gFlyer,
    description:
      "Explore the evolution of wireless communication from LTE and 5G to the future possibilities of 6G networks.",
  },

  {
    id: 4,
    title: "Retrieval Augmented Generation",
    category: "AI",
    date: "30 August 2026",
    time: "3:00 PM",
    location: "Online",
    image: FALLBACK_IMG,
    description:
      "Understand how retrieval augmented generation combines information retrieval and generative AI to build more capable applications.",
  },

  {
    id: 5,
    title: "AI Product Management",
    category: "AI",
    date: "3 September 2026",
    time: "1:00 PM",
    location: "SIES GST",
    image: aiProductFlyer,
    description:
      "Learn how artificial intelligence is changing product development, decision making, user experience and technology strategy.",
  },

  {
    id: 6,
    title: "Industrial Energy Audit",
    category: "Engineering",
    date: "5 September 2026",
    time: "10:30 AM",
    location: "SIES GST",
    image: industrialAuditFlyer,
    description:
      "Discover practical concepts related to energy auditing, industrial efficiency and sustainable engineering practices.",
  },

  {
    id: 7,
    title: "AI for Solar Panel Cleaning",
    category: "AI",
    date: "7 September 2026",
    time: "2:00 PM",
    location: "SIES GST",
    image: solarAiFlyer,
    description:
      "Explore how data and machine learning can help determine when solar panels need cleaning and improve energy efficiency.",
  },

  {
    id: 8,
    title: "Soft Skills & Professional Development",
    category: "Career",
    date: "9 September 2026",
    time: "11:30 AM",
    location: "SIES GST",
    image: softSkillsFlyer,
    description:
      "Build communication, teamwork, confidence and professional skills that complement technical knowledge.",
  },

  {
    id: 9,
    title: "Sign Language Awareness",
    category: "Social",
    date: "12 September 2026",
    time: "12:00 PM",
    location: "SIES GST",
    image: FALLBACK_IMG,
    description:
      "An awareness-focused session encouraging accessibility, inclusion and better communication through sign language.",
  },

  {
    id: 10,
    title: "Epsilon",
    category: "Technical",
    date: "18 September 2026",
    time: "10:00 AM",
    location: "SIES GST",
    image: FALLBACK_IMG,
    description:
      "A student-focused technical experience bringing together learning, challenges and innovation.",
  },
];

/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  "All",
  "Technical",
  "AI",
  "Career",
  "Engineering",
  "Social",
];

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ featured }) {
  return (
    <div
      className={`absolute left-4 top-4 z-20 rounded-full border px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] backdrop-blur-xl ${
        featured
          ? "border-cyan-300/30 bg-cyan-400/10 text-cyan-300"
          : "border-white/15 bg-slate-950/70 text-slate-300"
      }`}
    >
      {featured ? "Featured" : "Event"}
    </div>
  );
}

/* =========================================================
   EVENT CARD
========================================================= */

function EventCard({ event, onOpen }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55 }}
      whileHover={{ y: -8 }}
      className="group relative h-full"
    >
      {/* Hover glow */}

      <div className="absolute -inset-1 rounded-[28px] bg-cyan-400/10 opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />

      {/* Card */}

      <div className="relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[#07101b]/90 shadow-2xl backdrop-blur-xl">
        {/* Image */}

        <div className="relative h-56 overflow-hidden">
          <img
            src={event.image || FALLBACK_IMG}
            alt={event.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />

          {/* Image overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-[#07101b] via-[#07101b]/10 to-transparent" />

          <StatusBadge featured={event.featured} />

          {/* Category */}

          <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            {event.category}
          </div>
        </div>

        {/* Content */}

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-xl font-bold leading-tight text-white transition group-hover:text-cyan-300">
            {event.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
            {event.description}
          </p>

          {/* Event info */}

          <div className="mt-5 space-y-2.5">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CalendarDays size={14} className="text-cyan-400" />
              <span>{event.date}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock3 size={14} className="text-cyan-400" />
              <span>{event.time}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <MapPin size={14} className="text-cyan-400" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Button */}

          <button
            type="button"
            onClick={() => onOpen(event)}
            className="mt-6 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-cyan-300"
          >
            <span>View Event</span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10">
              <ArrowRight size={14} />
            </span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   QUICK VIEW MODAL
========================================================= */

function QuickViewModal({ event, onClose }) {
  if (!event) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 25 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#07101b] shadow-2xl"
        >
          {/* Close */}

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition hover:border-cyan-400/40 hover:text-cyan-300"
          >
            <X size={18} />
          </button>

          {/* Image */}

          <div className="relative h-64 overflow-hidden sm:h-80">
            <img
              src={event.image || FALLBACK_IMG}
              alt={event.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#07101b] via-transparent to-transparent" />
          </div>

          {/* Details */}

          <div className="p-6 sm:p-8">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={14} className="text-cyan-300" />

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300">
                {event.category}
              </span>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              {event.title}
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
              {event.description}
            </p>

            {/* Info grid */}

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                <CalendarDays size={17} className="mb-2 text-cyan-300" />

                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">
                  Date
                </p>

                <p className="mt-1 text-xs text-slate-300">{event.date}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                <Clock3 size={17} className="mb-2 text-cyan-300" />

                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">
                  Time
                </p>

                <p className="mt-1 text-xs text-slate-300">{event.time}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                <MapPin size={17} className="mb-2 text-cyan-300" />

                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">
                  Location
                </p>

                <p className="mt-1 text-xs text-slate-300">{event.location}</p>
              </div>
            </div>

            {/* Register button */}

            <button
              type="button"
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-400/10 transition hover:bg-cyan-300"
            >
              Register / Learn More
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================================================
   MOBILE CAROUSEL
========================================================= */

function MobileCarousel({ events, onOpen }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };

  return (
    <div className="relative lg:hidden">
      {/* Carousel */}

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-5">
          {events.map((event) => (
            <div
              key={event.id}
              className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_65%]"
            >
              <EventCard event={event} onOpen={onOpen} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={scrollPrev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-300"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={scrollNext}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-300"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN EVENTS SECTION
========================================================= */

export default function Events() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  /* =======================================================
     FILTER EVENTS
  ======================================================= */

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return events.filter((event) => {
      const matchesCategory =
        activeCategory === "All" || event.category === activeCategory;

      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-[#02070d] py-24 sm:py-28"
    >
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="pointer-events-none absolute inset-0">
        {/* Main glow */}

        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/[0.035] blur-[130px]" />

        {/* Side glow */}

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-blue-500/[0.025] blur-[120px]" />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.11]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Label */}

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2">
            <Sparkles size={12} className="text-cyan-300" />

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300">
              Events
            </span>
          </div>

          {/* Heading */}

          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Discover.
            <br />
            <span className="bg-gradient-to-r from-slate-200 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Learn. Build.
            </span>
          </h2>

          {/* Description */}

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Explore workshops, technical sessions, career opportunities and
            community experiences designed to help students learn beyond the
            classroom.
          </p>
        </motion.div>

        {/* =================================================
            SEARCH
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-12 max-w-2xl"
        >
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.035] py-4 pl-12 pr-5 text-sm text-white outline-none backdrop-blur-xl transition placeholder:text-slate-600 focus:border-cyan-400/30 focus:bg-white/[0.05]"
            />
          </div>
        </motion.div>

        {/* =================================================
            CATEGORY FILTER
        ================================================= */}

        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  active
                    ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-lg shadow-cyan-400/5"
                    : "border-white/10 bg-white/[0.025] text-slate-500 hover:border-white/20 hover:text-slate-300"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* =================================================
            RESULT COUNT
        ================================================= */}

        <div className="mt-12 flex items-center justify-between border-b border-white/5 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
            {filteredEvents.length}{" "}
            {filteredEvents.length === 1 ? "Event" : "Events"}
          </p>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-xs text-cyan-400 transition hover:text-cyan-300"
            >
              Clear search
            </button>
          )}
        </div>

        {/* =================================================
            DESKTOP EVENTS GRID
        ================================================= */}

        {filteredEvents.length > 0 ? (
          <>
            <div className="mt-8 hidden grid-cols-1 gap-6 sm:grid-cols-2 lg:grid lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onOpen={setSelectedEvent}
                />
              ))}
            </div>

            {/* Mobile */}

            <div className="mt-8 lg:hidden">
              <MobileCarousel
                events={filteredEvents}
                onOpen={setSelectedEvent}
              />
            </div>
          </>
        ) : (
          /* =================================================
             NO RESULTS
          ================================================= */

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 rounded-3xl border border-white/10 bg-white/[0.02] py-20 text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-500">
              <Search size={22} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-white">
              No events found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another search term or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-6 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-2.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
            >
              Reset filters
            </button>
          </motion.div>
        )}

        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 text-center"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent" />

          <div className="pt-12">
            <p className="text-sm text-slate-500">
              More opportunities. More learning. More connections.
            </p>

            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700">
              IEEE SIES GST Student Branch
            </p>
          </div>
        </motion.div>
      </div>

      {/* =================================================
          MODAL
      ================================================= */}

      {selectedEvent && (
        <QuickViewModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
}
