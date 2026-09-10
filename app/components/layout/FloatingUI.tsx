"use client";

import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import type { Dispatch, RefObject, SetStateAction } from "react";

import GoToTopButton from "./GoToTopButton";
import GithubRepositoryButton from "../projects/GithubRepositoryButton";
import ProjectsPageButton from "../projects/ProjectsPageButton";
import ProjectsPopup from "../projects/ProjectsPopup";

interface FloatingUIProps {
    activeSectionId: string | null;
    aboutMeRef: RefObject<HTMLElement | null>;
    isPopupOpen: boolean;
    setIsPopupOpen: Dispatch<SetStateAction<boolean>>;
}

const TOAST_OPTIONS = {
    success: {
        style: {
            marginBottom: "1.5rem",
            marginLeft: "1.5rem",
            color: "var(--color-purple-primary)",
            borderRadius: "10px",
            padding: ".5rem 1rem",
            fontSize: "1rem",
            maxWidth: "400px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        },
    },
    error: {
        style: {
            marginBottom: "1.5rem",
            marginLeft: "1.5rem",
            borderRadius: "10px",
            color: "red",
            padding: ".75rem 1.25rem",
            fontSize: "1.2rem",
            maxWidth: "400px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        },
    },
};

export default function FloatingUI({
    activeSectionId,
    aboutMeRef,
    isPopupOpen,
    setIsPopupOpen,
}: FloatingUIProps) {
    return (
        <>
            <Toaster position="bottom-right" toastOptions={TOAST_OPTIONS} />

            <GithubRepositoryButton activeSectionId={activeSectionId} />

            <ProjectsPageButton activeSectionId={activeSectionId} />

            <GoToTopButton aboutMeRef={aboutMeRef} />

            <AnimatePresence>
                {isPopupOpen && (
                    <ProjectsPopup onClose={() => setIsPopupOpen(false)} />
                )}
            </AnimatePresence>
        </>
    );
}
