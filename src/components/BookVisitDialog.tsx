import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM',
  '03:00 PM', '04:00 PM', '05:00 PM',
];

interface Props {
  propertyId: string;
  propertyTitle: string;
  trigger?: React.ReactNode;
}

const BookVisitDialog = ({ propertyId, propertyTitle, trigger }: Props) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [selectedSlot, setSelectedSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    if (!user) {
      toast.error('Please sign in to book a visit');
      return;
    }
    if (!date || !selectedSlot) {
      toast.error('Please select a date and time slot');
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('property_visits').insert({
      property_id: propertyId,
      visitor_id: user.id,
      visit_date: format(date, 'yyyy-MM-dd'),
      time_slot: selectedSlot,
      notes: notes.trim() || null,
    });

    setLoading(false);
    if (error) {
      toast.error('Failed to book visit. Please try again.');
      console.error(error);
    } else {
      toast.success('Visit booked successfully! You will be notified when approved.');
      setOpen(false);
      setDate(undefined);
      setSelectedSlot('');
      setNotes('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full gap-2">
            <CalendarCheck className="h-4 w-4" /> Book Site Visit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading">Book a Site Visit</DialogTitle>
          <DialogDescription>
            Schedule a visit to <span className="font-medium text-foreground">{propertyTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Date picker */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Select Date</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(d) => d < new Date()}
              className={cn('rounded-md border pointer-events-auto')}
            />
          </div>

          {/* Time slots */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Select Time</label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={cn(
                    'flex items-center justify-center gap-1 rounded-lg border px-3 py-2 text-xs font-medium transition-colors',
                    selectedSlot === slot
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-foreground hover:bg-muted'
                  )}
                >
                  <Clock className="h-3 w-3" />
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Notes (optional)</label>
            <Textarea
              placeholder="Any specific requirements or questions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={500}
            />
          </div>

          {/* Summary */}
          {date && selectedSlot && (
            <div className="rounded-lg border border-border bg-muted/50 p-3">
              <p className="text-sm font-medium text-foreground">Booking Summary</p>
              <p className="text-xs text-muted-foreground">
                {format(date, 'EEEE, MMMM do, yyyy')} at {selectedSlot}
              </p>
            </div>
          )}

          <Button onClick={handleBook} disabled={loading || !date || !selectedSlot} className="w-full">
            {loading ? 'Booking...' : 'Confirm Booking'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookVisitDialog;
