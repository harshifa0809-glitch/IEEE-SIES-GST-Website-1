import { motion } from "framer-motion";
import { InfiniteSlider } from "../components/ui/infinite-slider";
import { ProgressiveBlur } from "../components/ui/progressive-blur";
import IEEE1 from "../assets/IEEE1.webp";
import IEEE2 from "../assets/IEEE2.webp";
import IEEE3 from "../assets/IEEE3.webp";
import IEEE4 from "../assets/IEEE4.webp";
import IEEE5 from "../assets/IEEE5.webp";
//import IEEE6 from "../assets/IEEE6.webp"

const logos = [IEEE1, IEEE2, IEEE3, IEEE4, IEEE5];

/* =========================================================
   FLOATING LOGO — each logo bobs at a slightly different
   speed/delay so the row feels alive instead of static, and
   reveals from grayscale to full color on hover.
========================================================= */

function FloatingLogo({ src, index }) {
  return (
    <div className="flex">
      <motion.img
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 3 + (index % 3),
          delay: index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mx-auto h-32 w-auto grayscale-[60%] opacity-70 transition-all duration-500 hover:scale-105 hover:grayscale-0 hover:opacity-100 sm:h-40 md:h-64"
        src={src}
        alt="IEEE SIES GST partner logo"
        height="128"
        width="auto"
      />
    </div>
  );
}

export default function LogoCloud() {
  return (
    <section className="overflow-hidden bg-transparent py-10">
      <div className="group relative mx-auto max-w-sm px-2 sm:max-w-2xl sm:px-6 md:max-w-4xl lg:max-w-7xl">
        <div className="flex flex-col items-center md:flex-row">
          {/* Glass panel — matches the dark cyan/violet glow
                        language used across the rest of the site
                        (previously a clashing indigo-border rainbow box) */}
          <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] px-2 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:px-10 sm:py-8">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.06] blur-[100px]" />

            <div className="relative">
              <InfiniteSlider speedOnHover={20} speed={40} gap={32}>
                {logos.map((logo, index) => (
                  <FloatingLogo key={index} src={logo} index={index} />
                ))}
              </InfiniteSlider>
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#02070d] to-transparent sm:w-20"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#02070d] to-transparent sm:w-20"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-10 sm:w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-10 sm:w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
