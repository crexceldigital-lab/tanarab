import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout, { buyerNav } from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CreditCard } from 'lucide-react';

interface Transaction {
  id: string;
  property_id: string | null;
  amount: number;
  currency: string;
  payment_type: string;
  status: string;
  escrow_status: string | null;
  reference: string | null;
  created_at: string;
}

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'secondary',
  processing: 'outline',
  completed: 'default',
  failed: 'destructive',
  refunded: 'destructive',
};

const MyTransactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (data) setTransactions(data);
      setLoading(false);
    };
    load();
  }, [user]);

  const formatAmount = (amount: number, currency: string) =>
    `${currency} ${amount.toLocaleString()}`;

  return (
    <DashboardLayout title="My Payments" navItems={buyerNav}>
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-foreground">Transaction History</h2>
        <p className="text-sm text-muted-foreground">Track your payments and deposits</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : transactions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-12">
            <CreditCard className="h-10 w-10 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">No transactions yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {transactions.map((t) => (
            <Card key={t.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-semibold text-foreground capitalize">
                    {t.payment_type.replace('_', ' ')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(t.created_at).toLocaleDateString()} • {t.reference || 'No ref'}
                  </p>
                  {t.escrow_status && (
                    <Badge variant="outline" className="mt-1 text-xs capitalize">{t.escrow_status}</Badge>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-heading text-sm font-bold text-foreground">
                    {formatAmount(t.amount, t.currency)}
                  </p>
                  <Badge variant={statusVariant[t.status] || 'secondary'} className="capitalize">
                    {t.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyTransactions;
