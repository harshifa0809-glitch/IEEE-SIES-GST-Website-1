import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    id: "1",
    question: "What is IEEE SIES GST?",
    answer:
      "IEEE SIES GST is the student branch of the Institute of Electrical and Electronics Engineers at SIES Graduate School of Technology. We are dedicated to fostering technological innovation, professional development, and academic excellence among students.",
  },
  {
    id: "2",
    question: "How can I become a member?",
    answer:
      "You can join IEEE SIES GST by attending our membership drives or contacting us directly. Membership is open to all students interested in engineering, technology, and innovation. We conduct regular membership drives at the beginning of each academic year.",
  },
  {
    id: "3",
    question: "What are the benefits of joining?",
    answer:
      "Members gain access to exclusive workshops, networking opportunities, leadership roles, skill development programs, IEEE digital library, industry connections, certificate courses, and the chance to participate in organizing major technical events.",
  },
  {
    id: "4",
    question: "What sub-chapters are available?",
    answer:
      "IEEE SIES GST has three active sub-chapters: Computer Society (CS), Microwave Theory and Techniques Society (MTT-S), and Women in Engineering (WiE). Each sub-chapter focuses on specific domains and organizes specialized events and workshops.",
  },
  {
    id: "5",
    question: "What kind of events do you organize?",
    answer:
      "We organize various technical and non-technical events including Techopedia (our flagship event), Epsilon (international conference), workshops, seminars, webinars, coding competitions, and networking sessions with industry professionals.",
  },
  {
    id: "6",
    question: "How can I contact IEEE SIES GST?",
    answer:
      "You can reach us at ieee@siesgst.ac.in, follow us on our social media platforms, or visit us at SIES Graduate School of Technology, Nerul, Navi Mumbai.",
  },
];

/* =========================================================
   FAQ ITEM — active item gets a soft glow + left accent bar
   instead of just a text-color change, and the icon rotates
   smoothly (45°) rather than instantly swapping glyphs.
========================================================= */

const FAQItem = ({ faq, isOpen, onToggle, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`relative overflow-hidden rounded-2xl border transition-colors duration-300 ${
        isOpen
          ? "border-cyan-400/25 bg-cyan-400/[0.04] shadow-[0_0_30px_rgba(34,211,238,0.08)]"
          : "border-white/10 bg-white/[0.02] hover:border-white/20"
      }`}
    >
      {/* Left accent bar, only visible when open */}
      <motion.span
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-cyan-400 to-blue-500"
      />

      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <div className="flex items-center gap-3">
          <span
            className={`text-[10px] font-mono transition-colors ${
              isOpen ? "text-cyan-400" : "text-slate-600"
            }`}
          >
            0{index + 1}
          </span>
          <span
            className={`text-sm font-medium transition-colors sm:text-base ${
              isOpen ? "text-cyan-300" : "text-white"
            }`}
          >
            {faq.question}
          </span>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
            isOpen
              ? "bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
              : "bg-white/5 text-slate-400"
          }`}
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 pl-[3.1rem] text-sm leading-relaxed text-slate-400 sm:px-6 sm:pb-6 sm:pl-[3.6rem]">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openId, setOpenId] = React.useState("1");

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="section relative overflow-hidden">
      {/* Ambient glow — same visual language as the rest of the site */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/[0.04] blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-violet-600/[0.03] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Frequently Asked{" "}
            <span className="text-[var(--color-accent)]">Questions</span>
          </h2>
          <p className="section-subtitle">
            Find answers to common questions about IEEE SIES GST membership,
            events, and activities.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => handleToggle(faq.id)}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
