import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Lightbox = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      >
        {/* Ambient glow behind the image — same visual language
            as the rest of the site instead of plain black */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.06] blur-[140px]" />
        </div>

        {/* Close button */}
        <button
          type="button"
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] sm:h-12 sm:w-12"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={22} />
        </button>

        {/* Previous button */}
        <button
          type="button"
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] sm:left-6 sm:h-14 sm:w-14"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
        >
          <ChevronLeft size={26} />
        </button>

        {/* Next button */}
        <button
          type="button"
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] sm:right-6 sm:h-14 sm:w-14"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
        >
          <ChevronRight size={26} />
        </button>

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: -15 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative px-4"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="max-h-[80vh] max-w-[90vw] rounded-2xl object-contain shadow-[0_20px_80px_rgba(0,0,0,0.6)] sm:max-h-[85vh]"
          />

          {/* Subtle border glow around the image itself */}
          <div className="pointer-events-none absolute inset-4 rounded-2xl shadow-[inset_0_0_40px_rgba(34,211,238,0.06)]" />
        </motion.div>

        {/* Image counter — pill style, matching site badges */}
        <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-xl">
          <span className="text-cyan-300">{currentIndex + 1}</span>
          <span className="mx-1 text-white/30">/</span>
          <span>{images.length}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
