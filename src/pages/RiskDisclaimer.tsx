import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const RiskDisclaimer = () => {
  useEffect(() => {
    document.title = "Risk Disclaimer — Greenridge Studios";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container-studio py-12 md:py-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Risk Disclosure</h1>
            <p className="text-sm italic text-muted-foreground mb-8">Last updated: 11 Jan 2026</p>
            
            <p className="text-lg mb-8">
              This Risk Disclosure Statement applies to all content, programs, platforms, courses, tools, and services (collectively, the "Services") provided by Greenridge Studios ("Greenridge Studios", "we", "us", or "our").
            </p>

            <p className="text-lg mb-8">
              Trading and participation in financial markets involve significant risk and are not suitable for all individuals. You should carefully consider whether trading is appropriate for you in light of your financial condition, experience, objectives, and risk tolerance.
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. CFTC Risk Disclosure Statement</h2>
                <p className="text-muted-foreground mb-4">
                  The risk of loss in trading commodity futures, options, forex, and other leveraged financial instruments can be substantial. You should therefore carefully consider whether such trading is suitable for you in light of your financial condition.
                </p>
                <p className="text-muted-foreground mb-4">
                  In considering whether to trade, you should be aware of the following:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground mb-4">
                  <li>You may sustain a total loss of the funds that you deposit as margin.</li>
                  <li>You may incur losses that exceed your initial investment.</li>
                  <li>Market movements can be sudden and extreme, resulting in rapid losses.</li>
                  <li>Leverage can work against you as well as for you.</li>
                  <li>You should not fund a trading account with money you cannot afford to lose.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. No Guarantee of Results</h2>
                <p className="text-muted-foreground mb-4">
                  There is no guarantee that any trading methodology, strategy, system, framework, indicator, or approach discussed or demonstrated through the Services will result in profits or avoid losses.
                </p>
                <p className="text-muted-foreground mb-4">
                  Past performance, whether actual or simulated, is not indicative of future results.
                </p>
                <p className="text-muted-foreground">
                  Any examples of trades, performance metrics, win rates, or outcomes are provided for illustrative and educational purposes only and do not represent actual or expected results.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Hypothetical & Simulated Performance Disclaimer</h2>
                <p className="text-muted-foreground mb-4">
                  Hypothetical or simulated performance results have inherent limitations.
                </p>
                <p className="text-muted-foreground mb-4">
                  Unlike an actual performance record, simulated results:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground mb-4">
                  <li>Do not represent actual trading</li>
                  <li>May under- or over-compensate for the impact of market factors such as liquidity and slippage</li>
                  <li>Are designed with the benefit of hindsight</li>
                </ul>
                <p className="text-muted-foreground">
                  No representation is being made that any account will or is likely to achieve profits or losses similar to those shown.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Educational Use Only – No Advice</h2>
                <p className="text-muted-foreground mb-4">
                  All content provided by Greenridge Studios is intended solely for educational and informational purposes.
                </p>
                <p className="text-muted-foreground mb-4">
                  Greenridge Studios does not:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground mb-4">
                  <li>provide investment advice,</li>
                  <li>provide trading recommendations,</li>
                  <li>manage accounts,</li>
                  <li>act as a broker, dealer, or financial advisor.</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  Nothing within the Services constitutes an offer, solicitation, recommendation, or endorsement to buy or sell any financial instrument.
                </p>
                <p className="text-muted-foreground">
                  You are solely responsible for your trading decisions and outcomes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Psychological & Behavioural Risks</h2>
                <p className="text-muted-foreground mb-4">
                  Trading places significant demands on cognitive, emotional, and psychological resilience.
                </p>
                <p className="text-muted-foreground mb-4">
                  You acknowledge that:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground mb-4">
                  <li>stress, emotional decision-making, and cognitive bias can materially affect performance,</li>
                  <li>trading losses may negatively impact mental well-being,</li>
                  <li>fatigue, overtrading, and impaired judgment increase risk exposure.</li>
                </ul>
                <p className="text-muted-foreground">
                  Greenridge Studios makes no representations regarding psychological suitability for trading.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Technology & Execution Risk</h2>
                <p className="text-muted-foreground mb-4">
                  Trading involves reliance on technology, platforms, internet connectivity, data feeds, and third-party services.
                </p>
                <p className="text-muted-foreground mb-4">
                  Risks include, but are not limited to:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground mb-4">
                  <li>system failures,</li>
                  <li>data delays or inaccuracies,</li>
                  <li>platform outages,</li>
                  <li>execution errors,</li>
                  <li>latency or connectivity disruptions.</li>
                </ul>
                <p className="text-muted-foreground">
                  Greenridge Studios is not responsible for losses resulting from technical or infrastructure failures beyond its control.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Third-Party Platforms & Prop Firms</h2>
                <p className="text-muted-foreground mb-4">
                  Any references to third-party platforms, brokers, prop firms, or service providers are made for educational context only.
                </p>
                <p className="text-muted-foreground mb-4">
                  Greenridge Studios:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground mb-4">
                  <li>is not affiliated with, endorsed by, or responsible for third-party platforms,</li>
                  <li>does not guarantee access, funding, or account approval,</li>
                  <li>assumes no liability for third-party rules, evaluations, or account outcomes.</li>
                </ul>
                <p className="text-muted-foreground">
                  You are solely responsible for understanding and complying with the terms of any third-party service you engage with.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Jurisdictional & Regulatory Notice</h2>
                <p className="text-muted-foreground mb-4">
                  Greenridge Studios is not authorised or regulated by:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground mb-4">
                  <li>the U.S. Commodity Futures Trading Commission (CFTC),</li>
                  <li>the UK Financial Conduct Authority (FCA), or</li>
                  <li>the Monetary Authority of Singapore (MAS).</li>
                </ul>
                <p className="text-muted-foreground">
                  The Services are offered globally for educational purposes only. Laws and regulations vary by jurisdiction, and you are responsible for ensuring compliance with local requirements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  To the fullest extent permitted by applicable law, Greenridge Studios shall not be liable for any losses, damages, or claims arising directly or indirectly from:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground mb-4">
                  <li>your use of the Services,</li>
                  <li>reliance on any information provided,</li>
                  <li>trading decisions made by you,</li>
                  <li>inability to access the Services.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Acceptance of Risk</h2>
                <p className="text-muted-foreground mb-4">
                  By accessing or using the Services, you acknowledge that:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground mb-4">
                  <li>you understand the risks involved in trading,</li>
                  <li>you accept full responsibility for your actions and outcomes,</li>
                  <li>you have read and understood this Risk Disclosure in its entirety.</li>
                </ul>
                <p className="text-muted-foreground">
                  If you do not agree with or understand any part of this Risk Disclosure, you must not use the Services.
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

export default RiskDisclaimer;
