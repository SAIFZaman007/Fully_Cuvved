import { Link } from 'react-router-dom';
import { FileQuestion, RefreshCcw, LayoutTemplate, ArrowRight, Mail } from 'lucide-react';
import Accordion from '../components/ui/Accordion';
import { FAQS } from '../data/faqs';
import Seo from '../components/seo/Seo';
import { faqSchema } from '../components/seo/schema';

const RESOURCES = [
  {
    icon: LayoutTemplate,
    title: 'Choosing a template',
    desc: 'A quick guide to picking the right document type for your situation, from contracts to notes.',
  },
  {
    icon: RefreshCcw,
    title: 'Revisions & regeneration',
    desc: 'How unlimited revisions work on the Docs Engine tier, and when to request a fresh generation.',
  },
  {
    icon: FileQuestion,
    title: 'Exports & formats',
    desc: 'Everything on exporting to PDF, DOCX or Markdown, and using documents with external tools.',
  },
];

export default function Help() {
  return (
    <div className="bp-grid">
      <Seo
        title="Help Centre"
        description="Answers to common questions about generating UK motor cover notes: templates, revisions, exports, security and refunds."
        path="/help"
        schema={faqSchema(FAQS)}
      />
      <section className="px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-5xl">Help centre</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink-500 dark:text-ink-400">
          Deep dive into our platform capabilities and support library.
        </p>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-3">
          {RESOURCES.map((r) => (
            <div key={r.title} className="rounded-2xl border border-ink-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-850">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-signal-500/10 text-signal-600 dark:text-signal-300">
                <r.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-bold text-ink-900 dark:text-white">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{r.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-signal-600 dark:text-signal-300">
                Explore guide <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-ink-100 bg-white py-16 dark:border-ink-800 dark:bg-ink-950">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-ink-900 dark:text-white">Frequently asked questions</h2>
          <div className="mt-8">
            <Accordion items={FAQS} />
          </div>
          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-ink-500 dark:text-ink-400">
            <Mail className="h-4 w-4" /> Still stuck?{' '}
            <Link to="/contact" className="font-medium text-signal-600 hover:underline dark:text-signal-300">
              Contact our support team
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
