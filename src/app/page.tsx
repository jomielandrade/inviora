import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Templates } from "@/components/sections/templates";
import { Features } from "@/components/sections/features";
import { Packages } from "@/components/sections/packages";
import { OtherCelebrations } from "@/components/sections/other-celebrations";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ivory"
      >
        Skip to content
      </a>
      <span id="top" aria-hidden="true" />
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <TrustStrip />
        <HowItWorks />
        <Templates />
        <Features />
        <Packages />
        <OtherCelebrations />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
