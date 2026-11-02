import Image from "next/image";
import Header from "@/components/layout/Header";
import Hero from "@/components/hero/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import MinhaTrajetoria from "@/components/sections/MinhaTrajetoria";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <AboutSection />
      <MinhaTrajetoria/>
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
