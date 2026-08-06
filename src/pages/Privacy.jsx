import Seo from '../components/seo/Seo';

const SECTIONS = [
  {
    title: '1. Information we collect',
    body: 'We collect information you provide directly — such as your name, email address, vehicle registration details (VRM), policyholder details, and the content of motor cover notes you generate — along with basic usage data (pages visited, device type, and approximate location) used to keep the service secure and reliable.',
  },
  {
    title: '2. How we use your information',
    body: 'Your information is used to generate and deliver official motor cover notes, process payments, verify vehicle details, provide customer support, and improve the reliability of the platform. We do not use the content of your generated insurance documents to train public machine learning models.',
  },
  {
    title: '3. Data retention',
    body: 'Generated motor cover notes and order details are retained for as long as your account is active, or as required to meet UK insurance and legal record-keeping obligations. You can request deletion of your data or order history at any time, subject to statutory retention requirements.',
  },
  {
    title: '4. Sharing & third parties',
    body: 'We share data only with trusted processors required to operate the platform — such as secure payment gateways, cloud hosting providers, and official vehicle lookup systems — each bound by strict data protection agreements. We never sell personal or vehicle data.',
  },
  {
    title: '5. Security',
    body: 'All vehicle and policy data is encrypted in transit using TLS and at rest using AES-256 standards. Access to production systems and generated cover note logs is strictly restricted, monitored, and audited.',
  },
  {
    title: '6. Your rights',
    body: 'Under UK GDPR, you have the right to access, correct, export, or request deletion of your personal and vehicle data. Contact privacy@fullycuvved.com to submit a request.',
  },
];

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Seo
        title="Privacy Policy"
        description="How Fully Cuvved collects, uses, retains and protects your personal and vehicle data under UK GDPR."
        path="/privacy"
      />
      <h1 className="text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">Privacy policy</h1>
      <p className="mt-2 text-sm text-ink-400">Last updated: 1 August 2026</p>
      <p className="mt-6 rounded-xl border border-amber-signal-400/30 bg-amber-signal-400/5 p-4 text-sm text-ink-600 dark:text-ink-300">
        Placeholder content for development. Replace with policy reviewed by qualified legal counsel before production launch.
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