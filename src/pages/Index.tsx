import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Shield, MessageSquare, CreditCard, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import PropertyCard from '@/components/PropertyCard';
import { properties } from '@/data/mockProperties';

const featuredProperties = properties.filter((p) => p.featured).slice(0, 4);

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />

    {/* Featured listings */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">Featured Projects</h2>
            <p className="mt-2 text-sm text-muted-foreground">Hand-picked listings from verified developers</p>
          </div>
          <Button variant="ghost" className="hidden gap-1 sm:flex" asChild>
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
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Explore Properties on the Map
            </h2>
            <p className="mt-4 text-muted-foreground">
              Browse property locations across Tanzania interactively. Find projects near your preferred neighborhoods, schools, and amenities.
            </p>
            <Button size="lg" className="mt-6 gap-2" asChild>
              <Link to="/map-search"><MapPin className="h-4 w-4" /> Explore on Map</Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
          >
            <div className="aspect-video bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto h-12 w-12 text-primary" />
                <p className="mt-2 text-sm text-muted-foreground">Interactive Map Preview</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Why choose us */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center font-heading text-2xl font-bold text-foreground md:text-3xl">Why Choose PropTZ</h2>
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
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <item.icon className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Developer CTA */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-secondary p-10 text-center md:p-16">
          <h2 className="font-heading text-2xl font-bold text-secondary-foreground md:text-3xl">Are You a Developer?</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-secondary-foreground/70">
            Showcase your projects to thousands of buyers and investors across Tanzania. Get verified and start generating leads today.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link to="/developers">List Your Project</Link>
          </Button>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;
