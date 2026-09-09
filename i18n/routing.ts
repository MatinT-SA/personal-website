import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

const locales = ["fa", "en"] as const;

export const routing = defineRouting({
    locales,
    defaultLocale: "fa",
    localePrefix: "always",
});

export type AppLocale = (typeof locales)[number];

export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
