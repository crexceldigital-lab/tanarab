import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

const MIN_PRESETS = [0, 25_000_000, 50_000_000, 100_000_000, 250_000_000, 500_000_000, 750_000_000, 1_000_000_000];
const MAX_PRESETS = [25_000_000, 50_000_000, 100_000_000, 250_000_000, 500_000_000, 750_000_000, 1_000_000_000, null]; // null = Any

const fmt = (n: number) => n.toLocaleString('en-US');
const parse = (s: string) => {
  const cleaned = s.replace(/[^0-9]/g, '');
  return cleaned ? parseInt(cleaned, 10) : 0;
};

interface PriceRangeFilterProps {
  min: number;
  max: number | null;
  onChange: (min: number, max: number | null) => void;
}

const PriceRangeFilter = ({ min, max, onChange }: PriceRangeFilterProps) => {
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

  const selectPreset = (presetMin: number, presetMax: number | null) => {
    onChange(presetMin, presetMax);
  };

  const clear = () => {
    onChange(0, null);
  };

  const hasFilter = min > 0 || max !== null;

  const summary = () => {
    if (!hasFilter) return 'Price Range';
    const minLabel = min > 0 ? `TZS ${fmt(min)}` : 'TZS 0';
    const maxLabel = max ? `TZS ${fmt(max)}` : 'Any';
    return `${minLabel} – ${maxLabel}`;
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors hover:border-primary/40"
      >
        <span className={hasFilter ? 'text-foreground font-medium' : 'text-muted-foreground'}>
          {summary()}
        </span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-80 rounded-xl border border-border bg-popover p-4 shadow-lg animate-in fade-in-0 zoom-in-95">
          {/* Clear */}
          {hasFilter && (
            <button
              onClick={clear}
              className="mb-3 flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              <X className="h-3 w-3" /> Clear price filter
            </button>
          )}

          {/* Manual inputs */}
          <div className="mb-4 flex items-center gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Min (TZS)
              </label>
              <input
                type="text"
                placeholder="0"
                value={minInput}
                onChange={(e) => handleMinInput(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary text-foreground"
              />
            </div>
            <span className="mt-5 text-muted-foreground">–</span>
            <div className="flex-1">
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Max (TZS)
              </label>
              <input
                type="text"
                placeholder="Any"
                value={maxInput}
                onChange={(e) => handleMaxInput(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary text-foreground"
              />
            </div>
          </div>

          {/* Quick presets */}
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Quick Select
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {MIN_PRESETS.map((preMin, i) => {
              const preMax = MAX_PRESETS[i];
              const isActive = min === preMin && max === preMax;
              return (
                <button
                  key={i}
                  onClick={() => selectPreset(preMin, preMax)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/70'
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

export default PriceRangeFilter;
