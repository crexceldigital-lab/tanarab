import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ThemeToggle from '@/components/ThemeToggle';
import Logo from '@/components/Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, profile, signOut, isLoading } = useAuth();
  const initials = profile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Buy', to: '/properties' },
    { label: 'Projects', to: '/projects' },
    { label: 'Developers', to: '/developers' },
    { label: 'Contact', to: '/about' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-border bg-card/90 shadow-[0_4px_24px_-8px_hsl(217_50%_15%/0.12)] backdrop-blur-xl'
          : 'border-transparent bg-card/60 backdrop-blur-md'
      }`}
    >
      {/* hairline gold accent */}
      <div className="h-[2px] w-full bg-gold-gradient" />

      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo size="md" />

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-secondary"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-[1.5px] w-0 bg-gold-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {!isLoading && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <Avatar className="h-8 w-8 ring-1 ring-gold-500/40">
                    <AvatarFallback className="bg-secondary text-xs text-secondary-foreground">{initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground">{profile?.full_name || user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild><Link to="/dashboard">Dashboard</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}><LogOut className="mr-2 h-4 w-4" /> Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login"><User className="mr-1.5 h-4 w-4" /> Sign In</Link>
              </Button>
              <Button size="sm" variant="luxury" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="h-6 w-6 text-secondary" /> : <Menu className="h-6 w-6 text-secondary" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-card md:hidden"
          >
            <div className="flex flex-col gap-2 p-4">
              {navLinks.map((l) => (
                <Link key={l.to} to={l.to} className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2">
                {user ? (
                  <>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => { signOut(); setMobileOpen(false); }}>Sign Out</Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/login" onClick={() => setMobileOpen(false)}>Sign In</Link>
                    </Button>
                    <Button size="sm" variant="luxury" asChild>
                      <Link to="/signup" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
