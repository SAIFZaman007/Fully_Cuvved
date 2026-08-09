import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Cpu, ChevronRight, Zap, Headset, Sparkles } from 'lucide-react';
import { Button } from '../ui/ui';

export default function WelcomeSection() {
  const [regNumber, setRegNumber] = useState('');
  const navigate = useNavigate();

  const handleLookup = (e) => {
    if (e) e.preventDefault();
    navigate('/generator');
  };

  return (
    <section className="py-20 bg-white dark:bg-ink-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-5xl">
            Welcome, let's <span className="underline decoration-signal-500 decoration-4 underline-offset-8">get started</span>
          </h2>
          <p className="mt-4 text-lg text-ink-500 dark:text-ink-400">
            Lightning-fast document delivery with unmatched security and precision
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Card: TempMe Notes */}
          <div className="flex flex-col rounded-3xl bg-white p-8 shadow-xl shadow-ink-200/50 border border-ink-100 dark:bg-ink-900 dark:border-ink-800 dark:shadow-none">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-signal-50 text-signal-600 dark:bg-signal-500/20 dark:text-signal-300">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-ink-900 dark:text-white">Notes</h3>
                <div className="flex items-center text-xs font-bold tracking-wide text-signal-600 dark:text-signal-300">
                  <Zap className="mr-1 h-3 w-3" /> PREMIUM VERIFICATION
                </div>
              </div>
            </div>

            <h4 className="text-lg font-bold text-ink-900 dark:text-white mb-2">Identity & Document Check</h4>
            <p className="text-sm text-ink-500 dark:text-ink-400 mb-8 grow">
              Industry-leading AI verification with 99.9% accuracy. Secure, compliant, and lightning-fast processing for all your professional needs.
            </p>

            <div className="mb-8 rounded-2xl bg-ink-50 py-6 text-center dark:bg-ink-800">
              <div className="text-xs font-bold text-ink-400 dark:text-ink-500 uppercase tracking-wide mb-1">Service starting from</div>
              <div className="text-3xl font-extrabold text-ink-900 dark:text-white">£15</div>
            </div>

            <form onSubmit={handleLookup} className="mb-8">
              <div className="mb-6">
                <label className="mb-2 block text-xs font-bold text-ink-900 dark:text-white uppercase tracking-wide">REGISTRATION LOOKUP</label>
                <input
                  type="text"
                  placeholder="Enter Here"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm font-medium outline-none focus:border-signal-500 dark:border-ink-700 dark:bg-ink-950 dark:text-white placeholder:text-ink-400"
                />
              </div>

              <Button type="submit" className="w-full !rounded-full bg-signal-600 py-6 text-white hover:bg-signal-700">
                <ChevronRight className="mr-2 h-5 w-5" /> LOOKUP
              </Button>
            </form>

            <div className="flex items-center justify-between text-xs font-bold text-ink-400 dark:text-ink-500 uppercase tracking-wide">
              <span className="flex items-center"><Headset className="mr-1.5 h-4 w-4" /> 24/7 Expert Support</span>
              <span>Contact: info@tempme.io</span>
            </div>
          </div>

          {/* Right Card: TempMe AI */}
          <div className="flex flex-col rounded-3xl bg-white p-8 shadow-xl shadow-ink-200/50 border border-ink-100 dark:bg-ink-900 dark:border-ink-800 dark:shadow-none">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-signal-50 text-signal-600 dark:bg-signal-500/20 dark:text-signal-300">
                <Cpu className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-ink-900 dark:text-white">AI</h3>
                <div className="flex items-center text-xs font-bold tracking-wide text-signal-600 dark:text-signal-300">
                  <Zap className="mr-1 h-3 w-3" /> NEURAL GENERATION
                </div>
              </div>
            </div>

            <h4 className="text-lg font-bold text-ink-900 dark:text-white mb-2">Automated Content Engine</h4>
            <p className="text-sm text-ink-500 dark:text-ink-400 mb-6 flex-grow">
              Create legally-sound contracts, technical proposals, and executive reports in seconds. Powered by our proprietary neural architecture for ultimate precision.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {['CONTRACTS', 'PROPOSALS', 'TECHNICAL DOCS', 'AGREEMENTS'].map((tag) => (
                <span key={tag} className="rounded-full bg-ink-50 px-3 py-1.5 text-xs font-bold text-ink-500 dark:bg-ink-800 dark:text-ink-400">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mb-8 rounded-2xl bg-ink-50 py-6 text-center dark:bg-ink-800">
              <div className="text-xs font-bold text-ink-400 dark:text-ink-500 uppercase tracking-wide mb-1">Generation starting from</div>
              <div className="text-3xl font-extrabold text-ink-900 dark:text-white mb-3">£10</div>
              <div className="flex items-center justify-center text-xs font-bold text-signal-600 dark:text-signal-300">
                <Zap className="mr-1 h-3 w-3" /> FREE PREVIEW AVAILABLE
              </div>
            </div>

            <Button as={Link} to="/generator" className="w-full !rounded-full bg-signal-500 py-6 text-white hover:bg-signal-600 mb-8">
              <Zap className="mr-2 h-5 w-5 fill-current" /> GENERATE NOW
            </Button>

            <div className="flex items-center justify-between text-xs font-bold text-ink-400 dark:text-ink-500 uppercase tracking-wide">
              <span className="flex items-center"><Sparkles className="mr-1.5 h-4 w-4" /> Next-Gen Document AI</span>
              <span>V4.0.2</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
