import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";

// Anchor-aware sitemap: single-page IA plus each section fragment.
// Replace the fallback host by setting NEXT_PUBLIC_SITE_URL.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url || "https://www.example.com";
  const lastModified = new Date();
  const anchors = ["", ...siteConfig.nav.map((item) => item.href)];
  return anchors.map((hash, i) => ({
    url: `${base}/${hash}`,
    lastModified,
    changeFrequency: "monthly",
    priority: i === 0 ? 1 : 0.8,
  }));
}
