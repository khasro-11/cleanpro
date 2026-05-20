import Nav from './components/Nav'
import Hero from './components/Hero'
import PuenktlichkeitsGarantie from './components/PuenktlichkeitsGarantie'
import Services from './components/Services'
import WarumKeinPreis from './components/WarumKeinPreis'
import SocialProof from './components/SocialProof'
import Galerie from './components/Galerie'
import Ablauf from './components/Ablauf'
import Vorteile from './components/Vorteile'
import Kontakt from './components/Kontakt'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <PuenktlichkeitsGarantie />
      <Services />
      <WarumKeinPreis />
      <SocialProof />
      <Galerie />
      <Ablauf />
      <Vorteile />
      <Kontakt />
      <Footer />
    </>
  )
}
