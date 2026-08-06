import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HeaderShell from './HeaderShell';
import Footer from './Footer';

export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return (
    <div className="flex min-h-screen flex-col bg-white text-ink-900 dark:bg-ink-950 dark:text-ink-100">
      <HeaderShell />
      <main className="flex-1" style={{ paddingTop: 'var(--header-h)' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
