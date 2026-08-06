import { Link, useLocation, useParams } from 'react-router-dom';
import { CheckCircle2, Download, LayoutDashboard, Mail } from 'lucide-react';
import { Button } from '../components/ui/ui';
import { formatGBP, formatDate } from '../lib/utils';
import Seo from '../components/seo/Seo';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const { state } = useLocation();
  const price = state?.price ?? 1000;
  const docType = state?.docType ?? 'document';

  return (
    <div className="flex min-h-[calc(100vh-var(--header-h))] items-center justify-center bp-grid px-4 py-16">
      <Seo title="Order Confirmed" path={`/order/success/${orderId}`} noindex />
      <div className="w-full max-w-lg rounded-2xl border border-ink-200 bg-white p-8 text-center shadow-xl dark:border-ink-700 dark:bg-ink-850 sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-signal-500/10 text-signal-600 dark:text-signal-300">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-ink-900 dark:text-white">Document generated</h1>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
          Your payment of {formatGBP(price)} was successful. We've emailed a copy and it's ready to download below.
        </p>

        <div className="mt-6 space-y-2 rounded-xl bg-ink-50 p-4 text-left text-sm dark:bg-ink-900">
          <div className="flex justify-between">
            <span className="text-ink-400">Order reference</span>
            <span className="font-mono font-medium text-ink-800 dark:text-ink-100">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-400">Document type</span>
            <span className="font-medium capitalize text-ink-800 dark:text-ink-100">{docType.replace('-', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-400">Date</span>
            <span className="font-medium text-ink-800 dark:text-ink-100">{formatDate(new Date())}</span>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button className="flex-1" size="lg">
            <Download className="h-4 w-4" /> Download PDF
          </Button>
          <Button as={Link} to="/account" variant="secondary" className="flex-1" size="lg">
            <LayoutDashboard className="h-4 w-4" /> View in account
          </Button>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-ink-400">
          <Mail className="h-3.5 w-3.5" /> A receipt and download link were sent to your email.
        </p>
      </div>
    </div>
  );
}
