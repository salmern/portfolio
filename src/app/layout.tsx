import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Backdrop } from "@/components/Backdrop";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { profile } from "@/data/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// TODO: replace with the real deployment URL
const siteUrl = "https://salmanmuhammad.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Senior Software Engineer`,
    template: `%s — ${profile.name}`,
  },
  description:
    "Salman Muhammad is a senior software engineer building backend, payment, and blockchain systems in TypeScript, Node.js, Python, and Rust.",
  keywords: [
    "Senior software engineer",
    "TypeScript developer",
    "Node.js engineer",
    "Python developer",
    "Rust developer",
    "blockchain developer",
    "Solana developer",
    "payment engineer",
    "backend engineer",
    "smart contracts",
    "Anchor",
    "distributed systems",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — Senior Software Engineer`,
    description:
      "Senior software engineer: TypeScript, Node.js, Python, and Rust services, payment rails, settlement systems, and smart contracts for production.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Senior Software Engineer`,
    description:
      "Senior software engineer: TypeScript, Node.js, Python, and Rust services, payment rails, settlement systems, and smart contracts for production.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="relative min-h-screen bg-bg text-ink antialiased">
        <Backdrop />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
