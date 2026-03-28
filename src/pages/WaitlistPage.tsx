import React, { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Waitlist } from "@/components/Waitlist";

const WaitlistPage: React.FC = () => {
  useEffect(() => {
    document.title = "Join the Waitlist — Zentō Collective";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
};

export default WaitlistPage;
