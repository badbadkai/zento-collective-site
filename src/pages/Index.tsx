import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Solution } from "@/components/Solution";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Offerings } from "@/components/Offerings";
import { Community } from "@/components/Community";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { FAQ } from "@/components/FAQ";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "Greenridge Studios — Master the Process";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Solution />
      <ProcessTimeline />
      <Offerings />
      <Community />
      <FAQ />
      <TestimonialsCarousel />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
