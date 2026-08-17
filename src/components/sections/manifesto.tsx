import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSectionInView } from "@/lib/use-section-in-view";
import { Watermark } from "@/components/ui/watermark";
import { ArrowRight } from "lucide-react";

const words = "I’m a Software Engineer passionate about building real-world products across mobile, web, AI, and cloud. My experience spans Flutter, React, NestJS, .NET, RAG, AI agents, Azure AI Foundry, testing, CI/CD, and cloud deployment. I’ve built production products for businesses, explored entrepreneurship through  my startup idea StepWise, and represented the Arab world as part of the only Arab team to reach the Microsoft Imagine Cup semi-finals.".split(" ");

const HIGHLIGHT_WORDS = new Set([
  ".net",
  "rag",
  "ai",
  "agents",
  "azure",
  "foundry",
  "entrepreneurship",
  "microsoft",
  "imagine",
  "cup",
  "semi-finals",
  "arab",
  "world",
  "production"
]);

export function ManifestoSection() {
  const ref = useSectionInView(0, 0.4);
  const textRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.8", "end 0.4"]
  });

  return (
    <section id="manifesto" ref={ref as any} className="min-h-screen flex items-center justify-center py-32 px-6 md:px-24 relative overflow-hidden selection:bg-primary selection:text-primary-foreground">
      <Watermark text="ABOUTME" className="text-[14vw] md:text-[18vw]" />
      
      <div ref={textRef} className="max-w-3xl w-full mx-auto relative z-10">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-sans font-light leading-relaxed text-center flex flex-wrap justify-center gap-x-2.5 gap-y-1.5 md:gap-x-3 md:gap-y-2">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = Math.min(1, start + (4 / words.length));
            
            return (
              <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
            );
          })}
        </h1>

        <div className="mt-8 flex justify-center">
          <a
            href={`${import.meta.env.BASE_URL}kiram-ben-ali-cv.pdf`}
            download="Kiram-Ben-Ali-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2 font-sans text-sm md:text-base tracking-widest uppercase text-white hover:text-primary transition-colors group shrink-0"
          >
            <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-primary">Download CV</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Word({ word, progress, range }: { word: string, progress: any, range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const cleanedWord = word.toLowerCase().replace(/[^a-z0-9.-]/g, "");
  const isHighlighted = HIGHLIGHT_WORDS.has(cleanedWord);
  
  return (
    <motion.span style={{ opacity }} className={isHighlighted ? "text-primary" : "text-foreground"}>
      {word}
    </motion.span>
  );
}
