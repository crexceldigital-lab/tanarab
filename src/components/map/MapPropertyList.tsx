import { MapPin, Calendar, Building2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { MapProperty } from '@/data/mapProperties';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const statusStyle: Record<string, string> = {
  available: 'bg-primary/15 text-primary border-primary/30',
  'on-sale': 'bg-accent/15 text-accent-foreground border-accent/30',
  upcoming: 'bg-secondary text-secondary-foreground border-secondary',
  'sold-out': 'bg-muted text-muted-foreground border-border',
};

const statusDot: Record<string, string> = {
  available: 'bg-primary',
  'on-sale': 'bg-accent',
  upcoming: 'bg-secondary-foreground',
  'sold-out': 'bg-muted-foreground',
};

interface Props {
  properties: MapProperty[];
  activePropertyId: string | null;
  onPropertyClick: (id: string) => void;
}

const MapPropertyList = ({ properties, activePropertyId, onPropertyClick }: Props) => {
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activePropertyId && activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activePropertyId]);

  if (properties.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center">
        <div>
          <MapPin className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="font-medium text-foreground">No projects in this area</p>
          <p className="mt-1 text-sm text-muted-foreground">Try zooming out or adjusting filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {properties.map((p) => (
        <motion.div
          key={p.id}
          ref={p.id === activePropertyId ? activeRef : undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`cursor-pointer p-4 transition-colors hover:bg-secondary/50 ${
            p.id === activePropertyId ? 'bg-primary/5 ring-1 ring-inset ring-primary/20' : ''
          }`}
          onClick={() => onPropertyClick(p.id)}
        >
          {/* Image placeholder + tags */}
          <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-lg bg-muted">
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
              <Building2 className="h-8 w-8 text-primary/25" />
            </div>
            <div className="absolute left-2 top-2 flex flex-wrap gap-1">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-foreground/80 px-2 py-0.5 text-[10px] font-medium text-background backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading text-sm font-semibold leading-tight text-foreground line-clamp-1">
              {p.name}
            </h3>
            <span className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusStyle[p.status]}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${statusDot[p.status]}`} />
              {p.status.replace('-', ' ')}
            </span>
          </div>

          <p className="mt-0.5 text-xs text-muted-foreground">{p.developer_name}</p>

          <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {p.location}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <p className="font-heading text-sm font-bold text-foreground">{p.price_range}</p>
            {p.completion_date !== 'Completed' && (
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Calendar className="h-3 w-3" /> {p.completion_date}
              </span>
            )}
          </div>

          {/* Unit types */}
          <div className="mt-2 flex flex-wrap gap-1">
            {p.unit_types.map((u) => (
              <Badge key={u} variant="outline" className="text-[10px] px-1.5 py-0">
                {u}
              </Badge>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MapPropertyList;
