import { AnimatePresence, motion } from 'framer-motion';
import { Zap, ShieldCheck, MapPin, X } from 'lucide-react';

const ITEMS = [
  { icon: Zap, label: 'Documents generated in ~12 seconds' },
  { icon: ShieldCheck, label: '256-bit encrypted, UK GDPR compliant' },
  { icon: MapPin, label: 'Instant Temporary Car Insurance, issued nationwide' },
];

export default function Ribbon({ visible, onDismiss }) {
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="overflow-hidden border-b border-ink-200 bg-ink-50 dark:border-ink-800 dark:bg-ink-950"
        >
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2 sm:px-6 lg:px-8">
            <div className="flex flex-1 flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center text-[11px] font-medium text-ink-500 dark:text-ink-300 sm:text-xs">
              {ITEMS.map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-signal-500 dark:text-signal-400" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss announcement bar"
              className="hidden shrink-0 rounded-md p-1 text-ink-400 transition hover:bg-ink-200/60 hover:text-ink-700 dark:text-ink-500 dark:hover:bg-ink-800 dark:hover:text-ink-200 sm:inline-flex"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
