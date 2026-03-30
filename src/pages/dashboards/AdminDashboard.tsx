import { useEffect, useState } from 'react';
import DashboardLayout, { adminNav } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, Shield, AlertTriangle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, listings: 0, verified: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [profilesRes, rolesRes] = await Promise.all([
        supabase.from('profiles').select('user_id', { count: 'exact', head: true }),
        supabase.from('user_roles').select('role, verification_status'),
      ]);

      const roles = rolesRes.data || [];
      const verified = roles.filter(r => r.role === 'developer' && r.verification_status === 'approved').length;
      const pending = roles.filter(r => ['developer', 'owner'].includes(r.role) && r.verification_status === 'pending').length;

      setStats({
        users: profilesRes.count || 0,
        listings: 0,
        verified,
        pending,
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total Users', value: stats.users, icon: <Users className="h-5 w-5 text-primary" /> },
    { label: 'Active Listings', value: stats.listings, icon: <Building2 className="h-5 w-5 text-primary" /> },
    { label: 'Verified Developers', value: stats.verified, icon: <Shield className="h-5 w-5 text-primary" /> },
    { label: 'Pending Approvals', value: stats.pending, icon: <AlertTriangle className="h-5 w-5 text-accent" /> },
  ];

  return (
    <DashboardLayout title="Admin Panel" navItems={adminNav}>
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-foreground">Admin Overview</h2>
        <p className="text-sm text-muted-foreground">Platform management and moderation</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(s => (
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
              <CardContent>
                {stats.pending > 0 ? (
                  <p className="text-sm text-foreground">{stats.pending} account(s) awaiting verification. <a href="/admin/verifications" className="text-primary underline">Review now →</a></p>
                ) : (
                  <p className="text-sm text-muted-foreground">No pending verifications.</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Quick Stats</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{stats.users} registered user(s) on the platform.</p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
