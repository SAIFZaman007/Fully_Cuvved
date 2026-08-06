import { Zap, ShieldCheck, Layers, FileCheck, Clock, Lock } from 'lucide-react';
import Reveal from '../ui/Reveal';

const FEATURES = [
  {
    icon: Zap,
    title: 'Instant generation',
    desc: 'Produce legally-structured, fully tailored motor cover notes in as little as 15 seconds.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise grade',
    desc: 'Built with 256-bit encryption and strict insurance regulatory compliance controls throughout.',
  },
  {
    icon: Layers,
    title: 'Flexible exports',
    desc: 'Export ready-to-issue insurance notes seamlessly in PDF, Word, or raw print formats.',
  },
  {
    icon: FileCheck,
    title: 'Smart templates',
    desc: 'Context-aware templates adapt structure based on vehicle type and policyholder details.',
  },
  {
    icon: Clock,
    title: '24/7 availability',
    desc: 'Generate cover notes any time, from anywhere — no delay, no waiting for manual approval.',
  },
  {
    icon: Lock,
    title: 'Private by default',
    desc: 'Sensitive policyholder and vehicle data are fully protected. You own what you generate.',
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="border-t border-ink-100 bg-ink-50/60 py-20 dark:border-ink-800 dark:bg-ink-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
            Engineered for quality &amp; speed
          </h2>
          <p className="mt-3 text-ink-500 dark:text-ink-400">
           Everything you need to automate motor cover note insurance, without the manual overhead.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal
              key={f.title}
              delay={(i % 3) * 0.08}
              className="group rounded-2xl border border-ink-200 bg-white p-7 transition hover:-translate-y-0.5 hover:border-signal-400/60 hover:shadow-lg hover:shadow-signal-500/5 dark:border-ink-700 dark:bg-ink-850"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-signal-500/20 bg-signal-500/10 text-signal-600 dark:text-signal-300">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink-900 dark:text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
