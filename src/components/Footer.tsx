import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t border-border bg-muted/50">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-heading text-lg font-bold">PropTZ</span>
          </div>
          <p className="text-sm text-muted-foreground">Tanzania's trusted real estate marketplace connecting buyers, investors, and developers.</p>
        </div>
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold">Explore</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/properties" className="hover:text-foreground">Properties</Link>
            <Link to="/developers" className="hover:text-foreground">Developers</Link>
            <Link to="/about" className="hover:text-foreground">About Us</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold">Cities</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>Dar es Salaam</span><span>Arusha</span><span>Zanzibar</span><span>Dodoma</span>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-heading text-sm font-semibold">Contact</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>info@proptz.co.tz</span>
            <span>+255 700 000 000</span>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} PropTZ. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
