import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowUpDown, Building2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoldDivider from '@/components/GoldDivider';
import DeveloperCard from '@/components/DeveloperCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { developers } from '@/data/mockDevelopers';

type SortKey = 'projects' | 'rating' | 'name';

const cities = ['Dar es Salaam', 'Arusha', 'Zanzibar', 'Dodoma'];

const Developers = () => {
  const [query, setQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('projects');

  const filtered = useMemo(() => {
    let list = developers.filter((d) => {
      if (cityFilter && d.city !== cityFilter) return false;
      if (query && !d.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });

    switch (sortBy) {
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list = [...list].sort((a, b) => b.activeProjects - a.activeProjects);
    }
    return list;
  }, [query, cityFilter, sortBy]);

  const totalActive = developers.reduce((sum, d) => sum + d.activeProjects, 0);
  const verifiedCount = developers.filter((d) => d.verified).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero band */}
      <section className="relative overflow-hidden bg-hero-gradient py-16 md:py-20">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container relative mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="eyebrow justify-center text-gold-300">Trusted Partners</span>
            <GoldDivider light className="mt-3" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-5 font-display text-3xl font-semibold text-white md:text-5xl"
          >
            Verified Developers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-white/70"
          >
            Trusted real estate developers across Tanzania, vetted by TanRab for transparency and delivery.
          </motion.p>

          {/* Quick stats */}
          <div className="mx-auto mt-10 grid max-w-md grid-cols-3 divide-x divide-white/10">
            {[
              { label: 'Developers', value: developers.length },
              { label: 'Active Projects', value: totalActive },
              { label: 'Verified', value: verifiedCount },
            ].map((s) => (
              <div key={s.label} className="px-4 text-center">
                <p className="font-display text-2xl font-semibold text-gold-300">{s.value}</p>
                <p className="text-xs uppercase tracking-wide text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        {/* Search + sort */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 max-w-sm items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 shadow-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search developers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
            <SelectTrigger className="w-[200px] gap-1.5">
              <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="projects">Most Active Projects</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name">Name (A–Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* City pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge
            variant={cityFilter === '' ? 'default' : 'outline'}
            className={`cursor-pointer ${cityFilter === '' ? 'bg-gold-gradient text-navy-900 border-transparent' : ''}`}
            onClick={() => setCityFilter('')}
          >
            All Cities
          </Badge>
          {cities.map((c) => (
            <Badge
              key={c}
              variant={cityFilter === c ? 'default' : 'outline'}
              className={`cursor-pointer ${cityFilter === c ? 'bg-gold-gradient text-navy-900 border-transparent' : ''}`}
              onClick={() => setCityFilter(c)}
            >
              {c}
            </Badge>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">{filtered.length} developers found</p>

        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dev, i) => (
            <DeveloperCard key={dev.id} developer={dev} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center text-muted-foreground">
            <Building2 className="mx-auto mb-3 h-10 w-10 text-gold-400/60" />
            <p className="text-lg font-medium">No developers found</p>
            <p className="text-sm">Try a different search term or city</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="py-4 pb-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-hero-gradient p-10 text-center md:p-14">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
            <div className="relative">
              <span className="eyebrow justify-center text-gold-300">Become a Partner</span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-white md:text-3xl">Are You a Developer?</h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-white/70">
                Get verified, showcase your projects, and reach buyers and investors across Tanzania and the Gulf.
              </p>
              <Button size="lg" variant="luxury" className="mt-7" asChild>
                <Link to="/signup">List Your Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Developers;
