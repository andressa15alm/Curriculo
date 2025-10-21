import Image from "next/image";
import Header from "@/components/layout/Header";
import Hero from "@/components/hero/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
