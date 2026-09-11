"use client";

import { useState, useCallback } from "react";

export function useQuoteCard() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const handleMouseEnter = useCallback((id: number) => {
        setHoveredCard(id);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHoveredCard(null);
    }, []);

    const isHovered = useCallback(
        (id: number) => hoveredCard === id,
        [hoveredCard],
    );

    return {
        hoveredCard,
        handleMouseEnter,
        handleMouseLeave,
        isHovered,
    };
}
