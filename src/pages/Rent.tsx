import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutGrid, List, Heart, ArrowUpDown, ShieldCheck, Wallet, MessageSquareText, CalendarClock,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoldDivider from '@/components/GoldDivider';
import RentalCard from '@/components/RentalCard';
import RentFilters, { type RentFilterValues } from '@/components/filters/RentFilters';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { rentals } from '@/data/mockRentals';
import heroImage from '@/assets/properties/property-3-main.jpg';

type SortKey = 'newest' | 'price-asc' | 'price-desc' | 'availability';

const SAVED_KEY = 'tanrab:saved-rentals';

const Rent = () => {
  const [filters, setFilters] = useState<RentFilterValues>({
    query: '',
    city: '',
    bedrooms: null,
    priceMin: 0,
    priceMax: null,
    furnishedOnly: false,
    petFriendlyOnly: false,
    moveInDate: undefined,
  });
  const [sortBy, setSortBy] = useState<SortKey>('newest');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());

  // Persist saved rentals locally so a visitor's shortlist survives a refresh.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SAVED_KEY);
      if (raw) setSaved(new Set(JSON.parse(raw)));
    } catch {
      // ignore malformed/unavailable storage
    }
  }, []);

  const toggleSave = (id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try { window.localStorage.setItem(SAVED_KEY, JSON.stringify([...next])); } catch { /* ignore */ }
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = rentals.filter((r) => {
      if (filters.city && r.city !== filters.city) return false;
      if (filters.bedrooms !== null) {
        if (filters.bedrooms === 4 ? r.bedrooms < 4 : r.bedrooms !== filters.bedrooms) return false;
      }
      if (filters.priceMin > 0 && r.monthlyRent < filters.priceMin) return false;
      if (filters.priceMax !== null && r.monthlyRent > filters.priceMax) return false;
      if (filters.furnishedOnly && !r.furnished) return false;
      if (filters.petFriendlyOnly && !r.petFriendly) return false;
      if (filters.moveInDate && new Date(r.availableFrom) > filters.moveInDate) return false;
      if (filters.query) {
        const q = filters.query.toLowerCase();
        if (!r.title.toLowerCase().includes(q) && !r.location.toLowerCase().includes(q) && !r.landlord.toLowerCase().includes(q)) {
          return false;
        }
      }
      if (showSavedOnly && !saved.has(r.id)) return false;
      return true;
    });

    switch (sortBy) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.monthlyRent - b.monthlyRent);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.monthlyRent - a.monthlyRent);
        break;
      case 'availability':
        list = [...list].sort((a, b) => new Date(a.availableFrom).getTime() - new Date(b.availableFrom).getTime());
        break;
      default:
        list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    }
    return list;
  }, [filters, sortBy, showSavedOnly, saved]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-hero-gradient opacity-95" />
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <span className="eyebrow justify-center text-gold-300">Move-In Ready</span>
          <GoldDivider light className="mt-3" />
          <h1 className="mt-5 font-display text-3xl font-semibold text-white md:text-5xl">
            Find Your Next Home to Rent
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Verified landlords, transparent lease terms, and flexible move-in dates across Tanzania.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <RentFilters filters={filters} onChange={setFilters} />

        {/* Toolbar: count, sort, saved, view toggle */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> rentals found
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={showSavedOnly ? 'luxury' : 'outline'}
              size="sm"
              className="gap-1.5"
              onClick={() => setShowSavedOnly((v) => !v)}
            >
              <Heart className={`h-3.5 w-3.5 ${showSavedOnly ? 'fill-navy-900' : ''}`} />
              Saved ({saved.size})
            </Button>

            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
              <SelectTrigger className="w-[170px] gap-1.5">
                <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="availability">Soonest available</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center rounded-lg border border-border p-0.5">
              <button
                onClick={() => setLayout('grid')}
                aria-label="Grid view"
                className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${layout === 'grid' ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setLayout('list')}
                aria-label="List view"
                className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${layout === 'list' ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className={`mt-6 ${layout === 'grid' ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col gap-4'}`}>
          {filtered.map((r) => (
            <RentalCard key={r.id} rental={r} isSaved={saved.has(r.id)} onToggleSave={toggleSave} layout={layout} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center text-muted-foreground">
            <p className="text-lg font-medium">No rentals match your filters</p>
            <p className="text-sm">Try adjusting your search, price range, or move-in date</p>
          </div>
        )}
      </div>

      {/* Trust strip */}
      <section className="border-t border-border bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <span className="eyebrow justify-center">Renting with TanRab</span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-foreground md:text-3xl">Built for Tenants and Landlords Alike</h2>
            <GoldDivider className="mt-4" />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, title: 'Verified Landlords', desc: 'Every landlord listing on TanRab is checked before going live.' },
              { icon: Wallet, title: 'No Hidden Fees', desc: 'Transparent monthly rent, deposit, and lease terms upfront.' },
              { icon: CalendarClock, title: 'Flexible Move-In', desc: 'Filter by move-in date and minimum lease length that suits you.' },
              { icon: MessageSquareText, title: 'Direct Contact', desc: 'Message landlords directly via WhatsApp — no middlemen.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-card p-6 card-elevated"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900">
                  <item.icon className="h-5 w-5 text-gold-400" />
                </div>
                <h3 className="mb-1.5 font-display text-base font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rent;
