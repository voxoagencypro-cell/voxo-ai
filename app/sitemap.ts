import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.voxo-ai.ch";

  const marketingRoutes = [
    "",
    "/consulting-ia",
    "/acquisition-publicite",
    "/agents-ia",
    "/crm-automatisation",
    "/demo",
    "/tarifs",
    "/contact",
    "/receptionniste-ia",
  ];

  const mainPages: MetadataRoute.Sitemap = ["fr", "de", "en"].flatMap(
    (locale) =>
      marketingRoutes.map((route) => ({
        url: `${base}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : route === "/demo" ? 0.95 : 0.85,
      })),
  );

  const localFrPages = [
    "/receptionniste-ia-geneve",
    "/ia-garage-automobile-geneve",
    "/ia-immobilier-geneve",
    "/ia-restaurant-geneve",
    "/ia-salon-coiffure-geneve",
    "/ia-institut-beaute-geneve",
  ];

  const localPages: MetadataRoute.Sitemap = localFrPages.map((route) => ({
    url: `${base}/fr${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Pages légales (accessibles sans cookie portail)
  const legalPages: MetadataRoute.Sitemap = ["fr", "de", "en"].flatMap(
    (locale) =>
      ["/politique-confidentialite", "/mentions-legales"].map((route) => ({
        url: `${base}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.3,
      })),
  );

  return [...mainPages, ...localPages, ...legalPages];
}
