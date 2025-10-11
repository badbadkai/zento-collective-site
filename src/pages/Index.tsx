import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { Journal } from "@/components/Journal";
import { Community } from "@/components/Community";
import { Credibility } from "@/components/Credibility";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <Journal />
      <Community />
      <Credibility />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
