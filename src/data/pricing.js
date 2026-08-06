export const PRICING_TIERS = [
  {
    id: 'alternative-notes',
    name: 'Motor Cover Note',
    tag: 'Most popular',
    tone: 'signal',
    priceLabel: '£12',
    priceSuffix: '– £39',
    description: 'Single-use legally-structured motor cover note documentation, formatted and delivered in minutes.',
    features: [
      'Instant 15-second generation',
      'Legally compliant layout formatting',
      'Access to motor cover templates',
      'Digital PDF & Word delivery',
      '24/7 availability',
    ],
    cta: { label: 'Generate Cover Note', to: '/generator' },
  },
  {
    id: 'docs-engine',
    name: 'Fully Cuvved Docs Engine',
    tag: 'AI powered',
    tone: 'amber',
    priceLabel: '£10',
    priceSuffix: '– £100',
    description: 'Advanced contextual AI generation for motor cover notes, policy schedules, and fleet cover.',
    features: [
      'AI context parsing v4.0',
      'Unlimited draft revisions',
      'Instant live preview',
      'Bank-level 256-bit encryption',
      'Multiple export formats',
    ],
    highlighted: true,
    cta: { label: 'Generate with AI', to: '/generator' },
  },
];

export const VALUE_PROPS = [
  { title: 'Lightning fast', desc: 'Official motor cover notes generated in as little as 15 seconds.' },
  { title: 'Secure & private', desc: 'Bank-level encryption in transit and at rest, always.' },
  { title: '5-star rated', desc: 'Trusted by thousands of motor insurance clients across the UK.' },
];