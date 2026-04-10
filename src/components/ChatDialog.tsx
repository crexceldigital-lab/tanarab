import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Props {
  propertyId: string;
  propertyTitle: string;
  agentId?: string;
}

interface Message {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

const quickMessages = [
  'Is this property still available?',
  'Can I schedule a visit?',
  'What are the payment terms?',
  'Can you share more photos?',
];

const ChatDialog = ({ propertyId, propertyTitle, agentId }: Props) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Find or create conversation
  useEffect(() => {
    if (!open || !user) return;
    const targetAgent = agentId || 'system';

    const findOrCreate = async () => {
      // Look for existing conversation
      const { data: existing } = await supabase
        .from('conversations')
        .select('*')
        .eq('property_id', propertyId)
        .or(`participant_one.eq.${user.id},participant_two.eq.${user.id}`)
        .limit(1)
        .maybeSingle();

      if (existing) {
        setConversationId(existing.id);
        return;
      }

      // Create new conversation
      const { data: newConv, error } = await supabase
        .from('conversations')
        .insert({
          participant_one: user.id,
          participant_two: user.id, // self-chat until agent claims
          property_id: propertyId,
        })
        .select()
        .single();

      if (error) {
        console.error('Failed to create conversation', error);
        return;
      }
      setConversationId(newConv.id);
    };

    findOrCreate();
  }, [open, user, propertyId, agentId]);

  // Load messages
  useEffect(() => {
    if (!conversationId) return;

    const loadMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (data) setMessages(data);
    };

    loadMessages();

    // Subscribe to realtime
    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!user || !conversationId || !content.trim()) return;

    setLoading(true);
    const { error } = await supabase.from('messages').insert({
      conversation_id: conversationId,
      sender_id: user.id,
      content: content.trim(),
    });

    if (error) {
      toast.error('Failed to send message');
      console.error(error);
    } else {
      setNewMessage('');
      // Update conversation last_message_at
      await supabase
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', conversationId);
    }
    setLoading(false);
  };

  if (!open) {
    return (
      <Button
        onClick={() => {
          if (!user) {
            toast.error('Please sign in to chat');
            return;
          }
          setOpen(true);
        }}
        variant="outline"
        className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
      >
        <MessageCircle className="h-4 w-4" /> Chat
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-80 flex-col rounded-xl border border-border bg-card shadow-2xl sm:w-96">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Chat</p>
          <p className="text-xs text-muted-foreground line-clamp-1">{propertyTitle}</p>
        </div>
        <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <ScrollArea className="h-72 p-3" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <MessageCircle className="h-8 w-8 text-muted-foreground/30" />
            <p className="text-center text-xs text-muted-foreground">Start the conversation</p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {quickMessages.map((qm) => (
                <button
                  key={qm}
                  onClick={() => sendMessage(qm)}
                  className="rounded-full border border-border bg-muted px-2.5 py-1 text-[10px] font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {qm}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'max-w-[80%] rounded-lg px-3 py-2 text-xs',
                  msg.sender_id === user?.id
                    ? 'ml-auto bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                )}
              >
                {msg.content}
                <p className={cn(
                  'mt-0.5 text-[9px]',
                  msg.sender_id === user?.id ? 'text-primary-foreground/60' : 'text-muted-foreground'
                )}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border p-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(newMessage);
          }}
          className="flex gap-2"
        >
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="text-xs"
            maxLength={1000}
          />
          <Button type="submit" size="icon" disabled={loading || !newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatDialog;
