import type { MetadataRoute } from "next";

// TODO: replace with the real deployment URL
const base = "https://salmanmuhammad.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
