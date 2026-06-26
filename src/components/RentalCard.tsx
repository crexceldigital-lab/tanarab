import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Bed, Bath, Maximize, BadgeCheck, MessageCircle, Heart,
  Sofa, PawPrint, CalendarDays, Sparkles, Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import RequestTourDialog from '@/components/RequestTourDialog';
import type { Rental } from '@/data/mockRentals';
import { getRentalGallery } from '@/data/rentalImages';

const fmtMoney = (n: number) => n.toLocaleString('en-US');
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

interface RentalCardProps {
  rental: Rental;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  layout?: 'grid' | 'list';
}

const RentalCard = ({ rental, isSaved, onToggleSave, layout = 'grid' }: RentalCardProps) => {
  const gallery = getRentalGallery(rental.id);
  const [activeImg, setActiveImg] = useState(0);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [dialogImg, setDialogImg] = useState(0);
  const isList = layout === 'list';

  const whatsappUrl = `https://wa.me/255700000000?text=${encodeURIComponent(
    `Hi, I'm interested in renting "${rental.title}" in ${rental.location}`
  )}`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`card-elevated group overflow-hidden rounded-2xl border border-border bg-card ${isList ? 'flex flex-col sm:flex-row' : ''}`}
      >
        {/* Image with hover thumbnail swap */}
        <div className={`relative overflow-hidden bg-muted ${isList ? 'aspect-[4/3] sm:aspect-auto sm:w-72 sm:shrink-0' : 'aspect-[4/3]'}`}>
          <img
            src={gallery[activeImg]}
            alt={rental.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-gold-gradient px-2.5 py-1 text-xs font-semibold text-navy-900 shadow-sm">
              For Rent
            </span>
            {rental.isNew && (
              <span className="flex items-center gap-1 rounded-full bg-navy-900/85 px-2.5 py-1 text-xs font-medium text-gold-300 shadow-sm">
                <Sparkles className="h-3 w-3" /> New
              </span>
            )}
          </div>

          {/* Save / favorite */}
          <button
            onClick={(e) => { e.stopPropagation(); onToggleSave(rental.id); }}
            aria-label={isSaved ? 'Remove from saved' : 'Save listing'}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform hover:scale-110"
          >
            <Heart className={`h-4 w-4 ${isSaved ? 'fill-gold-500 text-gold-500' : 'text-navy-800'}`} />
          </button>

          {rental.verified && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-secondary shadow-sm">
              <BadgeCheck className="h-3 w-3 text-gold-600" /> Verified Landlord
            </div>
          )}

          {/* Thumbnail dots — click to preview a different photo */}
          {gallery.length > 1 && (
            <div className="absolute bottom-3 right-3 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveImg(i); }}
                  aria-label={`Show photo ${i + 1}`}
                  className={`h-1.5 w-1.5 rounded-full transition-all ${
                    activeImg === i ? 'w-4 bg-gold-400' : 'bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className={`p-4 ${isList ? 'flex-1' : ''}`}>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-semibold leading-tight text-foreground line-clamp-1">{rental.title}</h3>
          </div>
          <p className="mb-2 text-xs text-muted-foreground">{rental.landlord}</p>

          <div className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 text-gold-500" />
            {rental.location}
          </div>

          <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" /> {rental.bedrooms === 0 ? 'Studio' : rental.bedrooms}</span>
            <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" /> {rental.bathrooms}</span>
            <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5" /> {rental.area} m²</span>
          </div>

          {/* Quick-fact pills */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              <Sofa className="h-3 w-3" /> {rental.furnished ? 'Furnished' : 'Unfurnished'}
            </span>
            {rental.petFriendly && (
              <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                <PawPrint className="h-3 w-3" /> Pet Friendly
              </span>
            )}
            <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              Min {rental.minLeaseMonths}mo lease
            </span>
          </div>

          <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 text-gold-500" />
            Available {fmtDate(rental.availableFrom)}
          </div>

          <div className="flex items-end justify-between border-t border-border pt-3">
            <div>
              <p className="font-display text-lg font-bold text-secondary">
                {rental.currency} {fmtMoney(rental.monthlyRent)}
                <span className="text-xs font-normal text-muted-foreground">/mo</span>
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-success text-success-foreground transition-transform hover:scale-110"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <Button
                size="sm"
                variant="outline"
                className="border-gold-500/40 hover:border-gold-500 hover:bg-gold-50"
                onClick={() => { setDialogImg(activeImg); setQuickViewOpen(true); }}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick view dialog */}
      <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogTitle className="sr-only">{rental.title}</DialogTitle>
          <div className="relative -mx-6 -mt-6 aspect-[16/10] overflow-hidden sm:rounded-t-lg">
            <img src={gallery[dialogImg]} alt={rental.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent" />
            {gallery.length > 1 && (
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setDialogImg(i)}
                    className={`h-1.5 w-6 rounded-full transition-all ${dialogImg === i ? 'bg-gold-400' : 'bg-white/60'}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-semibold text-foreground">{rental.title}</h2>
                {rental.verified && <BadgeCheck className="h-4 w-4 text-gold-600" />}
              </div>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-gold-500" /> {rental.location} &middot; {rental.landlord}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">{rental.description}</p>

            <div className="grid grid-cols-3 gap-3 rounded-xl bg-muted p-4 text-center sm:grid-cols-5">
              <div>
                <p className="font-display text-base font-semibold text-foreground">{rental.bedrooms === 0 ? 'Studio' : rental.bedrooms}</p>
                <p className="text-[11px] text-muted-foreground">Beds</p>
              </div>
              <div>
                <p className="font-display text-base font-semibold text-foreground">{rental.bathrooms}</p>
                <p className="text-[11px] text-muted-foreground">Baths</p>
              </div>
              <div>
                <p className="font-display text-base font-semibold text-foreground">{rental.area}</p>
                <p className="text-[11px] text-muted-foreground">m²</p>
              </div>
              <div>
                <p className="font-display text-base font-semibold text-foreground">{rental.minLeaseMonths}mo</p>
                <p className="text-[11px] text-muted-foreground">Min Lease</p>
              </div>
              <div className="col-span-3 sm:col-span-1">
                <p className="font-display text-base font-semibold text-foreground">{rental.furnished ? 'Yes' : 'No'}</p>
                <p className="text-[11px] text-muted-foreground">Furnished</p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-foreground">Amenities</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {rental.amenities.map((a) => (
                  <span key={a} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Check className="h-3.5 w-3.5 text-gold-500" /> {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-gold-500/30 bg-gold-50 p-4">
              <div>
                <p className="font-display text-xl font-bold text-secondary">
                  {rental.currency} {fmtMoney(rental.monthlyRent)}<span className="text-sm font-normal text-muted-foreground">/mo</span>
                </p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" /> Available {fmtDate(rental.availableFrom)}
                </p>
              </div>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="navy" size="sm" className="gap-1.5">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </Button>
              </a>
            </div>

            <RequestTourDialog rentalTitle={rental.title} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RentalCard;
