import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ShieldCheck, Zap, Lock, ArrowRight, MapPin } from 'lucide-react';
import Logo from './Logo';
import { Button } from '../ui/ui';
import { isValidEmail } from '../../lib/utils';

const COLUMNS = [
  {
    title: 'Capabilities',
    links: [
      { label: 'Motor cover notes', to: '/generator' },
      { label: 'Temporary cover', to: '/alternative-notes' },
      { label: 'Fleet insurance schedules', to: '/generator' },
      { label: 'Policy certificates', to: '/generator' },
      { label: 'Verification notes', to: '/generator' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Pricing', to: '/pricing' },
      { label: 'Help centre', to: '/help' },
      { label: 'Track an order', to: '/track-order' },
      { label: 'Contact us', to: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', to: '/privacy' },
      { label: 'Terms of service', to: '/terms' },
    ],
  },
];

const TRUST_BADGES = [
  { icon: Zap, label: '~12s average generation' },
  { icon: ShieldCheck, label: '256-bit encrypted' },
  { icon: Lock, label: 'UK GDPR compliant' },
];

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | error | success

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus('error');
      return;
    }
    // No backend endpoint wired yet — this is a client-side-only stub so the
    // footer is ready to connect to a real subscribe endpoint later.
    setStatus('success');
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <label htmlFor="footer-email" className="text-xs font-semibold uppercase tracking-wider text-ink-400">
        Product updates
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="footer-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== 'idle') setStatus('idle');
          }}
          placeholder="you@company.com"
          className="w-full min-w-0 rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-signal-400 focus:outline-none dark:border-ink-700 dark:bg-ink-900 dark:text-white"
        />
        <Button type="submit" size="sm" className="shrink-0">
          Subscribe <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
      {status === 'error' && <p className="mt-1.5 text-xs text-red-500">Enter a valid email address.</p>}
      {status === 'success' && <p className="mt-1.5 text-xs text-signal-600 dark:text-signal-300">You're subscribed — thanks!</p>}
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-950">
      {/* Trust row */}
      <div className="border-b border-ink-100 dark:border-ink-800">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-5 sm:px-6 lg:justify-between lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs font-medium text-ink-500 dark:text-ink-400">
                <Icon className="h-3.5 w-3.5 text-signal-500 dark:text-signal-400" />
                {label}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1.5 text-xs font-medium text-ink-500 dark:text-ink-400">
            <MapPin className="h-3.5 w-3.5 text-signal-500 dark:text-signal-400" />
            Serving policyholders across the United Kingdom
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <Logo showTag={false} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              Precision AI document generation for motor cover notes, insurance schedules, and policy certificates. Built for speed, structured for compliance.
            </p>
            <NewsletterForm />
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink-400">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-ink-600 transition hover:text-signal-600 dark:text-ink-300 dark:hover:text-signal-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-100 pt-8 text-xs text-ink-400 dark:border-ink-800 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Fully Cuvved Ltd. Registered in the United Kingdom. All rights reserved.
            <span className="mx-2" aria-hidden="true">·</span>
            <span aria-label="Region: United Kingdom">🇬🇧 United Kingdom</span>
          </p>
          <a href="mailto:support@fullycuvved.com" className="flex items-center gap-1.5 hover:text-signal-600 dark:hover:text-signal-300">
            <Mail className="h-3.5 w-3.5" /> support@fullycuvved.com
          </a>
        </div>
      </div>
    </footer>
  );
}
