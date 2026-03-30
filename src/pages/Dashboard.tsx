import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { primaryRole, userRoles, isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (!user) { navigate('/login', { replace: true }); return; }
    if (userRoles.length === 0) { navigate('/onboarding', { replace: true }); return; }

    switch (primaryRole) {
      case 'admin': navigate('/admin/dashboard', { replace: true }); break;
      case 'developer': navigate('/developer/dashboard', { replace: true }); break;
      case 'owner': navigate('/owner/dashboard', { replace: true }); break;
      default: navigate('/buyer/dashboard', { replace: true });
    }
  }, [isLoading, user, primaryRole, userRoles]);

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};

export default Dashboard;
