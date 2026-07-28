"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
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
};

export function Vortex({
  children,
  className,
  containerClassName,
  particleCount = 700,
  rangeY = 100,
  baseHue = 220,
  baseSpeed = 0,
  rangeSpeed = 1.5,
  baseRadius = 1,
  rangeRadius = 2,
  backgroundColor = "#000000",
}: VortexProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /*
   * The animation frame starts as null.
   * This fixes the TypeScript build error.
   */
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const particlePropertyCount = 9;
    const particlePropertiesLength = particleCount * particlePropertyCount;

    const baseTimeToLive = 50;
    const rangeTimeToLive = 150;
    const rangeHue = 100;

    const noiseSteps = 3;
    const xOffset = 0.00125;
    const yOffset = 0.00125;
    const zOffset = 0.0005;

    const twoPi = Math.PI * 2;

    const noise3D = createNoise3D();

    let tick = 0;
    let logicalWidth = 0;
    let logicalHeight = 0;

    let center: [number, number] = [0, 0];

    let particleProperties = new Float32Array(particlePropertiesLength);

    const random = (number: number) => {
      return number * Math.random();
    };

    const randomRange = (number: number) => {
      return number - random(number * 2);
    };

    const interpolate = (firstNumber: number, secondNumber: number, speed: number) => {
      return (1 - speed) * firstNumber + speed * secondNumber;
    };

    const fadeInOut = (time: number, maximumTime: number) => {
      const halfMaximum = maximumTime * 0.5;

      return Math.abs(((time + halfMaximum) % maximumTime) - halfMaximum) / halfMaximum;
    };

    const initialiseParticle = (index: number) => {
      const x = random(logicalWidth);
      const y = center[1] + randomRange(rangeY);

      const velocityX = 0;
      const velocityY = 0;
      const life = 0;

      const timeToLive = baseTimeToLive + random(rangeTimeToLive);

      const speed = baseSpeed + random(rangeSpeed);

      const radius = baseRadius + random(rangeRadius);

      const hue = baseHue + random(rangeHue);

      particleProperties.set(
        [x, y, velocityX, velocityY, life, timeToLive, speed, radius, hue],
        index,
      );
    };

    const initialiseParticles = () => {
      tick = 0;

      particleProperties = new Float32Array(particlePropertiesLength);

      for (let index = 0; index < particlePropertiesLength; index += particlePropertyCount) {
        initialiseParticle(index);
      }
    };

    const particleIsOutsideCanvas = (x: number, y: number) => {
      return x > logicalWidth || x < 0 || y > logicalHeight || y < 0;
    };

    const drawParticle = (
      x: number,
      y: number,
      nextX: number,
      nextY: number,
      life: number,
      timeToLive: number,
      radius: number,
      hue: number,
    ) => {
      context.save();

      context.lineCap = "round";
      context.lineWidth = radius;

      const opacity = fadeInOut(life, timeToLive);

      context.strokeStyle = `hsla(${hue}, 100%, 60%, ${opacity})`;

      /*
       * A small glow keeps the Vortex visible without
       * using the expensive repeated canvas blur effect.
       */
      context.shadowColor = `hsla(${hue}, 100%, 60%, ${opacity})`;
      context.shadowBlur = 6;

      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(nextX, nextY);
      context.stroke();
      context.closePath();

      context.restore();
    };

    const updateParticle = (index: number) => {
      const yIndex = index + 1;
      const velocityXIndex = index + 2;
      const velocityYIndex = index + 3;
      const lifeIndex = index + 4;
      const timeToLiveIndex = index + 5;
      const speedIndex = index + 6;
      const radiusIndex = index + 7;
      const hueIndex = index + 8;

      const x = particleProperties[index];
      const y = particleProperties[yIndex];

      const noise = noise3D(x * xOffset, y * yOffset, tick * zOffset) * noiseSteps * twoPi;

      const velocityX = interpolate(particleProperties[velocityXIndex], Math.cos(noise), 0.5);

      const velocityY = interpolate(particleProperties[velocityYIndex], Math.sin(noise), 0.5);

      let life = particleProperties[lifeIndex];

      const timeToLive = particleProperties[timeToLiveIndex];

      const speed = particleProperties[speedIndex];

      const radius = particleProperties[radiusIndex];

      const hue = particleProperties[hueIndex];

      const nextX = x + velocityX * speed;
      const nextY = y + velocityY * speed;

      drawParticle(x, y, nextX, nextY, life, timeToLive, radius, hue);

      life += 1;

      particleProperties[index] = nextX;
      particleProperties[yIndex] = nextY;

      particleProperties[velocityXIndex] = velocityX;

      particleProperties[velocityYIndex] = velocityY;

      particleProperties[lifeIndex] = life;

      if (particleIsOutsideCanvas(nextX, nextY) || life > timeToLive) {
        initialiseParticle(index);
      }
    };

    const drawParticles = () => {
      context.save();

      context.globalCompositeOperation = "lighter";

      for (let index = 0; index < particlePropertiesLength; index += particlePropertyCount) {
        updateParticle(index);
      }

      context.restore();
    };

    const drawFrame = () => {
      tick += 1;

      context.clearRect(0, 0, logicalWidth, logicalHeight);

      context.fillStyle = backgroundColor;

      context.fillRect(0, 0, logicalWidth, logicalHeight);

      drawParticles();

      animationFrameId.current = window.requestAnimationFrame(drawFrame);
    };

    const resizeCanvas = () => {
      const containerRectangle = container.getBoundingClientRect();

      logicalWidth = Math.max(containerRectangle.width, window.innerWidth, 1);

      logicalHeight = Math.max(containerRectangle.height, window.innerHeight, 1);

      /*
       * Limiting the pixel ratio reduces lag on
       * high-resolution screens.
       */
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = logicalWidth * pixelRatio;

      canvas.height = logicalHeight * pixelRatio;

      canvas.style.width = `${logicalWidth}px`;

      canvas.style.height = `${logicalHeight}px`;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      center = [logicalWidth * 0.5, logicalHeight * 0.5];

      initialiseParticles();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId.current !== null) {
          window.cancelAnimationFrame(animationFrameId.current);

          animationFrameId.current = null;
        }

        return;
      }

      if (animationFrameId.current === null) {
        animationFrameId.current = window.requestAnimationFrame(drawFrame);
      }
    };

    resizeCanvas();

    animationFrameId.current = window.requestAnimationFrame(drawFrame);

    window.addEventListener("resize", resizeCanvas);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (animationFrameId.current !== null) {
        window.cancelAnimationFrame(animationFrameId.current);
      }

      window.removeEventListener("resize", resizeCanvas);

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
  ]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", containerClassName)}>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
        }}
        className="absolute inset-0 z-0 h-full w-full"
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </motion.div>

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}
