"use client";

import { Vortex } from "@/components/ui/vortex";

export default function AnimatedBackground() {
  return (
    <div className="vortex-background" aria-hidden="true">
      <Vortex
        backgroundColor="#000000"
        particleCount={56}
        rangeY={360}
        baseHue={250}
        baseSpeed={0.02}
        rangeSpeed={0.24}
        baseRadius={0.4}
        rangeRadius={0.9}
        frameRate={30}
        containerClassName="h-full w-full"
        className="h-full w-full"
      />

      <div className="vortex-overlay" />
    </div>
  );
}
