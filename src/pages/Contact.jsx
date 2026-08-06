import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { Button, Input, Textarea } from '../components/ui/ui';
import { sendContactMessage } from '../lib/api';
import { useToast } from '../context/ToastContext';
import Seo from '../components/seo/Seo';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await sendContactMessage(form);
      toast.success("Message sent — we'll be in touch shortly.");
      setForm({ name: '', email: '', message: '' });
    } catch {
      toast.error('Could not send your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <Seo
        title="Contact Us"
        description="Get in touch with the Fully Cuvved team for support with UK motor cover notes, billing, or general questions."
        path="/contact"
      />
      <div className="text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-signal-500/10 text-signal-600 dark:text-signal-300">
          <Mail className="h-5 w-5" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink-900 dark:text-white">Contact us</h1>
        <p className="mt-2 text-ink-500 dark:text-ink-400">
          Questions about an order, a template, or enterprise access? We usually reply within one business day.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5 rounded-2xl border border-ink-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-850 sm:p-8">
        <Input
          label="Name"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <Input
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
        <Textarea
          label="Message"
          rows={5}
          required
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        />
        <Button type="submit" size="lg" className="w-full" loading={submitting}>
          <Send className="h-4 w-4" /> Send message
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-400">
        Or email us directly at{' '}
        <a href="mailto:support@fullycuvved.com" className="font-medium text-signal-600 hover:underline dark:text-signal-300">
          support@fullycuvved.com
        </a>
      </p>
    </div>
  );
}
