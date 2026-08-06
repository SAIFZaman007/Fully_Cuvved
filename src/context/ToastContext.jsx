import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { cn } from '../lib/utils';

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const TONE_CLASSES = {
  success: 'border-signal-500/30 text-signal-600 dark:text-signal-300 [&_svg]:text-signal-500',
  error: 'border-red-500/30 text-red-600 dark:text-red-300 [&_svg]:text-red-500',
  info: 'border-ink-400/30 text-ink-700 dark:text-ink-200 [&_svg]:text-ink-400',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message, { type = 'info', duration = 4000 } = {}) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, message, type }]);
      if (duration) setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  const api = useMemo(
    () => ({
      push,
      success: (msg, opts) => push(msg, { ...opts, type: 'success' }),
      error: (msg, opts) => push(msg, { ...opts, type: 'error' }),
      info: (msg, opts) => push(msg, { ...opts, type: 'info' }),
      dismiss,
    }),
    [push, dismiss]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6"
        aria-live="polite"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((t) => {
          const Icon = ICONS[t.type] || Info;
          return (
            <div
              key={t.id}
              className={cn(
                'flex items-start gap-3 rounded-xl border bg-white/95 p-4 shadow-lg backdrop-blur dark:bg-ink-850/95',
                TONE_CLASSES[t.type]
              )}
              role="status"
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="flex-1 text-sm font-medium text-ink-800 dark:text-ink-100">{t.message}</p>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss notification"
                className="text-ink-400 hover:text-ink-600 dark:hover:text-ink-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
