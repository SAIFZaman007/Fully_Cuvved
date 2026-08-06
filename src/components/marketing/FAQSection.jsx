import { Link } from 'react-router-dom';
import Accordion from '../ui/Accordion';
import Reveal from '../ui/Reveal';
import { FAQS } from '../../data/faqs';

export default function FAQSection() {
  return (
    <section id="faq" className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-center text-ink-500 dark:text-ink-400">
            Can't find what you're looking for?{' '}
            <Link to="/contact" className="font-medium text-signal-600 hover:underline dark:text-signal-300">
              Contact support
            </Link>
            .
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <Accordion items={FAQS} />
        </Reveal>
      </div>
    </section>
  );
}
