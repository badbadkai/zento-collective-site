import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";

const Articles = () => {
  useEffect(() => {
    document.title = "Articles — Greenridge Studios";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="container-studio relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="p-4 rounded-2xl bg-primary/10 w-fit mx-auto mb-8 animate-fade-in">
              <FileText className="w-10 h-10 text-primary" />
            </div>
            <h1
              className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Articles <span className="text-primary">Coming Soon</span>
            </h1>
            <p
              className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              We're putting together in-depth trading insights, frameworks, and
              analysis. Check back soon.
            </p>
            <div
              className="animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Link to="/">
                <Button variant="hero" size="lg" className="group">
                  Back to Home
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Articles;
