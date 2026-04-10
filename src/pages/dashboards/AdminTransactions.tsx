import { useState, useEffect } from 'react';
import DashboardLayout, { adminNav } from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Transaction {
  id: string;
  user_id: string;
  property_id: string | null;
  amount: number;
  currency: string;
  payment_type: string;
  status: string;
  escrow_status: string | null;
  reference: string | null;
  created_at: string;
}

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setTransactions(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <DashboardLayout title="Transactions" navItems={adminNav}>
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-foreground">All Transactions</h2>
        <p className="text-sm text-muted-foreground">Monitor all payments across the platform</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : transactions.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-sm text-muted-foreground">No transactions yet</CardContent></Card>
      ) : (
        <div className="grid gap-4">
          {transactions.map((t) => (
            <Card key={t.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-semibold text-foreground capitalize">{t.payment_type.replace('_', ' ')}</p>
                  <p className="text-xs text-muted-foreground">
                    User: {t.user_id.slice(0, 8)}... • {new Date(t.created_at).toLocaleDateString()}
                  </p>
                  {t.escrow_status && <Badge variant="outline" className="mt-1 capitalize">{t.escrow_status}</Badge>}
                </div>
                <div className="text-right">
                  <p className="font-heading text-sm font-bold text-foreground">{t.currency} {t.amount.toLocaleString()}</p>
                  <Badge className="capitalize">{t.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminTransactions;
