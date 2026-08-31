import { useCallback } from "react";
import type { MutableRefObject, MouseEvent as ReactMouseEvent } from "react";
import type { SkillsGlowUtils } from "./useSkillsGlow";

export function useSkillsMouseHandlers(
  containerRef: MutableRefObject<HTMLElement | null>,
  itemRefs: MutableRefObject<(HTMLElement | null)[]>,
  isTouchDevice: boolean,
  selectedCategory: string | null,
  showAll: boolean,
  tick: () => void,
  glowUtils: SkillsGlowUtils
) {
  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLElement>) => {
      if (isTouchDevice) return;
      const cont = containerRef.current;
      if (!cont) return;
      const rect = cont.getBoundingClientRect();
      glowUtils.updateLastPos(e.clientX - rect.left, e.clientY - rect.top);
      glowUtils.scheduleRaf();
    },
    [isTouchDevice, glowUtils, containerRef]
  );

  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice) return;
    const cont = containerRef.current;
    if (cont) cont.style.cursor = "none";
    if (selectedCategory || showAll) tick();
  }, [isTouchDevice, selectedCategory, showAll, tick, containerRef]);

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return;
    const cont = containerRef.current;
    if (cont) cont.style.cursor = "auto";

    if (!selectedCategory && !showAll) {
      itemRefs.current.forEach((el) => {
        if (el) el.style.opacity = "0";
      });
    }
  }, [isTouchDevice, selectedCategory, showAll, containerRef, itemRefs]);

  return {
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
}
