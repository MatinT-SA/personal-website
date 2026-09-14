import type { Metadata } from "next";
import type { AbstractIntlMessages } from "next-intl";
import { getMessages } from "next-intl/server";

import HomeClient from "./HomeClient";
import AboutMeSection from "./sections/AboutMe";

interface HomePageProps {
    params: Promise<{ locale: string }>;
}

function getMessage(messages: AbstractIntlMessages, key: string): string {
    const value = key.split(".").reduce<unknown>((current, part) => {
        if (current && typeof current === "object" && part in current) {
            return (current as Record<string, unknown>)[part];
        }

        return undefined;
    }, messages);

    return typeof value === "string" ? value : "";
}

export async function generateMetadata({
    params,
}: HomePageProps): Promise<Metadata> {
    const { locale } = await params;
    const messages = await getMessages({ locale });

    const t = (key: string) => getMessage(messages, key);

    const keywordsString = t("seo.home.keywords");
    const keywordsArray =
        keywordsString.length > 0
            ? keywordsString.split(",").map((keyword) => keyword.trim())
            : [];

    return {
        title: t("seo.home.title"),
        description: t("seo.home.description"),
        keywords: keywordsArray,
        openGraph: {
            title: t("seo.home.title"),
            description: t("seo.home.description"),
            locale: locale === "en" ? "en_US" : "fa_IR",
            url: `https://matintaherzadeh.ir/${locale}`,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t("seo.home.title"),
            description: t("seo.home.description"),
        },
    };
}

export default async function Home({ params }: HomePageProps) {
    const { locale } = await params;
    const aboutMeContent = <AboutMeSection />;

    return <HomeClient aboutMeServerContent={aboutMeContent} locale={locale} />;
}
