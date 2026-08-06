import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { Button, Input, Select, Textarea, Badge } from '../components/ui/ui';
import { generateReference, formatGBP } from '../lib/utils';
import { useToast } from '../context/ToastContext';
import Seo from '../components/seo/Seo';
import { serviceSchema } from '../components/seo/schema';

const NOTE_TYPES = [
  { value: 'temp_cover', label: '30-Day Temporary Motor Cover Note', price: 1200 },
  { value: 'fleet_schedule', label: 'Fleet & Commercial Motor Schedule', price: 1500 },
  { value: 'verification_note', label: 'Motor Verification & Policy Certificate', price: 1000 },
];

export default function AlternativeNotes() {
  const [noteType, setNoteType] = useState('temp_cover');
  const [recipient, setRecipient] = useState('');
  const [details, setDetails] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const selected = NOTE_TYPES.find((n) => n.value === noteType) || NOTE_TYPES[0];

  async function handleSubmit(e) {
    e.preventDefault();
    if (!recipient || !details || !email) {
      toast.error('Please fill in every field before continuing.');
      return;
    }
    setSubmitting(true);
    const orderId = generateReference('ORD');
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    navigate(`/checkout/${orderId}`, {
      state: {
        price: selected.price,
        docType: 'alternative-note',
        previewText: `// MOTOR COVER NOTE — TEMPORARY DRAFT\nRECIPIENT / VEHICLE: ${recipient}\nCOVERAGE DETAILS: ${details.slice(0, 140)}`
      },
    });
  }

  return (
    <div className="bp-grid min-h-[calc(100vh-var(--header-h))]">
      <Seo
        title="Temporary Motor Cover Note"
        description="Generate a 30-day temporary motor cover note, fleet & commercial motor schedule, or motor verification certificate — issued instantly, UK-compliant."
        path="/alternative-notes"
        schema={serviceSchema({
          name: 'Temporary Motor Cover Notes',
          description: 'Instant temporary motor cover notes, fleet schedules and verification certificates for UK vehicles.',
          path: '/alternative-notes',
        })}
      />
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge tone="signal" icon={Clock} className="mx-auto w-fit">
            Instant 15-second generation
          </Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
            Temporary Motor Cover
          </h1>
          <p className="mt-2 text-ink-500 dark:text-ink-400">
            Single-use motor cover note documentation, formatted for official and DVLA verification.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6 rounded-2xl border border-ink-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-850 sm:p-8">
          <Select label="Cover note type" value={noteType} onChange={(e) => setNoteType(e.target.value)}>
            {NOTE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label} — {formatGBP(t.price)}
              </option>
            ))}
          </Select>

          <Input
            label="Policyholder & Vehicle Reg"
            placeholder="e.g. Alex Morgan | Reg: UK68 XYZ"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />

          <Textarea
            label="Vehicle & Coverage Details"
            rows={5}
            placeholder="Include vehicle make, model, VIN, start date and specific underwriting conditions."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />

          <Input
            label="Delivery email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            hint="Your document and receipt will be sent here."
          />

          <div className="flex items-center justify-between rounded-xl bg-ink-50 px-4 py-3 dark:bg-ink-900">
            <span className="text-sm font-medium text-ink-600 dark:text-ink-300">Total</span>
            <span className="text-xl font-bold text-ink-900 dark:text-white">{formatGBP(selected.price)}</span>
          </div>

          <Button type="submit" size="lg" className="w-full" loading={submitting}>
            Continue to checkout <ArrowRight className="h-4 w-4" />
          </Button>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-ink-100 pt-5 text-xs text-ink-400 dark:border-ink-700">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-signal-500" /> Full PDF/Word delivery</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-signal-500" /> 256-bit encrypted</span>
          </div>
        </form>
      </div>
    </div>
  );
}