import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Building, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cities } from '@/data/mockProperties';
import PropertyTypeFilter from '@/components/filters/PropertyTypeFilter';
import PriceRangeFilter from '@/components/filters/PriceRangeFilter';

const HeroSection = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [types, setTypes] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState<number | null>(null);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (types.length > 0) params.set('type', types[0]);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-secondary pb-20 pt-16 md:pb-28 md:pt-24">
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="font-heading text-4xl font-bold leading-tight text-secondary-foreground md:text-5xl lg:text-6xl">
            Find Your Dream Property in{' '}
            <span className="text-primary">Tanzania</span>
          </h1>
          <p className="mt-5 text-lg text-secondary-foreground/70 md:text-xl">
            Explore verified projects, flexible payment plans, and top developers across East Africa's fastest-growing market.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-10 max-w-4xl"
        >
          <div className="flex flex-col gap-3 rounded-2xl bg-card p-4 shadow-lg sm:flex-row sm:flex-wrap sm:items-center">
            {/* City */}
            <div className="flex flex-1 min-w-[160px] items-center gap-2 rounded-xl border border-border bg-background px-4 py-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none text-foreground"
              >
                <option value="">Location</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <PropertyTypeFilter selected={types} onChange={setTypes} />

            {/* Price Range */}
            <PriceRangeFilter
              min={priceMin}
              max={priceMax}
              onChange={(min, max) => { setPriceMin(min); setPriceMax(max); }}
            />

            <Button onClick={handleSearch} size="lg" className="gap-2 rounded-xl px-8">
              <Search className="h-4 w-4" /> Search
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6"
        >
          {[
            { icon: Building, label: 'Properties', value: '500+' },
            { icon: Shield, label: 'Verified Devs', value: '80+' },
            { icon: TrendingUp, label: 'Cities', value: '12' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1.5 text-center">
              <s.icon className="h-5 w-5 text-primary" />
              <span className="font-heading text-2xl font-bold text-secondary-foreground">{s.value}</span>
              <span className="text-xs text-secondary-foreground/60">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
