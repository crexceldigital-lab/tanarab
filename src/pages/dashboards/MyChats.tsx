import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout, { buyerNav } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Conversation {
  id: string;
  property_id: string | null;
  last_message_at: string;
  created_at: string;
}

const MyChats = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from('conversations')
        .select('*')
        .or(`participant_one.eq.${user.id},participant_two.eq.${user.id}`)
        .order('last_message_at', { ascending: false });
      if (data) setConversations(data);
      setLoading(false);
    };
    load();
  }, [user]);

  return (
    <DashboardLayout title="Messages" navItems={buyerNav}>
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-foreground">My Chats</h2>
        <p className="text-sm text-muted-foreground">Your conversations with property agents</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : conversations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-12">
            <MessageCircle className="h-10 w-10 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">No conversations yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {conversations.map((c) => (
            <Card key={c.id} className="cursor-pointer transition-colors hover:bg-muted/50">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    Property #{c.property_id || 'General'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last activity: {new Date(c.last_message_at).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyChats;
