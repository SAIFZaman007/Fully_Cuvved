import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn, Mail } from 'lucide-react';
import { Button, Input } from '../components/ui/ui';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Seo from '../components/seo/Seo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { state } = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      toast.success('Welcome back.');
      navigate(state?.from || '/account');
    } catch (err) {
      toast.error(err.message || 'Could not sign you in. Check your details and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-var(--header-h))] items-center justify-center px-4 py-16">
      <Seo title="Log In" path="/login" noindex />
      <div className="w-full max-w-sm">
        <div className="text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-signal-500/10 text-signal-600 dark:text-signal-300">
            <LogIn className="h-5 w-5" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-ink-900 dark:text-white">Log in</h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Welcome back — access your documents and account.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <Input
            label="Email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full" size="lg" loading={loading}>
            Log in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500 dark:text-ink-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-signal-600 hover:underline dark:text-signal-300">
            Sign up
          </Link>
        </p>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-ink-400">
          <Mail className="h-3.5 w-3.5" /> Demo mode — any email & password will sign you in.
        </p>
      </div>
    </div>
  );
}
