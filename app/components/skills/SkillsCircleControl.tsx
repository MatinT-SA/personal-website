"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import type { SkillCircleData } from "@/app/src/constants/skillsData";
import SkillsCircle from "./SkillsCircle";

interface SkillsCircleControlProps {
    circleData: SkillCircleData[];
    onSliceClick: (categoryName: string) => void;
    onShowAllToggle: () => void;
    showAll: boolean;
}

export default function SkillsCircleControl({
    circleData,
    onSliceClick,
    onShowAllToggle,
    showAll,
}: SkillsCircleControlProps) {
    const t = useTranslations("skills");

    const handleShowAllClick = useCallback(() => {
        onShowAllToggle();
    }, [onShowAllToggle]);

    return (
        <div className="hidden xl:flex xl:justify-center relative max-xl:order-first">
            <SkillsCircle data={circleData} onSliceClick={onSliceClick} />
            <div
                onClick={handleShowAllClick}
                className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer font-bold text-center text-sky-900 transition-opacity duration-300"
            >
                {showAll ? t("hide_all") : t("show_all")}
            </div>
        </div>
    );
}
