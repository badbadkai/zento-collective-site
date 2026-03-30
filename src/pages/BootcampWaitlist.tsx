import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

const BootcampWaitlist: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    discord: "",
    experience: "",
    propFirm: "",
    challenge: "",
  });

  useEffect(() => {
    document.title = "Bootcamp Waitlist | Zento Collective";
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/bootcamp-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.name,
          email: form.email,
          discord: form.discord,
          trading_experience: form.experience,
          prop_firm_history: form.propFirm,
          biggest_challenge: form.challenge,
        }),
      });

      if (!res.ok) {
        const result = await res.json().catch(() => ({}));
        throw new Error(result?.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 pt-32 pb-20">
          <div className="container-studio">
            <div className="max-w-xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
                You're on the list.
              </h1>
              <p className="text-muted-foreground text-lg">
                We'll reach out when the next cohort opens.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-32 pb-20">
        <div className="container-studio">
          <div className="max-w-xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">
                Apply Now
              </p>
              <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-4">
                Bootcamp <span className="text-primary">Waitlist</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Tell us a bit about yourself so we can prepare for your cohort.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discord">Discord Username</Label>
                <Input
                  id="discord"
                  name="discord"
                  type="text"
                  required
                  placeholder="Your username"
                  value={form.discord}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">
                  How long have you been trading?
                </Label>
                <select
                  id="experience"
                  name="experience"
                  required
                  value={form.experience}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="less-than-6-months">Less than 6 months</option>
                  <option value="6-12-months">6-12 months</option>
                  <option value="1-2-years">1-2 years</option>
                  <option value="2-plus-years">2+ years</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="propFirm">
                  Have you attempted a prop firm challenge before?
                </Label>
                <select
                  id="propFirm"
                  name="propFirm"
                  required
                  value={form.propFirm}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="no">No</option>
                  <option value="yes-passed">Yes - passed</option>
                  <option value="yes-failed">Yes - failed</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="challenge">
                  What is your biggest challenge right now?
                </Label>
                <Textarea
                  id="challenge"
                  name="challenge"
                  required
                  placeholder="Tell us what you're struggling with..."
                  rows={4}
                  value={form.challenge}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
              >
                Join the Waitlist
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BootcampWaitlist;
