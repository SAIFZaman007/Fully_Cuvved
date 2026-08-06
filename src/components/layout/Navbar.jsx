import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ArrowRight, LayoutDashboard, LogOut } from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from '../ui/ThemeToggle';
import { Button } from '../ui/ui';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

const LINKS = [
  { to: '/#features', label: 'Features' },
  { to: '/generator', label: 'AI Generator' },
  { to: '/alternative-notes', label: 'Alternative Notes' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/help', label: 'Help' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => setOpen(false), [navigate]);

  return (
    <div className="w-full border-b border-ink-200/70 bg-white/85 backdrop-blur-md dark:border-ink-800/70 dark:bg-ink-950/85">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-7 text-sm font-medium text-ink-600 dark:text-ink-300 lg:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'transition-colors hover:text-signal-600 dark:hover:text-signal-300',
                  isActive && 'text-signal-600 dark:text-signal-300'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/track-order"
            className="flex items-center gap-1.5 text-sm font-medium text-ink-500 transition hover:text-signal-600 dark:text-ink-400 dark:hover:text-signal-300"
          >
            <Search className="h-4 w-4" /> Track order
          </Link>
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <Button as={Link} to="/account" variant="secondary" size="sm">
                <LayoutDashboard className="h-4 w-4" /> My account
              </Button>
              <Button variant="ghost" size="sm" onClick={logout} aria-label="Log out">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} to="/login" variant="ghost" size="sm">
                Log in
              </Button>
              <Button as={Link} to="/generator" variant="primary" size="sm">
                Get started <ArrowRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 dark:text-ink-200 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div
        className={cn(
          'grid overflow-hidden border-t border-ink-200/70 bg-white/95 backdrop-blur-md transition-[grid-template-rows] duration-200 dark:border-ink-800/70 dark:bg-ink-950/95 lg:hidden',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/track-order"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800"
            >
              Track order
            </Link>
            <div className="mt-2 flex items-center gap-3 border-t border-ink-100 pt-4 dark:border-ink-700">
              <ThemeToggle />
              {isAuthenticated ? (
                <>
                  <Button as={Link} to="/account" variant="secondary" size="sm" className="flex-1">
                    My account
                  </Button>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button as={Link} to="/login" variant="secondary" size="sm" className="flex-1">
                    Log in
                  </Button>
                  <Button as={Link} to="/generator" variant="primary" size="sm" className="flex-1">
                    Get started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
