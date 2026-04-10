import { useState, useEffect } from 'react';
import DashboardLayout, { adminNav } from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Flag } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Report {
  id: string;
  property_id: string;
  reporter_id: string;
  reason: string;
  description: string | null;
  status: string;
  created_at: string;
}

const AdminReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    const { data } = await supabase
      .from('property_reports')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setReports(data);
    setLoading(false);
  };

  useEffect(() => { fetchReports(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('property_reports')
      .update({ status })
      .eq('id', id);
    if (error) {
      toast.error('Failed to update');
    } else {
      toast.success(`Report ${status}`);
      fetchReports();
    }
  };

  return (
    <DashboardLayout title="Fraud Reports" navItems={adminNav}>
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-foreground">Property Reports</h2>
        <p className="text-sm text-muted-foreground">Review reported listings and fraud flags</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : reports.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-sm text-muted-foreground">No reports</CardContent></Card>
      ) : (
        <div className="grid gap-4">
          {reports.map((r) => (
            <Card key={r.id}>
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">Property #{r.property_id}</p>
                  <p className="text-xs font-medium text-destructive">{r.reason}</p>
                  {r.description && <p className="text-xs text-muted-foreground">{r.description}</p>}
                  <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="capitalize">{r.status}</Badge>
                  {r.status === 'pending' && (
                    <>
                      <Button size="sm" onClick={() => updateStatus(r.id, 'reviewing')}>Review</Button>
                      <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, 'dismissed')}>Dismiss</Button>
                    </>
                  )}
                  {r.status === 'reviewing' && (
                    <Button size="sm" onClick={() => updateStatus(r.id, 'resolved')}>Resolve</Button>
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

export default AdminReports;
