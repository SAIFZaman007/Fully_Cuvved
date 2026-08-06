import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/ui';
import Reveal from '../ui/Reveal';

export default function CTASection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal as="div" className="bp-grid relative overflow-hidden rounded-3xl border border-ink-700 bg-ink-950 px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-signal-500/10 via-transparent to-amber-signal-400/5" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to get started?</h2>
            <p className="mx-auto mt-3 max-w-lg text-ink-300">
              Join thousands of professionals who trust Fully Cuvved for fast, precise motor cover note generation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button as={Link} to="/generator" size="lg">
                Try live generator <ArrowRight className="h-4 w-4" />
              </Button>
              <Button as={Link} to="/pricing" variant="outline" size="lg" className="border-ink-600 text-ink-100 hover:border-signal-400">
                View pricing plans
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}