import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import heroPortrait from "@/assets/portrait.png";

/* ─── Scroll Indicator ────────────────────────────────────────── */
function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 select-none"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Mouse capsule */}
      <motion.div
        className="relative w-[26px] h-[42px] rounded-full border-2 border-white/40 flex items-start justify-center pt-[6px]"
        animate={{ borderColor: ["rgba(255,255,255,0.25)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.25)"] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Scroll dot */}
        <motion.span
          className="block w-[5px] h-[5px] rounded-full bg-white"
          animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Label */}
      <motion.span
        className="font-sans text-[9px] tracking-[0.25em] uppercase text-white/40 writing-mode-vertical"
        style={{ writingMode: "vertical-rl", letterSpacing: "0.2em" }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        Scroll
      </motion.span>
    </motion.div>
  );
}

/* ─── Hero Section ────────────────────────────────────────────── */
export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const transitionSpec = { duration: shouldReduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section id="home" className="relative w-full h-screen min-h-[600px] flex flex-col overflow-hidden bg-background">

      {/* Background */}
      <div
        className="absolute inset-0 opacity-95"
        style={{
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Nav */}
      <nav className="relative z-30 w-full px-6 md:px-12 py-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/5">
        <div className="flex items-center gap-6 xl:gap-8">
          <div className="flex items-center gap-2 font-display text-xl tracking-widest text-white uppercase">
            <Sparkles className="w-4 h-4 text-primary" />
            KIRAM BEN ALI
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-sans text-xs tracking-widest uppercase text-white/60">
          <a href="#experience" className="hover:text-white transition-colors">Journey</a>
          <a href="#expertise" className="hover:text-white transition-colors">Expertise</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#education" className="hover:text-white transition-colors">Education</a>
          <a href="#achievements" className="hover:text-white transition-colors">Awards</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        <a
          href={`${import.meta.env.BASE_URL}kiram-ben-ali-cv.pdf`}
          download="Kiram-Ben-Ali-CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-white hover:text-primary transition-colors group shrink-0"
        >
          <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-primary">Download CV</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </a>
      </nav>

      {/* Body — text anchored to top-left, portrait fills right */}
      <div className="relative z-20 flex-1 w-full max-w-[90rem] mx-auto px-6 md:px-12 flex">
        <div className="flex flex-col lg:flex-row items-start justify-between w-full h-full">

          {/* ── Left column: text pushed to top, scroll icon pinned to bottom ── */}
          <div className="w-full lg:w-[58%] xl:w-[55%] flex flex-col justify-between h-full pt-10 md:pt-14 pb-10 md:pb-14 z-20">

            {/* Headline block — top-anchored */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitionSpec, delay: 0.15 }}
            >
              <h1 className="font-sans font-light tracking-tight text-4xl md:text-5xl lg:text-[4.2rem] xl:text-[4.8rem] leading-[1.06] text-white mb-6">
                Building products <br />
                that feel <span className="text-primary italic font-serif tracking-normal">alive</span> <br />
                and perform.
              </h1>

              <p className="font-sans text-white/55 text-sm max-w-sm leading-relaxed">
                Merging highly technical systems with fluid, cinematic interfaces to create unforgettable digital experiences.
              </p>
            </motion.div>

            {/* Scroll indicator — bottom-anchored */}
            <div className="hidden md:flex items-end gap-5">
              <ScrollIndicator />
            </div>
          </div>

          {/* ── Portrait ── */}
          <motion.div
            className="absolute lg:relative bottom-0 right-0 w-[95%] sm:w-[70%] lg:w-[53%] h-[88%] lg:h-full flex items-end justify-end pointer-events-none z-10 opacity-65 lg:opacity-100 mix-blend-lighten lg:mix-blend-normal"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30, scale: shouldReduceMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: 0,
            }}
          >
            <img
              src={heroPortrait}
              alt="Kiram Ben Ali"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-auto h-full object-contain object-bottom origin-bottom"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
