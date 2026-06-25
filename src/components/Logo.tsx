import { Link } from 'react-router-dom';

interface LogoProps {
  /** 'default' = navy ink for use on light backgrounds. 'light' = white ink for use on navy/dark backgrounds. */
  variant?: 'default' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  /** Pass null to render a static (non-link) lockup. */
  linkTo?: string | null;
}

const sizeMap = {
  sm: { icon: 'h-7 w-7', text: 'text-base', tagline: 'text-[8px]', gap: 'gap-2' },
  md: { icon: 'h-9 w-9', text: 'text-xl', tagline: 'text-[9px]', gap: 'gap-2.5' },
  lg: { icon: 'h-12 w-12', text: 'text-3xl', tagline: 'text-[10px]', gap: 'gap-3' },
};

/** Skyline + bridge arc mark, echoing the TanRab company profile glyph. */
const LogoMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="22" width="6" height="18" rx="1" fill="currentColor" />
    <rect x="14" y="14" width="6" height="26" rx="1" fill="currentColor" />
    <rect x="23" y="6" width="6" height="34" rx="1" fill="#C9A227" />
    <rect x="32" y="16" width="6" height="24" rx="1" fill="currentColor" opacity="0.85" />
    <path
      d="M2 31C10 21 38 21 46 31"
      stroke="#C9A227"
      strokeWidth="2.2"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const Logo = ({ variant = 'default', size = 'md', showTagline = false, className = '', linkTo = '/' }: LogoProps) => {
  const s = sizeMap[size];
  const inkClass = variant === 'light' ? 'text-white' : 'text-secondary';
  const taglineClass = variant === 'light' ? 'text-white/55' : 'text-muted-foreground';

  const content = (
    <span className={`flex items-center ${s.gap} ${className}`}>
      <span className={`${s.icon} ${inkClass} shrink-0`}>
        <LogoMark className="h-full w-full" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display font-semibold tracking-tight ${s.text} ${inkClass}`}>
          Tan<span className="text-gold-500">Rab</span>
        </span>
        {showTagline && (
          <span className={`mt-1 font-body uppercase tracking-[0.2em] ${s.tagline} ${taglineClass}`}>
            Tanzania &middot; Gulf Bridge
          </span>
        )}
      </span>
    </span>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="inline-flex">
        {content}
      </Link>
    );
  }
  return content;
};

export default Logo;
