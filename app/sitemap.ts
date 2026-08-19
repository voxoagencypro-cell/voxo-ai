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

  return ["fr", "de", "en"].flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : route === "/receptionniste-ia" ? 0.9 : 0.8,
    }))
  );
}