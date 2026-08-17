import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useSection } from "@/lib/section-context";

export function useSectionInView(index: number, amount: "some" | "all" | number = 0.5) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount });
  const { setActiveIndex } = useSection();

  useEffect(() => {
    if (isInView) {
      setActiveIndex(index);
    }
  }, [isInView, index, setActiveIndex]);

  return ref;
}
