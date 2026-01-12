import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Waitlist } from "@/components/Waitlist";

const WaitlistPage: React.FC = () => {
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
