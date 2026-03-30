import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cities } from '@/data/mockProperties';
import PropertyTypeFilter from '@/components/filters/PropertyTypeFilter';
import PriceRangeFilter from '@/components/filters/PriceRangeFilter';

export interface SearchFilterValues {
  city: string;
  types: string[];
  query: string;
  priceMin: number;
  priceMax: number | null;
}

interface SearchFiltersProps {
  filters: SearchFilterValues;
  onChange: (filters: SearchFilterValues) => void;
  onSearch: () => void;
  variant?: 'hero' | 'bar';
}

const SearchFilters = ({ filters, onChange, onSearch, variant = 'bar' }: SearchFiltersProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-3 shadow-sm sm:flex-row sm:flex-wrap sm:items-center">
      {/* Search input */}
      <div className="flex flex-1 min-w-[180px] items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
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

      {/* Property Type multi-select */}
      <PropertyTypeFilter
        selected={filters.types}
        onChange={(types) => onChange({ ...filters, types })}
      />

      {/* Price Range */}
      <PriceRangeFilter
        min={filters.priceMin}
        max={filters.priceMax}
        onChange={(priceMin, priceMax) => onChange({ ...filters, priceMin, priceMax })}
      />

      <Button onClick={onSearch} className="gap-2">
        <SlidersHorizontal className="h-4 w-4" /> Search
      </Button>
    </div>
  );
};

export default SearchFilters;
