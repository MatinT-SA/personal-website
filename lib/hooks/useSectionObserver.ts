import { useEffect, useRef, useState, useMemo } from "react";
import type { MutableRefObject } from "react";

const SECTION_IDS = [
  "home",
  "about-me",
  "skills",
  "projects",
  "entrepreneur",
  "contact",
  "comment",
] as const;

type SectionId = (typeof SECTION_IDS)[number];
type SectionRefs = Record<SectionId, MutableRefObject<HTMLElement | null>>;

export default function useSectionObserver() {
  const homeRef = useRef<HTMLElement | null>(null);
  const aboutMeRef = useRef<HTMLElement | null>(null);
  const skillsRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const entrepreneurRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);
  const commentRef = useRef<HTMLElement | null>(null);

  const allRefs = useMemo<SectionRefs>(
    () => ({
      home: homeRef,
      "about-me": aboutMeRef,
      skills: skillsRef,
      projects: projectsRef,
      entrepreneur: entrepreneurRef,
      contact: contactRef,
      comment: commentRef,
    }),
    []
  );

  const [activeSectionId, setActiveSectionId] = useState<SectionId | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      let currentSectionId: SectionId | null = null;
      const scrollPosition = window.scrollY + 150;

      for (const id of SECTION_IDS) {
        const ref = allRefs[id];
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionBottom = sectionTop + rect.height;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSectionId = id;
            break;
          }
        }
      }
      setActiveSectionId(currentSectionId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [allRefs]);

  return { allRefs, activeSectionId };
}
