import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout, { buyerNav } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarCheck, Loader2 } from 'lucide-react';

interface Visit {
  id: string;
  property_id: string;
  visit_date: string;
  time_slot: string;
  status: string;
  notes: string | null;
  created_at: string;
}

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'secondary',
  approved: 'default',
  completed: 'outline',
  cancelled: 'destructive',
};

const MyBookings = () => {
  const { user } = useAuth();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from('property_visits')
        .select('*')
        .eq('visitor_id', user.id)
        .order('created_at', { ascending: false });
      if (data) setVisits(data);
      setLoading(false);
    };
    load();
  }, [user]);

  return (
    <DashboardLayout title="My Bookings" navItems={buyerNav}>
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-foreground">Visit Bookings</h2>
        <p className="text-sm text-muted-foreground">Track your scheduled property visits</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : visits.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-12">
            <CalendarCheck className="h-10 w-10 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">No bookings yet</p>
            <Button variant="outline" asChild>
              <a href="/properties">Browse Properties</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {visits.map((v) => (
            <Card key={v.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">Property #{v.property_id}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(v.visit_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {v.time_slot}
                  </p>
                  {v.notes && <p className="mt-1 text-xs text-muted-foreground">{v.notes}</p>}
                </div>
                <Badge variant={statusVariant[v.status] || 'secondary'} className="capitalize">
                  {v.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyBookings;
