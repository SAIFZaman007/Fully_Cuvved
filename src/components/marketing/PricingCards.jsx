import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Button, Badge } from '../ui/ui';
import CornerFrame from '../ui/CornerFrame';
import { PRICING_TIERS } from '../../data/pricing';
import { cn } from '../../lib/utils';

export default function PricingCards({ className }) {
  return (
    <div className={cn('grid gap-8 md:grid-cols-2', className)}>
      {PRICING_TIERS.map((tier) =>
        tier.highlighted ? (
          <CornerFrame key={tier.id} tone="amber" className="rounded-2xl">
            <PricingCard tier={tier} />
          </CornerFrame>
        ) : (
          <PricingCard key={tier.id} tier={tier} />
        )
      )}
    </div>
  );
}

function PricingCard({ tier }) {
  return (
    <div
      className={cn(
        'relative flex h-full flex-col rounded-2xl border p-8 transition',
        tier.highlighted
          ? 'border-amber-signal-400/60 bg-white shadow-xl shadow-amber-signal-400/10 dark:bg-ink-850'
          : 'border-ink-200 bg-white hover:border-ink-300 dark:border-ink-700 dark:bg-ink-850 dark:hover:border-ink-600'
      )}
    >
      <Badge tone={tier.tone} className="w-fit">
        {tier.tag}
      </Badge>
      <h3 className="mt-4 text-xl font-bold text-ink-900 dark:text-white">{tier.name}</h3>
      <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400">{tier.description}</p>

      <div className="my-6 flex items-baseline gap-1.5">
        <span className="text-4xl font-extrabold text-ink-900 dark:text-white">{tier.priceLabel}</span>
        <span className="text-sm font-medium text-ink-400">{tier.priceSuffix}</span>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-ink-600 dark:text-ink-300">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-signal-500" /> {f}
          </li>
        ))}
      </ul>

      <Button as={Link} to={tier.cta.to} variant={tier.highlighted ? 'primary' : 'secondary'} className="w-full">
        {tier.cta.label}
      </Button>
    </div>
  );
}
