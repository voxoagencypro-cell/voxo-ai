import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://voxo-ai.ch";

  const routes = [
    "",
    "/demo",
    "/tarifs",
    "/contact",
    "/receptionniste-ia",
  ];

  const mainPages: MetadataRoute.Sitemap = ["fr", "de", "en"].flatMap(
    (locale) =>
      routes.map((route) => ({
        url: `${base}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority:
          route === ""
            ? 1
            : route === "/receptionniste-ia"
              ? 0.9
              : 0.8,
      }))
  );

  const localPages: MetadataRoute.Sitemap = [
    {
      url: `${base}/fr/receptionniste-ia-geneve`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  return [...mainPages, ...localPages];
}