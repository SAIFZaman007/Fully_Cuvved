import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/ui';
import Reveal from '../ui/Reveal';
import { cn } from '../../lib/utils';

const TABS = [
  {
    id: 'contract',
    label: 'Motor Cover Note',
    header: '// CERTIFICATE OF MOTOR COVER NOTE',
    lines: [
      'POLICYHOLDER: Alex Morgan | REG: UK68 XYZ',
      'INSURER: Fully Cuvved Underwriting Ltd.'
    ],
    muted: 'COVERAGE: Comprehensive Motor Insurance (30-Day Active Note)',
  },
  {
    id: 'alternative-note',
    label: 'Temporary Cover',
    header: '// TEMPORARY MOTOR INSURANCE NOTE',
    lines: [
      'RECIPIENT: DVLA / Vehicle Licensing Authority',
      'VEHICLE: BMW 3 Series (VIN: WBA33010928371)'
    ],
    muted: 'VALIDATION: Digitally signed & verified coverage hash included.',
  },
  {
    id: 'proposal',
    label: 'Insurance Schedule',
    header: '// FLEET MOTOR INSURANCE PROPOSAL',
    lines: [
      'PROJECT: Commercial Fleet Coverage & Risk Assessment',
      'ESTIMATED TIMELINE: Instant Generation'
    ],
    muted: 'DELIVERABLES: Comprehensive risk analysis, multi-vehicle schedule…',
  },
];

export default function DocumentPreview() {
  const [active, setActive] = useState('contract');
  const tab = TABS.find((t) => t.id === active);

  return (
    <section id="simulator" className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal as="div" className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-xl shadow-ink-900/[0.03] dark:border-ink-700 dark:bg-ink-850">
          <div className="flex flex-col gap-4 border-b border-ink-100 p-6 dark:border-ink-700 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h3 className="text-xl font-bold text-ink-900 dark:text-white sm:text-2xl">Interactive document preview</h3>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Select a template type to see Fully Cuvved in action.</p>
            </div>
            <div className="flex gap-1 rounded-xl border border-ink-200 bg-ink-50 p-1 dark:border-ink-700 dark:bg-ink-900">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={cn(
                    'rounded-lg px-3.5 py-1.5 text-xs font-semibold transition sm:text-sm',
                    active === t.id
                      ? 'bg-signal-500 text-ink-950'
                      : 'text-ink-500 hover:text-ink-800 dark:text-ink-400 dark:hover:text-ink-100'
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="rounded-xl border border-ink-200 bg-ink-950 p-6 font-mono text-xs leading-relaxed text-ink-200">
              <div className="mb-4 flex items-center justify-between border-b border-ink-700/80 pb-4 text-ink-500">
                <span>STATUS: READY FOR COMPILATION</span>
                <span>ENGINE: FC-V4-NEURAL</span>
              </div>
              <div className="space-y-2">
                <p className="font-bold text-signal-400">{tab.header}</p>
                {tab.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <p className="text-ink-500">{tab.muted}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-ink-500 dark:text-ink-400">
                This is a static preview — the live generator produces a full, tailored draft from your own input.
              </p>
              <Button as={Link} to="/generator" size="md">
                Open live generator <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
