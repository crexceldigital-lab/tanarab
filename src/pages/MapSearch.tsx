import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import MapSearchFilters from '@/components/map/MapSearchFilters';
import MapPropertyList from '@/components/map/MapPropertyList';
import MapView from '@/components/map/MapView';
import { mapProperties, type MapProperty } from '@/data/mapProperties';
import { useIsMobile } from '@/hooks/use-mobile';
import { Map, List, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScanAreaPanel from '@/components/ScanAreaPanel';

export interface MapFilters {
  query: string;
  propertyTypes: string[];
  unitType: string;
  status: string;
  priceRange: [number, number];
  developer: string;
  sortRecent: boolean;
}

const defaultFilters: MapFilters = {
  query: '',
  propertyTypes: [],
  unitType: '',
  status: '',
  priceRange: [0, 1000000000],
  developer: '',
  sortRecent: false,
};

const MapSearch = () => {
  const isMobile = useIsMobile();
  const [filters, setFilters] = useState<MapFilters>(defaultFilters);
  const [activePropertyId, setActivePropertyId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<'map' | 'list'>('map');
  const [mapBounds, setMapBounds] = useState<{ north: number; south: number; east: number; west: number } | null>(null);

  const filtered = useMemo(() => {
    let results = mapProperties.filter((p) => {
      if (filters.query) {
        const q = filters.query.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.developer_name.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (filters.unitType && !p.unit_types.includes(filters.unitType)) return false;
      if (filters.status && p.status !== filters.status) return false;
      if (filters.developer && p.developer_name !== filters.developer) return false;
      if (p.price_min > filters.priceRange[1] || p.price_max < filters.priceRange[0]) return false;

      // Filter by map bounds if set
      if (mapBounds) {
        if (
          p.latitude < mapBounds.south ||
          p.latitude > mapBounds.north ||
          p.longitude < mapBounds.west ||
          p.longitude > mapBounds.east
        )
          return false;
      }

      return true;
    });

    return results;
  }, [filters, mapBounds]);

  const handlePropertyClick = useCallback((id: string) => {
    setActivePropertyId(id);
    if (isMobile) setMobileView('map');
  }, [isMobile]);

  const handlePinClick = useCallback((id: string) => {
    setActivePropertyId(id);
    if (isMobile) setMobileView('list');
  }, [isMobile]);

  const handleBoundsChange = useCallback((bounds: { north: number; south: number; east: number; west: number }) => {
    setMapBounds(bounds);
  }, []);

  return (
    <div className="flex h-screen flex-col bg-background">
      <Navbar />

      {/* Filters */}
      <MapSearchFilters filters={filters} onChange={setFilters} resultCount={filtered.length} />

      {/* Mobile toggle */}
      {isMobile && (
        <div className="flex border-b border-border bg-card px-4 py-2 gap-2">
          <Button
            variant={mobileView === 'map' ? 'default' : 'outline'}
            size="sm"
            className="flex-1 gap-2"
            onClick={() => setMobileView('map')}
          >
            <Map className="h-4 w-4" /> Map
          </Button>
          <Button
            variant={mobileView === 'list' ? 'default' : 'outline'}
            size="sm"
            className="flex-1 gap-2"
            onClick={() => setMobileView('list')}
          >
            <List className="h-4 w-4" /> List ({filtered.length})
          </Button>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* List - left side */}
        {(!isMobile || mobileView === 'list') && (
          <div className="w-full overflow-y-auto border-r border-border bg-background md:w-[38%] lg:w-[35%]">
            <MapPropertyList
              properties={filtered}
              activePropertyId={activePropertyId}
              onPropertyClick={handlePropertyClick}
            />
          </div>
        )}

        {/* Map - right side */}
        {(!isMobile || mobileView === 'map') && (
          <div className="flex-1 relative">
            <MapView
              properties={filtered}
              allProperties={mapProperties}
              activePropertyId={activePropertyId}
              onPinClick={handlePinClick}
              onBoundsChange={handleBoundsChange}
            />
            <div className="absolute bottom-4 left-4 right-4 z-[500] max-h-[40%] overflow-y-auto rounded-xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur-sm sm:left-auto sm:max-w-sm">
              <ScanAreaPanel />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapSearch;
