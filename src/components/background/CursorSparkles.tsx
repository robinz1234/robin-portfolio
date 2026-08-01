"use client";

import { useEffect, useRef } from "react";

export default function CursorSparkles() {
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const star = starRef.current;

    if (!star) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (reducedMotion || coarsePointer) {
      return;
    }

    let frameId: number | null = null;
    let pointerX = -100;
    let pointerY = -100;

    const updatePosition = () => {
      star.style.transform = `translate3d(
        ${pointerX - 9}px,
        ${pointerY - 9}px,
        0
      )`;

      star.dataset.visible = "true";
      frameId = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      pointerX = event.clientX;
      pointerY = event.clientY;

      if (frameId === null) {
        frameId = window.requestAnimationFrame(updatePosition);
      }
    };

    const hideStar = () => {
      star.dataset.visible = "false";
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      star.classList.remove("cursor-star-burst");

      /*
       * Reading offsetWidth restarts the short click animation.
       */
      void star.offsetWidth;

      star.classList.add("cursor-star-burst");
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    window.addEventListener("pointerdown", handlePointerDown, {
      passive: true,
    });

    window.addEventListener("blur", hideStar);

    document.documentElement.addEventListener("mouseleave", hideStar);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerdown", handlePointerDown);

      window.removeEventListener("blur", hideStar);

      document.documentElement.removeEventListener("mouseleave", hideStar);
    };
  }, []);

  return (
    <div ref={starRef} className="cursor-star" data-visible="false" aria-hidden="true">
      <span className="cursor-star-core" />
    </div>
  );
}
