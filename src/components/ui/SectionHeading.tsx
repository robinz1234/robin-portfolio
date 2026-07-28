import Reveal from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  highlightedWord: string;
  description: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  highlightedWord,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto mb-14 max-w-3xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">
        {eyebrow}
      </p>

      <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        {title} <span className="gradient-text">{highlightedWord}</span>
      </h2>

      <div className="mx-auto my-6 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />

      <p className="text-base leading-8 text-[var(--muted)] sm:text-lg">{description}</p>
    </Reveal>
  );
}
