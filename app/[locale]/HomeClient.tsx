"use client";

import { useState, type ReactNode } from "react";

import useSectionObserver from "@/lib/hooks/useSectionObserver";
import FloatingUI from "@app/components/layout/FloatingUI";
import AboutMeClient from "@app/components/about-me/AboutMeClient";

import Comment from "./sections/Comment";
import Contact from "./sections/Contact";
import Entrepreneur from "./sections/Entrepreneur";
import Footer from "./sections/Footer";
import HomeSection from "./sections/HomeSection";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";

interface HomeClientProps {
    aboutMeServerContent: ReactNode;
    githubData?: unknown;
    locale?: string;
}

export default function HomeClient({
    aboutMeServerContent,
    githubData,
}: HomeClientProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const { allRefs, activeSectionId } = useSectionObserver();
    const {
        home: homeRef,
        "about-me": aboutMeRef,
        skills: skillsRef,
        projects: projectsRef,
        entrepreneur: entrepreneurRef,
        contact: contactRef,
        comment: commentRef,
    } = allRefs;

    return (
        <main>
            <HomeSection ref={homeRef} />

            <AboutMeClient ref={aboutMeRef} githubData={githubData}>
                {aboutMeServerContent}
            </AboutMeClient>

            <Skills ref={skillsRef} />
            <Projects ref={projectsRef} />
            <Entrepreneur ref={entrepreneurRef} />
            <Contact ref={contactRef} />
            <Comment ref={commentRef} />
            <Footer />

            <FloatingUI
                activeSectionId={activeSectionId}
                aboutMeRef={aboutMeRef}
                isPopupOpen={isPopupOpen}
                setIsPopupOpen={setIsPopupOpen}
            />
        </main>
    );
}
