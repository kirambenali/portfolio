import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 mb-16 md:mb-24 relative z-10 w-full", className)}>
      {subtitle && (
        <h2 className="text-sm font-sans tracking-widest text-primary uppercase font-semibold">
          {subtitle}
        </h2>
      )}
      <h3 className="text-4xl md:text-[2.75rem] lg:text-5xl font-sans font-light leading-tight text-white">
        {title}
      </h3>
    </div>
  );
}
