"use client";

import dynamic from "next/dynamic";

const AnimatedBackground = dynamic(() => import("@/components/background/AnimatedBackground"), {
  ssr: false,
  loading: () => <div className="vortex-background" aria-hidden="true" />,
});

const CursorSparkles = dynamic(() => import("@/components/background/CursorSparkles"), {
  ssr: false,
});

export default function EffectsLayer() {
  return (
    <>
      <AnimatedBackground />
      <CursorSparkles />
    </>
  );
}
