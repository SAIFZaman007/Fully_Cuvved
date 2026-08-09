import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, MapPinned, ChevronDown } from 'lucide-react';
import { Button, Badge } from '../ui/ui';

const STATS = [
  { icon: Zap, value: '~12s', label: 'Average generation time' },
  { icon: ShieldCheck, value: '256-bit', label: 'Encryption, end to end' },
  { icon: MapPinned, value: 'UK-wide', label: 'Cover notes issued nationwide' },
];

// Free-to-use under the Unsplash License — Jack White (@jackwhite2803),
// Beachy Head, Eastbourne, UK. Credited in-frame below even though the
// license doesn't require it.
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1732624697647-524a65316cdf?auto=format&fit=crop&w=2400&q=80';

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <section ref={sectionRef} className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
      {/* Background photo with subtle scroll parallax */}
      <motion.div className="absolute inset-0 -z-20" style={{ y: bgY }}>
        <img
          src={HERO_IMAGE}
          alt="Car driving down an open UK coastal road at sunset"
          className="h-[120%] w-full object-cover object-center"
          loading="eager"
          fetchpriority="high"
        />
      </motion.div>
      {/* Legibility overlay — matches the site's dark ink tone rather than generic black */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-ink-950 via-ink-950/85 to-ink-950/40" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-transparent to-ink-950/30" />

      <div className="mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge tone="signal" icon={Sparkles} className="border-signal-400/30 bg-signal-500/15 text-signal-300">
              Instant UK Temporary Documents · Issued in Seconds
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
          >
            Temporary Documents,{' '}
            <span className="text-signal-300">Generated in Seconds</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-ink-200"
          >
            Fully Cuvved instantly drafts fully formatted, UK-compliant motor cover notes, temporary cover
            documents and fleet insurance schedules — reviewed, verified, and ready to issue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button as={Link} to="/generator" size="lg">
              Try live generator <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              as={Link}
              to="/pricing"
              variant="outline"
              size="lg"
              className="border-white/25 text-white hover:border-signal-400 hover:text-signal-300"
            >
              View pricing
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6"
          >
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label}>
                <dt className="flex items-center gap-1.5 text-signal-300">
                  <Icon className="h-3.5 w-3.5" />
                  <span className="text-lg font-bold text-white sm:text-xl">{value}</span>
                </dt>
                <dd className="mt-1 text-xs leading-snug text-ink-300">{label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-300"
      >
        <span>Scroll to explore</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.div>

      <a
        href="https://unsplash.com/@jackwhite2803"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 z-10 text-[10px] text-ink-400/70 hover:text-ink-200"
      >
        Photo: Jack White / Unsplash
      </a>
    </section>
  );
}
