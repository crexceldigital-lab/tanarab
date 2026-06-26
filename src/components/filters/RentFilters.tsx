import { useState } from 'react';
import { format } from 'date-fns';
import { Search, MapPin, BedDouble, SlidersHorizontal, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { rentalCities, bedroomOptions } from '@/data/mockRentals';
import RentPriceFilter from '@/components/filters/RentPriceFilter';

export interface RentFilterValues {
  query: string;
  city: string;
  bedrooms: number | null;
  priceMin: number;
  priceMax: number | null;
  furnishedOnly: boolean;
  petFriendlyOnly: boolean;
  moveInDate: Date | undefined;
}

interface RentFiltersProps {
  filters: RentFilterValues;
  onChange: (filters: RentFilterValues) => void;
}

const RentFilters = ({ filters, onChange }: RentFiltersProps) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreActive = filters.furnishedOnly || filters.petFriendlyOnly || !!filters.moveInDate;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-3 shadow-sm sm:flex-row sm:flex-wrap sm:items-center">
      {/* Search input */}
      <div className="flex flex-1 min-w-[180px] items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search rentals by name or area..."
          value={filters.query}
          onChange={(e) => onChange({ ...filters, query: e.target.value })}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {/* City */}
      <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <select
          value={filters.city}
          onChange={(e) => onChange({ ...filters, city: e.target.value })}
          className="bg-transparent text-sm outline-none text-foreground"
        >
          <option value="">All Cities</option>
          {rentalCities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Bedrooms */}
      <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
        <BedDouble className="h-4 w-4 text-muted-foreground" />
        <select
          value={filters.bedrooms ?? ''}
          onChange={(e) => onChange({ ...filters, bedrooms: e.target.value === '' ? null : Number(e.target.value) })}
          className="bg-transparent text-sm outline-none text-foreground"
        >
          <option value="">Any Beds</option>
          {bedroomOptions.map((b) => (
            <option key={b.label} value={b.value}>{b.label} {b.value === 1 ? 'Bed' : 'Beds'}</option>
          ))}
        </select>
      </div>

      {/* Price */}
      <RentPriceFilter
        min={filters.priceMin}
        max={filters.priceMax}
        onChange={(priceMin, priceMax) => onChange({ ...filters, priceMin, priceMax })}
      />

      {/* More filters: move-in date, furnished, pet friendly */}
      <Popover open={moreOpen} onOpenChange={setMoreOpen}>
        <PopoverTrigger asChild>
          <button
            className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition-colors ${
              moreActive ? 'border-gold-500 bg-gold-50 text-secondary' : 'border-border bg-background text-muted-foreground hover:border-gold-500/40'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {filters.moveInDate ? format(filters.moveInDate, 'MMM d') : 'More Filters'}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 space-y-4" align="start">
          <div>
            <Label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5" /> Move-in date
            </Label>
            <Calendar
              mode="single"
              selected={filters.moveInDate}
              onSelect={(d) => onChange({ ...filters, moveInDate: d })}
              disabled={(d) => d < new Date()}
              className="rounded-md border p-0 pointer-events-auto"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="furnished-only" className="text-sm font-medium text-foreground">Furnished only</Label>
            <Switch
              id="furnished-only"
              checked={filters.furnishedOnly}
              onCheckedChange={(v) => onChange({ ...filters, furnishedOnly: v })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="pet-friendly-only" className="text-sm font-medium text-foreground">Pet friendly only</Label>
            <Switch
              id="pet-friendly-only"
              checked={filters.petFriendlyOnly}
              onCheckedChange={(v) => onChange({ ...filters, petFriendlyOnly: v })}
            />
          </div>
          {moreActive && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-gold-600"
              onClick={() => onChange({ ...filters, furnishedOnly: false, petFriendlyOnly: false, moveInDate: undefined })}
            >
              Clear these filters
            </Button>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default RentFilters;
