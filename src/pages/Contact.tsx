import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, MessageSquare, User } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us | Zentō Collective";
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

            {/* Contact Cards - Support & Discord */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {/* Support Email */}
              <div className="p-6 rounded-xl border border-border/50 bg-card/30 hover:border-primary/30 transition-colors">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold mb-2">Support</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      For general inquiries and support:
                    </p>
                    <a
                      href="mailto:zentocollective@gmail.com"
                      className="text-primary hover:underline font-medium text-sm"
                    >
                      zentocollective@gmail.com (General)
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
                      Discord
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Join the community:
                    </p>
                    <a
                      href="https://discord.gg/PeNwXwknz2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium text-sm"
                    >
                      Discord Server
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Channels */}
            <section className="mb-16">
              <h2 className="font-heading text-2xl font-semibold mb-6">
                Support <span className="text-primary">Channels</span>
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "General Inquiries",
                    description:
                      "For general questions about Zentō Collective, our programs, or services, please email us at zentocollective@gmail.com.",
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

            {/* The Team */}
            <section>
              <div className="text-center mb-8">
                <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
                  Who We Are
                </p>
                <h2 className="font-heading text-2xl md:text-3xl font-semibold">
                  The <span className="text-primary">Team</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Kai */}
                <div className="p-8 rounded-xl border border-border/50 bg-card/30 hover:border-primary/30 transition-colors text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-1">Kai</h3>
                  <p className="text-primary text-sm font-medium mb-3">Founder</p>
                  <a href="mailto:zentocollective@gmail.com" className="text-primary hover:underline font-medium text-sm">zentocollective@gmail.com</a>
                </div>

                {/* Djay */}
                <div className="p-8 rounded-xl border border-border/50 bg-card/30 hover:border-primary/30 transition-colors text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-1">Djay</h3>
                  <p className="text-primary text-sm font-medium mb-3">Founder</p>
                  <a href="mailto:zentocollective@gmail.com" className="text-primary hover:underline font-medium text-sm">zentocollective@gmail.com</a>
                </div>
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
