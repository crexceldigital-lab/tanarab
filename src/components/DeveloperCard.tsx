import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BadgeCheck, MapPin, ArrowRight, Star, Building2, MessageCircle, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Developer } from '@/data/mockDevelopers';
import { getPropertyGallery } from '@/data/propertyImages';

interface DeveloperCardProps {
  developer: Developer;
  index?: number;
}

const initials = (name: string) =>
  name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

const DeveloperCard = ({ developer, index = 0 }: DeveloperCardProps) => {
  const gallery = getPropertyGallery(developer.projectId);
  const [activeImg, setActiveImg] = useState(0);

  const whatsappUrl = `https://wa.me/255700000000?text=${encodeURIComponent(
    `Hi, I'd like to know more about ${developer.name}'s projects`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="card-elevated group overflow-hidden rounded-2xl border border-border bg-card"
    >
      {/* Project image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={gallery[activeImg]}
          alt={developer.flagshipProject}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/10 to-transparent" />

        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-secondary shadow-sm">
          <Building2 className="h-3 w-3 text-gold-600" /> {developer.activeProjects} active
        </div>

        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-[11px] uppercase tracking-wide text-white/60">Flagship Project</p>
          <p className="font-display text-sm font-semibold">{developer.flagshipProject}</p>
        </div>

        {/* Thumbnail dots for the project gallery */}
        {gallery.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
            {gallery.slice(0, 5).map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); setActiveImg(i); }}
                aria-label={`Show photo ${i + 1}`}
                className={`h-1.5 w-1.5 rounded-full transition-all ${activeImg === i ? 'w-4 bg-gold-400' : 'bg-white/70'}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative px-5 pb-5 pt-8">
        {/* Overlapping logo badge */}
        <div className="absolute -top-6 left-5 flex h-12 w-12 items-center justify-center rounded-xl border-4 border-card bg-navy-900 font-display text-sm font-semibold text-gold-400 shadow-md">
          {initials(developer.name)}
        </div>

        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <h3 className="font-display text-lg font-semibold text-foreground">{developer.name}</h3>
            {developer.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-gold-600" />}
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-foreground">
            <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" /> {developer.rating}
          </div>
        </div>

        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 text-gold-500" /> {developer.location}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">{developer.description}</p>

        {/* Stats row */}
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-muted p-3 text-center">
          <div>
            <p className="font-display text-sm font-semibold text-foreground">{developer.activeProjects}</p>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Active</p>
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-foreground">{developer.completedProjects}</p>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Completed</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="flex items-center gap-1 font-display text-sm font-semibold text-foreground">
              <CalendarDays className="h-3 w-3 text-gold-500" /> {developer.foundedYear}
            </p>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Founded</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground transition-transform hover:scale-110"
            aria-label={`Message ${developer.name} on WhatsApp`}
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <Button variant="outline" size="sm" className="flex-1 border-gold-500/40 hover:border-gold-500 hover:bg-gold-50" asChild>
            <Link to={`/property/${developer.projectId}`}>Flagship Project</Link>
          </Button>
          <Button size="sm" variant="luxury" className="flex-1 gap-1" asChild>
            <Link to={`/properties?developer=${encodeURIComponent(developer.name)}`}>
              All Projects <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DeveloperCard;
