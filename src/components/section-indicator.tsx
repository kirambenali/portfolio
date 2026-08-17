import { motion, AnimatePresence } from "framer-motion";
import { useSection } from "@/lib/section-context";
import { useEffect, useState } from "react";

export const sectionsData = [
  { id: 'manifesto', title: 'Manifesto', show: false },
  { id: 'experience', title: 'Experience', show: true },
  { id: 'expertise', title: 'Expertise', show: true },
  { id: 'projects', title: 'Projects', show: true },
  { id: 'education', title: 'Education', show: true },
  { id: 'achievements', title: 'Awards', show: true },
  { id: 'contact', title: 'Contact', show: true }
];

export function SectionIndicator() {
  const { activeIndex } = useSection();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentSection = sectionsData[activeIndex] || sectionsData[0];
  const shouldShow = isScrolled && currentSection.show;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: shouldShow ? 1 : 0 }}
      className="fixed top-4 left-4 sm:top-8 sm:left-8 z-50 pointer-events-none"
    >
      {/* Container with subtle glass pill styling on mobile to prevent overlapping background text */}
      <div className="flex items-center gap-2 sm:gap-4 px-3 py-1.5 sm:px-0 sm:py-0 rounded-full sm:rounded-none bg-background/80 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border border-white/10 sm:border-none shadow-lg sm:shadow-none mix-blend-normal sm:mix-blend-difference text-white font-display text-xs sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-widest">
        
        {/* Number 0X */}
        <div className="flex text-primary items-center font-bold sm:font-normal">
          <span className="leading-none">0</span>
          <div className="h-[1.2em] overflow-hidden relative w-[0.7em] flex items-center">
            <motion.div 
              animate={{ y: `calc(-${activeIndex} * 1.2em)` }} 
              transition={{ type: "spring", stiffness: 70, damping: 15 }}
              className="flex flex-col w-full"
            >
              {sectionsData.map((_, i) => (
                <div key={i} className="h-[1.2em] leading-none flex items-center justify-center">{i}</div>
              ))}
            </motion.div>
          </div>
        </div>
        
        <span className="text-white/30 leading-none">/</span>
        
        {/* Section Title */}
        <div className="h-[1.2em] overflow-hidden relative min-w-[100px] sm:min-w-[280px] flex items-center">
          <AnimatePresence mode="popLayout">
            <motion.div 
              key={activeIndex} 
              initial={{ y: "100%" }} 
              animate={{ y: "0%" }} 
              exit={{ y: "-100%" }} 
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="h-[1.2em] leading-none absolute inset-0 flex items-center whitespace-nowrap font-medium sm:font-normal text-white/90"
            >
              {currentSection.title}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
