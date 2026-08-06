import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileUp, X, Sparkles, ArrowRight, RefreshCcw } from 'lucide-react';
import { Button, Textarea, Select, Badge, Spinner, StepIndicator } from '../components/ui/ui';
import CornerFrame from '../components/ui/CornerFrame';
import { estimatePrice, generateDocument } from '../lib/api';
import { formatGBP } from '../lib/utils';
import { useToast } from '../context/ToastContext';
import Seo from '../components/seo/Seo';
import { serviceSchema } from '../components/seo/schema';

const DOC_TYPES = [
  { value: 'contract', label: 'Motor Cover Note (30-Day / Temporary)' },
  { value: 'proposal', label: 'Commercial Fleet Insurance Schedule' },
  { value: 'report', label: 'Motor Policy Certificate' },
  { value: 'nda', label: 'Verification & Compliance Note' },
  { value: 'other', label: 'Other Insurance Document' },
];

const EXAMPLE_PROMPTS = [
  'Generate a 30-day comprehensive motor cover note for a fleet vehicle.',
  'Create a temporary motor cover certificate with instant DVLA validation details.',
  'Draft an official motor insurance schedule for commercial vehicle coverage.',
  'Issue a motor policy confirmation note for private vehicle registration.',
];

const STEPS = ['Describe', 'Review & generate', 'Checkout'];

export default function Generator() {
  const [step, setStep] = useState(1);
  const [docType, setDocType] = useState('contract');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [estimate, setEstimate] = useState(null);
  const [estimating, setEstimating] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    let active = true;
    const handle = setTimeout(async () => {
      setEstimating(true);
      try {
        const est = await estimatePrice({ docType, description });
        if (active) setEstimate(est);
      } catch {
        // Estimate is a soft, non-blocking UX hint — fail silently.
      } finally {
        if (active) setEstimating(false);
      }
    }, 400);
    return () => {
      active = false;
      clearTimeout(handle);
    };
  }, [docType, description]);

  function handleFileSelect(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) {
      toast.error('Reference file must be under 10MB.');
      return;
    }
    setFile(f);
  }

  async function handleGenerate() {
    if (description.trim().length < 20) {
      toast.error('Add a bit more detail so the engine has enough to work with.');
      return;
    }
    setGenerating(true);
    try {
      const res = await generateDocument({ docType, description, referenceFile: file });
      setResult(res);
      setStep(2);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Generation failed. Please try again.');
    } finally {
      setGenerating(false);
    }
  }

  function proceedToCheckout() {
    navigate(`/checkout/${result.orderId}`, {
      state: { price: estimate?.estimatedPrice ?? 1000, docType, previewText: result.previewText },
    });
  }

  return (
    <div className="bp-grid min-h-[calc(100vh-var(--header-h))]">
      <Seo
        title="AI Motor Cover Note Generator"
        description="Generate a UK motor cover note, temporary cover certificate or fleet insurance schedule in seconds. Enter vehicle and policyholder details and export instantly."
        path="/generator"
        schema={serviceSchema({
          name: 'Motor Cover Note Generator',
          description: 'Live AI tool for drafting UK motor cover notes, fleet schedules and policy certificates.',
          path: '/generator',
        })}
      />
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge tone="signal" icon={Sparkles} className="mx-auto w-fit">
            Powered by advanced AI
          </Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
            Fully Cuvved Docs Engine
          </h1>
          <p className="mt-2 text-ink-500 dark:text-ink-400">Generate official motor cover notes and policy documents in seconds.</p>
        </div>

        <div className="mt-8 flex justify-center">
          <StepIndicator steps={STEPS} current={step} />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            {step === 1 && (
              <div className="space-y-6 rounded-2xl border border-ink-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-850 sm:p-8">
                <Select label="1. Document type" value={docType} onChange={(e) => setDocType(e.target.value)}>
                  {DOC_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </Select>

                <Textarea
                  label="2. Describe your cover note details"
                  placeholder="e.g. Generate a 30-day comprehensive motor cover note for BMW 3 Series (Reg: UK68 XYZ), Policyholder: Alex Morgan, including DVLA verification standards."
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  hint={`${description.length} characters — more detail generally means a more accurate first draft.`}
                />

                <div>
                  <span className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">
                    3. Add vehicle or policy reference (optional)
                  </span>
                  {file ? (
                    <div className="flex items-center justify-between rounded-xl border border-ink-300 bg-ink-50 px-4 py-3 text-sm dark:border-ink-600 dark:bg-ink-900">
                      <span className="flex items-center gap-2 text-ink-700 dark:text-ink-200">
                        <FileUp className="h-4 w-4 text-signal-500" /> {file.name}
                      </span>
                      <button onClick={() => setFile(null)} aria-label="Remove file" className="text-ink-400 hover:text-red-500">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-ink-300 px-4 py-8 text-center transition hover:border-signal-400 dark:border-ink-600"
                    >
                      <UploadCloud className="h-6 w-6 text-ink-400" />
                      <span className="text-sm font-medium text-ink-600 dark:text-ink-300">Click to upload a document</span>
                      <span className="text-xs text-ink-400">PDF, DOCX or TXT up to 10MB</span>
                    </button>
                  )}
                  <input ref={fileInputRef} type="file" accept=".pdf,.docx,.txt" onChange={handleFileSelect} className="hidden" />
                </div>

                <Button onClick={handleGenerate} loading={generating} className="w-full" size="lg">
                  {generating ? 'Generating…' : 'Generate & proceed to checkout'} <ArrowRight className="h-4 w-4" />
                </Button>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-400">Example prompts</p>
                  <div className="flex flex-wrap gap-2">
                    {EXAMPLE_PROMPTS.map((p) => (
                      <button
                        key={p}
                        onClick={() => setDescription(p)}
                        className="rounded-full border border-ink-200 px-3 py-1.5 text-xs text-ink-500 transition hover:border-signal-400 hover:text-signal-600 dark:border-ink-700 dark:text-ink-400 dark:hover:text-signal-300"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && result && (
              <div className="space-y-6">
                <CornerFrame className="rounded-2xl">
                  <div className="rounded-2xl border border-ink-200 bg-ink-950 p-6 font-mono text-xs leading-relaxed text-ink-200">
                    <div className="mb-4 flex items-center justify-between border-b border-ink-700/80 pb-4 text-ink-500">
                      <span>STATUS: DRAFT READY</span>
                      <span>ORDER: {result.orderId}</span>
                    </div>
                    <pre className="whitespace-pre-wrap font-mono text-ink-200">{result.previewText}</pre>
                  </div>
                </CornerFrame>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={proceedToCheckout} size="lg">
                    Proceed to checkout <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setStep(1);
                      setResult(null);
                    }}
                  >
                    <RefreshCcw className="h-4 w-4" /> Regenerate
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Pricing sidebar */}
          <aside className="h-fit rounded-2xl border border-ink-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-850">
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink-400">Pricing</h3>
            <div className="mt-3 flex items-baseline gap-2">
              {estimating ? (
                <Spinner className="h-6 w-6" />
              ) : (
                <span className="text-3xl font-extrabold text-ink-900 dark:text-white">
                  {estimate ? formatGBP(estimate.estimatedPrice) : '£10.00'}
                </span>
              )}
              <span className="text-xs text-ink-400">estimated</span>
            </div>
            <p className="mt-1 text-xs text-ink-400">
              Range {estimate ? formatGBP(estimate.minPrice) : '£10.00'} – {estimate ? formatGBP(estimate.maxPrice) : '£100.00'}, based on
              document complexity. One-time payment.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm text-ink-600 dark:text-ink-300">
              {[
                'Standard UK motor cover note format',
                'Save hours of manual processing time',
                'Secure, private and confidential data',
                'Pay once, own the document forever',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-500" /> {f}
                </li>
              ))}
            </ul>

            <p className="mt-6 border-t border-ink-100 pt-4 text-xs text-ink-400 dark:border-ink-700">
              Need help? Contact us at{' '}
              <a href="mailto:support@fullycuvved.com" className="text-signal-600 hover:underline dark:text-signal-300">
                support@fullycuvved.com
              </a>
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}