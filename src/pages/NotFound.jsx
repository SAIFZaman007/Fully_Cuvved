import { Link } from 'react-router-dom';
import { FileSearch, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/ui';
import Seo from '../components/seo/Seo';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-var(--header-h))] flex-col items-center justify-center px-4 text-center">
      <Seo title="Page Not Found" path="/404" noindex />
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-signal-500/10 text-signal-600 dark:text-signal-300">
        <FileSearch className="h-7 w-7" />
      </div>
      <h1 className="mt-6 text-5xl font-bold text-ink-900 dark:text-white">404</h1>
      <p className="mt-2 text-ink-500 dark:text-ink-400">This page couldn't be found — it may have moved or never existed.</p>
      <Button as={Link} to="/" className="mt-8">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Button>
    </div>
  );
}
