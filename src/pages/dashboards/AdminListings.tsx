import DashboardLayout, { adminNav } from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const AdminListings = () => (
  <DashboardLayout title="Admin Panel" navItems={adminNav}>
    <div className="mb-6">
      <h2 className="font-heading text-xl font-bold text-foreground">Listings Moderation</h2>
      <p className="text-sm text-muted-foreground">Review and moderate property listings across the platform</p>
    </div>

    <Card>
      <CardContent className="flex flex-col items-center py-16">
        <FileText className="mb-4 h-16 w-16 text-primary/20" />
        <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">No Listings Yet</h3>
        <p className="max-w-md text-center text-sm text-muted-foreground">
          Property listings will appear here once developers and owners start posting. You'll be able to approve, flag, or remove listings from this page.
        </p>
      </CardContent>
    </Card>
  </DashboardLayout>
);

export default AdminListings;
