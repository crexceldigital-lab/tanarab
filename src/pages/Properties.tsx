import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchFilters, { type SearchFilterValues } from '@/components/SearchFilters';
import PropertyCard from '@/components/PropertyCard';
import { properties, statusOptions } from '@/data/mockProperties';
import { Badge } from '@/components/ui/badge';

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<SearchFilterValues>({
    city: searchParams.get('city') || '',
    types: searchParams.get('type') ? [searchParams.get('type')!] : [],
    query: searchParams.get('q') || '',
    priceMin: 0,
    priceMax: null,
  });
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.city && p.city !== filters.city) return false;
      if (filters.types.length > 0 && !filters.types.includes(p.type)) return false;
      if (statusFilter && p.status !== statusFilter) return false;
      if (filters.priceMin > 0 && p.price < filters.priceMin) return false;
      if (filters.priceMax !== null && p.price > filters.priceMax) return false;
      if (filters.query) {
        const q = filters.query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.developer.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [filters, statusFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 font-heading text-3xl font-bold text-foreground">Properties</h1>
        <SearchFilters filters={filters} onChange={setFilters} onSearch={() => {}} />

        {/* Status pills */}
        <div className="mt-4 flex gap-2 flex-wrap">
          <Badge
            variant={statusFilter === '' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setStatusFilter('')}
          >
            All
          </Badge>
          {statusOptions.map((s) => (
            <Badge
              key={s}
              variant={statusFilter === s ? 'default' : 'outline'}
              className="cursor-pointer capitalize"
              onClick={() => setStatusFilter(s)}
            >
              {s.replace('-', ' ')}
            </Badge>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">{filtered.length} properties found</p>

        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center text-muted-foreground">
            <p className="text-lg font-medium">No properties found</p>
            <p className="text-sm">Try adjusting your search filters</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Properties;
