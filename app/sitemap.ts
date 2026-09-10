import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://matintaherzadeh.ir";

    const routes = ["", "/experience"];
    const languages = ["en", "fa"];

    const entries: MetadataRoute.Sitemap = [];

    languages.forEach((lang) => {
        routes.forEach((route) => {
            entries.push({
                url: `${baseUrl}/${lang}${route}`,
                lastModified: new Date(),
                changeFrequency: "monthly",
                priority: route === "" ? 1.0 : 0.8,
            });
        });
    });

    return entries;
}
