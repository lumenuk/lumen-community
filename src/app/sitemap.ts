import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getPostSlugs } from "@/lib/insights";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/services",
    "/contact",
    "/faq",
    "/insights",
    "/privacy-policy",
    "/terms",
  ];

  const postRoutes = (await getPostSlugs()).map((slug) => `/insights/${slug}`);

  return [...staticRoutes, ...postRoutes].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
