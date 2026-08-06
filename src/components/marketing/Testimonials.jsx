import { Star } from 'lucide-react';
import Reveal from '../ui/Reveal';

const QUOTES = [
  {
    quote:
      'We replaced hours of manual cover note processing with a quick 2-minute check. Generating legally-compliant motor cover documentation has never been easier.',
    name: 'Priya N.',
    role: 'Fleet Operations Manager',
  },
  {
    quote:
      'Fully Cuvved is excellent value and a genuinely fast way to issue official motor cover notes for our clients with exact details every time.',
    name: 'Marcus T.',
    role: 'Independent Insurance Broker',
  },
  {
    quote:
      'The instant verification and automated compliance features sold us — we can issue motor cover notes to our policyholders without any manual overhead.',
    name: 'Aisha K.',
    role: 'Head of Operations, Auto Cover Agency',
  },
];

export default function Testimonials() {
  return (
    <section className="border-y border-ink-100 bg-ink-50/60 py-20 dark:border-ink-800 dark:bg-ink-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
            Why professionals choose Fully Cuvved
          </h2>
          <p className="mt-3 text-ink-500 dark:text-ink-400">Official motor cover notes generated in seconds — from anywhere.</p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {QUOTES.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.1}
              as="figure"
              className="flex flex-col rounded-2xl border border-ink-200 bg-white p-7 dark:border-ink-700 dark:bg-ink-850"
            >
              <div className="flex gap-0.5 text-amber-signal-500">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 border-t border-ink-100 pt-4 text-sm dark:border-ink-700">
                <span className="font-semibold text-ink-900 dark:text-white">{t.name}</span>
                <span className="block text-ink-400">{t.role}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
