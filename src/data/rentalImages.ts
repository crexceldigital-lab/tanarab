import property1Main from '@/assets/properties/property-1-main.jpg';
import property2Main from '@/assets/properties/property-2-main.jpg';
import property3Main from '@/assets/properties/property-3-main.jpg';
import property4Main from '@/assets/properties/property-4-main.jpg';
import property5Main from '@/assets/properties/property-5-main.jpg';
import interiorLiving from '@/assets/properties/interior-living.jpg';
import interiorBedroom from '@/assets/properties/interior-bedroom.jpg';
import interiorBathroom from '@/assets/properties/interior-bathroom.jpg';
import interiorKitchen from '@/assets/properties/interior-kitchen.jpg';
import amenityPool from '@/assets/properties/amenity-pool.jpg';

export const rentalImageMap: Record<string, string[]> = {
  r1: [property1Main, interiorLiving, interiorBedroom],
  r2: [property2Main, interiorKitchen, interiorBathroom],
  r3: [property3Main, interiorLiving, amenityPool, interiorBedroom],
  r4: [property4Main, interiorBedroom, interiorLiving],
  r5: [property5Main, interiorLiving, interiorBathroom],
  r6: [amenityPool, interiorLiving, interiorKitchen],
  r7: [interiorLiving, interiorBedroom, interiorBathroom],
  r8: [interiorBedroom, interiorKitchen, interiorBathroom],
  r9: [interiorKitchen, interiorLiving, interiorBedroom],
};

export const getRentalMainImage = (id: string): string => rentalImageMap[id]?.[0] || property1Main;
export const getRentalGallery = (id: string): string[] => rentalImageMap[id] || [property1Main];
