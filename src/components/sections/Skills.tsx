import { BadgeCheck, Braces } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { certifications, skillGroups } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="section-shell">
      <SectionHeading
        eyebrow="Technical Toolkit"
        title="Skills and"
        highlightedWord="Expertise"
        description="Technologies and engineering practices I use to build frontend applications, backend services, databases, data workflows, and intelligent systems."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal
            key={group.title}
            className="glass-card rounded-[1.75rem] p-7"
            delay={index * 0.05}
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-pink-500 text-white">
              <Braces size={26} />
            </div>

            <h3 className="text-xl font-bold">{group.title}</h3>

            <div className="mt-6 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={skill} className="tag">
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="glass-card mt-8 rounded-[1.75rem] p-7 sm:p-9">
        <div className="mb-6 flex items-center gap-3">
          <BadgeCheck className="text-violet-400" size={27} />
          <h3 className="text-2xl font-bold">Certifications</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {certifications.map((certification) => (
            <div
              key={certification}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-5 text-[var(--muted)]"
            >
              {certification}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
