import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, Star, ArrowRight } from 'lucide-react';
import PricingCards from '../components/marketing/PricingCards';
import { Button, Badge } from '../components/ui/ui';
import Seo from '../components/seo/Seo';
import { VALUE_PROPS } from '../data/pricing';

const ICONS = { 'Lightning fast': Zap, 'Secure & private': ShieldCheck, '5-star rated': Star };

export default function Pricing() {
  return (
    <div className="bp-grid">
      <Seo
        title="Pricing"
        description="Simple, per-document pricing for UK motor cover notes, temporary cover and fleet insurance schedules. No subscriptions, no hidden fees."
        path="/pricing"
      />
      <section className="px-4 pb-16 pt-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-ink-500 dark:text-ink-400">
            Choose the right cover note plan for your needs. No hidden fees, no surprises.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Badge tone="signal" icon={Zap}>Instant processing</Badge>
            <Badge tone="neutral" icon={ShieldCheck}>Secure payment</Badge>
            <Badge tone="amber" icon={Star}>5-star rated</Badge>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <PricingCards className="mx-auto max-w-4xl" />
      </section>

      <section className="border-t border-ink-100 bg-white py-20 dark:border-ink-800 dark:bg-ink-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-ink-900 dark:text-white">Why choose Fully Cuvved?</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {VALUE_PROPS.map((v) => {
              const Icon = ICONS[v.title];
              return (
                <div key={v.title} className="rounded-2xl border border-ink-200 p-6 text-center dark:border-ink-700">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-signal-500/10 text-signal-600 dark:text-signal-300">
                    {Icon && <Icon className="h-5 w-5" />}
                  </div>
                  <h3 className="mt-4 font-bold text-ink-900 dark:text-white">{v.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <h2 className="text-2xl font-bold text-ink-900 dark:text-white sm:text-3xl">Ready to get started?</h2>
        <p className="mx-auto mt-2 max-w-md text-ink-500 dark:text-ink-400">
          Join thousands of satisfied clients who trust Fully Cuvved for instant motor cover notes.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button as={Link} to="/generator" variant="secondary" size="lg">
            Generate Cover Note
          </Button>
          <Button as={Link} to="/generator" size="lg">
            Try AI Generator <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}