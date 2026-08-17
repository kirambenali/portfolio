import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useSectionInView } from "@/lib/use-section-in-view";
import { SectionHeader } from "@/components/ui/section-header";
import { Watermark } from "@/components/ui/watermark";
import { Github, Linkedin } from "lucide-react";

export function ContactSection() {
  const ref = useSectionInView(6, 0.4);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-100, 0]);

  return (
    <section id="contact" ref={ref as any} className="relative min-h-[80vh] flex flex-col justify-end bg-background overflow-hidden border-t border-white/5">
      <Watermark text="CONTACT" className="text-[14vw] md:text-[18vw]" />
      
      <div ref={containerRef} className="absolute inset-0 flex items-center justify-center pt-32 px-6 md:px-24">
        <motion.div style={{ y }} className="w-full max-w-6xl flex flex-col relative z-10">
          
          <div className="flex flex-col mb-24 text-center items-center justify-center w-full">
            <SectionHeader subtitle="Let's Build Something" title="" className="items-center text-center mb-12 hidden" />
            <h2 className="text-sm font-sans tracking-widest text-primary uppercase mb-8 font-semibold">
              Let's Build Something
            </h2>
            
            <a 
              href="mailto:benalikiram@gmail.com" 
              className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-sans font-light leading-tight text-white hover:text-primary transition-colors duration-500 break-all sm:break-normal max-w-full"
            >
              benalikiram@gmail.com
            </a>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-16 w-full">
              <a 
                href="https://github.com/kirambenali" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/50 hover:text-primary hover:border-primary/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,102,0,0.15)] transition-all duration-300 group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-sans text-sm tracking-widest uppercase">GitHub</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/kiram-ben-ali-2301972a3" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/50 hover:text-primary hover:border-primary/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,102,0,0.15)] transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-sans text-sm tracking-widest uppercase">LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="flex justify-center items-center py-12 border-t border-white/10 font-sans text-xs tracking-widest uppercase">
            <div className="text-white/40 text-center">
              © {new Date().getFullYear()} KIRAM BEN ALI. ALL RIGHTS RESERVED.
            </div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
