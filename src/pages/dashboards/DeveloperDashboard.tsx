import DashboardLayout, { developerNav } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, Eye, Users, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const stats = [
  { label: 'Active Projects', value: '0', icon: <Building2 className="h-5 w-5 text-primary" /> },
  { label: 'Total Views', value: '0', icon: <Eye className="h-5 w-5 text-primary" /> },
  { label: 'Total Leads', value: '0', icon: <Users className="h-5 w-5 text-primary" /> },
  { label: 'Lead Conversion', value: '0%', icon: <TrendingUp className="h-5 w-5 text-primary" /> },
];

const DeveloperDashboard = () => {
  const { profile, userRoles } = useAuth();
  const devRole = userRoles.find(r => r.role === 'developer');
  const isApproved = devRole?.verification_status === 'approved';

  return (
    <DashboardLayout title="Developer Dashboard" navItems={developerNav}>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Welcome, {profile?.company_name || profile?.full_name || 'Developer'}!</h2>
          <p className="text-sm text-muted-foreground">Manage your real estate projects and leads</p>
        </div>
        <Badge variant={isApproved ? 'default' : 'secondary'}>
          {isApproved ? '✓ Verified Developer' : 'Pending Verification'}
        </Badge>
      </div>

      {!isApproved && (
        <Card className="mb-6 border-accent/50 bg-accent/5">
          <CardContent className="p-4">
            <p className="text-sm text-foreground">
              <strong>Account under review.</strong> Your developer account is being verified. You'll be able to create projects and list units once approved.
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

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-lg">Recent Leads</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">No leads yet. Leads from interested buyers will appear here.</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Project Performance</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Analytics data will be displayed once you have active projects.</p></CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DeveloperDashboard;
