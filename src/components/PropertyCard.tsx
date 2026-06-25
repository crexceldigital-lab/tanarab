import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, BadgeCheck, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Property } from '@/data/mockProperties';
import { getPropertyMainImage } from '@/data/propertyImages';
import { motion } from 'framer-motion';

const statusColor: Record<string, string> = {
  'off-plan': 'bg-navy-800 text-white',
  ongoing: 'bg-gold-gradient text-navy-900',
  completed: 'bg-success text-success-foreground',
};

const PropertyCard = ({ property }: { property: Property }) => {
  const whatsappUrl = `https://wa.me/255700000000?text=${encodeURIComponent(`Hi, I'm interested in ${property.title}`)}`;
  const mainImage = getPropertyMainImage(property.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="card-elevated group overflow-hidden rounded-2xl border border-border bg-card"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={mainImage}
          alt={property.title}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize shadow-sm ${statusColor[property.status]}`}>
            {property.status.replace('-', ' ')}
          </span>
          {property.featured && (
            <span className="rounded-full bg-card/90 px-2.5 py-1 text-xs font-semibold text-gold-600 shadow-sm">Featured</span>
          )}
        </div>
        {property.verified && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-navy-900/85 px-2 py-1 text-xs font-medium text-gold-300 shadow-sm">
            <BadgeCheck className="h-3 w-3" /> Verified
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-tight text-foreground line-clamp-1">{property.title}</h3>
        </div>
        <p className="mb-2 text-xs text-muted-foreground">{property.developer}</p>

        <div className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 text-gold-500" />
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

        <div className="flex items-end justify-between border-t border-border pt-3">
          <div>
            <p className="font-display text-lg font-bold text-secondary">TZS {property.priceLabel}</p>
            {property.paymentPlan && (
              <p className="text-xs text-muted-foreground">{property.paymentPlan}</p>
            )}
          </div>
          <div className="flex gap-2">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full bg-success text-success-foreground transition-transform hover:scale-110">
              <MessageCircle className="h-4 w-4" />
            </a>
            <Button size="sm" variant="outline" className="border-gold-500/40 hover:border-gold-500 hover:bg-gold-50" asChild>
              <Link to={`/property/${property.id}`}>View</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
