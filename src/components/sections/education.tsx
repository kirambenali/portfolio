import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useSectionInView } from "@/lib/use-section-in-view";
import { SectionHeader } from "@/components/ui/section-header";
import { Watermark } from "@/components/ui/watermark";
import { MapPin, GraduationCap, Award } from "lucide-react";

const EDUCATION = [
  {
    year: "2023 — 2026",
    school: "ESPRIT - Private Higher School of Engineering and Technology",
    degree: "Software Engineering Degree",
    gpa: "Excellent Honors",
    location: "TUNIS, TUNISIA",
    focus: ["Software Engineering", "Full-Stack Development", "AI & Cloud Systems"],
    honors: "Excellent Honors"
  },
  {
    year: "2021 — 2023",
    school: "Arab University of Science",
    degree: "Preparatory Cycle in Mathematics and Physics",
    gpa: "Completed",
    location: "TUNISIA",
    focus: ["Mathematics", "Physics", "Engineering Foundations"],
    honors: "Preparatory Cycle"
  }
];

export function EducationSection() {
  const ref = useSectionInView(4, 0.3);

  return (
    <section id="education" ref={ref as any} className="min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-background flex flex-col justify-center relative overflow-hidden">
      
      {/* Cinematic Background Watermark */}
      <Watermark text="EDUCATION" className="text-[14vw] md:text-[18vw]" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <SectionHeader subtitle="Academic Foundation" title="Education" />
        
        <div className="flex flex-col gap-16 md:gap-24">
          {EDUCATION.map((edu, i) => (
            <EduItem key={i} edu={edu} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EduItem({ edu }: { edu: typeof EDUCATION[0] }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 0.9", "center 0.5"]
  });

  // Preserve the beloved animation logic, patched for accessibility
  const x = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [0.8, 1]);

  return (
    <div ref={itemRef} className="relative flex flex-col lg:flex-row gap-6 lg:gap-16 items-start group">
      
      {/* 
        Condensed Year Typography
        Fixed width on desktop prevents it from eating horizontal space
      */}
      <motion.div 
        style={{ scale, opacity }} 
        className="text-5xl md:text-6xl lg:text-[5.5rem] font-sans font-light text-white/20 tracking-tighter shrink-0 select-none lg:w-[220px] lg:text-right transition-colors duration-500 group-hover:text-primary/40 pt-2 lg:pt-4"
      >
        {edu.year}
      </motion.div>
      
      {/* Rich Glass Content Card */}
      <motion.div 
        style={{ x, opacity }} 
        className="flex-1 w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      >
        {/* Ambient Top Edge Glow */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="flex flex-col gap-6">
          
          {/* Header Row: School & Location */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <h3 className="text-2xl md:text-3xl font-sans font-light leading-tight text-white">
              {edu.school}
            </h3>
            <div className="flex items-center gap-2 text-primary font-sans text-xs tracking-widest uppercase shrink-0 pb-1">
              <MapPin className="w-3 h-3" />
              {edu.location}
            </div>
          </div>

          {/* Degree & Honors Metadata */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-white/90 font-sans text-sm md:text-base tracking-widest uppercase">
              <GraduationCap className="w-4 h-4 text-primary shrink-0" />
              <span className="leading-snug">{edu.degree}</span>
            </div>
            <div className="flex items-center gap-3 text-white/50 font-sans text-xs tracking-widest uppercase">
              <Award className="w-4 h-4 text-primary/60 shrink-0" />
              <span>{edu.honors} <span className="mx-2 text-white/20">•</span> {edu.gpa}</span>
            </div>
          </div>

          {/* Focus Areas Chips */}
          <div className="mt-2 flex flex-wrap gap-2">
            {edu.focus.map((f, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full bg-background/50 border border-white/5 text-[10px] font-sans tracking-widest uppercase text-white/60 shadow-inner">
                {f}
              </span>
            ))}
          </div>

        </div>
      </motion.div>
    </div>
  );
}
