"use client";

import { createNoise3D } from "simplex-noise";
import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type VortexProps = {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
  targetFps?: number;
};

const PARTICLE_FIELD_COUNT = 9;

const FIELD = {
  x: 0,
  y: 1,
  velocityX: 2,
  velocityY: 3,
  life: 4,
  timeToLive: 5,
  speed: 6,
  radius: 7,
  colorIndex: 8,
} as const;

export function Vortex({
  children,
  className,
  containerClassName,
  particleCount = 220,
  rangeY = 520,
  baseHue = 245,
  baseSpeed = 0.45,
  rangeSpeed = 0.95,
  baseRadius = 0.75,
  rangeRadius = 1.25,
  backgroundColor = "#000000",
  targetFps = 60,
}: VortexProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const animationFrameRef = useRef<number | null>(null);

  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", {
      alpha: false,
    });

    if (!context) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const noise3D = createNoise3D();

    const maximumFps = Math.min(Math.max(targetFps, 1), 60);

    const frameInterval = 1000 / maximumFps;

    const palette = [
      `hsl(${baseHue}, 100%, 66%)`,
      `hsl(${baseHue + 20}, 100%, 66%)`,
      `hsl(${baseHue + 40}, 100%, 65%)`,
      `hsl(${baseHue + 60}, 100%, 64%)`,
      `hsl(${baseHue + 85}, 100%, 64%)`,
      "hsl(190, 100%, 65%)",
    ];

    let logicalWidth = 1;
    let logicalHeight = 1;

    let particleProperties = new Float32Array(PARTICLE_FIELD_COUNT);

    let lastFrameTime = 0;
    let noiseTime = 0;

    let componentIsMounted = true;
    let pageIsVisible = !document.hidden;

    const randomSigned = (maximum: number): number => {
      return (Math.random() * 2 - 1) * maximum;
    };

    const getParticleCount = (viewportWidth: number): number => {
      let count = Math.min(Math.max(Math.floor(particleCount), 40), 300);

      /*
       * A very wide canvas requires considerably
       * more pixel work, so the particle count is
       * reduced by half above 1440 pixels.
       */
      if (viewportWidth > 1440) {
        count = Math.floor(count / 2);
      } else if (viewportWidth < 640) {
        count = Math.floor(count * 0.42);
      } else if (viewportWidth < 1024) {
        count = Math.floor(count * 0.68);
      }

      if (prefersReducedMotion) {
        count = Math.min(count, 34);
      }

      return Math.max(count, 30);
    };

    const initialiseParticle = (startingIndex: number, randomiseLife = false) => {
      const verticalRange = Math.min(rangeY, logicalHeight * 0.8);

      const timeToLive = 100 + Math.random() * 160;

      particleProperties[startingIndex + FIELD.x] = Math.random() * logicalWidth;

      particleProperties[startingIndex + FIELD.y] = Math.max(
        0,
        Math.min(logicalHeight, logicalHeight * 0.5 + randomSigned(verticalRange)),
      );

      particleProperties[startingIndex + FIELD.velocityX] = 0;

      particleProperties[startingIndex + FIELD.velocityY] = 0;

      particleProperties[startingIndex + FIELD.life] = randomiseLife
        ? Math.random() * timeToLive
        : 0;

      particleProperties[startingIndex + FIELD.timeToLive] = timeToLive;

      particleProperties[startingIndex + FIELD.speed] = baseSpeed + Math.random() * rangeSpeed;

      particleProperties[startingIndex + FIELD.radius] = baseRadius + Math.random() * rangeRadius;

      particleProperties[startingIndex + FIELD.colorIndex] = Math.floor(
        Math.random() * palette.length,
      );
    };

    const initialiseParticles = () => {
      const effectiveCount = getParticleCount(logicalWidth);

      particleProperties = new Float32Array(effectiveCount * PARTICLE_FIELD_COUNT);

      for (let index = 0; index < particleProperties.length; index += PARTICLE_FIELD_COUNT) {
        initialiseParticle(index, true);
      }
    };

    const configureCanvas = () => {
      logicalWidth = Math.max(window.innerWidth, 1);

      logicalHeight = Math.max(window.innerHeight, 1);

      /*
       * High device pixel ratios can multiply
       * full-screen canvas work by four or more.
       */
      const devicePixelRatio =
        logicalWidth > 1440 || logicalWidth < 768
          ? 1
          : Math.min(window.devicePixelRatio || 1, 1.25);

      canvas.width = Math.floor(logicalWidth * devicePixelRatio);

      canvas.height = Math.floor(logicalHeight * devicePixelRatio);

      canvas.style.width = `${logicalWidth}px`;

      canvas.style.height = `${logicalHeight}px`;

      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";

      context.fillStyle = backgroundColor;

      context.fillRect(0, 0, logicalWidth, logicalHeight);

      initialiseParticles();
    };

    const particleIsOutside = (x: number, y: number): boolean => {
      return x < -40 || x > logicalWidth + 40 || y < -40 || y > logicalHeight + 40;
    };

    const drawLine = (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      width: number,
      color: string,
      opacity: number,
    ) => {
      context.globalAlpha = opacity;
      context.lineWidth = width;
      context.strokeStyle = color;

      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.stroke();
    };

    const updateAndDrawParticles = (deltaMultiplier: number) => {
      /*
       * Clear once and repaint the black base.
       * No canvas self-copying, shadowBlur,
       * filter blur, or repeated drawImage calls.
       */
      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";

      context.clearRect(0, 0, logicalWidth, logicalHeight);

      context.fillStyle = backgroundColor;

      context.fillRect(0, 0, logicalWidth, logicalHeight);

      context.globalCompositeOperation = "lighter";

      context.lineCap = "round";

      for (let index = 0; index < particleProperties.length; index += PARTICLE_FIELD_COUNT) {
        const x = particleProperties[index + FIELD.x];

        const y = particleProperties[index + FIELD.y];

        let velocityX = particleProperties[index + FIELD.velocityX];

        let velocityY = particleProperties[index + FIELD.velocityY];

        let life = particleProperties[index + FIELD.life];

        const timeToLive = particleProperties[index + FIELD.timeToLive];

        const speed = particleProperties[index + FIELD.speed];

        const radius = particleProperties[index + FIELD.radius];

        const colorIndex = particleProperties[index + FIELD.colorIndex];

        const noiseAngle = noise3D(x * 0.00135, y * 0.00135, noiseTime) * Math.PI * 5.5;

        velocityX = velocityX * 0.76 + Math.cos(noiseAngle) * 0.24;

        velocityY = velocityY * 0.76 + Math.sin(noiseAngle) * 0.24;

        const nextX = x + velocityX * speed * deltaMultiplier;

        const nextY = y + velocityY * speed * deltaMultiplier;

        const lifeProgress = Math.min(Math.max(life / timeToLive, 0), 1);

        const opacity = Math.sin(Math.PI * lifeProgress) * 0.88;

        const selectedColor = palette[colorIndex] ?? palette[0];

        /*
         * The wide low-opacity stroke creates a
         * lightweight glow without filter blur.
         */
        const trailMultiplier = 8;

        const trailStartX = x - velocityX * speed * trailMultiplier;

        const trailStartY = y - velocityY * speed * trailMultiplier;

        drawLine(
          trailStartX,
          trailStartY,
          nextX,
          nextY,
          radius * 3.8,
          selectedColor,
          opacity * 0.13,
        );

        drawLine(trailStartX, trailStartY, nextX, nextY, radius, selectedColor, opacity);

        life += deltaMultiplier;

        particleProperties[index + FIELD.x] = nextX;

        particleProperties[index + FIELD.y] = nextY;

        particleProperties[index + FIELD.velocityX] = velocityX;

        particleProperties[index + FIELD.velocityY] = velocityY;

        particleProperties[index + FIELD.life] = life;

        if (particleIsOutside(nextX, nextY) || life >= timeToLive) {
          initialiseParticle(index);
        }
      }

      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
    };

    const drawStaticFrame = () => {
      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";

      context.clearRect(0, 0, logicalWidth, logicalHeight);

      context.fillStyle = backgroundColor;

      context.fillRect(0, 0, logicalWidth, logicalHeight);

      context.globalCompositeOperation = "lighter";

      for (let index = 0; index < particleProperties.length; index += PARTICLE_FIELD_COUNT) {
        const x = particleProperties[index + FIELD.x];

        const y = particleProperties[index + FIELD.y];

        const radius = particleProperties[index + FIELD.radius];

        const colorIndex = particleProperties[index + FIELD.colorIndex];

        context.globalAlpha = 0.55;

        context.fillStyle = palette[colorIndex] ?? palette[0];

        context.beginPath();

        context.arc(x, y, Math.max(radius, 1), 0, Math.PI * 2);

        context.fill();
      }

      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
    };

    const animationLoop = (currentTime: number) => {
      if (!componentIsMounted) {
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(animationLoop);

      if (!pageIsVisible) {
        return;
      }

      const elapsedTime = currentTime - lastFrameTime;

      /*
       * The 0.5 millisecond tolerance prevents
       * accidental frame skipping on 60 Hz screens.
       */
      if (elapsedTime < frameInterval - 0.5) {
        return;
      }

      const deltaMultiplier = Math.min(elapsedTime / frameInterval, 2);

      lastFrameTime = currentTime - (elapsedTime % frameInterval);

      noiseTime += 0.00075 * deltaMultiplier;

      updateAndDrawParticles(deltaMultiplier);
    };

    const handleResize = () => {
      if (resizeTimerRef.current !== null) {
        clearTimeout(resizeTimerRef.current);
      }

      resizeTimerRef.current = setTimeout(() => {
        configureCanvas();

        if (prefersReducedMotion) {
          drawStaticFrame();
        }

        resizeTimerRef.current = null;
      }, 200);
    };

    const handleVisibilityChange = () => {
      pageIsVisible = !document.hidden;
      lastFrameTime = performance.now();
    };

    configureCanvas();

    if (prefersReducedMotion) {
      drawStaticFrame();
    } else {
      animationFrameRef.current = window.requestAnimationFrame(animationLoop);
    }

    window.addEventListener("resize", handleResize, {
      passive: true,
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      componentIsMounted = false;

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      if (resizeTimerRef.current !== null) {
        clearTimeout(resizeTimerRef.current);
      }

      window.removeEventListener("resize", handleResize);

      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [
    backgroundColor,
    baseHue,
    baseRadius,
    baseSpeed,
    particleCount,
    rangeRadius,
    rangeSpeed,
    rangeY,
    targetFps,
  ]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-black", containerClassName)}>
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" aria-hidden="true" />

      {children ? <div className={cn("relative z-10", className)}>{children}</div> : null}
    </div>
  );
}
