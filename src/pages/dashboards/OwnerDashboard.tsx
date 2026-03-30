import DashboardLayout, { ownerNav } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Eye, MessageSquare, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const stats = [
  { label: 'Active Listings', value: '0', icon: <Home className="h-5 w-5 text-primary" /> },
  { label: 'Total Views', value: '0', icon: <Eye className="h-5 w-5 text-primary" /> },
  { label: 'Inquiries', value: '0', icon: <MessageSquare className="h-5 w-5 text-primary" /> },
  { label: 'Conversion Rate', value: '0%', icon: <TrendingUp className="h-5 w-5 text-primary" /> },
];

const OwnerDashboard = () => {
  const { profile, userRoles } = useAuth();
  const ownerRole = userRoles.find(r => r.role === 'owner');
  const isApproved = ownerRole?.verification_status === 'approved';

  return (
    <DashboardLayout title="Property Owner Dashboard" navItems={ownerNav}>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Welcome, {profile?.full_name || 'Owner'}!</h2>
          <p className="text-sm text-muted-foreground">Manage your property listings</p>
        </div>
        <Badge variant={isApproved ? 'default' : 'secondary'}>
          {isApproved ? '✓ Verified Owner' : 'Pending Verification'}
        </Badge>
      </div>

      {!isApproved && (
        <Card className="mb-6 border-accent/50 bg-accent/5">
          <CardContent className="p-4">
            <p className="text-sm text-foreground">
              <strong>Account under review.</strong> Your property owner account is being verified by our team. You'll be able to post listings once approved.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <CardHeader><CardTitle className="text-lg">Recent Inquiries</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No inquiries yet. Once your listings are live, buyer inquiries will appear here.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default OwnerDashboard;
