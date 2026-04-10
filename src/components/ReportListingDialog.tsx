import { useState } from 'react';
import { Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const reasons = [
  'Fraudulent listing',
  'Incorrect information',
  'Duplicate listing',
  'Inappropriate content',
  'Scam / phishing',
  'Other',
];

interface Props {
  propertyId: string;
  propertyTitle: string;
}

const ReportListingDialog = ({ propertyId, propertyTitle }: Props) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Please sign in to report a listing');
      return;
    }
    if (!reason) {
      toast.error('Please select a reason');
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('property_reports').insert({
      property_id: propertyId,
      reporter_id: user.id,
      reason,
      description: description.trim() || null,
    });

    setLoading(false);
    if (error) {
      toast.error('Failed to submit report');
      console.error(error);
    } else {
      toast.success('Report submitted. Our team will review it.');
      setOpen(false);
      setReason('');
      setDescription('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1 text-xs text-muted-foreground hover:text-destructive">
          <Flag className="h-3 w-3" /> Report Listing
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Report Listing</DialogTitle>
          <DialogDescription>
            Report <span className="font-medium text-foreground">{propertyTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Reason</label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {reasons.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Details (optional)</label>
            <Textarea
              placeholder="Provide additional details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={1000}
            />
          </div>

          <Button onClick={handleSubmit} disabled={loading || !reason} className="w-full" variant="destructive">
            {loading ? 'Submitting...' : 'Submit Report'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportListingDialog;
