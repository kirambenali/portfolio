import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useSectionInView } from "@/lib/use-section-in-view";
import { SectionHeader } from "@/components/ui/section-header";
import { Watermark } from "@/components/ui/watermark";
import { cn } from "@/lib/utils";

const EXPERIENCES = [
  {

    company: "WICMIC Group",
    location: "BIZERTE, TUNISIA",
    title: "SOFTWARE ENGINEER INTERN",
    date: "JAN 2026 — JUN 2026",
    desc: "Designed and delivered a production-ready web and mobile B2B platform, covering everything from UX design and development to testing, CI/CD, and deployment, helping WICMIC Group’s commercial teams manage products, clients, and sales processes with 50+ international partner brands.",
  },
  {
    company: "Refresh Branding Company",
    location: "TUNIS, TUNISIA",
    title: "SOFTWARE DEVELOPER INTERN",
    date: "JUN 2025 — AUG 2025",
    desc: "Developed a production-ready B2B mobile platform for daily carpooling, connecting companies and employees through flexible trip planning and intelligent ride matching, while owning the frontend and integrating Firebase backend services."
  },
  {
    company: "STB Bank",
    location: "TUNISIA",
    title: "HARDWARE & NETWORK MAINTENANCE INTERN",
    date: "JUN 2024 — AUG 2024",
    desc: "Handled hardware troubleshooting, component replacement, and system performance maintenance, while supporting network administration tasks including configuration, traffic analysis, and diagnostics using packet tracing tools."
  }
];

export function ExperienceSection() {
  const ref = useSectionInView(1, 0.2);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 100,
    damping: 20
  });

  return (
    <section id="experience" ref={ref as any} className="py-32 px-6 md:px-24 relative bg-background overflow-hidden">
      <Watermark text="EXPERIENCE" className="text-[14vw] md:text-[16vw]" />

      <div ref={containerRef} className="max-w-6xl mx-auto border-t border-white/10 pt-16 relative z-10">
        
        <SectionHeader 
          subtitle="My Journey" 
          title={
            <span>Where I've <br/><span className="text-primary">Left My Mark</span></span>
          } 
        />

        {/* Timeline Container */}
        <div className="relative flex flex-col gap-6 md:gap-8 py-8 md:py-14">
          {/* Track Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 md:-translate-x-1/2" />
          {/* Glowing Progress Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-primary md:-translate-x-1/2 origin-top drop-shadow-[0_0_8px_rgba(255,102,0,0.8)] z-10"
          />

          {EXPERIENCES.map((exp, i) => (
            <ExperienceItem key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ exp, index }: { exp: typeof EXPERIENCES[0], index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  
  // Track this item's position relative to the viewport
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center", "end start"]
  });

  // Fade in at center, fade out at edges
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.2, 1, 1, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.9, 1, 1, 1, 0.9]);
  
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      ref={itemRef}
      style={{ opacity, scale }}
      className={cn(
        "relative flex flex-col md:flex-row items-center w-full group",
        isEven ? "md:justify-start" : "md:justify-end"
      )}
    >
      {/* Node/Dot */}
      <div className="absolute left-6 md:left-1/2 top-1/2 w-3 h-3 rounded-full bg-background border-2 border-primary -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 group-hover:scale-125 group-hover:bg-primary group-hover:drop-shadow-[0_0_8px_rgba(255,102,0,0.8)]" />

      {/* Card Content */}
      <div className={cn(
        "w-full pl-14 md:pl-0 md:w-[calc(50%-2.5rem)] flex flex-col gap-2.5 py-4",
        isEven ? "md:text-right md:items-end md:pr-10" : "md:text-left md:items-start md:pl-10"
      )}>
        <div className="flex flex-col gap-1">
          <span className="font-sans text-sm tracking-widest text-primary uppercase">{exp.date}</span>
          <span className="font-sans text-sm tracking-widest text-white/40 uppercase">{exp.location}</span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-sans font-light leading-tight">
          {exp.company}
        </h3>
        <div className="px-3.5 py-1.5 border border-white/20 rounded-full font-sans text-xs tracking-widest uppercase bg-white/5 backdrop-blur-sm w-fit">
          {exp.title}
        </div>
        <p className={cn(
          "font-sans text-white/70 text-base max-w-md mt-1",
          isEven ? "md:text-right" : "md:text-left"
        )}>
          {exp.desc}
        </p>
      </div>
    </motion.div>
  );
}
