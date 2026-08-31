"use client";

import { useState, useCallback } from "react";

export function useQuoteCard() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleMouseEnter = useCallback((id: string) => {
    setHoveredCard(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  const isHovered = useCallback((id: string) => hoveredCard === id, [hoveredCard]);

  return {
    hoveredCard,
    handleMouseEnter,
    handleMouseLeave,
    isHovered,
  };
}
