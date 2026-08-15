import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

// TODO: replace with the real deployment URL
const base = "https://salmanmuhammad.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const projectPages = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectPages,
  ];
}
