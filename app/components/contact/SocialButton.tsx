"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { IconType } from "react-icons";

type SocialButtonStyle = CSSProperties & {
  "--brand-color": string;
};

type SocialButtonProps = {
  icon?: IconType;
  name: string;
  href: string;
  color: string;
  label: string;
  isEven: boolean;
};

export default function SocialButton({
  icon: SocialIcon,
  name,
  href,
  color,
  label,
  isEven,
}: SocialButtonProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);
  const locale = useLocale();
  const isRTL = locale === "fa";

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth + 16);
    }
  }, []);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener"
      className={`group relative flex items-center w-[60px] mx-[30px] rounded-full bg-yellow-light ${
        isRTL ? "gap-3" : ""
      } shadow-lg cursor-pointer overflow-hidden transition-all ease-out`}
      initial={{ opacity: 0, y: isEven ? 20 : -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.1 }}
      whileHover={{ width: 80 + textWidth }}
      aria-label={name}
      style={{ "--brand-color": color } as SocialButtonStyle}
    >
      <div className="flex justify-center items-center w-[60px] h-[60px] rounded-full bg-yellow-primary transition-colors duration-300 ease-out shrink-0">
        {SocialIcon && (
          <SocialIcon className="text-4xl text-black transition-colors duration-300 group-hover:text-(--brand-color)" />
        )}
      </div>

      <span
        ref={textRef}
        className="ml-2 flex items-center font-medium text-2xl opacity-0 transition-all duration-300 whitespace-nowrap group-hover:opacity-100"
        style={{ color }}
      >
        {label}
      </span>
    </motion.a>
  );
}
