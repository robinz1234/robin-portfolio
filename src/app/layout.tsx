import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Geist, Geist_Mono } from "next/font/google";

import { Vortex } from "@/components/ui/vortex";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tajwar Al Haque Robin | Full Stack Developer",
  description:
    "Portfolio of Tajwar Al Haque Robin, a full stack developer and software engineer based in Dhaka, Bangladesh.",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          min-h-screen
          overflow-x-hidden
          bg-black
          text-white
          antialiased
        `}
      >
        {/* 
          The background is fixed behind every section.
          pointer-events-none prevents it from blocking
          buttons, links, forms, text selection, or scrolling.
        */}
        <div
          className="
            pointer-events-none
            fixed
            inset-0
            z-0
            h-screen
            w-screen
            overflow-hidden
            bg-black
          "
          aria-hidden="true"
        >
          <Vortex
            backgroundColor="#000000"
            particleCount={220}
            rangeY={520}
            baseHue={245}
            baseSpeed={0.45}
            rangeSpeed={0.95}
            baseRadius={0.75}
            rangeRadius={1.25}
            targetFps={60}
            containerClassName="h-full w-full"
          />

          {/*
            Keep this overlay very light.
            The previous black/20 overlay was hiding
            much of the Vortex.
          */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-black/5
            "
          />
        </div>

        {/*
          All actual website content is rendered above
          the fixed canvas.
        */}
        <div
          className="
            relative
            z-10
            min-h-screen
          "
        >
          {children}
        </div>
      </body>
    </html>
  );
}
