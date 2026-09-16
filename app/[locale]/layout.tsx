import type { Metadata } from "next";
import type { ReactNode } from "react";

import LocaleSwitcher from "@app/components/layout/LocaleSwitcher";
import { routing } from "@i18n/routing";
import type { AppLocale } from "@i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

function isAppLocale(locale: string): locale is AppLocale {
    return routing.locales.some((supportedLocale) => supportedLocale === locale);
}

async function getMessages(locale: AppLocale) {
    try {
        const messagesModule = await import(`@/messages/${locale}.json`);
        return messagesModule.default;
    } catch {
        notFound();
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    if (!isAppLocale(locale)) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: "seo.home" });

    return {
        title: t("title", { defaultValue: "Matin Taherzadeh" }),
        description: t("description", {
            defaultValue: "Matin Taherzadeh portfolio",
        }),
        alternates: {
            canonical: `https://matintaherzadeh.ir/${locale}`,
            languages: {
                fa: "https://matintaherzadeh.ir/fa",
                en: "https://matintaherzadeh.ir/en",
                "x-default": "https://matintaherzadeh.ir/fa",
            },
        },
        openGraph: {
            url: `https://matintaherzadeh.ir/${locale}`,
            siteName: t("title", { defaultValue: "Matin Taherzadeh" }),
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
        },
    };
}

export function generateStaticParams(): { locale: AppLocale }[] {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocalizedLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!isAppLocale(locale)) {
        notFound();
    }

    const messages = await getMessages(locale);
    const direction = locale === "fa" ? "rtl" : "ltr";
    setRequestLocale(locale);

    return (
        <html lang={locale} dir={direction} className="scroll-smooth">
            <body
                className={`antialiased
                    bg-linear-to-r from-white to-[#ffe6ff]
                    overflow-x-hidden text-black font-shabnam`}
            >
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <div id="home" className="scroll-mt-52">
                        {children}
                    </div>
                    <LocaleSwitcher />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
