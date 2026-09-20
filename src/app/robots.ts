import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";

// Crawler guidance. Set NEXT_PUBLIC_SITE_URL in production so the sitemap host is correct.
export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url || "https://www.example.com";
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
