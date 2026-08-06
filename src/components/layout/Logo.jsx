import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export default function Logo({ className, showTag = true }) {
  return (
    <Link to="/" className={cn('flex items-center gap-2.5', className)} aria-label="Fully Cuvved home">
      <img
        src="/logo.png"
        alt=""
        width={30}
        height={30}
        className="h-[30px] w-auto object-contain"
        aria-hidden="true"
      />
      {showTag && (
        <span className="hidden rounded-full border border-signal-500/25 bg-signal-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-signal-600 dark:text-signal-300 sm:inline-block">
          Fully_cuvved
        </span>
      )}
    </Link>
  );
}
