import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, PanInfo } from 'framer-motion';
import { MapPin, Building2, BedDouble, Bath, Maximize2, Sparkles, TrendingUp, ChevronUp } from 'lucide-react';
import type { MapProperty } from '@/data/mapProperties';
import { Link } from 'react-router-dom';

interface Props {
  properties: MapProperty[];
  activePropertyId: string | null;
  onPropertyClick: (id: string) => void;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  cityName: string;
}

// Property images for cards (cycle through)
const cardImages = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=400&h=300&fit=crop',
];

const tagBadges: Record<string, { icon: typeof Sparkles; color: string }> = {
  'Featured': { icon: Sparkles, color: 'bg-primary/15 text-primary' },
  'High Demand': { icon: TrendingUp, color: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
  'On Sale': { icon: TrendingUp, color: 'bg-red-500/15 text-red-600 dark:text-red-400' },
  'New': { icon: Sparkles, color: 'bg-blue-500/15 text-blue-600 dark:text-blue-400' },
  'Upcoming': { icon: Sparkles, color: 'bg-violet-500/15 text-violet-600 dark:text-violet-400' },
};

const MapBottomSheet = ({ properties, activePropertyId, onPropertyClick, expanded, onExpandedChange, cityName }: Props) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const collapsedHeight = 200;
  const expandedHeight = typeof window !== 'undefined' ? window.innerHeight * 0.75 : 600;

  const y = useMotionValue(0);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.y < -threshold) {
      onExpandedChange(true);
      animate(y, -(expandedHeight - collapsedHeight), { type: 'spring', stiffness: 300, damping: 30 });
    } else if (info.offset.y > threshold) {
      onExpandedChange(false);
      animate(y, 0, { type: 'spring', stiffness: 300, damping: 30 });
    } else {
      animate(y, expanded ? -(expandedHeight - collapsedHeight) : 0, { type: 'spring', stiffness: 300, damping: 30 });
    }
  };

  useEffect(() => {
    if (expanded) {
      animate(y, -(expandedHeight - collapsedHeight), { type: 'spring', stiffness: 300, damping: 30 });
    } else {
      animate(y, 0, { type: 'spring', stiffness: 300, damping: 30 });
    }
  }, [expanded]);

  const borderRadius = useTransform(y, [0, -(expandedHeight - collapsedHeight)], [24, 20]);

  return (
    <motion.div
      ref={sheetRef}
      style={{ y, borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }}
      drag="y"
      dragConstraints={{ top: -(expandedHeight - collapsedHeight), bottom: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      className="relative bg-card shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.4)]"
    >
      {/* Drag handle */}
      <div className="flex justify-center pt-3 pb-1">
        <div className="h-1 w-10 rounded-full bg-muted-foreground/25" />
      </div>

      {/* Summary header */}
      <div className="flex items-center justify-between px-5 pb-3">
        <div>
          <h3 className="font-heading text-base font-bold text-foreground">
            {properties.length} {properties.length === 1 ? 'home' : 'homes'} in {cityName}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">Explore properties near you</p>
        </div>
        <button
          onClick={() => onExpandedChange(!expanded)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/60 transition-transform"
        >
          <ChevronUp className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Collapsed: horizontal scroll cards */}
      {!expanded && (
        <div className="flex gap-3 overflow-x-auto px-5 pb-5 scrollbar-none">
          {properties.slice(0, 8).map((p, i) => (
            <HorizontalCard key={p.id} property={p} index={i} isActive={p.id === activePropertyId} onClick={() => onPropertyClick(p.id)} />
          ))}
          {properties.length === 0 && (
            <div className="flex w-full flex-col items-center py-6 text-center">
              <MapPin className="mb-2 h-8 w-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No properties found</p>
            </div>
          )}
        </div>
      )}

      {/* Expanded: vertical list */}
      {expanded && (
        <div className="overflow-y-auto px-5 pb-8" style={{ maxHeight: expandedHeight - 100 }}>
          <div className="space-y-4">
            {properties.map((p, i) => (
              <VerticalCard key={p.id} property={p} index={i} isActive={p.id === activePropertyId} onClick={() => onPropertyClick(p.id)} />
            ))}
            {properties.length === 0 && (
              <div className="flex flex-col items-center py-12 text-center">
                <MapPin className="mb-3 h-10 w-10 text-muted-foreground/30" />
                <p className="font-medium text-foreground">No properties in this area</p>
                <p className="mt-1 text-sm text-muted-foreground">Try zooming out or adjusting filters</p>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

/* ─── Horizontal Card (collapsed) ─── */
function HorizontalCard({ property: p, index, isActive, onClick }: { property: MapProperty; index: number; isActive: boolean; onClick: () => void }) {
  const img = cardImages[index % cardImages.length];
  const tag = p.tags[0];
  const badge = tag ? tagBadges[tag] || tagBadges['New'] : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={`shrink-0 w-[220px] cursor-pointer overflow-hidden rounded-2xl bg-card border transition-all active:scale-[0.97] ${
        isActive ? 'border-primary/40 shadow-lg ring-2 ring-primary/20' : 'border-border/50 shadow-sm'
      }`}
    >
      <div className="relative h-28 overflow-hidden">
        <img src={img} alt={p.name} className="h-full w-full object-cover" />
        {badge && (
          <span className={`absolute left-2 top-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm ${badge.color}`}>
            <badge.icon className="h-2.5 w-2.5" />
            {tag}
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="font-heading text-sm font-bold text-foreground leading-tight line-clamp-1">{p.price_range}</p>
        <p className="mt-0.5 text-xs text-foreground/80 line-clamp-1">{p.name}</p>
        <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
          <MapPin className="h-3 w-3" /> {p.location}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Vertical Card (expanded) ─── */
function VerticalCard({ property: p, index, isActive, onClick }: { property: MapProperty; index: number; isActive: boolean; onClick: () => void }) {
  const img = cardImages[index % cardImages.length];
  const tag = p.tags[0];
  const badge = tag ? tagBadges[tag] || tagBadges['New'] : null;
  const bedCount = p.unit_types.filter(u => u.includes('BR')).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
    >
      <Link
        to={`/property/${p.id}`}
        onClick={(e) => { e.preventDefault(); onClick(); }}
        className={`block overflow-hidden rounded-2xl bg-card border transition-all active:scale-[0.98] ${
          isActive ? 'border-primary/40 shadow-lg ring-2 ring-primary/20' : 'border-border/50 shadow-sm'
        }`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img src={img} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          {/* Price on image */}
          <div className="absolute bottom-3 left-3">
            <p className="font-heading text-lg font-bold text-white drop-shadow-lg">{p.price_range}</p>
          </div>
          {/* Badge */}
          {badge && (
            <span className={`absolute right-3 top-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md ${badge.color}`}>
              <badge.icon className="h-3 w-3" />
              {tag}
            </span>
          )}
        </div>

        <div className="p-4">
          <h4 className="font-heading text-base font-semibold text-foreground leading-tight">{p.name}</h4>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {p.location}
          </p>
          <p className="mt-1 text-xs text-muted-foreground/80">{p.developer_name}</p>

          {/* Details row */}
          <div className="mt-3 flex items-center gap-4">
            {bedCount > 0 && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <BedDouble className="h-3.5 w-3.5" /> {p.unit_types.filter(u => u.includes('BR')).join(', ')}
              </span>
            )}
            {p.completion_date !== 'Completed' && (
              <span className="ml-auto text-xs text-muted-foreground">🏗️ {p.completion_date}</span>
            )}
            {p.completion_date === 'Completed' && (
              <span className="ml-auto rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                Ready to move
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default MapBottomSheet;
