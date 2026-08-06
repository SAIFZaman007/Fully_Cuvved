import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Accordion({ items, defaultOpen = null }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const panelId = `accordion-panel-${idx}`;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-xl border border-ink-200 bg-white transition dark:border-ink-700 dark:bg-ink-850"
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-semibold text-ink-800 transition hover:bg-ink-50 dark:text-ink-100 dark:hover:bg-ink-800/50"
              >
                {item.q}
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 text-ink-400 transition-transform duration-200',
                    isOpen && 'rotate-180 text-signal-500'
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              className={cn('grid transition-all duration-200 ease-out', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
            >
              <div className="overflow-hidden">
                <p className="border-t border-ink-100 px-5 pb-5 pt-3 text-sm leading-relaxed text-ink-500 dark:border-ink-700/60 dark:text-ink-300">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
