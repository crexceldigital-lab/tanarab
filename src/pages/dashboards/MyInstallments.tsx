import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout, { buyerNav } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, Receipt } from 'lucide-react';

interface Installment {
  id: string;
  property_id: string;
  installment_number: number;
  total_installments: number;
  amount: number;
  due_date: string;
  paid_date: string | null;
  status: string;
}

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'secondary',
  paid: 'default',
  overdue: 'destructive',
  cancelled: 'outline',
};

const MyInstallments = () => {
  const { user } = useAuth();
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from('installments')
        .select('*')
        .eq('user_id', user.id)
        .order('due_date', { ascending: true });
      if (data) setInstallments(data);
      setLoading(false);
    };
    load();
  }, [user]);

  // Group by property
  const grouped = installments.reduce((acc, inst) => {
    if (!acc[inst.property_id]) acc[inst.property_id] = [];
    acc[inst.property_id].push(inst);
    return acc;
  }, {} as Record<string, Installment[]>);

  return (
    <DashboardLayout title="My Installments" navItems={buyerNav}>
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-foreground">Installment Plans</h2>
        <p className="text-sm text-muted-foreground">Track your monthly payment installments</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : Object.keys(grouped).length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-12">
            <Receipt className="h-10 w-10 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">No installment plans yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {Object.entries(grouped).map(([propId, items]) => {
            const paid = items.filter((i) => i.status === 'paid').length;
            const total = items[0].total_installments;
            const progress = Math.round((paid / total) * 100);

            return (
              <Card key={propId}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Property #{propId}</CardTitle>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{paid} of {total} paid</span>
                    <Progress value={progress} className="h-2 flex-1" />
                    <span>{progress}%</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {items.map((inst) => (
                    <div key={inst.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Installment #{inst.installment_number}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Due: {new Date(inst.due_date).toLocaleDateString()}
                          {inst.paid_date && ` • Paid: ${new Date(inst.paid_date).toLocaleDateString()}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-foreground">TZS {inst.amount.toLocaleString()}</p>
                        <Badge variant={statusVariant[inst.status] || 'secondary'} className="capitalize">
                          {inst.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyInstallments;
