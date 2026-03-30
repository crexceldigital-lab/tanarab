import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Mail, Lock, User, Phone, Briefcase, Eye, EyeOff, Loader2, ArrowRight, ArrowLeft, ShoppingCart, Home, HardHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];

const roleOptions: { role: AppRole; label: string; desc: string; icon: React.ReactNode }[] = [
  { role: 'user', label: 'Buy / Invest', desc: 'Browse properties and invest in real estate', icon: <ShoppingCart className="h-6 w-6" /> },
  { role: 'owner', label: 'List My Property', desc: 'List and manage your properties for sale', icon: <Home className="h-6 w-6" /> },
  { role: 'developer', label: 'Manage Projects', desc: 'Showcase developments and manage units', icon: <HardHat className="h-6 w-6" /> },
];

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<AppRole>('user');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: fullName, phone },
      },
    });

    if (error) { toast.error(error.message); setLoading(false); return; }

    if (data.user) {
      // Update profile with extra info
      await supabase.from('profiles').update({ company_name: companyName || null, phone }).eq('user_id', data.user.id);
      // Insert role
      await supabase.from('user_roles').insert({ user_id: data.user.id, role: selectedRole, verification_status: selectedRole === 'user' ? 'approved' : 'pending' });

      toast.success('Account created! Check your email to verify.');
      navigate('/dashboard');
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth('google', {
      redirect_uri: window.location.origin + '/onboarding',
    });
    if (result.error) {
      toast.error(result.error.message || 'Google sign-up failed');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden w-1/2 items-center justify-center bg-primary p-12 lg:flex">
        <div className="max-w-md text-primary-foreground">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/20">
              <Building2 className="h-7 w-7" />
            </div>
            <span className="font-heading text-3xl font-bold">PropTZ</span>
          </div>
          <h1 className="font-heading text-4xl font-bold leading-tight">
            Join Tanzania's Premier Real Estate Platform
          </h1>
          <p className="mt-4 text-lg opacity-90">
            Whether you're buying, selling, or developing — PropTZ has the tools you need.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="mb-6 text-center lg:text-left">
            <Link to="/" className="mb-6 inline-flex items-center gap-2 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl font-bold text-foreground">PropTZ</span>
            </Link>
            <h2 className="font-heading text-2xl font-bold text-foreground">Create your account</h2>
            <p className="mt-1 text-sm text-muted-foreground">Step {step} of 3</p>
            {/* Progress bar */}
            <div className="mt-3 flex gap-1">
              {[1, 2, 3].map(s => (
                <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? 'bg-primary' : 'bg-border'}`} />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="mb-4 text-sm font-medium text-foreground">What are you here for?</p>
                <div className="space-y-3">
                  {roleOptions.map(opt => (
                    <button
                      key={opt.role}
                      onClick={() => setSelectedRole(opt.role)}
                      className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                        selectedRole === opt.role ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                        selectedRole === opt.role ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {opt.icon}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{opt.label}</p>
                        <p className="text-sm text-muted-foreground">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <Button className="mt-6 w-full gap-2" onClick={() => setStep(2)}>
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="mb-4 text-sm font-medium text-foreground">Tell us about yourself</p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Full name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="John Doe" value={fullName} onChange={e => setFullName(e.target.value)} className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Phone number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="+255 7XX XXX XXX" value={phone} onChange={e => setPhone(e.target.value)} className="pl-10" />
                    </div>
                  </div>
                  {(selectedRole === 'developer' || selectedRole === 'owner') && (
                    <div className="space-y-2">
                      <Label>Company name {selectedRole === 'owner' && '(optional)'}</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Your company" value={companyName} onChange={e => setCompanyName(e.target.value)} className="pl-10" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="gap-1"><ArrowLeft className="h-4 w-4" /> Back</Button>
                  <Button className="flex-1 gap-2" onClick={() => { if (!fullName.trim()) { toast.error('Please enter your name'); return; } setStep(3); }}>
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <Button variant="outline" className="mb-4 w-full gap-2" onClick={handleGoogleSignup} disabled={loading}>
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Sign up with Google
                </Button>
                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center text-xs"><span className="bg-background px-2 text-muted-foreground">or with email</span></div>
                </div>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input type={showPassword ? 'text' : 'password'} placeholder="Min. 6 characters" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-10" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="gap-1"><ArrowLeft className="h-4 w-4" /> Back</Button>
                    <Button type="submit" className="flex-1" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create Account
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
