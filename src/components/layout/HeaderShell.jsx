import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Ribbon from './Ribbon';
import Navbar from './Navbar';

export default function HeaderShell() {
  const shellRef = useRef(null);
  const [ribbonDismissed, setRibbonDismissed] = useState(false);
  const [pastThreshold, setPastThreshold] = useState(false);

  const { scrollYProgress } = useScroll();
  const barScale = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });

  const ribbonVisible = !ribbonDismissed && !pastThreshold;

  useEffect(() => {
    const onScroll = () => setPastThreshold(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keep --header-h in sync with the shell's real rendered height (ribbon
  // in/out, mobile menu open/closed, font-load reflow, etc.) so <main>'s
  // padding-top never drifts out of sync with the fixed header above it.
  useEffect(() => {
    const el = shellRef.current;
    if (!el) return undefined;
    const setVar = () => {
      document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`);
    };
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ribbonVisible]);

  return (
    <div ref={shellRef} className="fixed inset-x-0 top-0 z-50">
      {/* Ribbon is desktop/tablet only — on phones (e.g. iPhone 17 Pro's
          874px-tall viewport) three lines of trust copy eats too much of
          the visible hero. */}
      <div className="hidden sm:block">
        <Ribbon visible={ribbonVisible} onDismiss={() => setRibbonDismissed(true)} />
      </div>
      <Navbar />
      <motion.div
        style={{ scaleX: barScale }}
        className="h-[2px] w-full origin-left bg-gradient-to-r from-signal-300 via-signal-400 to-signal-500"
        aria-hidden="true"
      >
        <div className="h-full w-full" style={{ boxShadow: 'var(--shadow-glow-bar)' }} />
      </motion.div>
    </div>
  );
}
