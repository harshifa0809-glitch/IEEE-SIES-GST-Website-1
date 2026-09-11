import React, { Suspense } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLoaderData } from "react-router-dom";
import { Linkedin, Sparkles } from "lucide-react";

/* =========================================================
   LOADING CARD
========================================================= */

const LoadingCard = () => (
  <div className="animate-pulse bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-2 sm:p-4">
    <div className="w-full h-40 sm:h-60 md:h-80 lg:h-96 bg-gray-300/20 rounded-xl" />

    <div className="w-full px-2 pt-4">
      <div className="h-4 bg-gray-300/20 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-300/20 rounded w-1/2" />
    </div>
  </div>
);

/* =========================================================
   INITIALS
========================================================= */

function getInitials(name = "") {
  const parts = name
    .replace(/^Prof\.\s+/i, "")
    .replace(/^Dr\.\s+/i, "")
    .trim()
    .split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (
    (parts[0]?.[0] || "") + (parts[parts.length - 1]?.[0] || "")
  ).toUpperCase();
}

/* =========================================================
   TEAM MEMBER CARD
========================================================= */

const TeamMemberCard = React.memo(({ member, index }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  /* =======================================================
     3D MOUSE POSITION
  ======================================================= */

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = {
    stiffness: 180,
    damping: 22,
    mass: 0.5,
  };

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [6, -6]),
    springConfig,
  );

  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-6, 6]),
    springConfig,
  );

  /* =======================================================
     PHOTO DEPTH
  ======================================================= */

  const imageX = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), springConfig);

  const imageY = useSpring(useTransform(mouseY, [0, 1], [-6, 6]), springConfig);

  /* =======================================================
     MOVING LIGHT POSITION
  ======================================================= */

  const lightX = useTransform(mouseX, [0, 1], ["15%", "85%"]);

  const lightY = useTransform(mouseY, [0, 1], ["15%", "85%"]);

  /* =======================================================
     MOUSE MOVE
  ======================================================= */

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;

    const y = (event.clientY - rect.top) / rect.height;

    mouseX.set(Math.max(0, Math.min(1, x)));
    mouseY.set(Math.max(0, Math.min(1, y)));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  /* =======================================================
     MEMBER STATES
  ======================================================= */

  const isUiAvatar =
    !member.photo?.url ||
    member.photo.url.includes("ui-avatars.com") ||
    imageError;

  const isCounselor =
    member.council === "Branch Counselor" || member.team === "Branch Counselor";

  return (
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
        margin: "-40px",
      }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.05, 0.4),
        ease: "easeOut",
      }}
      className="group relative"
      style={{
        perspective: "1200px",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ===================================================
          SOFT OUTER LIGHT
      =================================================== */}

      <motion.div
        className="
          absolute
          -inset-3
          rounded-[28px]
          pointer-events-none
          blur-2xl
        "
        animate={{
          opacity: isHovered ? (isCounselor ? 0.32 : 0.18) : 0,
          scale: isHovered ? 1 : 0.94,
        }}
        transition={{
          duration: 0.35,
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.45), rgba(37,99,235,0.12), transparent 70%)",
        }}
      />

      {/* ===================================================
          MAIN CARD
      =================================================== */}

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`
          relative
          overflow-hidden
          rounded-2xl
          border
          p-3 sm:p-4
          backdrop-blur-xl
          transition-all
          duration-300

          ${
            isCounselor
              ? `
                border-sky-400/40
                bg-gradient-to-b
                from-sky-500/[0.10]
                via-white/[0.045]
                to-white/[0.02]
                shadow-[0_20px_60px_rgba(56,189,248,0.10)]
                hover:border-sky-400/60
              `
              : `
                border-white/10
                bg-white/[0.035]
                hover:border-sky-400/30
                hover:bg-white/[0.055]
                shadow-[0_20px_50px_rgba(0,0,0,0.25)]
              `
          }
        `}
      >
        {/* =================================================
            MOVING SPOTLIGHT
        ================================================= */}

        <motion.div
          className="
            absolute
            pointer-events-none
            z-30
            w-48
            h-48
            rounded-full
            blur-3xl
          "
          style={{
            left: lightX,
            top: lightY,
            x: "-50%",
            y: "-50%",
            background:
              "radial-gradient(circle, rgba(125,211,252,0.22) 0%, rgba(56,189,248,0.10) 30%, transparent 70%)",
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            duration: 0.25,
          }}
        />

        {/* =================================================
            LIGHT REFLECTION
        ================================================= */}

        <motion.div
          className="
            absolute
            inset-0
            pointer-events-none
            z-20
          "
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            duration: 0.25,
          }}
          style={{
            background:
              "linear-gradient(120deg, transparent 20%, rgba(125,211,252,0.10) 45%, transparent 65%)",
          }}
        />

        {/* =================================================
            BACK DEPTH PLATE
        ================================================= */}

        <div
          className="
            absolute
            inset-2
            rounded-xl
            border
            border-white/[0.035]
            bg-white/[0.015]
            pointer-events-none
          "
          style={{
            transform: "translateZ(-18px)",
          }}
        />

        {/* =================================================
            TOP LIGHT LINE
        ================================================= */}

        <motion.div
          className="
            absolute
            top-0
            left-[12%]
            right-[12%]
            h-px
            bg-gradient-to-r
            from-transparent
            via-sky-300
            to-transparent
            pointer-events-none
            z-40
          "
          animate={{
            opacity: isHovered ? 0.9 : 0.35,
          }}
          transition={{
            duration: 0.3,
          }}
          style={{
            boxShadow: "0 0 14px rgba(56,189,248,0.55)",
          }}
        />

        {/* =================================================
            PHOTO AREA
        ================================================= */}

        <motion.div
          className="
            relative
            w-full
            aspect-[4/4.2]
            overflow-hidden
            rounded-xl
            bg-neutral-950
            border
            border-white/10
          "
          style={{
            x: imageX,
            y: imageY,
            transform: "translateZ(25px)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Photo border glow */}

          <motion.div
            className="
              absolute
              -inset-px
              rounded-xl
              border
              border-sky-300/30
              pointer-events-none
              z-30
            "
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
            }}
          />

          {/* Background glow */}

          <div
            className="
              absolute
              -top-20
              -left-20
              w-40
              h-40
              rounded-full
              bg-sky-500/10
              blur-3xl
              pointer-events-none
            "
          />

          {/* =================================================
              AVATAR
          ================================================= */}

          {isUiAvatar ? (
            <div
              className="
                relative
                w-full
                h-full
                flex
                flex-col
                items-center
                justify-center
                bg-gradient-to-br
                from-slate-950
                via-[#0a1128]
                to-slate-950
                p-4
                select-none
                overflow-hidden
              "
            >
              {/* Avatar rings */}

              <motion.div
                className="
                  absolute
                  w-36
                  h-36
                  rounded-full
                  border
                  border-sky-400/10
                "
                animate={{
                  rotate: isHovered ? 180 : 0,
                  scale: isHovered ? 1.08 : 1,
                }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                }}
              />

              <div
                className="
                  absolute
                  w-28
                  h-28
                  rounded-full
                  border
                  border-sky-400/10
                "
              />

              {/* Initials */}

              <motion.div
                className="
                  relative
                  z-10
                  w-20
                  h-20
                  rounded-2xl
                  bg-white/[0.06]
                  border
                  border-white/15
                  flex
                  items-center
                  justify-center
                  shadow-[0_10px_35px_rgba(56,189,248,0.12)]
                "
                animate={{
                  scale: isHovered ? 1.06 : 1,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <span
                  className="
                    font-display
                    font-bold
                    text-2xl
                    sm:text-3xl
                    text-white
                    tracking-tight
                  "
                >
                  {getInitials(member.name)}
                </span>
              </motion.div>

              <span
                className="
                  relative
                  z-10
                  mt-3
                  text-[10px]
                  font-mono
                  uppercase
                  tracking-widest
                  text-slate-400
                "
              >
                {isCounselor ? "Faculty Counselor" : "Council Member"}
              </span>
            </div>
          ) : (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-slate-800/60 animate-pulse" />
              )}

              <img
                className={`
                  w-full
                  h-full
                  object-cover
                  object-center
                  transition-all
                  duration-700
                  ${imageLoaded ? "opacity-100" : "opacity-0"}
                  group-hover:scale-[1.045]
                `}
                src={member.photo.url}
                alt={member.name}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />

              {/* Image dark gradient */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-transparent
                  to-transparent
                  opacity-70
                  pointer-events-none
                "
              />

              {/* Glass reflection */}

              <motion.div
                className="
                  absolute
                  inset-0
                  pointer-events-none
                  z-20
                "
                animate={{
                  x: isHovered ? "100%" : "-100%",
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                style={{
                  width: "45%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                  transform: "skewX(-18deg)",
                }}
              />

              {/* Top reflection */}

              <div
                className="
                  absolute
                  inset-x-0
                  top-0
                  h-1/3
                  bg-gradient-to-b
                  from-white/[0.08]
                  to-transparent
                  pointer-events-none
                "
              />
            </>
          )}

          {/* =================================================
              IMAGE BOTTOM LIGHT
          ================================================= */}

          <motion.div
            className="
              absolute
              bottom-0
              left-[15%]
              right-[15%]
              h-px
              bg-sky-300
              pointer-events-none
              z-40
            "
            animate={{
              opacity: isHovered ? 0.9 : 0.25,
            }}
            transition={{
              duration: 0.3,
            }}
            style={{
              boxShadow: "0 0 12px rgba(56,189,248,0.7)",
            }}
          />
        </motion.div>

        {/* =================================================
            MEMBER DETAILS
        ================================================= */}

        <div
          className="
            relative
            text-center
            flex
            flex-col
            flex-grow
            justify-between
            pt-4
            z-40
          "
          style={{
            transform: "translateZ(20px)",
          }}
        >
          <div>
            {/* Name */}

            <h3
              className="
                text-base
                sm:text-lg
                font-bold
                text-white
                tracking-tight
                group-hover:text-sky-300
                transition-colors
                duration-300
                mb-1
              "
            >
              {member.name}
            </h3>

            {/* Team */}

            <span
              className={`
                inline-flex
                items-center
                gap-1.5
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold

                ${
                  isCounselor
                    ? `
                      bg-sky-500/20
                      border
                      border-sky-400/40
                      text-sky-200
                    `
                    : `
                      bg-sky-500/10
                      border
                      border-sky-500/25
                      text-sky-300
                    `
                }
              `}
            >
              {isCounselor && <Sparkles className="w-3 h-3" />}

              {member.team}
            </span>

            {/* Counselor */}

            {isCounselor && (
              <p
                className="
                  text-[11px]
                  text-slate-400
                  font-mono
                  tracking-wide
                  mt-2
                  mb-3
                "
              >
                Faculty Advisor & Mentor • SIES GST
              </p>
            )}
          </div>

          {/* =================================================
              LINKEDIN
          ================================================= */}

          {member.linkedin && (
            <div
              className="
                pt-3
                mt-3
                border-t
                border-white/5
                flex
                justify-center
              "
            >
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group/link
                  inline-flex
                  items-center
                  gap-1.5
                  px-3
                  py-1.5
                  rounded-lg
                  text-xs
                  font-medium
                  text-slate-300
                  bg-white/[0.04]
                  hover:bg-sky-500/[0.10]
                  border
                  border-white/10
                  hover:border-sky-400/30
                  hover:text-white
                  transition-all
                  duration-300
                "
              >
                <Linkedin
                  className="
                    w-3.5
                    h-3.5
                    text-sky-400
                    group-hover/link:scale-110
                    transition-transform
                  "
                />

                <span>Connect</span>
              </a>
            </div>
          )}
        </div>

        {/* =================================================
            CORNER LIGHTS
        ================================================= */}

        <motion.div
          className="
            absolute
            top-3
            right-3
            w-1.5
            h-1.5
            rounded-full
            bg-sky-300
            z-50
          "
          animate={{
            opacity: isHovered ? 1 : 0.35,
          }}
          transition={{
            duration: 0.3,
          }}
          style={{
            boxShadow: "0 0 12px rgba(56,189,248,0.9)",
          }}
        />

        <motion.div
          className="
            absolute
            bottom-3
            left-3
            w-1.5
            h-1.5
            rounded-full
            bg-violet-300
            z-50
          "
          animate={{
            opacity: isHovered ? 0.9 : 0.2,
          }}
          transition={{
            duration: 0.3,
          }}
        />
      </motion.div>
    </motion.div>
  );
});

/* =========================================================
   TEAM GRID
========================================================= */

const TeamGrid = ({ members }) => {
  if (!members || members.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-400 text-sm">
          No members found matching your search.
        </p>
      </div>
    );
  }

  if (members.length === 1) {
    return (
      <div className="flex justify-center py-6">
        <div className="w-full max-w-sm sm:max-w-md">
          <TeamMemberCard member={members[0]} index={0} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-5
        sm:gap-6
        lg:gap-8
      "
    >
      {members.map((member, idx) => (
        <TeamMemberCard key={member._id} member={member} index={idx} />
      ))}
    </div>
  );
};

/* =========================================================
   TEAM SECTION
========================================================= */

function TeamSection({ members }) {
  const loaderMembers = useLoaderData();

  const teamMembers = members ?? loaderMembers ?? [];

  return (
    <section className="relative py-8">
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* Main soft light */}

        <div
          className="
            absolute
            top-10
            left-1/2
            -translate-x-1/2
            w-[500px]
            h-[300px]
            rounded-full
            bg-sky-500/[0.035]
            blur-[110px]
          "
        />

        {/* Side lights */}

        <div
          className="
            absolute
            top-[30%]
            left-0
            w-48
            h-48
            rounded-full
            bg-blue-500/[0.025]
            blur-[90px]
          "
        />

        <div
          className="
            absolute
            top-[55%]
            right-0
            w-48
            h-48
            rounded-full
            bg-violet-500/[0.025]
            blur-[90px]
          "
        />

        {/* Subtle grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.03]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.35) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.35) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "50px 50px",
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>

      {/* =================================================
          TEAM CONTENT
      ================================================= */}

      <div className="relative z-10">
        <Suspense fallback={<LoadingCard />}>
          <TeamGrid members={teamMembers} />
        </Suspense>
      </div>
    </section>
  );
}

export default TeamSection;
