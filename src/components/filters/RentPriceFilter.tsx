import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

const MIN_PRESETS = [0, 500_000, 1_000_000, 1_500_000, 2_500_000, 4_000_000];
const MAX_PRESETS = [500_000, 1_000_000, 1_500_000, 2_500_000, 4_000_000, null]; // null = Any

const fmt = (n: number) => n.toLocaleString('en-US');
const parse = (s: string) => {
  const cleaned = s.replace(/[^0-9]/g, '');
  return cleaned ? parseInt(cleaned, 10) : 0;
};

interface RentPriceFilterProps {
  min: number;
  max: number | null;
  onChange: (min: number, max: number | null) => void;
}

const RentPriceFilter = ({ min, max, onChange }: RentPriceFilterProps) => {
  const [open, setOpen] = useState(false);
  const [minInput, setMinInput] = useState(min > 0 ? fmt(min) : '');
  const [maxInput, setMaxInput] = useState(max ? fmt(max) : '');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setMinInput(min > 0 ? fmt(min) : '');
    setMaxInput(max ? fmt(max) : '');
  }, [min, max]);

  const handleMinInput = (val: string) => {
    setMinInput(val);
    onChange(parse(val), max);
  };

  const handleMaxInput = (val: string) => {
    setMaxInput(val);
    const parsed = parse(val);
    onChange(min, parsed > 0 ? parsed : null);
  };

  const clear = () => onChange(0, null);
  const hasFilter = min > 0 || max !== null;

  const summary = () => {
    if (!hasFilter) return 'Monthly Rent';
    const minLabel = min > 0 ? fmt(min) : '0';
    const maxLabel = max ? fmt(max) : 'Any';
    return `TZS ${minLabel} – ${maxLabel}`;
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors hover:border-gold-500/40"
      >
        <span className={hasFilter ? 'text-foreground font-medium' : 'text-muted-foreground'}>
          {summary()}
        </span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-80 rounded-xl border border-border bg-popover p-4 shadow-lg animate-in fade-in-0 zoom-in-95">
          {hasFilter && (
            <button onClick={clear} className="mb-3 flex items-center gap-1 text-xs font-medium text-gold-600 hover:underline">
              <X className="h-3 w-3" /> Clear price filter
            </button>
          )}

          <div className="mb-4 flex items-center gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Min /mo (TZS)
              </label>
              <input
                type="text"
                placeholder="0"
                value={minInput}
                onChange={(e) => handleMinInput(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold-500 text-foreground"
              />
            </div>
            <span className="mt-5 text-muted-foreground">–</span>
            <div className="flex-1">
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Max /mo (TZS)
              </label>
              <input
                type="text"
                placeholder="Any"
                value={maxInput}
                onChange={(e) => handleMaxInput(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold-500 text-foreground"
              />
            </div>
          </div>

          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Quick Select</p>
          <div className="grid grid-cols-2 gap-1.5">
            {MIN_PRESETS.map((preMin, i) => {
              const preMax = MAX_PRESETS[i];
              const isActive = min === preMin && max === preMax;
              return (
                <button
                  key={i}
                  onClick={() => onChange(preMin, preMax)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    isActive ? 'bg-gold-gradient text-navy-900' : 'bg-muted text-foreground hover:bg-muted/70'
                  }`}
                >
                  {fmt(preMin)} – {preMax ? fmt(preMax) : '∞'}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RentPriceFilter;
