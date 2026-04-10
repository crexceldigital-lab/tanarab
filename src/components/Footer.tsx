import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container mx-auto px-4 py-14">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight">TANA<span className="text-primary">RAB</span></span>
          </div>
          <p className="text-sm text-background/60">Tanzania's trusted real estate marketplace connecting buyers, investors, and developers.</p>
        </div>
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold">Explore</h4>
          <div className="flex flex-col gap-2 text-sm text-background/60">
            <Link to="/properties" className="hover:text-primary transition-colors">Properties</Link>
            <Link to="/developers" className="hover:text-primary transition-colors">Developers</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold">Cities</h4>
          <div className="flex flex-col gap-2 text-sm text-background/60">
            <span>Dar es Salaam</span><span>Arusha</span><span>Zanzibar</span><span>Dodoma</span>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold">Contact</h4>
          <div className="flex flex-col gap-2 text-sm text-background/60">
            <span>info@tanarab.co.tz</span>
            <span>+255 700 000 000</span>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-background/10 pt-6 text-center text-xs text-background/40">
        © {new Date().getFullYear()} TANARAB. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
