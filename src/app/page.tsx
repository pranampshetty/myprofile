import About from "@/components/About";
import Contact from "@/components/Contact";
import CookieConsent from "@/components/CookieConsent";
import ScrollProgress from "@/components/effects/ScrollProgress";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Splash from "@/components/Splash";

export default function Home() {
  return (
    <>
      <Splash />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
