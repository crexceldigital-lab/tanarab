import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import Logo from '@/components/Logo';
import GoldDivider from '@/components/GoldDivider';

const Footer = () => (
  <footer className="relative overflow-hidden bg-navy-900 text-white">
    <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-gold-500/5 blur-3xl" />
    <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gold-500/5 blur-3xl" />

    <div className="container relative mx-auto px-4 py-16">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo variant="light" size="md" showTagline />
          <p className="mt-4 max-w-xs text-sm text-white/60">
            A trusted bridge between East African real estate and Gulf capital — connecting buyers,
            investors, and verified developers with clarity and confidence.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-gold-300">Explore</h4>
          <div className="flex flex-col gap-2 text-sm text-white/60">
            <Link to="/properties" className="transition-colors hover:text-gold-300">Properties</Link>
            <Link to="/developers" className="transition-colors hover:text-gold-300">Developers</Link>
            <Link to="/about" className="transition-colors hover:text-gold-300">About Us</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-gold-300">Cities</h4>
          <div className="flex flex-col gap-2 text-sm text-white/60">
            <span>Dar es Salaam</span><span>Arusha</span><span>Zanzibar</span><span>Dodoma</span>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-gold-300">Our Offices</h4>
          <div className="space-y-4 text-sm text-white/60">
            <div className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <div>
                <p className="text-white/80">Dar es Salaam, Tanzania</p>
                <p>+255 700 000 000</p>
              </div>
            </div>
            <div className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <div>
                <p className="text-white/80">Dubai, United Arab Emirates</p>
                <p>+971 52 615 1498</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-gold-400" />
              <span>hello@tanrab.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <GoldDivider light />
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-white/40 sm:flex-row">
        <span>© {new Date().getFullYear()} TanRab. All rights reserved.</span>
        <span className="italic text-white/30">Connecting East African opportunities with Gulf capital.</span>
      </div>
    </div>
  </footer>
);

export default Footer;
