import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Sparkles, LogOut } from 'lucide-react';
import { Button, Badge, Spinner } from '../components/ui/ui';
import { listMyDocuments } from '../lib/api';
import { formatGBP, formatDate } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import Seo from '../components/seo/Seo';

const STATUS_TONE = { completed: 'success', processing: 'amber', failed: 'danger' };

export default function Account() {
  const { user, logout } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    listMyDocuments()
      .then((docs) => active && setDocuments(docs))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Seo title="My Account" path="/account" noindex />
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-ink-900 dark:text-white sm:text-3xl">
            Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
          </h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{user?.email}</p>
        </div>
        <div className="flex gap-3">
          <Button as={Link} to="/generator" size="sm">
            <Sparkles className="h-4 w-4" /> New document
          </Button>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4" /> Log out
          </Button>
        </div>
      </div>

      <h2 className="mt-10 text-lg font-bold text-ink-900 dark:text-white">My documents</h2>
      <div className="mt-4 overflow-hidden rounded-2xl border border-ink-200 dark:border-ink-700">
        {loading ? (
          <div className="flex justify-center py-14">
            <Spinner className="h-7 w-7" />
          </div>
        ) : documents.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-14 text-center">
            <FileText className="h-8 w-8 text-ink-300" />
            <p className="text-sm text-ink-500 dark:text-ink-400">You haven't generated any documents yet.</p>
            <Button as={Link} to="/generator" size="sm">
              Generate your first document
            </Button>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-50 text-xs uppercase tracking-wide text-ink-400 dark:bg-ink-900">
              <tr>
                <th className="px-5 py-3 font-semibold">Document</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Created</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Price</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 dark:divide-ink-700">
              {documents.map((doc) => (
                <tr key={doc.id} className="bg-white dark:bg-ink-850">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-ink-900 dark:text-white">{doc.type}</p>
                    <p className="font-mono text-xs text-ink-400">{doc.id}</p>
                  </td>
                  <td className="hidden px-5 py-4 text-ink-500 dark:text-ink-400 sm:table-cell">{formatDate(doc.createdAt)}</td>
                  <td className="px-5 py-4">
                    <Badge tone={STATUS_TONE[doc.status] || 'neutral'}>{doc.status}</Badge>
                  </td>
                  <td className="px-5 py-4 text-right font-medium text-ink-900 dark:text-white">{formatGBP(doc.price)}</td>
                  <td className="px-5 py-4 text-right">
                    {doc.status === 'completed' && (
                      <button className="text-ink-400 hover:text-signal-600 dark:hover:text-signal-300" aria-label="Download">
                        <Download className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
