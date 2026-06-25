import { motion } from 'framer-motion';
import { ArrowRight, Shield, MessageSquare, CreditCard, MapPin, Globe2, Handshake, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import PropertyCard from '@/components/PropertyCard';
import GoldDivider from '@/components/GoldDivider';
import { properties } from '@/data/mockProperties';

const featuredProperties = properties.filter((p) => p.featured).slice(0, 4);

const bridgePoints = [
  { icon: Globe2, title: 'Cross-Border Positioning', desc: "A trusted bridge between Tanzania's growth story and Gulf-based capital." },
  { icon: LineChart, title: 'Structured Market Access', desc: 'Verified listings, transparent pricing, and clear opportunity context.' },
  { icon: Handshake, title: 'Relationship-Led Execution', desc: 'Built on coordination, trust, and long-term partnership — not transactions.' },
];

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />

    {/* Bridge positioning strip */}
    <section className="border-b border-border bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-3">
          {bridgePoints.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15">
                <b.icon className="h-5 w-5 text-gold-400" />
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold text-secondary-foreground">{b.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-secondary-foreground/60">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured listings */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="eyebrow">Hand-Picked</span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-foreground md:text-3xl">Featured Projects</h2>
            <p className="mt-2 text-sm text-muted-foreground">Curated listings from verified developers across Tanzania</p>
          </div>
          <Button variant="ghost" className="hidden gap-1 text-secondary hover:text-gold-600 sm:flex" asChild>
            <Link to="/properties">View all <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProperties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link to="/properties">View all properties</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Map Preview Section */}
    <section className="bg-muted py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow">Discover</span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-foreground md:text-3xl">
              Explore Properties on the Map
            </h2>
            <p className="mt-4 text-muted-foreground">
              Browse property locations across Tanzania interactively. Find projects near your preferred neighborhoods, schools, and amenities.
            </p>
            <Button size="lg" variant="luxury" className="mt-6 gap-2" asChild>
              <Link to="/projects"><MapPin className="h-4 w-4" /> Explore on Map</Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-luxury"
          >
            <div className="aspect-video bg-secondary flex items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto h-12 w-12 text-gold-400" />
                <p className="mt-2 text-sm text-white/60">Interactive Map Preview</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Why choose us */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="eyebrow justify-center">Why TanRab</span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-foreground md:text-3xl">Built on Trust, Not Middlemen</h2>
          <GoldDivider className="mt-4" />
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Shield, title: 'Verified Developers', desc: 'Every developer goes through a strict verification process to ensure trust and transparency.' },
            { icon: MessageSquare, title: 'Direct Communication', desc: 'Chat directly with developers via WhatsApp or in-app messaging — no middlemen.' },
            { icon: CreditCard, title: 'Payment Plans', desc: 'Flexible payment options including mobile money (M-Pesa, Airtel Money) and bank transfers.' },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-8 card-elevated"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900">
                <item.icon className="h-6 w-6 text-gold-400" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Developer CTA */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-hero-gradient p-10 text-center md:p-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
          <div className="relative">
            <span className="eyebrow justify-center text-gold-300">For Developers &amp; Partners</span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-white md:text-3xl">Are You a Developer?</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/70">
              Showcase your projects to thousands of buyers and investors across Tanzania and the Gulf. Get verified and start generating leads today.
            </p>
            <Button size="lg" variant="luxury" className="mt-8" asChild>
              <Link to="/developers">List Your Project</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;
