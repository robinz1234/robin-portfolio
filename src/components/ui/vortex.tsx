"use client";

import { createNoise3D } from "simplex-noise";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

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
  frameRate?: number;
};

const PARTICLE_FIELDS = 9;

export function Vortex({
  children,
  className = "",
  containerClassName = "",
  particleCount = 56,
  rangeY = 360,
  baseHue = 255,
  baseSpeed = 0.02,
  rangeSpeed = 0.24,
  baseRadius = 0.4,
  rangeRadius = 0.9,
  backgroundColor = "#000000",
  frameRate = 30,
}: VortexProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const resizeFrameRef = useRef<number | null>(null);

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

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const noise3D = createNoise3D();

    let width = Math.max(window.innerWidth, 1);
    let height = Math.max(window.innerHeight, 1);
    let effectiveParticleCount = particleCount;
    let particleProperties = new Float32Array(0);

    let tick = 0;
    let lastFrameTime = 0;
    let isPageVisible = !document.hidden;
    let isRunning = true;

    const frameInterval = 1000 / Math.max(frameRate, 1);
    const twoPi = Math.PI * 2;

    const getEffectiveParticleCount = () => {
      if (reducedMotion) {
        return Math.min(14, particleCount);
      }

      if (width < 640) {
        return Math.min(20, particleCount);
      }

      if (width < 1024) {
        return Math.min(34, particleCount);
      }

      return particleCount;
    };

    const initialiseParticle = (startingIndex: number, randomiseLife = false) => {
      const timeToLive = 90 + Math.random() * 110;

      particleProperties[startingIndex] = Math.random() * width;
      particleProperties[startingIndex + 1] = height * 0.5 + (Math.random() - 0.5) * rangeY * 2;

      particleProperties[startingIndex + 2] = 0;
      particleProperties[startingIndex + 3] = 0;

      particleProperties[startingIndex + 4] = randomiseLife ? Math.random() * timeToLive : 0;

      particleProperties[startingIndex + 5] = timeToLive;
      particleProperties[startingIndex + 6] = baseSpeed + Math.random() * rangeSpeed;

      particleProperties[startingIndex + 7] = baseRadius + Math.random() * rangeRadius;

      particleProperties[startingIndex + 8] = baseHue + Math.random() * 90;
    };

    const initialiseParticles = () => {
      effectiveParticleCount = getEffectiveParticleCount();

      particleProperties = new Float32Array(effectiveParticleCount * PARTICLE_FIELDS);

      for (let index = 0; index < particleProperties.length; index += PARTICLE_FIELDS) {
        initialiseParticle(index, true);
      }
    };

    const resizeCanvas = () => {
      width = Math.max(window.innerWidth, 1);
      height = Math.max(window.innerHeight, 1);

      /*
       * Rendering at device pixel ratio 1 drastically reduces the number
       * of pixels redrawn while remaining sharp enough for background motion.
       */
      canvas.width = Math.floor(width);
      canvas.height = Math.floor(height);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(1, 0, 0, 1, 0, 0);

      context.globalCompositeOperation = "source-over";
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, width, height);

      initialiseParticles();
    };

    const drawStaticBackground = () => {
      context.globalCompositeOperation = "source-over";
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, width, height);

      context.globalCompositeOperation = "lighter";

      for (let index = 0; index < particleProperties.length; index += PARTICLE_FIELDS) {
        const x = particleProperties[index];
        const y = particleProperties[index + 1];
        const hue = particleProperties[index + 8];

        context.beginPath();
        context.fillStyle = `hsla(${hue}, 90%, 65%, 0.38)`;
        context.arc(x, y, 1.2, 0, twoPi);
        context.fill();
      }

      context.globalCompositeOperation = "source-over";
    };

    const updateAndDrawParticles = () => {
      context.globalCompositeOperation = "source-over";

      /*
       * A translucent black fill leaves short trails without clearing and
       * repainting the canvas several times.
       */
      context.fillStyle = "rgba(0, 0, 0, 0.26)";
      context.fillRect(0, 0, width, height);

      context.globalCompositeOperation = "lighter";
      context.lineCap = "round";

      for (let index = 0; index < particleProperties.length; index += PARTICLE_FIELDS) {
        const x = particleProperties[index];
        const y = particleProperties[index + 1];

        let velocityX = particleProperties[index + 2];
        let velocityY = particleProperties[index + 3];
        let life = particleProperties[index + 4];

        const timeToLive = particleProperties[index + 5];
        const speed = particleProperties[index + 6];
        const radius = particleProperties[index + 7];
        const hue = particleProperties[index + 8];

        const noiseAngle = noise3D(x * 0.0013, y * 0.0013, tick * 0.00065) * 2.8 * twoPi;

        velocityX = velocityX * 0.72 + Math.cos(noiseAngle) * 0.28;

        velocityY = velocityY * 0.72 + Math.sin(noiseAngle) * 0.28;

        const nextX = x + velocityX * speed;
        const nextY = y + velocityY * speed;

        const lifeProgress = Math.min(life / timeToLive, 1);
        const opacity = Math.sin(Math.PI * lifeProgress) * 0.72;

        context.beginPath();
        context.lineWidth = radius;
        context.strokeStyle = `hsla(${hue}, 95%, 66%, ${opacity})`;
        context.moveTo(x, y);
        context.lineTo(nextX, nextY);
        context.stroke();

        particleProperties[index] = nextX;
        particleProperties[index + 1] = nextY;
        particleProperties[index + 2] = velocityX;
        particleProperties[index + 3] = velocityY;
        particleProperties[index + 4] = life + 1;

        const outsideCanvas =
          nextX < -20 || nextX > width + 20 || nextY < -20 || nextY > height + 20;

        if (outsideCanvas || life >= timeToLive) {
          initialiseParticle(index);
        }
      }

      context.globalCompositeOperation = "source-over";
    };

    const animate = (time: number) => {
      if (!isRunning) {
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(animate);

      if (!isPageVisible) {
        return;
      }

      if (time - lastFrameTime < frameInterval) {
        return;
      }

      lastFrameTime = time;
      tick += 1;

      updateAndDrawParticles();
    };

    const handleResize = () => {
      if (resizeFrameRef.current !== null) {
        window.cancelAnimationFrame(resizeFrameRef.current);
      }

      resizeFrameRef.current = window.requestAnimationFrame(() => {
        resizeCanvas();

        if (reducedMotion) {
          drawStaticBackground();
        }

        resizeFrameRef.current = null;
      });
    };

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      lastFrameTime = performance.now();
    };

    resizeCanvas();

    if (reducedMotion) {
      drawStaticBackground();
    } else {
      animationFrameRef.current = window.requestAnimationFrame(animate);
    }

    window.addEventListener("resize", handleResize, {
      passive: true,
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isRunning = false;

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      if (resizeFrameRef.current !== null) {
        window.cancelAnimationFrame(resizeFrameRef.current);
      }

      window.removeEventListener("resize", handleResize);

      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [
    backgroundColor,
    baseHue,
    baseRadius,
    baseSpeed,
    frameRate,
    particleCount,
    rangeRadius,
    rangeSpeed,
    rangeY,
  ]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${containerClassName}`}>
      <canvas
        ref={canvasRef}
        className="vortex-canvas absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      <div className={`relative z-10 ${className}`}>{children}</div>
    </div>
  );
}
