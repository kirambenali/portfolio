import { useRef } from "react";
import { useScroll } from "framer-motion";
import { HeroSection } from "@/components/sections/hero";
import { ManifestoSection } from "@/components/sections/manifesto";
import { ExperienceSection } from "@/components/sections/experience";
import { ExpertiseSection } from "@/components/sections/expertise";
import { ProjectsSection } from "@/components/sections/projects";
import { EducationSection } from "@/components/sections/education";
import { AchievementsSection } from "@/components/sections/achievements";
import { ContactSection } from "@/components/sections/contact";
import { SectionIndicator } from "@/components/section-indicator";
import { SectionProvider } from "@/lib/section-context";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SectionProvider>
      <div ref={containerRef} className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground font-sans">
        <SectionIndicator />
        
        <main>
          <HeroSection />
          <ManifestoSection />
          <ExperienceSection />
          <ExpertiseSection />
          <ProjectsSection />
          <EducationSection />
          <AchievementsSection />
          <ContactSection />
        </main>
      </div>
    </SectionProvider>
  );
}
