import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchDiagram } from "@/components/ArchDiagram";
import {
  CaseSection,
  DecisionGrid,
  NextProject,
  Prose,
  ProjectHero,
  TechGrid,
} from "@/components/case/ProjectCase";
import { getProject, projects } from "@/data/projects";
import { profile } from "@/data/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.tagline}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}`,
      title: `${project.title} — ${profile.name}`,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = project.next ? getProject(project.next) : undefined;

  return (
    <main className="relative z-10 pt-16">
      <ProjectHero project={project} />

      <CaseSection label="The problem" title="What was being solved.">
        <Prose paragraphs={project.problem} />
      </CaseSection>

      <CaseSection label="The approach" title="How the system was designed.">
        <Prose paragraphs={project.approach} />
      </CaseSection>

      <CaseSection label="Architecture" title="The system, drawn.">
        <ArchDiagram
          nodes={project.architecture.nodes}
          edges={project.architecture.edges}
          caption={project.architecture.caption}
        />
      </CaseSection>

      <CaseSection label="Engineering decisions" title="Why it&apos;s built this way.">
        <DecisionGrid decisions={project.decisions} />
      </CaseSection>

      <CaseSection label="Challenges" title="What was actually hard.">
        <DecisionGrid decisions={project.challenges} />
      </CaseSection>

      <CaseSection label="Result" title="What the system achieved.">
        <Prose paragraphs={project.result} />
      </CaseSection>

      <CaseSection label="Technologies" title="The stack, grouped by role.">
        <TechGrid groups={project.technologies} />
      </CaseSection>

      {next ? <NextProject project={next} /> : null}
    </main>
  );
}
