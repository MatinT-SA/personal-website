import { getRequestConfig } from "next-intl/server";
import { routing, type AppLocale } from "./routing";

const messagesMap = {
    fa: () => import("@/messages/fa.json"),
    en: () => import("@/messages/en.json"),
};

function isAppLocale(locale: string | undefined): locale is AppLocale {
    return (
        typeof locale === "string" &&
        routing.locales.some((supportedLocale) => supportedLocale === locale)
    );
}

export default getRequestConfig(async ({ locale }) => {
    const finalLocale: AppLocale = isAppLocale(locale)
        ? locale
        : routing.defaultLocale;

    const messagesModule = await messagesMap[finalLocale]();

    return {
        locale: finalLocale,
        messages: messagesModule.default,
    };
});
