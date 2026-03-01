import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const RefundPolicy = () => {
  useEffect(() => {
    document.title = "Refund Policy — Greenridge Studios";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container-studio py-12 md:py-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Refund Policy</h1>
            <p className="text-sm italic text-muted-foreground mb-8">Last updated: 11 Jan 2026</p>
            
            <p className="text-lg mb-8">
              This Refund Policy ("Policy") applies to all purchases made from Greenridge Studios ("Greenridge Studios", "we", "us", or "our") and governs refunds relating to our educational programs, courses, digital products, and services (collectively, the "Course").
            </p>

            <p className="text-lg mb-8">
              By purchasing or accessing the Course, you acknowledge that you have read, understood, and agreed to this Policy.
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. No Refund Policy</h2>
                <p className="text-muted-foreground mb-4">
                  Except where required by applicable law, all purchases are final and non-refundable.
                </p>
                <p className="text-muted-foreground mb-4">
                  Once payment has been successfully processed, we do not offer refunds, credits, or exchanges, including (but not limited to):
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground mb-4">
                  <li>partially used access periods,</li>
                  <li>unused content,</li>
                  <li>dissatisfaction with results,</li>
                  <li>changes in personal circumstances, or</li>
                  <li>failure to complete the Course.</li>
                </ul>
                <p className="text-muted-foreground">
                  Comprehensive descriptions of the Course, its format, delivery method, and intended purpose are provided on our website and associated materials to allow you to make an informed purchasing decision prior to payment.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Exceptional Circumstances</h2>
                <p className="text-muted-foreground mb-4">
                  Notwithstanding the above, Greenridge Studios may, at its sole discretion, consider refund requests in limited exceptional circumstances, including:
                </p>

                <h3 className="text-xl font-semibold mb-3">Non-Delivery of Access</h3>
                <p className="text-muted-foreground mb-4">
                  Where you do not receive access to the Course due to a verified technical failure on our side (excluding issues caused by your email provider, spam filters, incorrect email entry, or third-party platform restrictions).
                </p>

                <h3 className="text-xl font-semibold mb-3">Material Technical Defects</h3>
                <p className="text-muted-foreground mb-4">
                  Where a significant technical defect renders the Course substantially inaccessible or unusable, and the issue cannot be reasonably remedied within a reasonable timeframe.
                </p>
                <p className="text-muted-foreground">
                  Minor bugs, temporary outages, platform updates, or user-side technical issues do not constitute material defects.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Refund Request Process</h2>
                <p className="text-muted-foreground mb-4">
                  To request a review under exceptional circumstances, you must contact us at the official support email address listed on our website, using the subject line "Refund Request", and provide:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground mb-4">
                  <li>your full name and purchase email,</li>
                  <li>proof of purchase,</li>
                  <li>a clear and detailed explanation of the issue.</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  All refund requests are assessed on a case-by-case basis. Submission of a request does not guarantee approval.
                </p>
                <p className="text-muted-foreground">
                  Greenridge Studios reserves the right to request additional information and to deny any request that does not meet the criteria outlined above.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Legal Rights</h2>
                <p className="text-muted-foreground mb-4">
                  Nothing in this Policy limits or excludes any statutory consumer rights that cannot be waived under applicable law.
                </p>
                <p className="text-muted-foreground mb-4">
                  UK consumers retain rights under applicable UK consumer protection legislation.
                </p>
                <p className="text-muted-foreground mb-4">
                  Singapore consumers retain rights under the Personal Data Protection Act and relevant consumer protection laws, where mandatory.
                </p>
                <p className="text-muted-foreground">
                  Where a refund is legally required, it will be processed in accordance with the relevant legal framework.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Chargebacks & Payment Disputes</h2>
                <p className="text-muted-foreground mb-4">
                  Initiating a chargeback or payment dispute without first contacting Greenridge Studios may result in immediate suspension or termination of access to the Course and associated services.
                </p>
                <p className="text-muted-foreground">
                  We reserve the right to contest chargebacks that violate this Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Changes to This Policy</h2>
                <p className="text-muted-foreground mb-4">
                  We reserve the right to modify or update this Refund Policy at any time, at our sole discretion.
                </p>
                <p className="text-muted-foreground">
                  Any changes will be published on our website. Continued access to or use of the Course after such updates constitutes acceptance of the revised Policy.
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

export default RefundPolicy;
