import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Images } from "lucide-react";

import highlight1 from "../assets/highlights/highlight1.jpg";
import highlight2 from "../assets/highlights/highlight2.jpg";
import highlight3 from "../assets/highlights/highlight3.jpg";
import highlight4 from "../assets/highlights/highlight4.jpg";
import highlight5 from "../assets/highlights/highlight5.jpg";
import highlight6 from "../assets/highlights/highlight6.jpg";
import highlight7 from "../assets/highlights/highlight7.jpg";
import highlight8 from "../assets/highlights/highlight8.jpg";
import highlight9 from "../assets/highlights/highlight9.jpg";

import IEEE1 from "../assets/IEEE1.webp";
import IEEE2 from "../assets/IEEE2.webp";
import IEEE3 from "../assets/IEEE3.webp";
import IEEE4 from "../assets/IEEE4.webp";
import IEEE5 from "../assets/IEEE5.webp";
import IEEE6 from "../assets/IEEE6.jpeg";

import Lightbox from "../components/Lightbox";

// ======================================================
// ALL ORIGINAL IMAGES — DO NOT REMOVE
// ======================================================

const allImages = [
  highlight1,
  highlight2,
  highlight3,
  highlight4,
  highlight5,
  highlight6,
  highlight7,
  highlight8,
  highlight9,
  IEEE1,
  IEEE2,
  IEEE3,
  IEEE4,
  IEEE5,
  IEEE6,
];

// ======================================================
// CAPTIONS
// ======================================================

const captions = {
  0: "Technical Workshop",
  1: "Flagship Event",
  2: "Guest Session",
  3: "Hands-on Lab",
  4: "Team Moments",
  5: "Awards & Felicitation",
  6: "Hackathon",
  7: "Student Podcast",
  8: "IEEE Day",
  9: "Techopedia",
  10: "Epsilon",
  11: "RF & Microwave",
  12: "Community Meetup",
  13: "Project Showcase",
  14: "Chapter Highlights",
};

// ======================================================
// CATEGORIES
// ======================================================

const CATEGORIES = [
  {
    id: "all",
    label: "All Archives",
  },
  {
    id: "flagship",
    label: "Flagship & Techfests",
  },
  {
    id: "workshops",
    label: "Workshops & Labs",
  },
  {
    id: "community",
    label: "Campus & Moments",
  },
];

const categoryMap = {
  0: "workshops",
  1: "flagship",
  2: "workshops",
  3: "workshops",
  4: "community",
  5: "community",
  6: "flagship",
  7: "community",
  8: "community",
  9: "flagship",
  10: "flagship",
  11: "workshops",
  12: "community",
  13: "workshops",
  14: "community",
};

// ======================================================
// BENTO PATTERN
// ======================================================

const spanPattern = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-2",
  "sm:col-span-2 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-1 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
];

// ======================================================
// IMAGE TILE
// ======================================================

function BentoTile({ src, index, span, onOpen }) {
  const [loaded, setLoaded] = useState(false);

  const tag = captions[index] || "IEEE SIES GST";

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(index)}
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.97,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        margin: "-60px",
      }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -4,
      }}
      className={`
        group relative
        col-span-1 row-span-1
        min-h-[260px]
        overflow-hidden
        rounded-[22px]
        border border-white/[0.09]
        bg-[#07111b]
        shadow-[0_10px_40px_rgba(0,0,0,0.22)]
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-cyan-400
        ${span}
      `}
      aria-label={`Open image: ${tag}`}
    >
      {/* Image */}
      <img
        src={src}
        alt={`IEEE SIES GST — ${tag}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`
          absolute inset-0
          h-full w-full
          object-cover
          transition-all
          duration-700
          ease-out
          group-hover:scale-[1.08]
          ${loaded ? "blur-0 opacity-100" : "scale-105 blur-xl opacity-0"}
        `}
      />

      {/* Dark overlay */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-black/85
          via-black/10
          to-transparent
          opacity-75
          transition-all
          duration-500
          group-hover:opacity-95
        "
      />

      {/* Cyan hover glow */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_50%_100%,rgba(0,200,255,0.25),transparent_55%)]
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* Border glow */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          rounded-[22px]
          border border-cyan-400/0
          transition-all
          duration-500
          group-hover:border-cyan-400/30
          group-hover:shadow-[inset_0_0_35px_rgba(0,200,255,0.08)]
        "
      />

      {/* Top label */}
      <div
        className="
          absolute
          left-4
          top-4
          flex
          items-center
          gap-2
          translate-y-[-8px]
          rounded-full
          border
          border-white/15
          bg-black/45
          px-3
          py-1.5
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.14em]
          text-white
          opacity-0
          backdrop-blur-xl
          transition-all
          duration-400
          group-hover:translate-y-0
          group-hover:opacity-100
        "
      >
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
        {tag}
      </div>

      {/* Bottom content */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          p-5
          text-left
        "
      >
        <div
          className="
            flex
            items-end
            justify-between
            gap-3
          "
        >
          <div>
            <p
              className="
                mb-1
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-cyan-300/80
              "
            >
              Archive {String(index + 1).padStart(2, "0")}
            </p>

            <h3
              className="
                text-sm
                font-semibold
                text-white
                transition-transform
                duration-300
                group-hover:-translate-y-1
              "
            >
              {tag}
            </h3>
          </div>

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-black/35
              text-white
              backdrop-blur-md
              transition-all
              duration-300
              group-hover:border-cyan-400/50
              group-hover:bg-cyan-400
              group-hover:text-black
            "
          >
            <ArrowUpRight size={15} />
          </div>
        </div>
      </div>

      {/* Corner accent */}
      <div
        className="
          absolute
          right-0
          top-0
          h-16
          w-16
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      >
        <div className="absolute right-4 top-4 h-px w-8 bg-cyan-400/70" />
        <div className="absolute right-4 top-4 h-8 w-px bg-cyan-400/70" />
      </div>
    </motion.button>
  );
}

// ======================================================
// MAIN GALLERY
// ======================================================

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredImages = allImages
    .map((src, idx) => ({
      src,
      originalIndex: idx,
      cat: categoryMap[idx] || "community",
    }))
    .filter(
      (item) => selectedCategory === "all" || item.cat === selectedCategory,
    );

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrev = () => {
    setCurrentImageIndex((previous) =>
      previous === 0 ? allImages.length - 1 : previous - 1,
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((previous) =>
      previous === allImages.length - 1 ? 0 : previous + 1,
    );
  };

  return (
    <section
      id="gallery"
      className="
        section
        relative
        overflow-hidden
        py-20
        sm:py-24
      "
    >
      {/* ==================================================
          BACKGROUND EFFECTS
      ================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large cyan glow */}
        <div
          className="
            absolute
            left-1/2
            top-0
            h-[450px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-cyan-500/[0.055]
            blur-[120px]
          "
        />

        {/* Side glow */}
        <div
          className="
            absolute
            right-[-180px]
            top-[35%]
            h-[400px]
            w-[400px]
            rounded-full
            bg-blue-500/[0.04]
            blur-[100px]
          "
        />

        {/* Grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
            [background-size:55px_55px]
          "
        />
      </div>

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="container relative z-10">
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
            duration: 0.7,
          }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Small badge */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.1,
              duration: 0.5,
            }}
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-400/[0.06]
              px-4
              py-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-cyan-300
              backdrop-blur-md
            "
          >
            <Sparkles size={13} />
            IEEE SIES GST Archives
          </motion.div>

          <h2 className="section-title">Event Gallery</h2>

          <p className="section-subtitle mx-auto max-w-2xl">
            A visual journey through our technical symposiums, hands-on
            masterclasses, campus moments, and the innovators who make them
            happen.
          </p>

          {/* Image count */}
          <div
            className="
              mt-5
              flex
              items-center
              justify-center
              gap-2
              text-xs
              text-slate-500
            "
          >
            <Images size={14} className="text-cyan-400" />
            <span>{allImages.length} moments in the archive</span>
          </div>

          {/* ==================================================
              CATEGORY FILTER
          ================================================== */}

          <div
            className="
              no-scrollbar
              mt-8
              mb-10
              flex
              max-w-full
              items-center
              justify-start
              gap-2
              overflow-x-auto
              pb-2
              sm:flex-wrap
              sm:justify-center
              sm:overflow-visible
              sm:pb-0
            "
          >
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    relative
                    flex-shrink-0
                    whitespace-nowrap
                    overflow-hidden
                    rounded-full
                    border
                    px-4
                    py-2
                    text-xs
                    font-semibold
                    transition-all
                    duration-300
                    ${
                      active
                        ? "border-cyan-400/40 bg-cyan-400/15 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.08)]"
                        : "border-white/10 bg-white/[0.035] text-slate-400 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                    }
                  `}
                >
                  {active && (
                    <motion.span
                      layoutId="gallery-active"
                      className="
                        absolute
                        inset-0
                        rounded-full
                        bg-cyan-400/[0.06]
                      "
                    />
                  )}

                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ==================================================
          BENTO GRID
      ================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1600px]
          px-3
          sm:px-6
          lg:px-8
        "
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="
              grid
              grid-cols-1
              gap-3
              auto-rows-[280px]
              sm:auto-rows-[180px]
              sm:grid-cols-3
              sm:grid-flow-row-dense
              lg:auto-rows-[220px]
              lg:grid-cols-4
            "
          >
            {filteredImages.map((item, i) => (
              <BentoTile
                key={item.originalIndex}
                src={item.src}
                index={item.originalIndex}
                span={spanPattern[i % spanPattern.length]}
                onOpen={openLightbox}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredImages.length === 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              flex
              min-h-[250px]
              items-center
              justify-center
              rounded-3xl
              border
              border-white/10
              bg-white/[0.02]
              text-sm
              text-slate-500
            "
          >
            No images found in this archive.
          </motion.div>
        )}
      </div>

      {/* ==================================================
          BOTTOM ARCHIVE LINE
      ================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 0.2,
          duration: 0.6,
        }}
        className="
          relative
          z-10
          mx-auto
          mt-10
          flex
          max-w-[1600px]
          items-center
          gap-4
          px-6
          lg:px-8
        "
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/10" />

        <span
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.3em]
            text-slate-600
          "
        >
          IEEE SIES GST • Archive
        </span>

        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/10" />
      </motion.div>

      {/* ==================================================
          LIGHTBOX
      ================================================== */}

      <Lightbox
        images={allImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onPrev={goToPrev}
        onNext={goToNext}
      />
    </section>
  );
}
