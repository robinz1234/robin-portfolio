"use client";

import { useEffect, useState } from "react";

import { Vortex } from "@/components/ui/vortex";

type VortexSettings = {
  particleCount: number;
  rangeY: number;
  speed: number;
  radius: number;
};

export default function AnimatedBackground() {
  const [settings, setSettings] = useState<VortexSettings>({
    particleCount: 140,
    rangeY: 420,
    speed: 0.35,
    radius: 1.2,
  });

  useEffect(() => {
    const updateSettings = () => {
      const width = window.innerWidth;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        setSettings({
          particleCount: 35,
          rangeY: 220,
          speed: 0.08,
          radius: 0.7,
        });

        return;
      }

      if (width < 640) {
        setSettings({
          particleCount: 45,
          rangeY: 240,
          speed: 0.16,
          radius: 0.8,
        });

        return;
      }

      if (width < 1024) {
        setSettings({
          particleCount: 85,
          rangeY: 320,
          speed: 0.24,
          radius: 1,
        });

        return;
      }

      setSettings({
        particleCount: 140,
        rangeY: 420,
        speed: 0.35,
        radius: 1.2,
      });
    };

    updateSettings();

    window.addEventListener("resize", updateSettings);

    return () => {
      window.removeEventListener("resize", updateSettings);
    };
  }, []);

  return (
    <div className="vortex-background" aria-hidden="true">
      <Vortex
        backgroundColor="#000000"
        particleCount={settings.particleCount}
        rangeY={settings.rangeY}
        baseHue={270}
        baseSpeed={0.015}
        rangeSpeed={settings.speed}
        baseRadius={0.35}
        rangeRadius={settings.radius}
        containerClassName="h-full w-full"
        className="h-full w-full"
      />

      <div className="vortex-dark-overlay" />
      <div className="vortex-soft-glow vortex-soft-glow-left" />
      <div className="vortex-soft-glow vortex-soft-glow-right" />
    </div>
  );
}
