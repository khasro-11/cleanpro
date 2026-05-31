import { useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Ablauf from "./components/Ablauf";
import Vorteile from "./components/Vorteile";
import BandCTA from "./components/BandCTA";
import Bewertungen from "./components/Bewertungen";
import Kostenvoranschlag from "./components/Kostenvoranschlag";
import KontaktOptionen from "./components/KontaktOptionen";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import MobileCallBar from "./components/MobileCallBar";

export default function App() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <Services />
      <Ablauf />
      <Vorteile />
      <BandCTA />
      <Bewertungen />
      <Kostenvoranschlag />
      <KontaktOptionen />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
