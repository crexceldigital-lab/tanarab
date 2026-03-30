import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import type { MapProperty } from '@/data/mapProperties';
import { MapPin, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const statusColors: Record<string, string> = {
  available: '#0d9488',
  'on-sale': '#d97706',
  upcoming: '#6b7280',
  'sold-out': '#9ca3af',
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

function MapEventHandler({ onBoundsChange }: { onBoundsChange: (bounds: any) => void }) {
  useMapEvents({
    moveend: (e) => {
      const b = e.target.getBounds();
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

  const center: [number, number] = [-6.3690, 34.8888];

  return (
    <MapContainer
      center={center}
      zoom={6}
      style={{ height: '100%', width: '100%' }}
      zoomControl={true}
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
          <Popup maxWidth={280}>
            <div style={{ minWidth: 220 }}>
              <div style={{ marginBottom: 8, aspectRatio: '16/9', overflow: 'hidden', borderRadius: 8, background: '#f1f5f9' }}>
                <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 style={{ width: 24, height: 24, color: '#0d948855' }} />
                </div>
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{p.name}</h3>
              <p style={{ fontSize: 12, color: '#64748b', margin: '2px 0' }}>{p.developer_name}</p>
              <p style={{ fontSize: 12, color: '#64748b', margin: '4px 0' }}>📍 {p.location}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{p.price_range}</span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    padding: '2px 8px',
                    borderRadius: 12,
                    backgroundColor: statusColors[p.status] + '22',
                    color: statusColors[p.status],
                    textTransform: 'capitalize',
                  }}
                >
                  {p.status.replace('-', ' ')}
                </span>
              </div>
              <Link
                to={`/property/${p.id}`}
                style={{
                  display: 'block',
                  marginTop: 8,
                  padding: '6px 12px',
                  borderRadius: 6,
                  backgroundColor: '#0d9488',
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
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
