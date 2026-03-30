import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
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
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">Featured Properties</h2>
            <p className="mt-1 text-sm text-muted-foreground">Hand-picked listings from verified developers</p>
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
        <div className="mt-6 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link to="/properties">View all properties</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Why choose us */}
    <section className="border-t border-border bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center font-heading text-2xl font-bold text-foreground md:text-3xl">Why Choose PropTZ</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Verified Developers', desc: 'Every developer goes through a strict verification process to ensure trust and transparency.' },
            { title: 'Direct Communication', desc: 'Chat directly with developers via WhatsApp or in-app messaging — no middlemen.' },
            { title: 'Payment Plans', desc: 'Flexible payment options including mobile money (M-Pesa, Airtel Money) and bank transfers.' },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-border bg-card p-6 card-elevated"
            >
              <CheckCircle className="mb-3 h-6 w-6 text-primary" />
              <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-14">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">Are You a Developer?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm opacity-90">
            Showcase your projects to thousands of buyers and investors across Tanzania. Get verified and start generating leads today.
          </p>
          <Button size="lg" variant="secondary" className="mt-6" asChild>
            <Link to="/developers">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;
