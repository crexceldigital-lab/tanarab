import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const PROPERTY_CATEGORIES = [
  {
    label: 'Residential',
    types: [
      { value: 'house', label: 'House' },
      { value: 'cottage', label: 'Cottage / Bungalow' },
      { value: 'apartment', label: 'Condo / Apartment' },
      { value: 'maisonette', label: 'Maisonette / Duplex' },
      { value: 'plot', label: 'Plot' },
      { value: 'building', label: 'Full Building' },
    ],
  },
  {
    label: 'Commercial',
    types: [
      { value: 'office', label: 'Office' },
      { value: 'retail', label: 'Retail' },
      { value: 'hospitality', label: 'Hospitality (Hotel / Lodge)' },
      { value: 'industrial', label: 'Industrial' },
      { value: 'storage', label: 'Storage Facility' },
      { value: 'education', label: 'Education' },
    ],
  },
  {
    label: 'Land',
    types: [{ value: 'land', label: 'Farm / Land' }],
  },
];

export const allPropertyTypeValues = PROPERTY_CATEGORIES.flatMap((c) => c.types.map((t) => t.value));

interface PropertyTypeFilterProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

const PropertyTypeFilter = ({ selected, onChange }: PropertyTypeFilterProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (value: string) => {
    onChange(
      selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]
    );
  };

  const summary = () => {
    if (selected.length === 0) return 'Property Type';
    const allTypes = PROPERTY_CATEGORIES.flatMap((c) => c.types);
    const first = allTypes.find((t) => t.value === selected[0]);
    if (selected.length === 1) return first?.label || selected[0];
    return `${first?.label} + ${selected.length - 1} more`;
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors hover:border-primary/40"
      >
        <span className={selected.length > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'}>
          {summary()}
        </span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border border-border bg-popover p-3 shadow-lg animate-in fade-in-0 zoom-in-95">
          {/* Clear */}
          {selected.length > 0 && (
            <button
              onClick={() => onChange([])}
              className="mb-2 flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              <X className="h-3 w-3" /> Clear all
            </button>
          )}

          {/* Selected tags */}
          {selected.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {selected.map((v) => {
                const type = PROPERTY_CATEGORIES.flatMap((c) => c.types).find((t) => t.value === v);
                return (
                  <span
                    key={v}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary"
                  >
                    {type?.label || v}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggle(v)} />
                  </span>
                );
              })}
            </div>
          )}

          <div className="max-h-64 overflow-y-auto space-y-3">
            {PROPERTY_CATEGORIES.map((cat) => (
              <div key={cat.label}>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {cat.label}
                </p>
                <div className="space-y-1">
                  {cat.types.map((type) => (
                    <label
                      key={type.value}
                      className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted"
                    >
                      <Checkbox
                        checked={selected.includes(type.value)}
                        onCheckedChange={() => toggle(type.value)}
                      />
                      <span className="text-foreground">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyTypeFilter;
