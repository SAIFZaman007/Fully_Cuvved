import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const VARIANTS = {
  primary:
    'bg-signal-500 text-ink-950 hover:bg-signal-400 shadow-[var(--shadow-glow-signal)] font-semibold',
  secondary:
    'bg-ink-100 text-ink-900 hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-50 dark:hover:bg-ink-700 border border-ink-200 dark:border-ink-600 font-semibold',
  ghost:
    'bg-transparent text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800 font-medium',
  outline:
    'bg-transparent border border-ink-300 dark:border-ink-600 text-ink-800 dark:text-ink-100 hover:border-signal-400 hover:text-signal-600 dark:hover:text-signal-300 font-semibold',
  danger: 'bg-red-500 text-white hover:bg-red-400 font-semibold',
};

const SIZES = {
  sm: 'px-3.5 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-base rounded-xl gap-2',
};

export const Button = forwardRef(function Button(
  { as: Comp = 'button', className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props },
  ref
) {
  return (
    <Comp
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </Comp>
  );
});

export function Badge({ className, tone = 'neutral', children, icon: Icon, ...props }) {
  const tones = {
    neutral: 'bg-ink-100 text-ink-700 border-ink-200 dark:bg-ink-800 dark:text-ink-200 dark:border-ink-600',
    signal: 'bg-signal-500/10 text-signal-600 dark:text-signal-300 border-signal-500/25',
    amber: 'bg-amber-signal-400/10 text-amber-signal-600 dark:text-amber-signal-300 border-amber-signal-400/25',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/25',
    danger: 'bg-red-500/10 text-red-600 dark:text-red-300 border-red-500/25',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        tones[tone],
        className
      )}
      {...props}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-850',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export const Input = forwardRef(function Input({ className, label, error, hint, id, ...props }, ref) {
  return (
    <label className="block" htmlFor={id}>
      {label && <span className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">{label}</span>}
      <input
        ref={ref}
        id={id}
        className={cn(
          'w-full rounded-xl border border-ink-300 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 outline-none transition focus:border-signal-500 focus:ring-2 focus:ring-signal-500/20 dark:border-ink-600 dark:bg-ink-900 dark:text-ink-50',
          error && 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
          className
        )}
        {...props}
      />
      {hint && !error && <span className="mt-1.5 block text-xs text-ink-400">{hint}</span>}
      {error && <span className="mt-1.5 block text-xs font-medium text-red-500">{error}</span>}
    </label>
  );
});

export const Textarea = forwardRef(function Textarea({ className, label, error, hint, id, ...props }, ref) {
  return (
    <label className="block" htmlFor={id}>
      {label && <span className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">{label}</span>}
      <textarea
        ref={ref}
        id={id}
        className={cn(
          'w-full resize-y rounded-xl border border-ink-300 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 outline-none transition focus:border-signal-500 focus:ring-2 focus:ring-signal-500/20 dark:border-ink-600 dark:bg-ink-900 dark:text-ink-50',
          error && 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
          className
        )}
        {...props}
      />
      {hint && !error && <span className="mt-1.5 block text-xs text-ink-400">{hint}</span>}
      {error && <span className="mt-1.5 block text-xs font-medium text-red-500">{error}</span>}
    </label>
  );
});

export const Select = forwardRef(function Select({ className, label, id, children, ...props }, ref) {
  return (
    <label className="block" htmlFor={id}>
      {label && <span className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">{label}</span>}
      <select
        ref={ref}
        id={id}
        className={cn(
          'w-full rounded-xl border border-ink-300 bg-white px-4 py-2.5 text-sm text-ink-900 outline-none transition focus:border-signal-500 focus:ring-2 focus:ring-signal-500/20 dark:border-ink-600 dark:bg-ink-900 dark:text-ink-50',
          className
        )}
        {...props}
      >
        {children}
      </select>
    </label>
  );
});

export function Spinner({ className }) {
  return <Loader2 className={cn('h-5 w-5 animate-spin text-signal-500', className)} />;
}

export function StepIndicator({ steps, current }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const state = stepNum < current ? 'done' : stepNum === current ? 'active' : 'upcoming';
        return (
          <li key={label} className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold',
                  state === 'done' && 'border-signal-500 bg-signal-500 text-ink-950',
                  state === 'active' && 'border-signal-500 text-signal-600 dark:text-signal-300',
                  state === 'upcoming' && 'border-ink-300 text-ink-400 dark:border-ink-600'
                )}
              >
                {stepNum}
              </span>
              <span
                className={cn(
                  'hidden text-sm font-medium sm:inline',
                  state === 'upcoming' ? 'text-ink-400' : 'text-ink-800 dark:text-ink-100'
                )}
              >
                {label}
              </span>
            </div>
            {stepNum !== steps.length && <span className="h-px w-6 bg-ink-300 dark:bg-ink-600 sm:w-10" />}
          </li>
        );
      })}
    </ol>
  );
}
