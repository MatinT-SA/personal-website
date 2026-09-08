"use client";

import { useCallback, useEffect, useRef } from "react";

interface SkillsListProps {
    skills?: string[];
    baseIndex?: number;
    registerItem: (index: number, element: HTMLLIElement) => void;
    className?: string;
}

export default function SkillsList({
    skills = [],
    baseIndex = 0,
    registerItem,
    className = "",
}: SkillsListProps) {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

    const setupObserver = useCallback(() => {
        if (typeof window === "undefined") return;

        observerRef.current?.disconnect();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -150px 0px",
            },
        );

        observerRef.current = observer;

        itemRefs.current.forEach((element) => {
            if (element) observer.observe(element);
        });
    }, []);

    useEffect(() => {
        setupObserver();
        window.addEventListener("resize", setupObserver);
        return () => {
            window.removeEventListener("resize", setupObserver);
            observerRef.current?.disconnect();
        };
    }, [setupObserver]);

    const handleRef = (element: HTMLLIElement | null, index: number) => {
        if (!element) return;

        itemRefs.current[index] = element;
        registerItem(baseIndex + index, element);
    };

    return (
        <ul className={`space-y-4 text-center ${className}`}>
            {skills.map((skill, index) => (
                <li
                    key={baseIndex + index}
                    ref={(element) => handleRef(element, index)}
                    className={`
                        flex items-center justify-center py-2 text-md font-medium text-dark-primary
                        lg:will-change-[opacity,transform]
                        xl:opacity-0
                        xl:transition-opacity xl:duration-100 xl:ease-linear
                        max-xl:opacity-0
                        max-xl:-translate-y-8
                        max-xl:transition-all
                        max-xl:duration-700
                        max-xl:ease-out
                        [&.is-visible]:max-xl:opacity-100
                        [&.is-visible]:max-xl:translate-y-0
                    `}
                >
                    {skill}
                </li>
            ))}
        </ul>
    );
}
