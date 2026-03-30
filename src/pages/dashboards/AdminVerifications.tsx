import { useEffect, useState } from 'react';
import DashboardLayout, { adminNav } from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Database } from '@/integrations/supabase/types';

type VerificationStatus = Database['public']['Enums']['verification_status'];
type AppRole = Database['public']['Enums']['app_role'];

interface PendingItem {
  roleId: string;
  userId: string;
  role: AppRole;
  verificationStatus: VerificationStatus;
  fullName: string | null;
  phone: string | null;
  companyName: string | null;
}

const AdminVerifications = () => {
  const [items, setItems] = useState<PendingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchPending = async () => {
    setLoading(true);
    const { data: roles, error: rErr } = await supabase
      .from('user_roles')
      .select('id, user_id, role, verification_status')
      .in('role', ['developer', 'owner']);

    if (rErr) { toast.error(rErr.message); setLoading(false); return; }

    const { data: profiles } = await supabase
      .from('profiles')
      .select('user_id, full_name, phone, company_name');

    const profileMap = new Map((profiles || []).map(p => [p.user_id, p]));

    const merged: PendingItem[] = (roles || []).map(r => {
      const p = profileMap.get(r.user_id);
      return {
        roleId: r.id,
        userId: r.user_id,
        role: r.role,
        verificationStatus: r.verification_status,
        fullName: p?.full_name || null,
        phone: p?.phone || null,
        companyName: p?.company_name || null,
      };
    });

    // Sort: pending first, then approved, then rejected
    merged.sort((a, b) => {
      const order: Record<VerificationStatus, number> = { pending: 0, approved: 1, rejected: 2 };
      return order[a.verificationStatus] - order[b.verificationStatus];
    });

    setItems(merged);
    setLoading(false);
  };

  useEffect(() => { fetchPending(); }, []);

  const handleAction = async (roleId: string, status: VerificationStatus) => {
    setActionLoading(roleId);
    const { error } = await supabase
      .from('user_roles')
      .update({ verification_status: status })
      .eq('id', roleId);
    if (error) { toast.error(error.message); } else { toast.success(`Status updated to ${status}`); }
    setActionLoading(null);
    fetchPending();
  };

  const pendingCount = items.filter(i => i.verificationStatus === 'pending').length;

  return (
    <DashboardLayout title="Admin Panel" navItems={adminNav}>
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-foreground">Verification Approvals</h2>
        <p className="text-sm text-muted-foreground">
          Review and approve developer and property owner accounts
        </p>
      </div>

      <div className="mb-4 flex gap-3">
        <Badge variant={pendingCount > 0 ? 'destructive' : 'outline'}>
          {pendingCount} pending
        </Badge>
        <Badge variant="outline">{items.length} total</Badge>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12">
            <CheckCircle className="mb-3 h-12 w-12 text-primary/30" />
            <p className="text-sm text-muted-foreground">No developer or owner accounts to review.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map(item => (
                  <TableRow key={item.roleId}>
                    <TableCell className="font-medium">{item.fullName || '—'}</TableCell>
                    <TableCell>{item.phone || '—'}</TableCell>
                    <TableCell>{item.companyName || '—'}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">{item.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.verificationStatus === 'approved' ? 'default' :
                          item.verificationStatus === 'rejected' ? 'destructive' : 'outline'
                        }
                        className="gap-1"
                      >
                        {item.verificationStatus === 'pending' && <Clock className="h-3 w-3" />}
                        {item.verificationStatus === 'approved' && <CheckCircle className="h-3 w-3" />}
                        {item.verificationStatus === 'rejected' && <XCircle className="h-3 w-3" />}
                        {item.verificationStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {item.verificationStatus !== 'approved' && (
                          <Button
                            size="sm"
                            onClick={() => handleAction(item.roleId, 'approved')}
                            disabled={actionLoading === item.roleId}
                          >
                            {actionLoading === item.roleId ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Approve'}
                          </Button>
                        )}
                        {item.verificationStatus !== 'rejected' && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleAction(item.roleId, 'rejected')}
                            disabled={actionLoading === item.roleId}
                          >
                            Reject
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default AdminVerifications;
