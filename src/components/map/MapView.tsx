import { useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { MapProperty } from '@/data/mapProperties';
import { MapPin, Calendar, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Fix default leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const statusColors: Record<string, string> = {
  available: '#0d9488',   // primary-ish green
  'on-sale': '#d97706',   // accent orange
  upcoming: '#6b7280',    // gray
  'sold-out': '#9ca3af',  // lighter gray
};

function createPinIcon(status: string, isActive: boolean) {
  const color = statusColors[status] || '#0d9488';
  const size = isActive ? 36 : 28;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1.5">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3" fill="white"/>
  </svg>`;
  return L.divIcon({
    html: svg,
    className: 'custom-pin',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

// Component to handle map events
function MapEventHandler({ onBoundsChange }: { onBoundsChange: (bounds: any) => void }) {
  const map = useMapEvents({
    moveend: () => {
      const b = map.getBounds();
      onBoundsChange({
        north: b.getNorth(),
        south: b.getSouth(),
        east: b.getEast(),
        west: b.getWest(),
      });
    },
    zoomend: () => {
      const b = map.getBounds();
      onBoundsChange({
        north: b.getNorth(),
        south: b.getSouth(),
        east: b.getEast(),
        west: b.getWest(),
      });
    },
  });
  return null;
}

// Component to fly to active property
function FlyToActive({ property }: { property: MapProperty | null }) {
  const map = useMap();
  useEffect(() => {
    if (property) {
      map.flyTo([property.latitude, property.longitude], 13, { duration: 0.8 });
    }
  }, [property, map]);
  return null;
}

interface Props {
  properties: MapProperty[];
  allProperties: MapProperty[];
  activePropertyId: string | null;
  onPinClick: (id: string) => void;
  onBoundsChange: (bounds: { north: number; south: number; east: number; west: number }) => void;
}

const MapView = ({ properties, allProperties, activePropertyId, onPinClick, onBoundsChange }: Props) => {
  const activeProperty = useMemo(
    () => allProperties.find((p) => p.id === activePropertyId) || null,
    [allProperties, activePropertyId]
  );

  // Tanzania center
  const center: [number, number] = [-6.3690, 34.8888];

  return (
    <MapContainer
      center={center}
      zoom={6}
      className="h-full w-full"
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapEventHandler onBoundsChange={onBoundsChange} />
      <FlyToActive property={activeProperty} />

      {allProperties.map((p) => (
        <Marker
          key={p.id}
          position={[p.latitude, p.longitude]}
          icon={createPinIcon(p.status, p.id === activePropertyId)}
          eventHandlers={{ click: () => onPinClick(p.id) }}
        >
          <Popup maxWidth={280} className="property-popup">
            <div className="min-w-[240px]">
              <div className="mb-2 aspect-[16/9] overflow-hidden rounded-md bg-muted">
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                  <Building2 className="h-6 w-6 text-primary/25" />
                </div>
              </div>
              <h3 className="font-heading text-sm font-semibold text-foreground">{p.name}</h3>
              <p className="text-xs text-muted-foreground">{p.developer_name}</p>
              <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {p.location}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-heading text-sm font-bold text-foreground">{p.price_range}</span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-medium capitalize"
                  style={{ backgroundColor: statusColors[p.status] + '22', color: statusColors[p.status] }}
                >
                  {p.status.replace('-', ' ')}
                </span>
              </div>
              <Link
                to={`/property/${p.id}`}
                className="mt-2 block rounded-md bg-primary px-3 py-1.5 text-center text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                View Details
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
