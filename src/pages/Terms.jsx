import Seo from '../components/seo/Seo';

const SECTIONS = [
  {
    title: '1. Using the service',
    body: 'Fully Cuvved provides automated motor cover note and document drafting tools. You are responsible for reviewing all generated vehicle and policy details before relying on them, and for ensuring your use complies with applicable UK road traffic laws and regulations.',
  },
  {
    title: '2. Not legal or insurance advice',
    body: 'Documents generated through Fully Cuvved are formatting and drafting aids, not official insurance policies or legal advice. For binding insurance coverage, we recommend verifying policy details with a regulated insurance provider before driving or presenting documents to authorities.',
  },
  {
    title: '3. Payment & refunds',
    body: 'Fees are charged per cover note or document generated at the price shown before checkout. Failed generations are automatically eligible for a full refund; completed and delivered cover notes are non-refundable once issued, except where required by law.',
  },
  {
    title: '4. Acceptable use',
    body: 'You agree not to use the service to generate fraudulent motor cover documentation, present false vehicle details, or misrepresent generated notes as being issued by unauthorized third-party insurers.',
  },
  {
    title: '5. Limitation of liability',
    body: 'The service is provided "as is". To the maximum extent permitted by law, Fully Cuvved Ltd is not liable for fines, penalties, or indirect losses arising from the misuse or misrepresentation of generated motor cover notes.',
  },
  {
    title: '6. Changes to these terms',
    body: 'We may update these terms from time to time. Continued use of the service after changes take effect constitutes acceptance of the revised terms.',
  },
];

export default function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Seo
        title="Terms of Service"
        description="The terms governing use of Fully Cuvved's UK motor cover note and document generation service."
        path="/terms"
      />
      <h1 className="text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">Terms of service</h1>
      <p className="mt-2 text-sm text-ink-400">Last updated: 1 August 2026</p>
      <p className="mt-6 rounded-xl border border-amber-signal-400/30 bg-amber-signal-400/5 p-4 text-sm text-ink-600 dark:text-ink-300">
        Placeholder content for development. Replace with terms reviewed by qualified legal counsel before production launch.
      </p>

      <div className="mt-8 space-y-8">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2 className="text-lg font-bold text-ink-900 dark:text-white">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}