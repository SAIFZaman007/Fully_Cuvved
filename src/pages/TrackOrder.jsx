import { useState } from 'react';
import { Search, FileText, Download } from 'lucide-react';
import { Button, Input, Badge, Spinner } from '../components/ui/ui';
import { trackOrdersByEmail } from '../lib/api';
import { formatGBP, formatDate } from '../lib/utils';
import { useToast } from '../context/ToastContext';
import Seo from '../components/seo/Seo';

const STATUS_TONE = { completed: 'success', processing: 'amber', failed: 'danger' };

export default function TrackOrder() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const toast = useToast();

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    try {
      const orders = await trackOrdersByEmail(email);
      setResults(orders);
    } catch (err) {
      toast.error(err.message || 'Could not find orders for that email.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bp-grid min-h-[calc(100vh-var(--header-h))]">
      <Seo
        title="Track Your Order"
        description="Look up a motor cover note or document order by email and download it again instantly."
        path="/track-order"
      />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">Track your order</h1>
          <p className="mt-2 text-ink-500 dark:text-ink-400">
            Enter the email you used at checkout to see the status of your documents.
          </p>
        </div>

        <form onSubmit={handleSearch} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <Input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" loading={loading} size="md">
            <Search className="h-4 w-4" /> Track
          </Button>
        </form>

        <div className="mt-8">
          {loading && (
            <div className="flex justify-center py-10">
              <Spinner className="h-7 w-7" />
            </div>
          )}

          {!loading && results && results.length === 0 && (
            <p className="rounded-xl border border-ink-200 bg-white p-6 text-center text-sm text-ink-500 dark:border-ink-700 dark:bg-ink-850 dark:text-ink-400">
              No orders found for that email yet.
            </p>
          )}

          {!loading && results && results.length > 0 && (
            <ul className="space-y-3">
              {results.map((order) => (
                <li
                  key={order.id}
                  className="flex flex-col gap-3 rounded-xl border border-ink-200 bg-white p-5 dark:border-ink-700 dark:bg-ink-850 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-5 w-5 text-signal-500" />
                    <div>
                      <p className="text-sm font-semibold text-ink-900 dark:text-white">
                        {order.type} <span className="font-mono text-xs font-normal text-ink-400">#{order.id}</span>
                      </p>
                      <p className="text-xs text-ink-400">{formatDate(order.createdAt)} · {formatGBP(order.price)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge tone={STATUS_TONE[order.status] || 'neutral'}>{order.status}</Badge>
                    {order.status === 'completed' && (
                      <button className="text-ink-400 hover:text-signal-600 dark:hover:text-signal-300" aria-label="Download">
                        <Download className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
