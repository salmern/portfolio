import { About } from "@/components/About";
import { Arsenal } from "@/components/Arsenal";
import { Building } from "@/components/Building";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Hero } from "@/components/Hero";
import { Principles } from "@/components/Principles";
import { SignalStrip } from "@/components/SignalStrip";
import { SystemFlow } from "@/components/SystemFlow";

export default function Home() {
  return (
    <main className="relative z-10">
      <Hero />
      <SignalStrip />
      <FeaturedProjects />
      <About />
      <Arsenal />
      <Principles />
      <Experience />
      <Building />
      <SystemFlow />
      <Contact />
    </main>
  );
}
