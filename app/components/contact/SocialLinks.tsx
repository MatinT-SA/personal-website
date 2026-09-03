"use client";

import type { IconType } from "react-icons";
import SocialButton from "./SocialButton";

type SocialLink = {
  name: string;
  icon: IconType;
  color: string;
  href: string;
  label: string;
};

type SocialLinksProps = {
  socialLinks: SocialLink[];
};

export default function SocialLinks({ socialLinks }: SocialLinksProps) {
  return (
    <div className="flex justify-center flex-wrap gap-y-4 my-8 lg:my-16">
      {socialLinks.map((link, index) => (
        <div key={index} className="w-full flex justify-center sm:w-auto">
          <SocialButton {...link} isEven={index % 2 === 1} />
        </div>
      ))}
    </div>
  );
}
