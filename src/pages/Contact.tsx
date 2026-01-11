import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, MessageSquare, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container-studio py-12 md:py-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Contact Us</h1>
            <p className="text-sm italic text-muted-foreground mb-8">Last updated: 11 Jan 2026</p>
            
            <p className="text-lg text-muted-foreground mb-12">
              Have questions or need assistance? Reach out to us using any of the contact methods below. We're here to help.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground mb-2">
                    For general inquiries and support:
                  </p>
                  <a
                    href="mailto:support@greenridgestudios.com"
                    className="text-primary hover:underline font-medium"
                  >
                    support@greenridgestudios.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Phone</h3>
                  <p className="text-muted-foreground mb-2">
                    Call us during business hours:
                  </p>
                  <a
                    href="tel:+4420XXXXXXXX"
                    className="text-primary hover:underline font-medium"
                  >
                    +44 (0) 20 XXXX XXXX
                  </a>
                </div>
              </div>

              {/* Discord Community */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MessageSquare className="h-6 w-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Discord Community</h3>
                  <p className="text-muted-foreground mb-2">
                    Join our community for discussion:
                  </p>
                  <a
                    href="https://discord.gg/eeBpdpn5F5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    Discord Server
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Address</h3>
                  <p className="text-muted-foreground">
                    Greenridge Studios<br />
                    London, UK<br />
                    (Placeholder Address)
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 mb-12">
              <div className="flex gap-4">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold mb-3">Business Hours</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Monday – Friday:</strong> 9:00 AM – 6:00 PM (GMT)</p>
                    <p><strong>Saturday – Sunday:</strong> Closed</p>
                    <p className="text-sm pt-2">Response times may vary during peak periods. We aim to respond within 24-48 hours.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Channels */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Support Channels</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">General Inquiries</h3>
                  <p className="text-muted-foreground">
                    For general questions about Greenridge Studios, our programs, or services, please email us at support@greenridgestudios.com.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Technical Support</h3>
                  <p className="text-muted-foreground">
                    If you're experiencing technical issues with our platform or account access, reach out to our technical support team.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Account & Billing</h3>
                  <p className="text-muted-foreground">
                    For account-related questions, billing inquiries, or refund requests, please include your purchase email and relevant details.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Community Support</h3>
                  <p className="text-muted-foreground">
                    Connect with fellow traders and get peer support in our Discord community. Community members often share insights and help one another.
                  </p>
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
