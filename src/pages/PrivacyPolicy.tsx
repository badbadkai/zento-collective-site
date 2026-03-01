import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy — Greenridge Studios";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container-studio py-12 md:py-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-sm italic text-muted-foreground mb-8">Last updated: 11 Jan 2026</p>
            
            <p className="text-lg mb-8">
              This Privacy Policy explains how Greenridge Studios ("Greenridge Studios", "we", "us", or "our") collects, uses, stores, and protects your personal data when you access or use our products, programs, platforms, and services (collectively, the "Services").
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  We collect personal data that is necessary to operate, deliver, and improve our Services. This may include the following categories:
                </p>

                <h3 className="text-xl font-semibold mb-3">1.1 Information You Provide Directly</h3>
                <p className="text-muted-foreground mb-4">
                  When you register for, purchase, or use our Services, you may provide personal data including, but not limited to:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground mb-4">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Billing and payment-related information</li>
                  <li>Account registration and onboarding details</li>
                  <li>Communications you send to us (e.g. support requests)</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  Payment card details are processed securely by third-party payment processors and are not stored directly by Greenridge Studios.
                </p>

                <h3 className="text-xl font-semibold mb-3">1.2 Information Collected via Third-Party Service Providers</h3>
                <p className="text-muted-foreground mb-4">
                  We receive limited personal data from trusted third-party providers used to operate our Services, including:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground mb-4">
                  <li>Stripe (payment processing and transaction confirmation)</li>
                  <li>Whop (user onboarding, access management, course participation, and service delivery)</li>
                </ul>
                <p className="text-muted-foreground">
                  The specific data shared is limited to what is necessary for payment processing, account access, and service provision.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  We process personal data only where there is a lawful basis to do so, including contractual necessity, legitimate interests, or legal obligations.
                </p>
                <p className="text-muted-foreground mb-4">Your information is used for the following purposes:</p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground mb-4">
                  <li>To provide, operate, maintain, and improve our Services and educational offerings</li>
                  <li>To process payments and manage subscriptions or purchases</li>
                  <li>To onboard and grant access to platforms associated with the Services, including Discord, course portals, recordings, and live sessions</li>
                  <li>To communicate with you regarding service updates, administrative notices, technical issues, security alerts, and customer support</li>
                  <li>To comply with applicable legal, regulatory, and accounting requirements</li>
                </ul>
                <p className="text-muted-foreground">
                  We do not use your data for automated decision-making or profiling that produces legal or similarly significant effects.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Data Sharing & Disclosure</h2>
                <p className="text-muted-foreground mb-4">
                  We do not sell, rent, or trade your personal data.
                </p>
                <p className="text-muted-foreground mb-4">Your information may be shared only:</p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground mb-4">
                  <li>With service providers acting as data processors on our behalf (e.g. payment and onboarding platforms)</li>
                  <li>Where required to comply with legal obligations, court orders, or regulatory requests</li>
                  <li>To protect the rights, safety, or property of Greenridge Studios or its users</li>
                </ul>
                <p className="text-muted-foreground">
                  All third-party service providers are contractually required to handle personal data securely and in accordance with applicable data protection laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Data Security & Protection</h2>
                <p className="text-muted-foreground mb-4">
                  We implement appropriate administrative, technical, and organisational safeguards designed to protect personal data against unauthorised access, loss, misuse, alteration, or disclosure.
                </p>
                <p className="text-muted-foreground mb-4">These measures include, where appropriate:</p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground mb-4">
                  <li>Secure third-party payment processing</li>
                  <li>Access controls and role-based permissions</li>
                  <li>Data minimisation practices</li>
                  <li>Encrypted communication channels</li>
                </ul>
                <p className="text-muted-foreground">
                  While no system can be guaranteed to be 100% secure, we take reasonable steps to protect your personal data in accordance with industry standards.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Data Retention</h2>
                <p className="text-muted-foreground mb-4">
                  We retain personal data only for as long as necessary to fulfil the purposes outlined in this Policy, unless a longer retention period is required or permitted by law.
                </p>
                <p className="text-muted-foreground">
                  When personal data is no longer required, it is securely deleted or anonymised.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground mb-4">
                  Depending on your jurisdiction, you may have rights including:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground mb-4">
                  <li>The right to access your personal data</li>
                  <li>The right to correct inaccurate or incomplete data</li>
                  <li>The right to request deletion of your data</li>
                  <li>The right to restrict or object to certain processing activities</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  UK residents have rights under the UK General Data Protection Regulation (UK GDPR).<br />
                  Singapore residents have rights under the Personal Data Protection Act (PDPA).
                </p>
                <p className="text-muted-foreground">
                  Requests can be made by contacting us using the details provided on our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. International Data Transfers</h2>
                <p className="text-muted-foreground">
                  Your data may be processed or stored outside your country of residence through our service providers. Where this occurs, we take reasonable steps to ensure appropriate safeguards are in place in accordance with applicable data protection laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Changes to This Policy</h2>
                <p className="text-muted-foreground mb-4">
                  We may update this Privacy Policy from time to time to reflect operational, legal, or regulatory changes.
                </p>
                <p className="text-muted-foreground mb-4">
                  When changes are made, we will update the "Last Updated" date at the top of this Policy. Where required, we may provide additional notice through the Services or via email.
                </p>
                <p className="text-muted-foreground">
                  Continued use of the Services after any updates constitutes acceptance of the revised Policy.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
