import { cn } from '@/lib/utils';

const variants = {
  default: 'bg-blue-50 text-blue-700',
  neutral: 'bg-gray-100 text-gray-700',
  secondary: 'bg-emerald-100 text-emerald-700',
};

export function Badge({ children, variant = 'default', className }) {
  return (
    <span
      className={cn(
        'rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
