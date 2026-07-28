import { personalInfo } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--border)]">
      <div className="section-width flex flex-col items-center justify-between gap-4 py-7 text-center text-sm text-[var(--muted)] sm:flex-row sm:text-left">
        <p>
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>

        <p>Built with Next.js, React, TypeScript, Tailwind CSS, and Motion.</p>
      </div>
    </footer>
  );
}
