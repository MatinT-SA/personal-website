import type { IconType } from "react-icons";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

type SocialLinksProps = {
    isMenuOpen?: boolean;
};

type SocialLink = {
    icon: IconType;
    url: string;
    color: string;
};

export default function SocialLinks({ isMenuOpen = false }: SocialLinksProps) {
    const links: SocialLink[] = [
        {
            icon: FaLinkedin,
            url: "https://www.linkedin.com/in/matin-taherzadeh-sa",
            color: "hover:text-[rgb(0,0,204)]",
        },
        {
            icon: FaInstagram,
            url: "https://www.instagram.com/matin_taherzadeh_sa/",
            color: "hover:text-[rgb(255,0,191)]",
        },
        {
            icon: FaGithub,
            url: "https://github.com/MatinT-SA",
            color: "hover:text-[rgb(255,123,0)]",
        },
        {
            icon: FaTwitter,
            url: "https://twitter.com/MatinT_SA",
            color: "hover:text-[rgb(86,154,243)]",
        },
    ];

    const gapClass = isMenuOpen ? "gap-15 mt-4" : "gap-5 mt-7";

    return (
        <div className={`flex ${gapClass} text-xl text-blue-light`}>
            {links.map(({ icon: Icon, url, color }) => (
                <a key={url} href={url} target="_blank" rel="noopener" aria-label={url}>
                    <Icon className={`transition ${color}`} />
                </a>
            ))}
        </div>
    );
}
