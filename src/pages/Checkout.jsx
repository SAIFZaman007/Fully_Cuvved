import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Lock, ShieldCheck, CreditCard } from 'lucide-react';
import { Button, Input } from '../components/ui/ui';
import { checkoutOrder } from '../lib/api';
import { formatGBP } from '../lib/utils';
import { useToast } from '../context/ToastContext';
import Seo from '../components/seo/Seo';

/**
 * IMPORTANT — production note:
 * These card fields are placeholder UI only. Before going live, replace them
 * with Stripe Elements (or an equivalent PCI-compliant provider's hosted
 * fields/iframe). The frontend and backend should never receive or store
 * raw card numbers — only a payment method token from the processor's SDK,
 * forwarded to POST /orders/:id/checkout. See backend/README.md.
 */
export default function Checkout() {
  const { orderId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [card, setCard] = useState({ name: '', number: '', expiry: '', cvc: '' });

  const price = state?.price ?? 1000;
  const docType = state?.docType ?? 'contract';

  async function handlePay(e) {
    e.preventDefault();
    if (!card.name || card.number.replace(/\s/g, '').length < 12 || !card.expiry || card.cvc.length < 3) {
      toast.error('Check your payment details and try again.');
      return;
    }
    setSubmitting(true);
    try {
      await checkoutOrder(orderId, { paymentMethodToken: 'mock_pm_token' });
      navigate(`/order/success/${orderId}`, { state: { price, docType } });
    } catch {
      toast.error('Payment could not be processed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-var(--header-h))] bg-ink-50/60 dark:bg-ink-900/30">
      <Seo title="Secure Checkout" path={`/checkout/${orderId}`} noindex />
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-ink-900 dark:text-white">Secure checkout</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Order reference {orderId}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={handlePay} className="space-y-5 rounded-2xl border border-ink-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-850 sm:p-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200">
              <CreditCard className="h-4 w-4 text-signal-500" /> Payment details
            </div>

            <Input
              label="Cardholder name"
              placeholder="A. Morgan"
              value={card.name}
              onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
            />
            <Input
              label="Card number"
              placeholder="4242 4242 4242 4242"
              inputMode="numeric"
              value={card.number}
              onChange={(e) => setCard((c) => ({ ...c, number: e.target.value }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry"
                placeholder="MM/YY"
                value={card.expiry}
                onChange={(e) => setCard((c) => ({ ...c, expiry: e.target.value }))}
              />
              <Input
                label="CVC"
                placeholder="123"
                inputMode="numeric"
                value={card.cvc}
                onChange={(e) => setCard((c) => ({ ...c, cvc: e.target.value }))}
              />
            </div>

            <Button type="submit" size="lg" className="w-full" loading={submitting}>
              <Lock className="h-4 w-4" /> Pay {formatGBP(price)}
            </Button>

            <p className="flex items-center justify-center gap-1.5 text-xs text-ink-400">
              <ShieldCheck className="h-3.5 w-3.5" /> Payments are processed securely — card details are never stored on our servers.
            </p>
          </form>

          <aside className="h-fit rounded-2xl border border-ink-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-850">
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink-400">Order summary</h3>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-ink-600 dark:text-ink-300 capitalize">{docType.replace('-', ' ')}</span>
              <span className="font-semibold text-ink-900 dark:text-white">{formatGBP(price)}</span>
            </div>
            <div className="my-4 h-px bg-ink-100 dark:bg-ink-700" />
            <div className="flex items-center justify-between text-base font-bold">
              <span className="text-ink-900 dark:text-white">Total</span>
              <span className="text-ink-900 dark:text-white">{formatGBP(price)}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
