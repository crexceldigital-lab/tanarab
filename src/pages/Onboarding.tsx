import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Home, HardHat, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];

const roles: { role: AppRole; label: string; desc: string; icon: React.ReactNode }[] = [
  { role: 'user', label: 'Buy / Invest', desc: 'Browse and invest in properties', icon: <ShoppingCart className="h-6 w-6" /> },
  { role: 'owner', label: 'List My Property', desc: 'List properties for sale or rent', icon: <Home className="h-6 w-6" /> },
  { role: 'developer', label: 'Manage Projects', desc: 'Showcase your developments', icon: <HardHat className="h-6 w-6" /> },
];

const Onboarding = () => {
  const { user, userRoles, isLoading } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<AppRole>('user');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) navigate('/login', { replace: true });
    if (!isLoading && userRoles.length > 0) navigate('/dashboard', { replace: true });
  }, [isLoading, user, userRoles]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from('user_roles').insert({
      user_id: user.id,
      role: selected,
      verification_status: selected === 'user' ? 'approved' : 'pending',
    });
    if (error) { toast.error(error.message); setSaving(false); return; }
    toast.success('Welcome to TANARAB!');
    navigate('/dashboard');
  };

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <h1 className="mb-2 font-heading text-2xl font-bold text-foreground">What are you here for?</h1>
        <p className="mb-6 text-sm text-muted-foreground">Choose your role to get started. You can change this later.</p>
        <div className="space-y-3">
          {roles.map(r => (
            <button
              key={r.role}
              onClick={() => setSelected(r.role)}
              className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${selected === r.role ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'}`}
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${selected === r.role ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {r.icon}
              </div>
              <div>
                <p className="font-medium text-foreground">{r.label}</p>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </div>
            </button>
          ))}
        </div>
        <Button className="mt-6 w-full" onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Get Started
        </Button>
      </motion.div>
    </div>
  );
};

export default Onboarding;
