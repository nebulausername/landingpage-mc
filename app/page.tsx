import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Worlds from '@/components/Worlds';
import Features from '@/components/Features';
import Ranks from '@/components/Ranks';
import FAQ from '@/components/FAQ';
import CTABand from '@/components/CTABand';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Stats />
        <Worlds />
        <Features />
        <Ranks />
        <FAQ />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
