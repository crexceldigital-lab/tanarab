import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Settings = () => {
  const { user, profile, userRoles, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
      setCompanyName(profile.company_name || '');
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, phone, company_name: companyName })
      .eq('user_id', user.id);

    if (error) { toast.error(error.message); }
    else { toast.success('Profile updated'); await refreshProfile(); }
    setSaving(false);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6">
          <Link to="/dashboard" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="font-heading text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your profile and account</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Profile Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email || ''} disabled className="mt-1 bg-muted" />
              </div>
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1" placeholder="+255..." />
              </div>
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" value={companyName} onChange={e => setCompanyName(e.target.value)} className="mt-1" />
              </div>
              <Button onClick={handleSave} disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Roles</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {userRoles.map((r, i) => (
                  <Badge key={i} variant="secondary" className="capitalize">
                    {r.role} — {r.verification_status}
                  </Badge>
                ))}
                {userRoles.length === 0 && <p className="text-sm text-muted-foreground">No roles assigned</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Settings;
