import type { MetadataRoute } from "next";
import { profile } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Rust Backend & Blockchain Payments Engineer`,
    short_name: profile.monogram,
    description:
      "Secure backend and blockchain infrastructure: Rust services, payment rails, settlement systems, and Solana smart contracts.",
    start_url: "/",
    display: "standalone",
    background_color: "#08080a",
    theme_color: "#08080a",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
