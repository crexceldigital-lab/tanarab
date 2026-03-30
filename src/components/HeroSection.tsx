import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Building } from 'lucide-react';
import SearchFilters from './SearchFilters';
import heroBg from '@/assets/hero-bg.jpg';
import SearchFilters from './SearchFilters';

const HeroSection = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ city: '', type: '', query: '' });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filters.city) params.set('city', filters.city);
    if (filters.type) params.set('type', filters.type);
    if (filters.query) params.set('q', filters.query);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img src={heroBg} alt="" className="h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
            Find Your Dream Property in{' '}
            <span className="text-gradient">Tanzania</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Explore verified listings, connect directly with developers, and invest with confidence across East Africa's fastest-growing market.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-10 max-w-4xl"
        >
          <SearchFilters filters={filters} onChange={setFilters} onSearch={handleSearch} variant="hero" />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-6"
        >
          {[
            { icon: Building, label: 'Properties', value: '500+' },
            { icon: Shield, label: 'Verified Devs', value: '80+' },
            { icon: TrendingUp, label: 'Cities', value: '12' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 text-center">
              <s.icon className="h-5 w-5 text-primary" />
              <span className="font-heading text-2xl font-bold text-foreground">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
