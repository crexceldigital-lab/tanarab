import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import type { MapProperty } from '@/data/mapProperties';
import { MapPin, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const statusColors: Record<string, string> = {
  available: '#0d9488',
  'on-sale': '#ef4444',
  upcoming: '#8b5cf6',
  'sold-out': '#9ca3af',
};

function createPricePinIcon(property: MapProperty, isActive: boolean) {
  const color = statusColors[property.status] || '#0d9488';
  const priceLabel = property.price_min >= 1_000_000_000
    ? `${(property.price_min / 1_000_000_000).toFixed(1)}B`
    : `${(property.price_min / 1_000_000).toFixed(0)}M`;
  
  const scale = isActive ? 1.15 : 1;
  const shadow = isActive ? 'box-shadow: 0 4px 14px -2px rgba(0,0,0,0.3);' : 'box-shadow: 0 2px 8px -2px rgba(0,0,0,0.2);';
  const border = isActive ? `border: 2.5px solid ${color};` : 'border: 2px solid white;';
  
  const html = `
    <div style="
      background: white;
      color: ${color};
      font-weight: 700;
      font-size: 11px;
      font-family: 'Space Grotesk', system-ui, sans-serif;
      padding: 4px 10px;
      border-radius: 20px;
      white-space: nowrap;
      ${border}
      ${shadow}
      transform: scale(${scale});
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      cursor: pointer;
    ">${priceLabel}</div>
  `;
  
  return L.divIcon({
    html,
    className: 'price-pin',
    iconSize: [60, 30],
    iconAnchor: [30, 15],
    popupAnchor: [0, -20],
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
      zoomControl={false}
    >
      {/* Clean, light map tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      <MapEventHandler onBoundsChange={onBoundsChange} />
      <FlyToActive property={activeProperty} />

      {allProperties.map((p) => (
        <Marker
          key={p.id}
          position={[p.latitude, p.longitude]}
          icon={createPricePinIcon(p, p.id === activePropertyId)}
          eventHandlers={{ click: () => onPinClick(p.id) }}
        >
          <Popup maxWidth={260}>
            <div style={{ minWidth: 200 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 4px' }}>{p.name}</h3>
              <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{p.developer_name}</p>
              <p style={{ fontSize: 12, color: '#64748b', margin: '4px 0' }}>📍 {p.location}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{p.price_range}</span>
              </div>
              <Link
                to={`/property/${p.id}`}
                style={{
                  display: 'block',
                  marginTop: 8,
                  padding: '8px 12px',
                  borderRadius: 10,
                  backgroundColor: '#0d9488',
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: 600,
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
