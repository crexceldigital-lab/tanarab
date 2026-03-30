import DashboardLayout, { buyerNav } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, CalendarCheck, Eye, ArrowRight } from 'lucide-react';

const stats = [
  { label: 'Saved Properties', value: '0', icon: <Heart className="h-5 w-5 text-primary" /> },
  { label: 'Site Visits Booked', value: '0', icon: <CalendarCheck className="h-5 w-5 text-primary" /> },
  { label: 'Properties Viewed', value: '0', icon: <Eye className="h-5 w-5 text-primary" /> },
];

const BuyerDashboard = () => {
  const { profile } = useAuth();

  return (
    <DashboardLayout title="Buyer Dashboard" navItems={buyerNav}>
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Welcome back, {profile?.full_name || 'Investor'}!
        </h2>
        <p className="text-sm text-muted-foreground">Here's your property journey overview</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(s => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">{s.icon}</div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Start Exploring</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Browse verified properties across Tanzania. Find apartments, houses, land, and commercial spaces from trusted developers.
          </p>
          <Button asChild>
            <Link to="/properties" className="gap-2">Browse Properties <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default BuyerDashboard;
