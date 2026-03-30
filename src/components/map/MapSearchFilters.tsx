import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { unitTypeOptions, statusOptions, developerOptions } from '@/data/mapProperties';
import type { MapFilters } from '@/pages/MapSearch';

interface Props {
  filters: MapFilters;
  onChange: (filters: MapFilters) => void;
  resultCount: number;
}

const statusLabels: Record<string, string> = {
  available: 'Available',
  'on-sale': 'On Sale',
  upcoming: 'Upcoming',
  'sold-out': 'Sold Out',
};

const MapSearchFilters = ({ filters, onChange, resultCount }: Props) => {
  return (
    <div className="border-b border-border bg-card px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by area, project or developer"
            value={filters.query}
            onChange={(e) => onChange({ ...filters, query: e.target.value })}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* Unit type */}
        <select
          value={filters.unitType}
          onChange={(e) => onChange({ ...filters, unitType: e.target.value })}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none"
        >
          <option value="">Unit Type</option>
          {unitTypeOptions.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none"
        >
          <option value="">Sale Status</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>{statusLabels[s]}</option>
          ))}
        </select>

        {/* Developer */}
        <select
          value={filters.developer}
          onChange={(e) => onChange({ ...filters, developer: e.target.value })}
          className="hidden rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none lg:block"
        >
          <option value="">Developer</option>
          {developerOptions.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        {/* Recent toggle */}
        <Button
          variant={filters.sortRecent ? 'default' : 'outline'}
          size="sm"
          className="hidden gap-1.5 sm:flex"
          onClick={() => onChange({ ...filters, sortRecent: !filters.sortRecent })}
        >
          <ArrowUpDown className="h-3.5 w-3.5" /> Recent
        </Button>

        {/* Result count */}
        <span className="ml-auto text-sm font-medium text-muted-foreground">
          <span className="font-semibold text-foreground">{resultCount.toLocaleString()}</span> projects found
        </span>
      </div>
    </div>
  );
};

export default MapSearchFilters;
