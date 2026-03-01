import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, MessageSquare, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us — Greenridge Studios";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-32 pb-20">
        <div className="container-studio">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
                Get In Touch
              </p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
                Contact <span className="text-primary">Us</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Have questions or need assistance? We're here to help.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Email */}
              <div className="p-6 rounded-xl border border-border/50 bg-card/30 hover:border-primary/30 transition-colors">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      For general inquiries and support:
                    </p>
                    <a
                      href="mailto:support@greenridgestudios.com"
                      className="text-primary hover:underline font-medium text-sm"
                    >
                      support@greenridgestudios.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="p-6 rounded-xl border border-border/50 bg-card/30 hover:border-primary/30 transition-colors">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold mb-2">Phone</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Call us during business hours:
                    </p>
                    <a
                      href="tel:+4420XXXXXXXX"
                      className="text-primary hover:underline font-medium text-sm"
                    >
                      +44 (0) 20 XXXX XXXX
                    </a>
                  </div>
                </div>
              </div>

              {/* Discord Community */}
              <div className="p-6 rounded-xl border border-border/50 bg-card/30 hover:border-primary/30 transition-colors">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold mb-2">
                      Discord Community
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Join our community for discussion:
                    </p>
                    <a
                      href="https://discord.gg/eeBpdpn5F5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium text-sm"
                    >
                      Discord Server
                    </a>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="p-6 rounded-xl border border-border/50 bg-card/30 hover:border-primary/30 transition-colors">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold mb-2">Address</h3>
                    <p className="text-muted-foreground text-sm">
                      Greenridge Studios
                      <br />
                      London, UK
                      <br />
                      (Placeholder Address)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="p-8 rounded-2xl border border-primary/20 bg-primary/5 mb-12">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-3">
                    Business Hours
                  </h3>
                  <div className="space-y-2 text-muted-foreground text-sm">
                    <p>
                      <strong className="text-foreground">Monday – Friday:</strong>{" "}
                      9:00 AM – 6:00 PM (GMT)
                    </p>
                    <p>
                      <strong className="text-foreground">Saturday – Sunday:</strong>{" "}
                      Closed
                    </p>
                    <p className="pt-2 text-xs">
                      Response times may vary during peak periods. We aim to respond
                      within 24-48 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Channels */}
            <section>
              <h2 className="font-heading text-2xl font-semibold mb-6">
                Support <span className="text-primary">Channels</span>
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "General Inquiries",
                    description:
                      "For general questions about Greenridge Studios, our programs, or services, please email us at support@greenridgestudios.com.",
                  },
                  {
                    title: "Technical Support",
                    description:
                      "If you're experiencing technical issues with our platform or account access, reach out to our technical support team.",
                  },
                  {
                    title: "Account & Billing",
                    description:
                      "For account-related questions, billing inquiries, or refund requests, please include your purchase email and relevant details.",
                  },
                  {
                    title: "Community Support",
                    description:
                      "Connect with fellow traders and get peer support in our Discord community. Community members often share insights and help one another.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-border/50 bg-card/30"
                  >
                    <h3 className="font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
