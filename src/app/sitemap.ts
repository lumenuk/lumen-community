import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/how-it-works",
    "/services",
    "/growth-audit",
    "/blog",
    "/faq",
    "/privacy-policy",
    "/terms",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  return [...staticRoutes, ...postRoutes];
}
