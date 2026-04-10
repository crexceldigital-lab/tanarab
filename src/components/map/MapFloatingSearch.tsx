import { Search, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Props {
  query: string;
  onQueryChange: (query: string) => void;
}

const MapFloatingSearch = ({ query, onQueryChange }: Props) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="px-4 pt-3"
    >
      <div className="flex items-center gap-2">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card/95 shadow-md backdrop-blur-xl transition-transform active:scale-95"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>

        {/* Search bar */}
        <div className="flex flex-1 items-center gap-2.5 rounded-full bg-card/95 px-4 py-2.5 shadow-md backdrop-blur-xl">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search location, project, or keyword…"
            className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground/70"
          />
          {query && (
            <button
              onClick={() => onQueryChange('')}
              className="text-xs font-medium text-muted-foreground"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter icon */}
        <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card/95 shadow-md backdrop-blur-xl transition-transform active:scale-95">
          <SlidersHorizontal className="h-4.5 w-4.5 text-foreground" />
        </button>
      </div>
    </motion.div>
  );
};

export default MapFloatingSearch;
