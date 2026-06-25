interface GoldDividerProps {
  className?: string;
  light?: boolean;
}

const GoldDivider = ({ className = '', light = false }: GoldDividerProps) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <span className={`h-px w-10 bg-gradient-to-r from-transparent ${light ? 'to-gold-300/70' : 'to-gold-500/70'}`} />
    <span className={light ? 'text-gold-300' : 'text-gold-500'}>✦</span>
    <span className={`h-px w-10 bg-gradient-to-l from-transparent ${light ? 'to-gold-300/70' : 'to-gold-500/70'}`} />
  </div>
);

export default GoldDivider;
