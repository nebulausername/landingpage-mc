import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Stats from '@/components/Stats';
import Worlds from '@/components/Worlds';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';
import Ranks from '@/components/Ranks';
import Comparison from '@/components/Comparison';
import Roadmap from '@/components/Roadmap';
import Staff from '@/components/Staff';
import DiscordWidget from '@/components/DiscordWidget';
import Vote from '@/components/Vote';
import FAQ from '@/components/FAQ';
import Newsletter from '@/components/Newsletter';
import CTABand from '@/components/CTABand';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';

/* Section order is intentional — optimized for conversion:
   hook → trust → scale → product → emotion → offer → justify →
   momentum → human → live → engagement → objections → capture → CTA */
export default function Page() {
  return (
    <>
      <JsonLd />
      <Nav />
      <main id="main">
        <Hero />
        <TrustBar />
        <Stats />
        <Worlds />
        <Features />
        <Testimonials />
        <Gallery />
        <Ranks />
        <Comparison />
        <Roadmap />
        <Staff />
        <DiscordWidget />
        <Vote />
        <FAQ />
        <Newsletter />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
