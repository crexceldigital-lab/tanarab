import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Home, Building2, BarChart3, FileText, Settings, Users, Shield, Bell, CalendarCheck, CreditCard, Receipt, MessageCircle, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Logo from '@/components/Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
}

interface Props {
  children: React.ReactNode;
  title: string;
  navItems: NavItem[];
}

const DashboardLayout = ({ children, title, navItems }: Props) => {
  const { user, profile, primaryRole, signOut } = useAuth();
  const navigate = useNavigate();
  const initials = profile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  const verificationBadge = primaryRole && ['developer', 'owner'].includes(primaryRole) ? (
    <span className="ml-2 rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent-foreground">Pending Verification</span>
  ) : null;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <Logo size="sm" />
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-gold-50 hover:text-secondary"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-lg font-semibold text-foreground">{title}</h1>
            {verificationBadge}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5 text-muted-foreground" /></Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <Avatar className="h-8 w-8 ring-1 ring-gold-500/40">
                    <AvatarFallback className="bg-secondary text-xs text-secondary-foreground">{initials}</AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium text-foreground sm:inline">{profile?.full_name || user?.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate('/settings')}><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}><LogOut className="mr-2 h-4 w-4" /> Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

export const buyerNav: NavItem[] = [
  { label: 'Overview', to: '/buyer/dashboard', icon: <Home className="h-4 w-4" /> },
  { label: 'Saved Properties', to: '/buyer/saved', icon: <FileText className="h-4 w-4" /> },
  { label: 'My Bookings', to: '/buyer/bookings', icon: <CalendarCheck className="h-4 w-4" /> },
  { label: 'Messages', to: '/buyer/chats', icon: <MessageCircle className="h-4 w-4" /> },
  { label: 'Payments', to: '/buyer/transactions', icon: <CreditCard className="h-4 w-4" /> },
  { label: 'Installments', to: '/buyer/installments', icon: <Receipt className="h-4 w-4" /> },
  { label: 'Settings', to: '/settings', icon: <Settings className="h-4 w-4" /> },
];

export const ownerNav: NavItem[] = [
  { label: 'Overview', to: '/owner/dashboard', icon: <Home className="h-4 w-4" /> },
  { label: 'My Listings', to: '/owner/listings', icon: <FileText className="h-4 w-4" /> },
  { label: 'Inquiries', to: '/owner/inquiries', icon: <Users className="h-4 w-4" /> },
  { label: 'Analytics', to: '/owner/analytics', icon: <BarChart3 className="h-4 w-4" /> },
  { label: 'Settings', to: '/settings', icon: <Settings className="h-4 w-4" /> },
];

export const developerNav: NavItem[] = [
  { label: 'Overview', to: '/developer/dashboard', icon: <Home className="h-4 w-4" /> },
  { label: 'My Projects', to: '/developer/projects', icon: <Building2 className="h-4 w-4" /> },
  { label: 'Lead Management', to: '/developer/leads', icon: <Users className="h-4 w-4" /> },
  { label: 'Analytics', to: '/developer/analytics', icon: <BarChart3 className="h-4 w-4" /> },
  { label: 'Settings', to: '/settings', icon: <Settings className="h-4 w-4" /> },
];

export const adminNav: NavItem[] = [
  { label: 'Overview', to: '/admin/dashboard', icon: <Home className="h-4 w-4" /> },
  { label: 'Users', to: '/admin/users', icon: <Users className="h-4 w-4" /> },
  { label: 'Listings', to: '/admin/listings', icon: <FileText className="h-4 w-4" /> },
  { label: 'Verifications', to: '/admin/verifications', icon: <Shield className="h-4 w-4" /> },
  { label: 'Bookings', to: '/admin/bookings', icon: <CalendarCheck className="h-4 w-4" /> },
  { label: 'Transactions', to: '/admin/transactions', icon: <CreditCard className="h-4 w-4" /> },
  { label: 'Reports', to: '/admin/reports', icon: <Flag className="h-4 w-4" /> },
  { label: 'Settings', to: '/settings', icon: <Settings className="h-4 w-4" /> },
];
