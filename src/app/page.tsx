import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
