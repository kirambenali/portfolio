import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useSectionInView } from "@/lib/use-section-in-view";
import { SectionHeader } from "@/components/ui/section-header";
import { Watermark } from "@/components/ui/watermark";
import { cn } from "@/lib/utils";

// Assets imports
import imagineCupImg from "@/assets/imagine_cup.jpg";
import mutualImg from "@/assets/mutual.jpg";
import hackathonImg from "@/assets/hackathon.jpg";
import stepwiseImg from "@/assets/stepwise.jpeg";
import entrepriseImg from "@/assets/entreprise.png";
import pitchImg from "@/assets/pitch.jpg";

const AWARDS = [
  {
    num: "01",
    title: "Microsoft Imagine Cup",
    event: "SEMI-FINALIST",
    desc: "Reached the Global Semi-Finals of Microsoft Imagine Cup as the only Arab team, developing StepWise with Azure AI Foundry and Microsoft AI services to build an AI-powered inclusive education solution.  ",
    year: "2026",
    imageSrc: imagineCupImg
  },
  {
    num: "02",
    title: "Mutual Hack",
    event: "4TH PLACE & INCUBATION AWARD",
    desc: "Ranked 4th at Mutual Hack and selected for a 4-month incubation program with Mazam, gaining support to further develop and scale StepWise as a viable business.",
    year: "MAY 2025",
    imageSrc: mutualImg
  },
  {
    num: "03",
    title: "Empower X-Hack",
    event: "JURY FAVORITE AWARD",
    desc: "Developed an inclusive blockchain-powered platform designed to verify credentials and intelligently match individuals with Down syndrome to meaningful employment opportunities.",
    year: "JUNE 2025",
    imageSrc: hackathonImg
  },
  {
    num: "04",
    title: "Bal de Projet — ESPRIT",
    event: "TOP PROJECT SHOWCASE",
    desc: "Selected among the top-tier projects at ESPRIT (SIM option) and showcased at the annual Project Day, presenting to industry leaders, tech entrepreneurs, and angel investors.",
    year: "2025",
    imageSrc: stepwiseImg
  },
  {
    num: "05",
    title: "Curriculum Co-Design Workshop",
    event: "STARTUP REPRESENTATIVE & PITCH",
    desc: "Represented StepWise at the Curriculum Co-Design for Employment Workshop, pitching the startup vision and value proposition directly to corporate executives, employers, and investors.",
    year: "2025",
    imageSrc: entrepriseImg
  },
  {
    num: "06",
    title: "AI Toolbox Event",
    event: "STARTUP PITCH",
    desc: "Pitched StepWise in front of an audience of 300+ attendees and tech professionals at the AI Toolbox event, delivering a compelling demonstration of its AI capabilities and market value.",
    year: "2025",
    imageSrc: pitchImg
  }
];

export function AchievementsSection() {
  const ref = useSectionInView(5, 0.1);

  return (
    <section id="achievements" ref={ref as any} className="min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden">
      <Watermark text="AWARDS" className="text-[15vw] md:text-[20vw]" />

      <div className="max-w-[90rem] mx-auto w-full relative z-10">
        <SectionHeader
          subtitle="Selected recognition, hackathons, and speaking engagements across global and regional stages."
          title={
            <span>Hackathons <br /><span className="text-primary">& Awards</span></span>
          }
        />

        <div className="flex flex-col gap-32 md:gap-48 mt-12 md:mt-0">
          {AWARDS.map((award, i) => (
            <AwardItem key={award.num} item={award} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardItem({ item, index }: { item: typeof AWARDS[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["-10%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [40, -40]);

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className={cn(
      "relative flex flex-col gap-12 lg:gap-24 group items-center",
      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
    )}>


      <div className="w-full lg:w-3/5 aspect-[16/10] md:aspect-[16/9] max-h-[400px] rounded-2xl overflow-hidden relative border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] bg-neutral-950/80 p-2 md:p-3">

        {/* Visual Graphic / Image Container */}
        <div className="w-full h-full relative rounded-xl overflow-hidden bg-black/40 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,transparent_100%)] pointer-events-none" />

          <motion.div style={{ y: imageY }} className="w-full h-full flex items-center justify-center">
            {item.imageSrc ? (
              <img
                src={item.imageSrc}
                alt={item.title}
                className="w-full h-full object-contain rounded-3xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="w-48 h-48 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-3xl shadow-[inset_0_0_100px_rgba(255,102,0,0.05)] flex items-center justify-center">
                <div className="text-8xl font-sans font-light text-white/[0.02] select-none">
                  {item.num}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Subtle Ambient Hover Glow */}
        <div className="absolute inset-0 rounded-2xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>

      {/* 
        RIGHT/LEFT: Content Block with offset translation
      */}
      <motion.div
        style={{ y: textY }}
        className="w-full lg:w-1/2 flex flex-col justify-center relative z-10"
      >
        {/* Decorative Giant Number Behind Text */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-12 text-[15rem] md:text-[20rem] font-sans font-light text-white/[0.03] select-none pointer-events-none tracking-tighter hidden lg:block">
          {item.num}
        </div>

        <div className="flex flex-col gap-6 relative">

          <div className="flex items-center gap-4 border-b border-white/10 pb-6">
            <span className="text-primary font-sans font-light text-4xl leading-none">
              {item.num}
            </span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-sans tracking-widest text-primary/80 font-medium uppercase">
              {item.year}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-3xl md:text-4xl font-sans font-light leading-tight text-white group-hover:text-primary transition-colors duration-500">
              {item.title}
            </h3>
            <div className="text-xs font-sans tracking-widest text-white/80 uppercase mt-2 font-semibold">
              {item.event}
            </div>
          </div>

          <p className="font-sans text-white/70 text-sm md:text-base leading-relaxed mt-2">
            {item.desc}
          </p>

          <div className="mt-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white/50 group-hover:bg-primary group-hover:border-primary group-hover:text-background transition-all duration-300">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

        </div>
      </motion.div>

    </div>
  );
}
