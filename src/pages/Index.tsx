import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Offerings } from "@/components/Offerings";
import { Community } from "@/components/Community";
import { FAQ } from "@/components/FAQ";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "Zentō Collective | Master the Process";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Offerings />
      <ProcessTimeline />
      <Community />
      <FAQ />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
