import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Solution } from "@/components/Solution";
import { Journal } from "@/components/Journal";
import { Waitlist } from "@/components/Waitlist";
import { Community } from "@/components/Community";

import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Solution />
      <Journal />
      <Waitlist />
      <Community />
      
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
