import { useState } from 'react';
import { MapPin, BarChart3, Home, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { properties } from '@/data/mockProperties';

interface AreaStats {
  name: string;
  avgPrice: number;
  propertyCount: number;
  demandLevel: 'Low' | 'Medium' | 'High';
}

const areaData: AreaStats[] = [
  { name: 'Masaki, Dar es Salaam', avgPrice: 250000000, propertyCount: 12, demandLevel: 'High' },
  { name: 'Kariakoo, Dar es Salaam', avgPrice: 180000000, propertyCount: 8, demandLevel: 'Medium' },
  { name: 'Mbezi Beach, Dar es Salaam', avgPrice: 450000000, propertyCount: 5, demandLevel: 'High' },
  { name: 'Njiro, Arusha', avgPrice: 120000000, propertyCount: 6, demandLevel: 'Medium' },
  { name: 'Stone Town, Zanzibar', avgPrice: 680000000, propertyCount: 3, demandLevel: 'High' },
  { name: 'Dodoma CBD', avgPrice: 35000000, propertyCount: 10, demandLevel: 'Low' },
];

const demandColor = {
  Low: 'bg-muted text-muted-foreground',
  Medium: 'bg-accent/20 text-accent-foreground',
  High: 'bg-success/20 text-success',
};

const ScanAreaPanel = () => {
  const [selectedArea, setSelectedArea] = useState<AreaStats | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-lg font-semibold text-foreground">Area Intelligence</h3>
      </div>
      <p className="text-xs text-muted-foreground">Select an area to view market insights</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {areaData.map((area) => (
          <button
            key={area.name}
            onClick={() => setSelectedArea(area)}
            className={`rounded-xl border p-4 text-left transition-all ${
              selectedArea?.name === area.name
                ? 'border-primary bg-primary/5 ring-1 ring-primary'
                : 'border-border bg-card hover:bg-muted/50'
            }`}
          >
            <p className="text-sm font-semibold text-foreground">{area.name}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${demandColor[area.demandLevel]}`}>
                {area.demandLevel} demand
              </span>
              <span className="text-xs text-muted-foreground">{area.propertyCount} properties</span>
            </div>
          </button>
        ))}
      </div>

      {selectedArea && (
        <Card className="border-primary/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4 text-primary" />
              {selectedArea.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="font-heading text-lg font-bold text-foreground">
                  {(selectedArea.avgPrice / 1000000).toFixed(0)}M
                </p>
                <p className="text-[10px] text-muted-foreground">Avg. Price (TZS)</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-lg font-bold text-foreground">
                  {selectedArea.propertyCount}
                </p>
                <p className="text-[10px] text-muted-foreground">Available</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <p className="font-heading text-lg font-bold text-foreground">
                    {selectedArea.demandLevel}
                  </p>
                </div>
                <p className="text-[10px] text-muted-foreground">Demand</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ScanAreaPanel;
