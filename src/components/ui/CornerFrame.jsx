import { cn } from '../../lib/utils';

/**
 * Wraps content in a precision-instrument corner bracket frame — the
 * signature visual motif for Fully Cuvved, echoing a scanner/viewfinder
 * capturing a document. Used sparingly on hero, generator and featured
 * pricing surfaces only.
 */
export default function CornerFrame({ className, children, tone = 'signal' }) {
  const toneColor = tone === 'amber' ? 'var(--color-amber-signal-400)' : 'var(--color-signal-400)';
  return (
    <div className={cn('relative', className)}>
      <span
        className="pointer-events-none absolute -left-2.5 -top-2.5 h-5 w-5 rounded-tl-md border-l-2 border-t-2 sm:-left-3 sm:-top-3 sm:h-6 sm:w-6"
        style={{ borderColor: toneColor }}
      />
      <span
        className="pointer-events-none absolute -right-2.5 -top-2.5 h-5 w-5 rounded-tr-md border-r-2 border-t-2 sm:-right-3 sm:-top-3 sm:h-6 sm:w-6"
        style={{ borderColor: toneColor }}
      />
      <span
        className="pointer-events-none absolute -bottom-2.5 -left-2.5 h-5 w-5 rounded-bl-md border-b-2 border-l-2 sm:-bottom-3 sm:-left-3 sm:h-6 sm:w-6"
        style={{ borderColor: toneColor }}
      />
      <span
        className="pointer-events-none absolute -bottom-2.5 -right-2.5 h-5 w-5 rounded-br-md border-b-2 border-r-2 sm:-bottom-3 sm:-right-3 sm:h-6 sm:w-6"
        style={{ borderColor: toneColor }}
      />
      {children}
    </div>
  );
}
