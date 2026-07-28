import { ArrowDown, ArrowRight, Code2, Download, Mail, MapPin, Sparkles } from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

import Reveal from "@/components/ui/Reveal";
import { personalInfo } from "@/data/portfolio";

const socialLinks = [
  {
    label: "GitHub",
    href: personalInfo.github,
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: personalInfo.linkedin,
    icon: FaLinkedin,
  },
  {
    label: "Email",
    href: `mailto:${personalInfo.email}`,
    icon: Mail,
  },
];

export default function Hero() {
  return (
    <section id="home" className="hero-section section-shell flex min-h-screen items-center pt-32">
      <div className="hero-spotlight hero-spotlight-left" />
      <div className="hero-spotlight hero-spotlight-right" />

      <div className="relative z-10 grid w-full items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
        <Reveal>
          <div className="hero-status-pill">
            <span className="hero-status-dot" />
            <Sparkles size={16} />
            Available for software development opportunities
          </div>

          <p className="mb-4 mt-7 text-lg font-medium text-[var(--muted)]">Hello, I am</p>

          <h1 className="hero-title max-w-4xl text-[clamp(3.1rem,7.5vw,7.3rem)] font-black leading-[0.92] tracking-[-0.055em]">
            Tajwar Al Haque <span className="hero-title-gradient">Robin</span>
          </h1>

          <h2 className="mt-8 text-xl font-semibold text-[var(--text)] sm:text-2xl lg:text-3xl">
            {personalInfo.role}
          </h2>

          <div className="mt-4 flex items-center gap-2 text-[var(--muted)]">
            <MapPin size={18} />

            <span>{personalInfo.location}</span>
          </div>

          <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
            {personalInfo.introduction}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#projects" className="button-primary">
              View My Work
              <ArrowRight size={18} />
            </a>

            <a href={personalInfo.resumePath} download className="button-secondary">
              <Download size={18} />
              Download CV
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => {
              const isEmail = label === "Email";

              return (
                <a
                  key={label}
                  href={href}
                  target={isEmail ? undefined : "_blank"}
                  rel={isEmail ? undefined : "noreferrer"}
                  className="icon-button"
                  aria-label={label}
                  title={label}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="hero-code-wrapper">
            <div className="hero-code-orbit hero-code-orbit-one" />
            <div className="hero-code-orbit hero-code-orbit-two" />

            <div className="hero-code-card glass-card relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
              <div className="hero-code-glow hero-code-glow-one" />
              <div className="hero-code-glow hero-code-glow-two" />

              <div className="relative z-10">
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                  </div>

                  <div className="hero-code-icon">
                    <Code2 size={21} />
                  </div>
                </div>

                <div className="space-y-4 font-mono text-sm leading-7 sm:text-base">
                  <p>
                    <span className="text-pink-400">const</span>{" "}
                    <span className="text-cyan-300">developer</span>{" "}
                    <span className="text-[var(--muted)]">=</span> {"{"}
                  </p>

                  <p className="pl-5">
                    <span className="text-violet-300">name:</span>{" "}
                    <span className="text-emerald-300">&quot;Tajwar Robin&quot;</span>,
                  </p>

                  <p className="pl-5">
                    <span className="text-violet-300">role:</span>{" "}
                    <span className="text-emerald-300">&quot;Full Stack Developer&quot;</span>,
                  </p>

                  <p className="pl-5">
                    <span className="text-violet-300">focus:</span> [
                  </p>

                  <p className="pl-10 text-emerald-300">&quot;Business Systems&quot;,</p>

                  <p className="pl-10 text-emerald-300">&quot;Web Applications&quot;,</p>

                  <p className="pl-10 text-emerald-300">&quot;Data and AI&quot;</p>

                  <p className="pl-5">],</p>

                  <p className="pl-5">
                    <span className="text-violet-300">mindset:</span>{" "}
                    <span className="text-emerald-300">&quot;Build. Test. Improve.&quot;</span>
                  </p>

                  <p>{"};"}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce text-[var(--muted)] md:block"
        aria-label="Scroll to the About section"
      >
        <ArrowDown size={26} />
      </a>
    </section>
  );
}
