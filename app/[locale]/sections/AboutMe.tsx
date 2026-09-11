import type { ComponentProps } from "react";
import AboutMeImageGraphWrapper from "@/app/components/about-me/AboutMeImageGraphWrapper";

type AboutMeSectionProps = ComponentProps<typeof AboutMeImageGraphWrapper>;

export default function AboutMeSection() {
    return (
        <>
            <AboutMeImageGraphWrapper />
            <div className="flex flex-col w-full"></div>
        </>
    );
}
