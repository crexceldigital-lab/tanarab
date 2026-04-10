import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import MapView from '@/components/map/MapView';
import MapBottomSheet from '@/components/map/MapBottomSheet';
import MapFloatingSearch from '@/components/map/MapFloatingSearch';
import MapFilterChips from '@/components/map/MapFilterChips';
import { mapProperties, type MapProperty } from '@/data/mapProperties';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

export interface MapFilters {
  query: string;
  propertyTypes: string[];
  unitType: string;
  status: string;
  priceRange: [number, number];
  developer: string;
  sortRecent: boolean;
  beds: string;
}

const defaultFilters: MapFilters = {
  query: '',
  propertyTypes: [],
  unitType: '',
  status: '',
  priceRange: [0, 1_000_000_000],
  developer: '',
  sortRecent: false,
  beds: '',
};

const MapSearch = () => {
  const isMobile = useIsMobile();
  const [filters, setFilters] = useState<MapFilters>(defaultFilters);
  const [activePropertyId, setActivePropertyId] = useState<string | null>(null);
  const [mapBounds, setMapBounds] = useState<{ north: number; south: number; east: number; west: number } | null>(null);
  const [sheetExpanded, setSheetExpanded] = useState(false);

  const filtered = useMemo(() => {
    return mapProperties.filter((p) => {
      if (filters.query) {
        const q = filters.query.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.developer_name.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (filters.propertyTypes.length > 0) {
        const hasMatch = filters.propertyTypes.some(t => p.unit_types.some(u => u.toLowerCase().includes(t.toLowerCase())));
        if (!hasMatch) return false;
      }
      if (filters.beds && !p.unit_types.some(u => u.includes(filters.beds))) return false;
      if (filters.status && p.status !== filters.status) return false;
      if (filters.developer && p.developer_name !== filters.developer) return false;
      if (p.price_min > filters.priceRange[1] || p.price_max < filters.priceRange[0]) return false;
      if (mapBounds) {
        if (
          p.latitude < mapBounds.south ||
          p.latitude > mapBounds.north ||
          p.longitude < mapBounds.west ||
          p.longitude > mapBounds.east
        ) return false;
      }
      return true;
    });
  }, [filters, mapBounds]);

  const handlePropertyClick = useCallback((id: string) => {
    setActivePropertyId(id);
    setSheetExpanded(false);
  }, []);

  const handlePinClick = useCallback((id: string) => {
    setActivePropertyId(id);
    setSheetExpanded(true);
  }, []);

  const handleBoundsChange = useCallback((bounds: { north: number; south: number; east: number; west: number }) => {
    setMapBounds(bounds);
  }, []);

  // City for summary
  const primaryCity = useMemo(() => {
    if (filtered.length === 0) return 'Tanzania';
    const cities = filtered.map(p => p.city);
    const freq: Record<string, number> = {};
    cities.forEach(c => { freq[c] = (freq[c] || 0) + 1; });
    return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
  }, [filtered]);

  return (
    <div className="relative flex h-[100dvh] flex-col bg-background overflow-hidden">
      {/* Map fills entire screen */}
      <div className="absolute inset-0 z-0">
        <MapView
          properties={filtered}
          allProperties={mapProperties}
          activePropertyId={activePropertyId}
          onPinClick={handlePinClick}
          onBoundsChange={handleBoundsChange}
        />
      </div>

      {/* Floating UI layer */}
      <div className="pointer-events-none relative z-10 flex h-full flex-col">
        {/* Top: Search + Filters */}
        <div className="pointer-events-auto">
          <div className="safe-area-top" />
          <MapFloatingSearch
            query={filters.query}
            onQueryChange={(query) => setFilters(f => ({ ...f, query }))}
          />
          <MapFilterChips filters={filters} onChange={setFilters} />
        </div>

        {/* Spacer to push bottom sheet down */}
        <div className="flex-1" />

        {/* Bottom Sheet */}
        <div className="pointer-events-auto">
          <MapBottomSheet
            properties={filtered}
            activePropertyId={activePropertyId}
            onPropertyClick={handlePropertyClick}
            expanded={sheetExpanded}
            onExpandedChange={setSheetExpanded}
            cityName={primaryCity}
          />
        </div>
      </div>
    </div>
  );
};

export default MapSearch;
