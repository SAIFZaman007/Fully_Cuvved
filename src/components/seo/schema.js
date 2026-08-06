import { SITE_NAME, SITE_URL } from './Seo';

/**
 * GEO (generative-engine optimization): a clean, structured description of
 * who Fully Cuvved is and what it does, so LLM-based answer engines and
 * AI Overviews have an authoritative block to cite instead of guessing
 * from unstructured page copy.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      'Fully Cuvved generates UK motor cover notes, temporary cover documents, fleet insurance schedules and policy certificates in seconds.',
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
    },
  };
}

export function serviceSchema({ name, description, path = '' }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    url: `${SITE_URL}${path}`,
  };
}

/**
 * AEO (answer-engine optimization): converts the existing FAQS data into
 * FAQPage JSON-LD. Answers are already written as self-contained
 * sentences, which is exactly the shape AI Overviews / voice answers
 * prefer to quote directly.
 */
export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };
}
