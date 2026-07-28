"use client";

import { useEffect, useRef } from "react";

type Spark = {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  radius: number;
  opacity: number;
  decay: number;
  hue: number;
};

const hues = [190, 260, 280, 310];

export default function CursorSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", {
      alpha: true,
    });

    if (!context) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (reducedMotion || coarsePointer) {
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId = 0;
    let sparks: Spark[] = [];

    let previousX = 0;
    let previousY = 0;
    let lastCreationTime = 0;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const createSpark = (x: number, y: number, stronger = false): Spark => {
      return {
        x: x + (Math.random() - 0.5) * 5,
        y: y + (Math.random() - 0.5) * 5,
        velocityX: (Math.random() - 0.5) * (stronger ? 1.4 : 0.65),
        velocityY: (Math.random() - 0.5) * (stronger ? 1.4 : 0.65) - 0.15,
        radius: stronger ? Math.random() * 2 + 1.5 : Math.random() * 1.5 + 0.8,
        opacity: 0.9,
        decay: stronger ? 0.035 : 0.05,
        hue: hues[Math.floor(Math.random() * hues.length)],
      };
    };

    const addCursorSparks = (x: number, y: number, amount: number, stronger = false) => {
      for (let index = 0; index < amount; index += 1) {
        sparks.push(createSpark(x, y, stronger));
      }

      if (sparks.length > 45) {
        sparks = sparks.slice(sparks.length - 45);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      const now = performance.now();

      if (now - lastCreationTime < 32) {
        return;
      }

      const distance = Math.hypot(event.clientX - previousX, event.clientY - previousY);

      if (distance > 6) {
        addCursorSparks(event.clientX, event.clientY, 1);
      }

      previousX = event.clientX;
      previousY = event.clientY;
      lastCreationTime = now;
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      addCursorSparks(event.clientX, event.clientY, 6, true);
    };

    const render = () => {
      context.clearRect(0, 0, width, height);

      for (const spark of sparks) {
        spark.x += spark.velocityX;
        spark.y += spark.velocityY;

        spark.velocityX *= 0.97;
        spark.velocityY *= 0.97;

        spark.opacity -= spark.decay;
        spark.radius *= 0.985;

        context.beginPath();

        context.arc(spark.x, spark.y, Math.max(spark.radius, 0.2), 0, Math.PI * 2);

        context.fillStyle = `hsla(
          ${spark.hue},
          95%,
          72%,
          ${Math.max(spark.opacity, 0)}
        )`;

        context.fill();
      }

      sparks = sparks.filter((spark) => spark.opacity > 0 && spark.radius > 0.2);

      animationFrameId = window.requestAnimationFrame(render);
    };

    resizeCanvas();
    render();

    window.addEventListener("resize", resizeCanvas);

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    window.addEventListener("pointerdown", handlePointerDown, {
      passive: true,
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);

      window.removeEventListener("resize", resizeCanvas);

      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-sparkle-canvas" aria-hidden="true" />;
}
