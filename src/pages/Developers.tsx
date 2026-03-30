import { BadgeCheck, Building, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const developers = [
  { id: '1', name: 'Masaki Developments', projects: 8, verified: true, location: 'Dar es Salaam' },
  { id: '2', name: 'TZ Urban Builders', projects: 5, verified: true, location: 'Dar es Salaam' },
  { id: '3', name: 'Coastal Living TZ', projects: 12, verified: true, location: 'Dar es Salaam' },
  { id: '4', name: 'Northern Highlands Dev', projects: 3, verified: false, location: 'Arusha' },
  { id: '5', name: 'Spice Island Properties', projects: 6, verified: true, location: 'Zanzibar' },
  { id: '6', name: 'Capital City Estates', projects: 4, verified: true, location: 'Dodoma' },
];

const Developers = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 font-heading text-3xl font-bold text-foreground">Developers</h1>
      <p className="mb-8 text-muted-foreground">Trusted real estate developers across Tanzania</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {developers.map((dev, i) => (
          <motion.div
            key={dev.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card-elevated rounded-xl border border-border bg-card p-6"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <Building className="h-7 w-7 text-primary" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-lg font-semibold text-foreground">{dev.name}</h3>
              {dev.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{dev.location}</p>
            <p className="mt-1 text-xs text-muted-foreground">{dev.projects} active projects</p>
            <Button variant="ghost" size="sm" className="mt-4 gap-1" asChild>
              <Link to={`/properties?developer=${dev.name}`}>View Projects <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default Developers;
