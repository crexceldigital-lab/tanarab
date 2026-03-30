import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, BadgeCheck, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Property } from '@/data/mockProperties';
import { motion } from 'framer-motion';

const statusColor: Record<string, string> = {
  'off-plan': 'bg-accent text-accent-foreground',
  ongoing: 'bg-primary text-primary-foreground',
  completed: 'bg-success text-success-foreground',
};

const PropertyCard = ({ property }: { property: Property }) => {
  const whatsappUrl = `https://wa.me/255700000000?text=${encodeURIComponent(`Hi, I'm interested in ${property.title}`)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="card-elevated group overflow-hidden rounded-xl border border-border bg-card"
    >
      {/* Image placeholder */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
          <Building2Icon className="h-12 w-12 text-primary/30" />
        </div>
        <div className="absolute left-3 top-3 flex gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColor[property.status]}`}>
            {property.status.replace('-', ' ')}
          </span>
          {property.featured && (
            <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">Featured</span>
          )}
        </div>
        {property.verified && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
            <BadgeCheck className="h-3 w-3" /> Verified
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="font-heading text-base font-semibold leading-tight text-foreground line-clamp-1">{property.title}</h3>
        </div>
        <p className="mb-2 text-xs text-muted-foreground">{property.developer}</p>

        <div className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {property.location}
        </div>

        <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" /> {property.bedrooms}</span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" /> {property.bathrooms}</span>
          )}
          <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5" /> {property.area} m²</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="font-heading text-lg font-bold text-foreground">TZS {property.priceLabel}</p>
            {property.paymentPlan && (
              <p className="text-xs text-muted-foreground">{property.paymentPlan}</p>
            )}
          </div>
          <div className="flex gap-2">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full bg-success text-success-foreground transition-transform hover:scale-110">
              <MessageCircle className="h-4 w-4" />
            </a>
            <Button size="sm" variant="outline" asChild>
              <Link to={`/property/${property.id}`}>View</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function Building2Icon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" />
    </svg>
  );
}

export default PropertyCard;
