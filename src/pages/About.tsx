import { motion } from 'framer-motion';
import { Shield, Users, MapPin, TrendingUp, Phone, Building2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoldDivider from '@/components/GoldDivider';

const values = [
  { icon: Shield, title: 'Trust & Transparency', desc: 'Every developer and listing on our platform undergoes rigorous verification. We ensure buyers have access to accurate, up-to-date property information so they can invest with confidence.' },
  { icon: Users, title: 'Community First', desc: 'We believe real estate should be accessible to all Tanzanians. From first-time homeowners in Dar es Salaam to diaspora investors, we connect people with opportunities that match their goals.' },
  { icon: MapPin, title: 'Local Expertise', desc: 'Our team has deep knowledge of Tanzania\'s property markets — from the booming corridors of Kigamboni and Bagamoyo Road to established neighborhoods like Masaki, Mikocheni, and Mbezi Beach.' },
  { icon: TrendingUp, title: 'Market Growth', desc: 'Tanzania\'s real estate sector is one of East Africa\'s fastest-growing. With urbanization accelerating and infrastructure projects like the SGR and Ubungo Interchange, property values are set to rise significantly.' },
  { icon: Phone, title: 'Mobile-First Access', desc: 'With over 50 million mobile users in Tanzania, we\'ve built our platform to be fast, lightweight, and accessible — even on low-bandwidth connections. Integration with M-Pesa and Airtel Money makes transactions seamless.' },
  { icon: Building2, title: 'Developer Partnerships', desc: 'We work hand-in-hand with verified developers to showcase off-plan projects, ongoing constructions, and completed properties — giving buyers a transparent view of every stage of development.' },
];

const stats = [
  { value: '500+', label: 'Properties Listed' },
  { value: '50+', label: 'Verified Developers' },
  { value: '10K+', label: 'Monthly Visitors' },
  { value: '6', label: 'Cities Covered' },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="relative overflow-hidden bg-hero-gradient py-20 md:py-28">
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="container relative mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="eyebrow justify-center text-gold-300">Tanzania &middot; East Africa &middot; The Gulf</span>
          <GoldDivider light className="mt-3" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-5 font-display text-3xl font-semibold text-white md:text-5xl"
        >
          Building Tanzania's Most Trusted<br className="hidden sm:block" /> Real Estate Platform
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-white/70"
        >
          TanRab connects property buyers, investors, and verified developers across Tanzania — bringing transparency, trust, and modern technology to one of Africa's most dynamic real estate markets.
        </motion.p>
      </div>
    </section>

    {/* Stats */}
    <section className="border-b border-border py-12">
      <div className="container mx-auto grid grid-cols-2 gap-6 px-4 md:grid-cols-4">
        {stats.map((s) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <p className="font-display text-3xl font-bold text-gold-600">{s.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Mission */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl space-y-6 text-muted-foreground">
          <div>
            <span className="eyebrow">Our Mission</span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-foreground md:text-3xl">Simplifying Cross-Border Real Estate</h2>
          </div>
          <p>
            Tanzania's real estate market is booming, yet finding verified properties and trustworthy developers remains a challenge for many buyers. Scattered listings across social media, lack of standardized information, and limited transparency create friction at every step of the property journey.
          </p>
          <p>
            TanRab was created to solve this. We provide a centralized marketplace where every listing is verified, every developer is vetted, and every buyer has access to the information they need — from floor plans and payment schedules to project completion timelines and Google Maps locations.
          </p>
          <p>
            Whether you're looking for a modern apartment in Dar es Salaam's Masaki peninsula, a family home in Dodoma, commercial space in Arusha, or an off-plan investment in Kigamboni's waterfront developments, TanRab gives you the tools to search, compare, and connect directly with developers — no middlemen, no surprises.
          </p>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="border-t border-border bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <span className="eyebrow justify-center">What We Stand For</span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-foreground md:text-3xl">Our Values</h2>
          <GoldDivider className="mt-4" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-6 card-elevated"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900">
                <v.icon className="h-5 w-5 text-gold-400" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Tanzania market context */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl space-y-6 text-muted-foreground">
          <div>
            <span className="eyebrow">Market Landscape</span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-foreground md:text-3xl">Tanzania's Real Estate Landscape</h2>
          </div>
          <p>
            With a population exceeding 65 million and an urbanization rate of over 5% annually, Tanzania presents one of the most compelling real estate investment opportunities in sub-Saharan Africa. Cities like Dar es Salaam, Dodoma, Arusha, and Mwanza are experiencing rapid growth in both residential and commercial property development.
          </p>
          <p>
            Key infrastructure projects — including the Standard Gauge Railway (SGR), the Julius Nyerere Hydropower Project, and major road expansions — are opening up new corridors for property development. Areas like Kigamboni, Bagamoyo Road, and Kibaha are seeing increased developer activity as accessibility improves.
          </p>
          <p>
            The government's push toward a formal property registration system and digital land management is further boosting investor confidence. TanRab is positioning itself at the intersection of these trends — and at the intersection of Tanzania and the Gulf — providing the digital infrastructure that this evolving property market needs.
          </p>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
