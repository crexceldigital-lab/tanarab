import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarCheck, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const timeSlots = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'];

interface Props {
  rentalTitle: string;
  trigger?: React.ReactNode;
}

const RequestTourDialog = ({ rentalTitle, trigger }: Props) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [selectedSlot, setSelectedSlot] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      toast.error('Please enter your name and phone number');
      return;
    }
    if (!date || !selectedSlot) {
      toast.error('Please select a date and time slot');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    toast.success(`Tour request sent! We'll confirm "${rentalTitle}" for ${format(date, 'MMM d')} at ${selectedSlot}.`);
    setOpen(false);
    setDate(undefined);
    setSelectedSlot('');
    setName('');
    setPhone('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="luxury" className="w-full gap-2">
            <CalendarCheck className="h-4 w-4" /> Request a Tour
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">Request a Tour</DialogTitle>
          <DialogDescription>
            Schedule a viewing for <span className="font-medium text-foreground">{rentalTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Your name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Mwangi" />
            </div>
            <div className="space-y-1.5">
              <Label>Phone number</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+255 7XX XXX XXX" />
            </div>
          </div>

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
                      ? 'border-gold-500 bg-gold-gradient text-navy-900'
                      : 'border-border bg-card text-foreground hover:bg-muted'
                  )}
                >
                  <Clock className="h-3 w-3" />
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {date && selectedSlot && (
            <div className="rounded-lg border border-gold-500/30 bg-gold-50 p-3">
              <p className="text-sm font-medium text-secondary">Tour Summary</p>
              <p className="text-xs text-muted-foreground">
                {format(date, 'EEEE, MMMM do, yyyy')} at {selectedSlot}
              </p>
            </div>
          )}

          <Button onClick={handleSubmit} disabled={loading} variant="luxury" className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Sending...' : 'Confirm Request'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestTourDialog;
