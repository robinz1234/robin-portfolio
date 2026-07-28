import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tajwar Al Haque Robin | Full Stack Developer",
  description:
    "Portfolio of Tajwar Al Haque Robin, a full-stack developer and software engineer specializing in web applications, business systems, data engineering, and artificial intelligence.",
  keywords: [
    "Tajwar Al Haque Robin",
    "Full Stack Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Python Developer",
    "Bangladesh Developer",
  ],
  authors: [
    {
      name: "Tajwar Al Haque Robin",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
