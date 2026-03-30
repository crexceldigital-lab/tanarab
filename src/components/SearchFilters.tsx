import { Search, MapPin, Home, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cities, propertyTypes } from '@/data/mockProperties';

interface SearchFiltersProps {
  filters: { city: string; type: string; query: string };
  onChange: (filters: { city: string; type: string; query: string }) => void;
  onSearch: () => void;
  variant?: 'hero' | 'bar';
}

const SearchFilters = ({ filters, onChange, onSearch, variant = 'bar' }: SearchFiltersProps) => {
  const isHero = variant === 'hero';

  return (
    <div className={`flex flex-col gap-3 ${isHero ? 'sm:flex-row' : 'sm:flex-row'} rounded-xl border border-border bg-card p-3 shadow-sm`}>
      {/* Search input */}
      <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search properties..."
          value={filters.query}
          onChange={(e) => onChange({ ...filters, query: e.target.value })}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {/* City select */}
      <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <select
          value={filters.city}
          onChange={(e) => onChange({ ...filters, city: e.target.value })}
          className="bg-transparent text-sm outline-none text-foreground"
        >
          <option value="">All Cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Type select */}
      <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
        <Home className="h-4 w-4 text-muted-foreground" />
        <select
          value={filters.type}
          onChange={(e) => onChange({ ...filters, type: e.target.value })}
          className="bg-transparent text-sm capitalize outline-none text-foreground"
        >
          <option value="">All Types</option>
          {propertyTypes.map((t) => (
            <option key={t} value={t} className="capitalize">{t}</option>
          ))}
        </select>
      </div>

      <Button onClick={onSearch} className="gap-2">
        <SlidersHorizontal className="h-4 w-4" /> Search
      </Button>
    </div>
  );
};

export default SearchFilters;
