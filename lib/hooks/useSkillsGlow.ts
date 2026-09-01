import { useCallback, useRef } from "react";
import type { MutableRefObject } from "react";

const HIGHLIGHT_RADIUS = 260;
const FALL_OFF = 1.0;

export interface SkillPosition {
    x: number;
    y: number;
}

export interface SkillsGlowUtils {
    tick: () => void;
    updateLastPos: (x: number, y: number) => void;
    scheduleRaf: () => void;
    cancelRaf: () => void;
    rafRef: MutableRefObject<number | null>;
}

export function useSkillsGlow(
    itemRefs: MutableRefObject<(HTMLElement | null)[]>,
    positions: MutableRefObject<(SkillPosition | null)[]>,
    isTouchDevice: boolean,
    selectedCategory: string | null,
    showAll: boolean,
    skillKeysLeft: string[],
    skillKeysRight: string[],
    skillCategoryMap: Record<string, string>,
): SkillsGlowUtils {
    const rafRef = useRef<number | null>(null);
    const lastPos = useRef({ x: 0, y: 0 });

    const tick = useCallback(() => {
        const allSkillKeys = [...skillKeysLeft, ...skillKeysRight];
        const runGlowLogic = !isTouchDevice && !selectedCategory && !showAll;

        const { x: cx, y: cy } = runGlowLogic
            ? lastPos.current
            : { x: 0, y: 0 };

        const radius = HIGHLIGHT_RADIUS;
        const base = 0;
        const max = 1;

        if (!positions || !positions.current || positions.current.length === 0)
            return;

        positions.current.forEach((pos, idx) => {
            const el = itemRefs.current[idx];
            if (!el || !pos) return;

            const skillKey = allSkillKeys[idx];
            const skillCategory = skillCategoryMap[skillKey];
            const isSelected = selectedCategory === skillCategory;

            let glowOpacity = 0;

            if (runGlowLogic) {
                const dx = pos.x - cx;
                const dy = pos.y - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                let t = Math.max(0, (radius - dist) / radius);
                t = Math.pow(t, FALL_OFF);
                glowOpacity = base + (max - base) * t;
            }

            let finalOpacity: number;
            if (isTouchDevice) {
                if (showAll || isSelected) {
                    finalOpacity = max;
                } else {
                    return;
                }
            } else if (showAll) {
                finalOpacity = max;
            } else if (isSelected) {
                finalOpacity = max;
            } else {
                finalOpacity = glowOpacity;
            }

            el.style.opacity = String(finalOpacity);
        });

        rafRef.current = null;
    }, [
        selectedCategory,
        showAll,
        isTouchDevice,
        skillKeysLeft,
        skillKeysRight,
        skillCategoryMap,
        itemRefs,
        positions,
    ]);

    const updateLastPos = useCallback((x: number, y: number) => {
        lastPos.current = { x, y };
    }, []);

    const scheduleRaf = useCallback(() => {
        if (rafRef.current === null) {
            rafRef.current = requestAnimationFrame(tick);
        }
    }, [tick]);

    const cancelRaf = useCallback(() => {
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    }, []);

    return {
        tick,
        updateLastPos,
        scheduleRaf,
        cancelRaf,
        rafRef,
    };
}
