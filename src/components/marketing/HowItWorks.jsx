import { PenLine, Cpu, Download } from 'lucide-react';
import Reveal from '../ui/Reveal';

const STEPS = [
  {
    icon: PenLine,
    title: 'Enter vehicle & insured details',
    desc: 'Input policyholder information, vehicle registration, and coverage preferences in seconds.',
  },
  {
    icon: Cpu,
    title: 'The AI drafts the cover note',
    desc: 'Our generation engine structures, formats, and applies regulatory compliance automatically.',
  },
  {
    icon: Download,
    title: 'Review & export official document',
    desc: 'Preview instantly, verify details, and export ready-to-issue cover notes in PDF or Word format.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
            From details to cover note in three steps
          </h2>
          <p className="mt-3 text-ink-500 dark:text-ink-400">No forms to hunt for, no manual formatting to fight with.</p>
        </Reveal>

        <div className="relative mt-16 grid gap-10 sm:grid-cols-3">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent dark:via-ink-700 sm:block" />
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.12} className="relative flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-signal-500/30 bg-white text-signal-600 shadow-sm dark:bg-ink-950 dark:text-signal-300">
                <step.icon className="h-5 w-5" />
              </div>
              <span className="mt-4 font-mono text-xs font-semibold text-ink-400">STEP {i + 1}</span>
              <h3 className="mt-1 text-lg font-bold text-ink-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{step.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
