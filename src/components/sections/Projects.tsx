"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Code2, ExternalLink, Layers3 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

import SectionHeading from "@/components/ui/SectionHeading";
import { projectCategories, projects, type ProjectCategory } from "@/data/portfolio";

type SelectedCategory = "All" | ProjectCategory;

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section id="projects" className="section-shell">
      <SectionHeading
        eyebrow="Selected Work"
        title="Featured"
        highlightedWord="Projects"
        description="Projects demonstrating full-stack development, business software, artificial intelligence, machine learning, database integration, and data analysis."
      />

      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {projectCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "filter-button-active" : "filter-button"}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const hasGitHubUrl = project.githubUrl.trim().length > 0;

            const hasLiveUrl = project.liveUrl.trim().length > 0;

            return (
              <motion.article
                layout
                key={project.id}
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.92,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="glass-card group flex h-full flex-col rounded-[1.75rem] p-7"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 text-white shadow-lg shadow-violet-500/20">
                    <Layers3 size={25} />
                  </div>

                  <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold leading-tight transition-colors group-hover:text-violet-300">
                  {project.title}
                </h3>

                <p className="mt-4 leading-7 text-[var(--muted)]">{project.summary}</p>

                <div className="mt-6 space-y-3">
                  {project.achievements.slice(0, 3).map((achievement) => (
                    <div key={achievement} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-pink-400" />

                      <p className="text-sm leading-6 text-[var(--muted)]">{achievement}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span key={technology} className="tag">
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                  {hasGitHubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-secondary-small"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <FaGithub size={16} />
                      Source Code
                      <ArrowUpRight size={15} />
                    </a>
                  ) : (
                    <span
                      className="button-secondary-small cursor-not-allowed opacity-45"
                      title="Repository URL has not been added yet"
                    >
                      <Code2 size={16} />
                      Code Coming Soon
                    </span>
                  )}

                  {hasLiveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-primary"
                      aria-label={`Open the live demo of ${project.title}`}
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
