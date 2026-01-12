import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Solution } from "@/components/Solution";
import { Journal } from "@/components/Journal";
import { Offerings } from "@/components/Offerings";
import PricingTiers from "@/components/PricingTiers";
import { Community } from "@/components/Community";

import { FinalCTA } from "@/components/FinalCTA";
import { FAQ } from "@/components/FAQ";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Solution />
      <Journal />
      <Offerings />
      <PricingTiers />
      <Community />
      
      <FAQ />
      <FinalCTA />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
