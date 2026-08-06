import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { Button, Input } from '../components/ui/ui';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Seo from '../components/seo/Seo';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await signup({ name, email, password });
      toast.success('Account created — welcome to Fully Cuvved.');
      navigate('/account');
    } catch (err) {
      toast.error(err.message || 'Could not create your account.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-var(--header-h))] items-center justify-center px-4 py-16">
      <Seo
        title="Sign Up"
        description="Create a free Fully Cuvved account to generate, track and re-download UK motor cover notes and insurance documents."
        path="/signup"
      />
      <div className="w-full max-w-sm">
        <div className="text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-signal-500/10 text-signal-600 dark:text-signal-300">
            <UserPlus className="h-5 w-5" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-ink-900 dark:text-white">Create your account</h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Save templates and access your documents anytime.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <Input label="Full name" required placeholder="Alex Morgan" value={name} onChange={(e) => setName(e.target.value)} />
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
            minLength={8}
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full" size="lg" loading={loading}>
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500 dark:text-ink-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-signal-600 hover:underline dark:text-signal-300">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
