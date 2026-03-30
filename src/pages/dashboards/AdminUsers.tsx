import { useEffect, useState } from 'react';
import DashboardLayout, { adminNav } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Search, Shield, ShieldOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import type { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];
type VerificationStatus = Database['public']['Enums']['verification_status'];

interface UserWithRoles {
  user_id: string;
  full_name: string | null;
  phone: string | null;
  company_name: string | null;
  created_at: string;
  roles: { id: string; role: AppRole; verification_status: VerificationStatus }[];
}

const roleBadgeVariant = (role: AppRole) => {
  switch (role) {
    case 'admin': return 'destructive' as const;
    case 'developer': return 'default' as const;
    case 'owner': return 'secondary' as const;
    default: return 'outline' as const;
  }
};

const AdminUsers = () => {
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editUser, setEditUser] = useState<UserWithRoles | null>(null);
  const [newRole, setNewRole] = useState<AppRole>('user');
  const [saving, setSaving] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const { data: profiles, error: pErr } = await supabase
      .from('profiles')
      .select('user_id, full_name, phone, company_name, created_at')
      .order('created_at', { ascending: false });

    if (pErr) { toast.error(pErr.message); setLoading(false); return; }

    const { data: roles, error: rErr } = await supabase
      .from('user_roles')
      .select('id, user_id, role, verification_status');

    if (rErr) { toast.error(rErr.message); setLoading(false); return; }

    const merged: UserWithRoles[] = (profiles || []).map(p => ({
      ...p,
      roles: (roles || []).filter(r => r.user_id === p.user_id),
    }));

    setUsers(merged);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const filtered = users.filter(u =>
    !search || (u.full_name?.toLowerCase().includes(search.toLowerCase()) || u.phone?.includes(search))
  );

  const handleAddRole = async () => {
    if (!editUser) return;
    setSaving(true);
    const exists = editUser.roles.some(r => r.role === newRole);
    if (exists) { toast.error('User already has this role'); setSaving(false); return; }

    const { error } = await supabase.from('user_roles').insert({
      user_id: editUser.user_id,
      role: newRole,
      verification_status: newRole === 'user' ? 'approved' : 'pending',
    });
    if (error) { toast.error(error.message); } else { toast.success('Role added'); }
    setSaving(false);
    setEditUser(null);
    fetchUsers();
  };

  const handleRemoveRole = async (roleId: string) => {
    const { error } = await supabase.from('user_roles').delete().eq('id', roleId);
    if (error) { toast.error(error.message); } else { toast.success('Role removed'); }
    fetchUsers();
  };

  return (
    <DashboardLayout title="Admin Panel" navItems={adminNav}>
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-foreground">User Management</h2>
        <p className="text-sm text-muted-foreground">View and manage all platform users and their roles</p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by name or phone..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Badge variant="outline">{filtered.length} users</Badge>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(u => (
                  <TableRow key={u.user_id}>
                    <TableCell className="font-medium">{u.full_name || '—'}</TableCell>
                    <TableCell>{u.phone || '—'}</TableCell>
                    <TableCell>{u.company_name || '—'}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {u.roles.map(r => (
                          <Badge key={r.id} variant={roleBadgeVariant(r.role)} className="text-xs">
                            {r.role}
                            {r.verification_status !== 'approved' && ` (${r.verification_status})`}
                          </Badge>
                        ))}
                        {u.roles.length === 0 && <span className="text-xs text-muted-foreground">No role</span>}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(u.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => { setEditUser(u); setNewRole('user'); }}>
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Dialog open={!!editUser} onOpenChange={open => !open && setEditUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Roles — {editUser?.full_name || 'User'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium text-foreground">Current Roles</p>
              {editUser?.roles.length === 0 && <p className="text-sm text-muted-foreground">No roles assigned</p>}
              <div className="space-y-2">
                {editUser?.roles.map(r => (
                  <div key={r.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium capitalize">{r.role}</span>
                      <Badge variant={r.verification_status === 'approved' ? 'default' : 'secondary'} className="text-xs">
                        {r.verification_status}
                      </Badge>
                    </div>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleRemoveRole(r.id)}>
                      <ShieldOff className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-foreground">Add Role</p>
              <div className="flex gap-2">
                <Select value={newRole} onValueChange={v => setNewRole(v as AppRole)}>
                  <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User (Buyer)</SelectItem>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleAddRole} disabled={saving}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Add
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUser(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminUsers;
