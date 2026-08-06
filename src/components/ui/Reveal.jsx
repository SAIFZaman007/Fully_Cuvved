import { motion } from 'framer-motion';

/**
 * House style for scroll-triggered reveals: a small fade + rise, once per
 * element, never re-triggered on scroll-back. Deliberately subtle — no
 * scale, no rotation, no scroll-jacking. Pass `as` to animate something
 * other than a div (e.g. `as="li"`), and `delay` to stagger siblings.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 14,
  duration = 0.5,
  className,
  as = 'div',
  once = true,
  ...props
}) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  );
}

/**
 * Wraps a list of items and staggers each child's reveal by `step`.
 * Use for grids/lists where items should cascade in rather than pop
 * together as one block.
 */
export function RevealGroup({ children, step = 0.08, y = 14, className }) {
  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <Reveal key={child?.key ?? i} delay={i * step} y={y}>
              {child}
            </Reveal>
          ))
        : children}
    </div>
  );
}
