import { BookOpen, MapPin, UserRound } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { education, personalInfo, statistics } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="section-shell">
      <SectionHeading
        eyebrow="Who I Am"
        title="About"
        highlightedWord="Me"
        description="A developer focused on practical software engineering, maintainable architecture, and solutions that address real business requirements."
      />

      <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="glass-card rounded-[2rem] p-7 sm:p-9">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 text-white">
            <UserRound size={27} />
          </div>

          <h3 className="mb-6 text-2xl font-bold">Professional Profile</h3>

          <div className="space-y-5 text-base leading-8 text-[var(--muted)]">
            {personalInfo.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <div className="space-y-7">
          <Reveal className="glass-card rounded-[2rem] p-7 sm:p-9" delay={0.1}>
            <div className="mb-5 flex items-center gap-3">
              <BookOpen className="text-violet-400" />
              <h3 className="text-2xl font-bold">Education</h3>
            </div>

            <div className="space-y-6">
              {education.map((item) => (
                <div
                  key={`${item.qualification}-${item.period}`}
                  className="border-l-2 border-violet-500/60 pl-5"
                >
                  <h4 className="font-semibold text-[var(--text)]">{item.qualification}</h4>
                  <p className="mt-1 text-violet-400">{item.institution}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{item.period}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="glass-card rounded-[2rem] p-7 sm:p-9" delay={0.15}>
            <div className="mb-5 flex items-center gap-3">
              <MapPin className="text-pink-400" />
              <h3 className="text-2xl font-bold">Quick Overview</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {statistics.map((statistic) => (
                <div
                  key={statistic.label}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-5 text-center"
                >
                  <p className="gradient-text text-3xl font-black">{statistic.value}</p>
                  <p className="mt-2 text-sm leading-5 text-[var(--muted)]">{statistic.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
