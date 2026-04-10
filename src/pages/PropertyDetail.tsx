import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, BadgeCheck, MessageCircle, Phone, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { properties } from '@/data/mockProperties';
import { getPropertyGallery } from '@/data/propertyImages';
import BookVisitDialog from '@/components/BookVisitDialog';
import ChatDialog from '@/components/ChatDialog';
import ReportListingDialog from '@/components/ReportListingDialog';

const PropertyDetail = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-lg text-muted-foreground">Property not found</p>
          <Button className="mt-4" asChild><Link to="/properties">Back to listings</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  const gallery = getPropertyGallery(property.id);
  const whatsappUrl = `https://wa.me/255700000000?text=${encodeURIComponent(`Hi, I'm interested in ${property.title}`)}`;

  const nextImage = () => setActiveImage((prev) => (prev + 1) % gallery.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + gallery.length) % gallery.length);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <Link to="/properties" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to listings
          </Link>
          <ReportListingDialog propertyId={property.id} propertyTitle={property.title} />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-4">
              <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
                <img
                  src={gallery[activeImage]}
                  alt={`${property.title} - Image ${activeImage + 1}`}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                      {activeImage + 1} / {gallery.length}
                    </div>
                  </>
                )}
              </div>
              {gallery.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                        i === activeImage ? 'border-primary ring-1 ring-primary' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${i + 1}`} loading="lazy" width={96} height={72} className="h-16 w-20 object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant={property.status === 'completed' ? 'default' : 'secondary'} className="capitalize">
                {property.status.replace('-', ' ')}
              </Badge>
              <Badge variant="outline" className="capitalize">{property.type}</Badge>
              {property.verified && (
                <Badge className="gap-1 bg-primary text-primary-foreground">
                  <BadgeCheck className="h-3 w-3" /> Verified
                </Badge>
              )}
            </div>

            <h1 className="font-heading text-2xl font-bold text-foreground md:text-3xl">{property.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">by {property.developer}</p>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {property.location}</p>

            <div className="mt-4 flex gap-6 text-sm text-muted-foreground">
              {property.bedrooms > 0 && <span className="flex items-center gap-1"><Bed className="h-4 w-4" /> {property.bedrooms} Beds</span>}
              {property.bathrooms > 0 && <span className="flex items-center gap-1"><Bath className="h-4 w-4" /> {property.bathrooms} Baths</span>}
              <span className="flex items-center gap-1"><Maximize className="h-4 w-4" /> {property.area} m²</span>
            </div>

            <div className="mt-6">
              <h2 className="mb-2 font-heading text-lg font-semibold text-foreground">Description</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{property.description}</p>
            </div>

            <div className="mt-6">
              <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((a) => (
                  <Badge key={a} variant="secondary">{a}</Badge>
                ))}
              </div>
            </div>

            {property.completionDate && (
              <div className="mt-6">
                <h2 className="mb-2 font-heading text-lg font-semibold text-foreground">Expected Completion</h2>
                <p className="text-sm text-muted-foreground">{property.completionDate}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-xl border border-border bg-card p-6 card-elevated">
                <p className="text-sm text-muted-foreground">Starting from</p>
                <p className="font-heading text-3xl font-bold text-foreground">TZS {property.priceLabel}</p>
                {property.paymentPlan && (
                  <p className="mt-1 text-xs text-muted-foreground">{property.paymentPlan}</p>
                )}

                <div className="mt-6 flex flex-col gap-3">
                  <BookVisitDialog propertyId={property.id} propertyTitle={property.title} />
                  <Button variant="outline" className="w-full gap-2">
                    <Phone className="h-4 w-4" /> Request Info
                  </Button>
                  <ChatDialog propertyId={property.id} propertyTitle={property.title} />
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full gap-2 border-success text-success hover:bg-success hover:text-success-foreground">
                      <MessageCircle className="h-4 w-4" /> WhatsApp
                    </Button>
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-2 font-heading text-sm font-semibold text-foreground">Developer</h3>
                <p className="text-sm text-muted-foreground">{property.developer}</p>
                {property.verified && (
                  <p className="mt-2 flex items-center gap-1 text-xs text-primary"><BadgeCheck className="h-3.5 w-3.5" /> Verified Developer</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
