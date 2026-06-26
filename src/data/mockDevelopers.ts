export interface Developer {
  id: string;
  name: string;
  location: string;
  city: string;
  verified: boolean;
  activeProjects: number;
  completedProjects: number;
  foundedYear: number;
  rating: number;
  description: string;
  /** Links to the matching id in mockProperties / propertyImages for representative photos */
  projectId: string;
  flagshipProject: string;
}

export const developers: Developer[] = [
  {
    id: '1',
    name: 'Masaki Developments',
    location: 'Masaki, Dar es Salaam',
    city: 'Dar es Salaam',
    verified: true,
    activeProjects: 8,
    completedProjects: 14,
    foundedYear: 2014,
    rating: 4.8,
    description: 'Premium waterfront and high-rise residential developer known for ocean-facing apartments across Masaki and the northern coastline.',
    projectId: '1',
    flagshipProject: 'Ocean View Residences',
  },
  {
    id: '2',
    name: 'TZ Urban Builders',
    location: 'Kariakoo, Dar es Salaam',
    city: 'Dar es Salaam',
    verified: true,
    activeProjects: 5,
    completedProjects: 9,
    foundedYear: 2017,
    rating: 4.5,
    description: 'Commercial and mixed-use specialist delivering modern office towers and retail space in Dar es Salaam\'s busiest business districts.',
    projectId: '2',
    flagshipProject: 'Kariakoo Business Tower',
  },
  {
    id: '3',
    name: 'Coastal Living TZ',
    location: 'Mbezi Beach, Dar es Salaam',
    city: 'Dar es Salaam',
    verified: true,
    activeProjects: 12,
    completedProjects: 21,
    foundedYear: 2011,
    rating: 4.9,
    description: 'Tanzania\'s leading villa and beachfront community builder, with a portfolio spanning Mbezi Beach to Bagamoyo Road.',
    projectId: '3',
    flagshipProject: 'Mbezi Beach Villas',
  },
  {
    id: '4',
    name: 'Northern Highlands Dev',
    location: 'Njiro, Arusha',
    city: 'Arusha',
    verified: false,
    activeProjects: 3,
    completedProjects: 4,
    foundedYear: 2020,
    rating: 4.2,
    description: 'Emerging Arusha-based developer building contemporary apartments with views of Mount Meru, currently in verification.',
    projectId: '4',
    flagshipProject: 'Arusha Heights',
  },
  {
    id: '5',
    name: 'Spice Island Properties',
    location: 'Stone Town, Zanzibar',
    city: 'Zanzibar',
    verified: true,
    activeProjects: 6,
    completedProjects: 11,
    foundedYear: 2015,
    rating: 4.7,
    description: 'Boutique luxury developer specializing in heritage-sensitive renovations and waterfront penthouses across Stone Town.',
    projectId: '5',
    flagshipProject: 'Zanzibar Waterfront Penthouse',
  },
  {
    id: '6',
    name: 'Capital City Estates',
    location: 'Dodoma CBD, Dodoma',
    city: 'Dodoma',
    verified: true,
    activeProjects: 4,
    completedProjects: 7,
    foundedYear: 2018,
    rating: 4.4,
    description: 'Land and plot specialist supporting Dodoma\'s growth as Tanzania\'s capital, with clean titles and utility-ready plots.',
    projectId: '6',
    flagshipProject: 'Dodoma Central Plots',
  },
];
