import { motion } from 'framer-motion';
import type { MapFilters } from '@/pages/MapSearch';

interface Props {
  filters: MapFilters;
  onChange: (filters: MapFilters) => void;
}

const chipOptions = [
  { label: 'House', key: 'propertyType', value: 'BR' },
  { label: 'Apartment', key: 'propertyType', value: 'Studio' },
  { label: 'Office', key: 'propertyType', value: 'Office' },
  { label: '< 100M', key: 'price', value: 'low' },
  { label: '100M–300M', key: 'price', value: 'mid' },
  { label: '300M+', key: 'price', value: 'high' },
  { label: 'Available', key: 'status', value: 'available' },
  { label: 'On Sale', key: 'status', value: 'on-sale' },
  { label: 'New', key: 'status', value: 'upcoming' },
];

const MapFilterChips = ({ filters, onChange }: Props) => {
  const isActive = (chip: typeof chipOptions[0]) => {
    if (chip.key === 'propertyType') {
      return filters.propertyTypes.includes(chip.value);
    }
    if (chip.key === 'status') {
      return filters.status === chip.value;
    }
    if (chip.key === 'price') {
      if (chip.value === 'low') return filters.priceRange[1] === 100_000_000;
      if (chip.value === 'mid') return filters.priceRange[0] === 100_000_000 && filters.priceRange[1] === 300_000_000;
      if (chip.value === 'high') return filters.priceRange[0] === 300_000_000;
    }
    return false;
  };

  const handleToggle = (chip: typeof chipOptions[0]) => {
    if (chip.key === 'propertyType') {
      const types = filters.propertyTypes.includes(chip.value)
        ? filters.propertyTypes.filter(t => t !== chip.value)
        : [...filters.propertyTypes, chip.value];
      onChange({ ...filters, propertyTypes: types });
    } else if (chip.key === 'status') {
      onChange({ ...filters, status: filters.status === chip.value ? '' : chip.value });
    } else if (chip.key === 'price') {
      const active = isActive(chip);
      if (active) {
        onChange({ ...filters, priceRange: [0, 1_000_000_000] });
      } else {
        if (chip.value === 'low') onChange({ ...filters, priceRange: [0, 100_000_000] });
        if (chip.value === 'mid') onChange({ ...filters, priceRange: [100_000_000, 300_000_000] });
        if (chip.value === 'high') onChange({ ...filters, priceRange: [300_000_000, 1_000_000_000] });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.15 }}
      className="mt-2 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-none"
    >
      {chipOptions.map((chip) => {
        const active = isActive(chip);
        return (
          <button
            key={chip.label}
            onClick={() => handleToggle(chip)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all active:scale-95 ${
              active
                ? 'bg-secondary text-secondary-foreground shadow-md'
                : 'bg-card/90 text-foreground/80 shadow-sm backdrop-blur-xl'
            }`}
          >
            {chip.label}
          </button>
        );
      })}
    </motion.div>
  );
};

export default MapFilterChips;
