import property1Main from '@/assets/properties/property-1-main.jpg';
import property2Main from '@/assets/properties/property-2-main.jpg';
import property3Main from '@/assets/properties/property-3-main.jpg';
import property4Main from '@/assets/properties/property-4-main.jpg';
import property5Main from '@/assets/properties/property-5-main.jpg';
import property6Main from '@/assets/properties/property-6-main.jpg';
import interiorLiving from '@/assets/properties/interior-living.jpg';
import interiorBedroom from '@/assets/properties/interior-bedroom.jpg';
import interiorBathroom from '@/assets/properties/interior-bathroom.jpg';
import interiorKitchen from '@/assets/properties/interior-kitchen.jpg';
import amenityPool from '@/assets/properties/amenity-pool.jpg';

export const propertyImageMap: Record<string, string[]> = {
  '1': [property1Main, interiorLiving, interiorBedroom, interiorBathroom, amenityPool],
  '2': [property2Main, interiorLiving, interiorKitchen],
  '3': [property3Main, interiorLiving, interiorBedroom, interiorKitchen, interiorBathroom, amenityPool],
  '4': [property4Main, interiorBedroom, interiorLiving, interiorBathroom],
  '5': [property5Main, interiorLiving, interiorBedroom, interiorBathroom, interiorKitchen, amenityPool],
  '6': [property6Main],
};

export const getPropertyMainImage = (id: string): string => {
  return propertyImageMap[id]?.[0] || property1Main;
};

export const getPropertyGallery = (id: string): string[] => {
  return propertyImageMap[id] || [property1Main];
};
