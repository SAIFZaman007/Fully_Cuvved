import Hero from '../components/marketing/Hero';
import WelcomeSection from '../components/marketing/WelcomeSection';
import FeatureGrid from '../components/marketing/FeatureGrid';
import DocumentPreview from '../components/marketing/DocumentPreview';
import HowItWorks from '../components/marketing/HowItWorks';
import Testimonials from '../components/marketing/Testimonials';
import PricingCards from '../components/marketing/PricingCards';
import FAQSection from '../components/marketing/FAQSection';
import CTASection from '../components/marketing/CTASection';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Hero />
      <WelcomeSection />
      <FeatureGrid />
      <DocumentPreview />
      <HowItWorks />
      <Testimonials />

      <section id="pricing" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-3 text-ink-500 dark:text-ink-400">
              Pay per document — no subscriptions, no hidden fees.{' '}
              <Link to="/pricing" className="font-medium text-signal-600 hover:underline dark:text-signal-300">
                See full breakdown
              </Link>
            </p>
          </div>
          <PricingCards className="mx-auto mt-14 max-w-4xl" />
        </div>
      </section>

      <FAQSection />
      <CTASection />
    </>
  );
}
