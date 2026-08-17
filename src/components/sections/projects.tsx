import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSectionInView } from "@/lib/use-section-in-view";
import { SectionHeader } from "@/components/ui/section-header";
import { Watermark } from "@/components/ui/watermark";
import { ArrowUpRight, ExternalLink, Play } from "lucide-react";

function getYouTubeEmbedUrl(url: string) {
  if (!url) return "";

  const shortMatch = url.match(/youtu\.be\/([^?&]+)/i);
  if (shortMatch?.[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}?rel=0`;
  }

  const watchMatch = url.match(/[?&]v=([^&]+)/i);
  if (watchMatch?.[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}?rel=0`;
  }

  return url;
}


const PROJECTS = [
  {
    title: "StepWise",
    // descA shown on scroll-page 0, descB on scroll-page 1
    descA: "StepWise is a web and mobile platform designed to provide all the necessary care for children with Down syndrome, using advanced technologies such as IoT robotics, AI agents, and automation.",
    descB: "The applications offer fully adapted solutions developed in consultation with Down syndrome associations and their experts.",
    // featuresA shown on page 0 (first 2), featuresB on page 1 (remaining)
    features: [
      { text: " Built a multimodal AI assistant with Azure AI Foundry and GPT-4o Realtime that analyzes video frames to validate children's tasks and enables voice interaction through Azure Speech.", highlight: ["Azure AI Foundry", "GPT-4o Realtime", "Azure Speech"] },
      { text: " Integrated Azure Pronunciation Assessment for speech evaluation and GPT-Image-1 to generate adapted educational content.", highlight: ["Azure Pronunciation Assessment", "GPT-Image-1"] },
      { text: "Developed AI-driven learning modules for language, academics, sports, cooking, social awareness, and daily routines, with personalized activities and real-time AI validation tailored to each child.", highlight: [] },
      { text: "Validated with 75+ parents and 45+ children, resulting in 20+ product improvements and positive psychomotor specialist feedback", highlight: ["75+", "45+", "20+"] },
      { text: "CareWise extension with automated job recommendations for parents using web scraping and n8n automation", highlight: ["n8n"] },
    ],
    tech: ["Next.js", "Flutter", "Azure AI Foundry", "GPT-4o Realtime", "Cosmos DB", "Azure Speech", "GPT-Image-1", "n8n", "Azure Web App Service"],
    landingUrl: "https://landing.step-wise.pro/",
    videoUrls: ["https://youtu.be/ABEeGcenjt4", "https://youtu.be/uanjS76F_D0"],
    featureGroups: [3, 2],
  },
  {
    title: "MyMicLab",
    descA: "A production-ready B2B platform developed as my Final Year Engineering Project for WICMIC Group, connecting its commercial teams with international partner brands to streamline product discovery, client management, and digital sales.",
    descB: "",
    features: [
      {
        text: "Developed an AI assistant using RAG that helps clients explore WICMIC's products and get relevant information through natural language.",
        highlight: ["AI assistant", "RAG"]
      },
      {
        text: "Implemented a personalized recommendation system that analyzes user preferences to suggest relevant textile products.",
        highlight: ["personalized recommendation"]
      },
      {
        text: "Developed real-time messaging and an interactive news feed with reactions and comments to facilitate communication between users.",
        highlight: ["real-time", "WebSocket"]
      },
      {
        text: "Built a React admin dashboard for managing users, products, roles, and monitoring business activities through analytics.",
        highlight: ["React", "admin dashboard"]
      },
      {
        text: "Implemented a complete CI/CD pipeline with GitHub Actions, Docker, and Azure for automated application deployment.",
        highlight: ["CI/CD", "GitHub Actions", "Docker", "Azure"]
      },
      {
        text: "Performed code quality and performance validation using SonarQube and k6 to ensure production readiness.",
        highlight: ["SonarQube", "k6"]
      }
    ],
    tech: [
      "Flutter",
      "React",
      ".NET",
      "Python",
      "SQL Server",
      "WebSocket",
      "RAG",
      "Docker",
      "Azure",
      "GitHub Actions"
    ],
    videoUrls: ["https://youtu.be/tPMcVAn2hJo"],
    featureGroups: [3, 3],
  },
  {
    title: "Workway",
    descA: "A production-ready B2B carpooling platform developed during my summer internship at Refresh Branding, connecting companies and employees to simplify daily commuting through shared rides and real-time mobility features.",
    descB: "",
    features: [
      {
        text: "Implemented real-time ride tracking using Map APIs, allowing users to follow vehicle locations and visualize routes during trips.",
        highlight: ["real-time ride tracking", "Map APIs"]
      },
      {
        text: "Integrated in-app messaging and smart notifications for trip updates, new ride matches, direct communication, and automated reminders.",
        highlight: ["in-app messaging", "smart notifications"]
      },
      {
        text: "Deployed the platform for real-world use across 10 companies, supporting daily employee commuting.",
        highlight: ["10 companies", "real-world use"]
      }
    ],
    tech: [
      "Flutter",
      "Firebase",
      "Map APIs"
    ],
    videoUrls: ["https://youtu.be/J80DZXT7A9U"],
    featureGroups: [3],
  },
  {
    title: "ChicCircle",
    descA: "An AI-powered fashion platform that combines personalized styling, real-time fashion assistance, and a peer-to-peer marketplace for discovering and purchasing clothing.",
    descB: "",
    features: [
      {
        text: "Developed a personalized outfit recommendation system that considers user preferences, weather conditions, and context to suggest suitable looks.",
        highlight: ["personalized outfit recommendations"]
      },
      {
        text: "Built a real-time Gemini AI fashion assistant that analyzes outfits, rates their suitability, and provides styling advice through audio-video interaction.",
        highlight: ["Gemini AI", "real-time", "audio-video"]
      },
      {
        text: "Integrated WebRTC and LiveKit to enable real-time audio-video communication between users and the AI fashion assistant.",
        highlight: ["WebRTC", "LiveKit"]
      },
      {
        text: "Developed a peer-to-peer marketplace allowing users to list, discover, and purchase second-hand clothing.",
        highlight: ["peer-to-peer marketplace"]
      }
    ],
    tech: [
      "NestJS",
      "Kotlin",
      "Jetpack Compose",
      "SwiftUI",
      "Swift Native",
      "MongoDB",
      "Gemini AI",
      "WebRTC",
      "LiveKit"
    ],
    videoUrls: ["https://youtu.be/XsmO6R8HFi0"],
    featureGroups: [2, 2],
  },
  {
    title: "AI Automation & n8n Workflows",
    descA: "A set of intelligent automation workflows designed to connect AI agents with everyday tools and services, turning natural language commands into automated actions and information retrieval",
    descB: "",
    features: [
      {
        text: "A collection of AI-powered n8n workflows automating web search, email, calendar, Airtable, content publishing, and RAG-based information retrieval through multi-agent and conversational workflows.",
        highlight: ["AI-powered", "n8n workflows", "multi-agent", "RAG"]
      }

    ],
    tech: ["n8n", "Tavily API", "Telegram", "RAG", "Airtable", "X API"],
    videoUrls: ["https://youtu.be/xLJpnCPPhgA"],
    featureGroups: [1],
  },
];

/* ─── Scroll slot map ────────────────────────────────────────── */
// Slots are generated from each project's featureGroups configuration.
const SCROLL_SLOTS = PROJECTS.flatMap((proj, projIdx) =>
  proj.featureGroups.map((_, page) => ({ projIdx, page }))
);
const TOTAL_SLOTS = SCROLL_SLOTS.length;

/* ─── Feature text renderer (highlights keywords in orange) ──── */
function FeatureText({ text, highlight }: { text: string; highlight: string[] }) {
  if (!highlight.length) return <span className="block">{text}</span>;

  // Build regex that matches any of the highlight terms
  const escaped = highlight.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <span className="block">
      {parts.map((part, i) =>
        highlight.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
          <span key={i} className="text-primary font-medium">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

/* ─── Desktop content card ───────────────────────────────────── */
function DesktopCard({
  proj,
  page,
  transitionSpec,
  slotKey,
  shouldReduceMotion,
}: {
  proj: typeof PROJECTS[0];
  page: number;
  transitionSpec: object;
  slotKey: number;
  shouldReduceMotion: boolean | null;
}) {
  const startIndex = proj.featureGroups.slice(0, page).reduce((sum, count) => sum + count, 0);
  const visibleCount = proj.featureGroups[page] ?? proj.features.length;
  const currentFeatures = proj.features.slice(startIndex, startIndex + visibleCount);
  const currentDesc = page === 0 ? proj.descA : proj.descB;
  const visibleTech =
    proj.title === "StepWise" && page === 0
      ? proj.tech.slice(0, 4)
      : proj.tech;

  return (
    <motion.div
      key={slotKey}
      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -40 }}
      transition={transitionSpec}
      className="absolute inset-0 w-full flex flex-col justify-start pt-2"
    >
      {/* Title + URL chip — only on page 0 */}
      {page === 0 && (
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-sans font-light text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
            {proj.title}
          </h3>
          {proj.landingUrl && (
            <a
              href={proj.landingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 mt-1.5 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] font-sans tracking-widest uppercase hover:bg-primary/15 hover:border-primary/60 transition-all duration-300 group"
            >
              <ExternalLink className="w-2.5 h-2.5 group-hover:scale-110 transition-transform" />
              landing.step-wise.pro
            </a>
          )}
        </div>
      )}

      {/* On page 1: show title without url chip (smaller) */}
      {page === 1 && (
        <h3 className="font-sans font-light text-2xl leading-tight text-white/60 mb-3">
          {proj.title} <span className="text-primary text-sm font-sans tracking-widest uppercase ml-2">cont.</span>
        </h3>
      )}

      {/* Description */}
      {currentDesc && (
        <p className="text-white/60 font-sans text-xs md:text-sm leading-snug mb-5">
          {currentDesc}
        </p>
      )}

      {/* Features — vertical, one per line */}
      <div className="flex flex-col mb-3">
        {currentFeatures.map((feat, i) => (
          <div
            key={i}
            className="py-2.5 md:py-3 border-b border-white/10 text-sm md:text-base font-sans leading-relaxed text-white/82 flex items-start gap-2"
          >
            <FeatureText text={feat.text} highlight={feat.highlight} />
          </div>
        ))}
      </div>

      {/* Tech badges — at the bottom */}
      <div className="flex flex-wrap gap-2 mt-2">
        {visibleTech.map((t, i) => (
          <div
            key={i}
            className="px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-xs md:text-sm font-sans tracking-widest text-primary/90 shadow-sm leading-none"
          >
            {t}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────── */
export function ProjectsSection() {
  const ref = useSectionInView(3, 0.1);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeSlot, setActiveSlot] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const slot = Math.min(TOTAL_SLOTS - 1, Math.floor(latest * TOTAL_SLOTS * 0.999));
    if (slot !== activeSlot) setActiveSlot(slot);
  });

  const transitionSpec = {
    duration: shouldReduceMotion ? 0 : 0.9,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  const { projIdx, page } = SCROLL_SLOTS[activeSlot];
  const activeProj = PROJECTS[projIdx];
  const activeVideoUrl = activeProj.videoUrls[page] ?? activeProj.videoUrls[0] ?? "";
  const activeVideoEmbed = getYouTubeEmbedUrl(activeVideoUrl);

  // Watermark number = project number (1-based), not slot
  const watermarkNum = projIdx + 1;

  return (
    <section id="projects" ref={ref as any} className="relative bg-background">

      {/* ── DESKTOP: Pinned Scroll ── */}
      <div
        ref={containerRef}
        style={{ height: `${TOTAL_SLOTS * 125}vh` }}
        className="hidden lg:block relative"
      >
        <div className="sticky top-0 h-screen w-full flex items-start justify-center overflow-hidden pt-14 pb-10">

          {/* Giant background odometer */}
          <Watermark className="text-[35vw] md:text-[40vw] text-transparent">
            <span className="text-white/[0.04]">0</span>
            <div className="h-[0.8em] overflow-hidden relative text-white/[0.06] font-sans font-light">
              <motion.div
                animate={{ y: `calc(-${projIdx} * 0.8em)` }}
                transition={transitionSpec}
                className="flex flex-col"
              >
                {Array.from({ length: PROJECTS.length }, (_, i) => i + 1).map((num) => (
                  <div key={num} className="h-[0.8em] flex items-center justify-center pb-2">
                    {num}
                  </div>
                ))}
              </motion.div>
            </div>
          </Watermark>

          <div className="w-full max-w-[90rem] mx-auto px-12 lg:px-24 flex flex-row items-center justify-between gap-16 xl:gap-24 relative z-10 h-full">

            {/* LEFT: Video */}
            <div className="flex-1 w-full relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={projIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
                  className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] bg-background/40 backdrop-blur-md flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-0" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 blur-[60px] rounded-full transition-all duration-700" />
                  {!activeVideoEmbed && (
                    <div className="relative z-10 w-20 h-20 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white/50 pointer-events-none select-none">
                      <Play aria-hidden="true" className="w-8 h-8 ml-1" />
                    </div>
                  )}
                  {activeVideoEmbed && (
                    <iframe
                      key={`${activeProj.title}-${page}`}
                      src={activeVideoEmbed}
                      title={`${activeProj.title} demo video`}
                      className="absolute inset-0 w-full h-full z-20"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT: Content */}
            <div className="w-[460px] xl:w-[510px] shrink-0">
              <div className="relative h-[530px] lg:h-[500px] w-full">
                <AnimatePresence mode="popLayout">
                  <DesktopCard
                    key={activeSlot}
                    proj={activeProj}
                    page={page}
                    transitionSpec={transitionSpec}
                    slotKey={activeSlot}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── MOBILE: Stacked Scroll ── */}
      <div className="block lg:hidden py-32 px-6 md:px-12 relative z-10 w-full max-w-3xl mx-auto">
        <SectionHeader subtitle="Selected Works" title="Projects" />

        <div className="flex flex-col gap-32">
          {PROJECTS.map((proj, idx) => (
            <div key={idx} className="flex flex-col gap-8">

              {/* Header */}
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-primary/50 font-sans font-light text-3xl leading-none tracking-tighter">
                    0{idx + 1}
                  </span>
                  <h3 className="font-sans font-light text-3xl md:text-4xl leading-tight text-white">
                    {proj.title}
                  </h3>
                </div>

                {proj.landingUrl && (
                  <a
                    href={proj.landingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 self-start flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] font-sans tracking-widest uppercase hover:bg-primary/15 transition-all duration-300"
                  >
                    <ArrowUpRight className="w-2.5 h-2.5" />
                    landing.step-wise.pro
                  </a>
                )}

                <p className="text-white/55 font-sans text-sm leading-relaxed mt-2">
                  {proj.descA}
                </p>
                {proj.descB && (
                  <p className="text-white/45 font-sans text-sm leading-relaxed mt-1">
                    {proj.descB}
                  </p>
                )}
              </div>

              {/* Video */}
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] bg-background/40 backdrop-blur-md flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-0" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 blur-[60px] rounded-full" />
                {!(proj.videoUrls[0]) && (
                  <div className="relative z-10 w-16 h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white/50 pointer-events-none select-none">
                    <Play aria-hidden="true" className="w-6 h-6 ml-1" />
                  </div>
                )}
                {proj.videoUrls[0] && (
                  <iframe
                    src={getYouTubeEmbedUrl(proj.videoUrls[0])}
                    title={`${proj.title} demo video`}
                    className="absolute inset-0 w-full h-full z-20"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                )}
              </div>

              {/* Tech */}
              <div className="flex flex-wrap gap-2">
                {proj.tech.map((t, i) => (
                  <div key={i} className="px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-[13px] font-sans tracking-widest text-primary/90 leading-none">
                    {t}
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="flex flex-col">
                {proj.features.map((feat, i) => (
                  <div key={i} className="py-3 border-b border-white/10 text-sm md:text-base font-sans leading-relaxed text-white/78 flex items-start gap-2">
                    <span className="text-primary/50 shrink-0 mt-0.5">—</span>
                    <FeatureText text={feat.text} highlight={feat.highlight} />
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
