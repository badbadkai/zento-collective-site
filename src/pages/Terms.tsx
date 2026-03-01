import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Terms = () => {
  useEffect(() => {
    document.title = "Terms and Conditions — Greenridge Studios";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container-studio py-12 md:py-20">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Terms and Conditions</h1>
            <p className="text-sm italic text-muted-foreground mb-8">Last updated: 11 Jan 2026</p>

            <p className="text-lg mb-6">
              These Terms and Conditions ("Terms") govern all access to and use of the products, programs, platforms, content, and services (collectively, the "Product") provided by Greenridge Studios ("Greenridge Studios", "we", "us", or "our").
            </p>

            <p className="text-lg mb-8">
              By accessing, purchasing, or using any part of the Product, you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree to all of these Terms, you must not access or use the Product.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Nature of Content & No Financial Advice</h2>
              <div className="space-y-4">
                <p>
                  <strong>1.1</strong> All content provided through the Product is made available solely for educational and informational purposes. This includes, without limitation, market commentary, trading frameworks, methodologies, examples, simulations, hypothetical scenarios, and performance discussions.
                </p>
                <p>
                  <strong>1.2</strong> Greenridge Studios is not authorised or regulated by the UK Financial Conduct Authority (FCA) or the Monetary Authority of Singapore (MAS), and does not provide regulated financial services.
                </p>
                <p>
                  <strong>1.3</strong> Nothing contained in the Product constitutes, or should be construed as:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>investment advice,</li>
                  <li>financial advice,</li>
                  <li>trading recommendations,</li>
                  <li>portfolio management,</li>
                  <li>legal advice, or</li>
                  <li>tax advice.</li>
                </ul>
                <p className="mt-4">
                  You should seek advice from an independent, appropriately qualified professional before making any financial or trading decisions.
                </p>
                <p>
                  <strong>1.4</strong> Any references to financial instruments, markets, or strategies are illustrative only and do not constitute an offer, solicitation, or recommendation to buy or sell any securities or financial products.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Risk Disclosure</h2>
              <div className="space-y-4">
                <p>
                  <strong>2.1</strong> Trading and investing in financial markets involves substantial risk, including the potential loss of all capital. Past performance, whether real or simulated, is not indicative of future results.
                </p>
                <p>
                  <strong>2.2</strong> Any performance metrics, win rates, projections, or examples referenced within the Product are hypothetical or historical in nature and do not guarantee any specific outcome.
                </p>
                <p>
                  <strong>2.3</strong> You acknowledge and agree that you are solely responsible for your trading decisions and outcomes. Greenridge Studios accepts no responsibility or liability for any losses incurred as a result of your use of the Product.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Accuracy of Information</h2>
              <div className="space-y-4">
                <p>
                  <strong>3.1</strong> All information is provided as of the date published and may be updated, amended, or withdrawn at any time without notice.
                </p>
                <p>
                  <strong>3.2</strong> While reasonable efforts are made to ensure accuracy, Greenridge Studios makes no representations or warranties regarding the completeness, reliability, or timeliness of any information provided.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Refunds & Consumer Rights</h2>
              <div className="space-y-4">
                <p>
                  <strong>4.1</strong> Except where required by applicable law, no refunds or credits will be issued for partially used subscriptions, programs, digital products, or access periods.
                </p>
                <p>
                  <strong>4.2</strong> For UK consumers, nothing in these Terms limits your statutory rights under applicable consumer protection legislation.
                </p>
                <p>
                  <strong>4.3</strong> For Singapore consumers, refunds and cancellations are governed by applicable consumer protection laws, where mandatory.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
              <div className="space-y-4">
                <p>
                  <strong>5.1</strong> All content included in or made available through the Product, including text, graphics, branding, logos, methodologies, frameworks, layouts, audiovisual materials, and software, is the exclusive property of Greenridge Studios and is protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p>
                  <strong>5.2</strong> You are granted a limited, non-exclusive, non-transferable, revocable licence to access and use the Product for personal, non-commercial use only.
                </p>
                <p>
                  <strong>5.3</strong> You may not copy, reproduce, distribute, modify, reverse-engineer, republish, transmit, or exploit any portion of the Product, including underlying code or conceptual structures, without prior written consent from Greenridge Studios.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Disclaimer of Warranties</h2>
              <div className="space-y-4">
                <p>
                  <strong>6.1</strong> The Product is provided on an "as is" and "as available" basis, without warranties of any kind, whether express or implied.
                </p>
                <p>
                  <strong>6.2</strong> Greenridge Studios does not warrant that:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>the Product will be uninterrupted, timely, secure, or error-free,</li>
                  <li>defects will be corrected, or</li>
                  <li>the Product will meet your expectations or requirements.</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
              <div className="space-y-4">
                <p>
                  <strong>7.1</strong> To the fullest extent permitted by applicable law, Greenridge Studios shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising out of or in connection with your use of, or inability to use, the Product.
                </p>
                <p>
                  <strong>7.2</strong> This limitation applies regardless of the legal theory relied upon, including contract, negligence, strict liability, or otherwise.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Data Protection</h2>
              <div className="space-y-4">
                <p>
                  <strong>8.1</strong> Any personal data collected is processed in accordance with applicable data protection laws, including:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>the UK General Data Protection Regulation (UK GDPR), and</li>
                  <li>the Singapore Personal Data Protection Act (PDPA).</li>
                </ul>
                <p className="mt-4">
                  <strong>8.2</strong> Further details regarding data collection and use are set out in our Privacy Policy.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Governing Law & Jurisdiction</h2>
              <div className="space-y-4">
                <p>
                  <strong>9.1</strong> Where you are a UK resident, these Terms shall be governed by and construed in accordance with the laws of England and Wales, and the courts of England and Wales shall have exclusive jurisdiction.
                </p>
                <p>
                  <strong>9.2</strong> Where you are a Singapore resident, these Terms shall be governed by and construed in accordance with the laws of Singapore, and the courts of Singapore shall have exclusive jurisdiction.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Modifications to Terms</h2>
              <div className="space-y-4">
                <p>
                  <strong>10.1</strong> Greenridge Studios reserves the right to amend or update these Terms at any time, at its sole discretion.
                </p>
                <p>
                  <strong>10.2</strong> Continued use of the Product following any changes constitutes acceptance of the revised Terms.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Entire Agreement</h2>
              <p>
                These Terms constitute the entire agreement between you and Greenridge Studios in relation to the Product and supersede all prior agreements, representations, or understandings.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
