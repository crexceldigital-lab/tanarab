import { useState, useEffect } from 'react';
import DashboardLayout, { adminNav } from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, CalendarCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Visit {
  id: string;
  property_id: string;
  visitor_id: string;
  visit_date: string;
  time_slot: string;
  status: string;
  notes: string | null;
  created_at: string;
}

const AdminBookings = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVisits = async () => {
    const { data } = await supabase
      .from('property_visits')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setVisits(data);
    setLoading(false);
  };

  useEffect(() => { fetchVisits(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('property_visits')
      .update({ status })
      .eq('id', id);
    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success(`Visit ${status}`);
      fetchVisits();
    }
  };

  return (
    <DashboardLayout title="Manage Bookings" navItems={adminNav}>
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-foreground">Visit Bookings</h2>
        <p className="text-sm text-muted-foreground">Approve, reject, or manage property visit bookings</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : visits.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-sm text-muted-foreground">No bookings yet</CardContent></Card>
      ) : (
        <div className="grid gap-4">
          {visits.map((v) => (
            <Card key={v.id}>
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">Property #{v.property_id}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(v.visit_date).toLocaleDateString()} at {v.time_slot}
                  </p>
                  <p className="text-xs text-muted-foreground">Visitor: {v.visitor_id.slice(0, 8)}...</p>
                  {v.notes && <p className="text-xs text-muted-foreground italic">{v.notes}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="capitalize">{v.status}</Badge>
                  {v.status === 'pending' && (
                    <>
                      <Button size="sm" onClick={() => updateStatus(v.id, 'approved')}>Approve</Button>
                      <Button size="sm" variant="destructive" onClick={() => updateStatus(v.id, 'cancelled')}>Reject</Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminBookings;
