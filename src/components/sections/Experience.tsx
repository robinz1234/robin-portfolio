"use client";

import { AnimatePresence, motion } from "motion/react";
import { BriefcaseBusiness, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { experiences } from "@/data/portfolio";

export default function Experience() {
  const [openExperience, setOpenExperience] = useState<string>(experiences[0].id);

  return (
    <section id="experience" className="section-shell">
      <SectionHeading
        eyebrow="Career Journey"
        title="Professional"
        highlightedWord="Experience"
        description="A summary of my practical work across full-stack development, web engineering, deployment, data processing, and reporting automation."
      />

      <div className="mx-auto max-w-5xl space-y-5">
        {experiences.map((experience) => {
          const isOpen = openExperience === experience.id;

          return (
            <motion.article
              key={experience.id}
              layout
              className="glass-card overflow-hidden rounded-[1.75rem]"
            >
              <button
                type="button"
                onClick={() => setOpenExperience(isOpen ? "" : experience.id)}
                className="flex w-full items-start justify-between gap-5 p-6 text-left sm:p-8"
                aria-expanded={isOpen}
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-400">
                    <BriefcaseBusiness size={23} />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold sm:text-xl">{experience.role}</h3>
                    <p className="mt-1 font-semibold text-violet-400">{experience.company}</p>
                    <p className="mt-2 text-sm text-[var(--muted)]">{experience.location}</p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden rounded-full bg-[var(--surface-soft)] px-4 py-2 text-sm text-[var(--muted)] sm:block">
                    {experience.period}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`text-violet-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[var(--border)] px-6 pb-7 pt-6 sm:px-8 sm:pb-8">
                      <p className="leading-7 text-[var(--muted)]">{experience.description}</p>

                      <div className="mt-6 space-y-3">
                        {experience.achievements.map((achievement) => (
                          <div key={achievement} className="flex items-start gap-3">
                            <CheckCircle2 size={18} className="mt-1 shrink-0 text-pink-400" />
                            <p className="leading-7 text-[var(--muted)]">{achievement}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-7 flex flex-wrap gap-2">
                        {experience.technologies.map((technology) => (
                          <span key={technology} className="tag">
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
