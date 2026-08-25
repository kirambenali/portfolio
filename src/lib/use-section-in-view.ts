import { useEffect, useRef } from "react";
import { useSection } from "@/lib/section-context";

export function useSectionInView(index: number, _amount: "some" | "all" | number = 0.5) {
  const ref = useRef<HTMLElement>(null);
  const { setActiveIndex } = useSection();

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const middleThreshold = viewportHeight * 0.45;

      // Section is active if its top has passed into the middle and its bottom is still below the middle
      if (rect.top <= middleThreshold && rect.bottom > middleThreshold) {
        setActiveIndex(index);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [index, setActiveIndex]);

  return ref;
}
