import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSectionInView } from "@/lib/use-section-in-view";

const EXPERTISE = [
  {
    title: "Frontend Engineering",
    desc: "Building cross-platform mobile and web applications with Flutter , React, from UI development to production deployment.",
    skills: ["React & Next.js", "Kotlin Jetpack Compose", "Flutter", "FlutterFlow"]
  },
  {
    title: "Backend Integration",
    desc: "Designing secure, fast, and robust backend systems to support stunning frontends. I prioritize reliable infrastructure that enhances functionality.",
    skills: ["Nest.js", "Spring Boot", ".NET", "Firebase"]
  },
  {
  title: "AI Integration",
  desc: "Building AI-powered features with real-time multimodal interaction, RAG pipelines, and AI agents, from model integration to production deployment.",
  skills: [
    "Azure AI Foundry | Azure AI Services",
    
    "RAG & Embeddings",
    "Real-Time Multimodal AI Agents",
    "LiveKit"
  ]
},
  {
    title: "Database",
    desc: "Designing structured and scalable data layers that balance consistency, performance, and maintainability across applications.",
    skills: ["MySQL", "MongoDB", "SQL Server"]
  },
  {
    title: "DevOps & Cloud Deployment",
    desc: "Automating CI/CD pipelines and deploying containerized applications to cloud environments.",
    skills: ["GitHub Actions", "Docker", "Azure Deployment", "CI/CD Automation"]
  },
   {
  title: "Testing & Quality",
  desc: "Ensuring software quality through unit testing, code analysis, and performance testing.",
  skills: ["k6", "SonarQube", "Unit Testing"]
},
  {
    title: "UI/UX Design",
    desc: "Crafting unique identities and themes with creative, optimized solutions tailored to client needs. I deliver fully responsive design to ensure flawless performance across all devices.",
    skills: ["Loopanel", "TL.dev", "Figma"]
  },
 {
  title: "Project Management ",
  desc: "Managing projects through agile planning, collaboration, task tracking, and documentation.",
  skills: ["n8n  |  Notion", "Jira  |  Postman", "Swagger  |  GitHub", "ClickUp  |  Trello"]
}
  
 
];

export function ExpertiseSection() {
  const ref = useSectionInView(2, 0.1);
  const containerRef = useRef<HTMLDivElement>(null);

  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Cards mapped smoothly over the scroll range (adding 0.999 prevents out-of-bounds at exactly 1.0)
    const index = Math.min(
      EXPERTISE.length - 1,
      Math.floor(latest * EXPERTISE.length * 0.999)
    );
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  const transitionSpec = { 
    duration: shouldReduceMotion ? 0 : 0.9, 
    ease: [0.22, 1, 0.36, 1] as const 
  };

  return (
    <section id="expertise" ref={ref as any} className="relative bg-background">
      {/* Height scales with card count to keep each step readable during scroll */}
      <div ref={containerRef} style={{ height: `${EXPERTISE.length * 125}vh` }} className="relative">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          
          <div className="w-full max-w-[90rem] mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24 relative z-10 h-full">
            
            {/* LEFT: Giant Rolling Number */}
            <div className="hidden md:flex flex-1 items-center justify-start select-none pt-24">
              <div className="font-sans font-light leading-[0.8] tracking-tighter text-[22vw] lg:text-[24vw] flex items-center">
                <span className="text-white/10">0</span>
                <div className="h-[0.8em] overflow-hidden relative text-white/90">
                  <motion.div 
                    animate={{ y: `calc(-${activeIndex} * 0.8em)` }}
                    transition={transitionSpec}
                    className="flex flex-col"
                  >
                    {Array.from({ length: EXPERTISE.length }, (_, i) => i + 1).map(num => (
                      <div key={num} className="h-[0.8em] flex items-center justify-center pb-2">{num}</div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* RIGHT: Content Card */}
            <div className="w-full md:w-[600px] shrink-0 relative h-[480px]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -40 }}
                  transition={transitionSpec}
                  className="absolute inset-0 w-full"
                >
                  <div className="bg-background/40 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col h-full">
                    
                    <div className="mb-8">
                      <h3 className="font-sans font-light text-3xl md:text-4xl leading-tight text-white mb-4">
                        {EXPERTISE[activeIndex].title}
                      </h3>
                      <p className="mt-4 text-white/60 font-sans text-sm md:text-base leading-relaxed">
                        {EXPERTISE[activeIndex].desc}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <div className="text-xs font-sans tracking-widest text-white/30 mb-4 uppercase border-b border-white/10 pb-4">
                        Technologies
                      </div>
                      <ul className="flex flex-col">
                        {EXPERTISE[activeIndex].skills.map((skill, i) => (
                          <li key={i} className="flex items-center justify-between py-3 md:py-4 border-b border-white/5 last:border-b-0 text-xs md:text-sm font-sans tracking-widest text-white/80 uppercase">
                            <span>{skill}</span>
                            <span className="text-primary opacity-60 font-mono text-[10px] md:text-xs">0{i + 1}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
