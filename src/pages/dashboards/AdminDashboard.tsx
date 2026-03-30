import DashboardLayout, { adminNav } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, Shield, AlertTriangle } from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '0', icon: <Users className="h-5 w-5 text-primary" /> },
  { label: 'Active Listings', value: '0', icon: <Building2 className="h-5 w-5 text-primary" /> },
  { label: 'Verified Developers', value: '0', icon: <Shield className="h-5 w-5 text-primary" /> },
  { label: 'Pending Approvals', value: '0', icon: <AlertTriangle className="h-5 w-5 text-accent" /> },
];

const AdminDashboard = () => (
  <DashboardLayout title="Admin Panel" navItems={adminNav}>
    <div className="mb-6">
      <h2 className="font-heading text-xl font-bold text-foreground">Admin Overview</h2>
      <p className="text-sm text-muted-foreground">Platform management and moderation</p>
    </div>

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
        <CardHeader><CardTitle className="text-lg">Pending Verifications</CardTitle></CardHeader>
        <CardContent><p className="text-sm text-muted-foreground">No pending developer or owner verifications.</p></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-lg">Recent Activity</CardTitle></CardHeader>
        <CardContent><p className="text-sm text-muted-foreground">Platform activity log will appear here.</p></CardContent>
      </Card>
    </div>
  </DashboardLayout>
);

export default AdminDashboard;
