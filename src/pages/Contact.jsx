import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  Github,
  Youtube,
} from "lucide-react";

export default function Contact() {
  const socialLinks = [
    {
      icon: Youtube,
      href: "https://www.youtube.com/@IEEESIESGST",
      label: "YouTube",
      color:
        "hover:text-[#FF0000] hover:bg-[#FF0000]/10 hover:border-[#FF0000]/20",
    },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color:
        "hover:text-pink-500 hover:bg-pink-500/10 hover:border-pink-500/20",
    },
    {
      icon: Linkedin,
      href: "#",
      label: "LinkedIn",
      color:
        "hover:text-blue-500 hover:bg-blue-500/10 hover:border-blue-500/20",
    },
    {
      icon: Github,
      href: "#",
      label: "GitHub",
      color: "hover:text-white hover:bg-white/10 hover:border-white/20",
    },
  ];

  return (
    <footer
      id="contact"
      className="section relative overflow-hidden bg-[var(--color-bg-secondary)] pb-6 pt-16 sm:pb-8 sm:pt-24 md:pb-10 md:pt-32"
    >
      {/* Ambient glow — same visual language as the rest of the site */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-0 h-[400px] w-[500px] rounded-full bg-cyan-500/[0.05] blur-[130px]" />
        <div className="absolute -bottom-20 -right-20 h-[600px] w-[600px] rounded-full bg-[var(--color-accent-deep)] opacity-50 blur-[150px]" />
        <div className="absolute right-[15%] top-[20%] h-[300px] w-[300px] rounded-full bg-violet-600/[0.04] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* Footer Content */}
      <div className="container relative z-10">
        {/* Glass panel wrapping the main content, matching the
            card language used across the rest of the site */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[32px] border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl sm:p-10 md:p-14"
        >
          <div className="mb-12 grid grid-cols-1 gap-8 sm:mb-16 sm:gap-12 md:mb-20 md:grid-cols-2 md:gap-16">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-white sm:mb-6 sm:text-4xl md:mb-8 md:text-5xl lg:text-7xl">
                Let's <br />
                <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  Connect.
                </span>
              </h2>
              <p className="mb-6 max-w-md text-base text-[var(--color-text-secondary)] sm:mb-8 sm:text-lg">
                Have a question or want to collaborate?{" "}
                <br className="hidden sm:block" />
                Reach out to the IEEE SIES GST team.
              </p>

              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 sm:h-12 sm:w-12 ${social.color || "hover:text-white hover:bg-white/5 hover:border-white/20"}`}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-6 sm:gap-8"
            >
              <div>
                <h4 className="mb-4 font-tech text-xs uppercase tracking-widest text-[var(--color-accent-light)] sm:mb-6 sm:text-sm">
                  Explore
                </h4>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    "Home",
                    "About",
                    "Events",
                    "Gallery",
                    "YouTube",
                    "Team",
                  ].map((item, idx) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                      {item === "Team" ? (
                        <NavLink
                          to="/team"
                          className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-cyan-300 sm:text-base"
                        >
                          {item}
                        </NavLink>
                      ) : (
                        <a
                          href={`#${item === "About" ? "aboutus" : item.toLowerCase()}`}
                          className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-cyan-300 sm:text-base"
                        >
                          {item}
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-tech text-xs uppercase tracking-widest text-[var(--color-accent-light)] sm:mb-6 sm:text-sm">
                  Contact
                </h4>
                <ul className="space-y-4 sm:space-y-6">
                  <motion.li
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="flex items-start gap-2 sm:gap-3"
                  >
                    <Mail className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--color-text-muted)] sm:h-5 sm:w-5" />
                    <span className="break-all text-sm text-[var(--color-text-secondary)] sm:text-base">
                      ieee@siesgst.ac.in
                    </span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex items-start gap-2 sm:gap-3"
                  >
                    <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--color-text-muted)] sm:h-5 sm:w-5" />
                    <span className="text-sm text-[var(--color-text-secondary)] sm:text-base">
                      SIES Graduate School of Technology,
                      <br />
                      Nerul, Navi Mumbai - 400706
                    </span>
                  </motion.li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-4 text-xs text-[var(--color-text-muted)] sm:gap-4 sm:pt-6 md:flex-row md:pt-8 sm:text-sm"
          >
            <p>© 2024 IEEE SIES GST. All rights reserved.</p>
            <div className="flex gap-4 sm:gap-6">
              <a href="#" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Terms of Service
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
