import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Building, Search, MapPin, Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cities } from '@/data/mockProperties';
import PropertyTypeFilter from '@/components/filters/PropertyTypeFilter';
import PriceRangeFilter from '@/components/filters/PriceRangeFilter';
import GoldDivider from '@/components/GoldDivider';
import heroBg from '@/assets/hero-bg.jpg';

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
    <section className="relative overflow-hidden pb-20 pt-16 md:pb-28 md:pt-20">
      {/* Background photo + navy editorial overlay */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-gradient opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-navy-900/70" />
      </div>

      {/* Decorative gold glows */}
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 h-[28rem] w-[28rem] rounded-full bg-gold-500/5 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="eyebrow justify-center text-gold-300">
            <Globe2 className="h-3.5 w-3.5" />
            Tanzania &middot; East Africa &middot; The Gulf
          </div>
          <GoldDivider light className="mt-3" />
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] text-white md:text-5xl lg:text-6xl">
            Find Your Place Between{' '}
            <span className="text-transparent bg-clip-text bg-gold-gradient">Tanzania &amp; the Gulf</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/70 md:text-lg">
            Verified projects, flexible payment plans, and trusted developers — bridging East Africa's
            fastest-growing property market with Gulf-based investors and diaspora buyers.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-10 max-w-4xl"
        >
          <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-card/95 p-4 shadow-luxury backdrop-blur-xl sm:flex-row sm:flex-wrap sm:items-center">
            {/* City */}
            <div className="flex flex-1 min-w-[160px] items-center gap-2 rounded-xl border border-border bg-background px-4 py-3">
              <MapPin className="h-4 w-4 text-gold-500" />
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

            <Button onClick={handleSearch} size="lg" variant="luxury" className="gap-2 rounded-xl px-8">
              <Search className="h-4 w-4" /> Search
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-14 grid max-w-2xl grid-cols-3 divide-x divide-white/10"
        >
          {[
            { icon: Building, label: 'Properties', value: '500+' },
            { icon: Shield, label: 'Verified Devs', value: '80+' },
            { icon: Globe2, label: 'Markets', value: 'TZ & UAE' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1.5 px-4 text-center">
              <s.icon className="h-5 w-5 text-gold-400" />
              <span className="font-display text-2xl font-semibold text-white">{s.value}</span>
              <span className="text-xs uppercase tracking-wide text-white/50">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
