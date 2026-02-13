import { Card, CardContent } from "@/components/ui/card";
import { Building2, CheckCircle2, Clock, Users } from "lucide-react";

interface FeatureAnalysisCardProps {
  data: {
    totalTenant: number;
    available: number;
    reserved: number;
    occupied: number;
  };
}

export function FeatureAnalysisCard({ data }: FeatureAnalysisCardProps) {
  const occupancyRate = data.totalTenant > 0 ? ((data.occupied + data.reserved) / data.totalTenant * 100) : 0;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Feature Analysis</h3>
          <Building2 className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* Total Tenant */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Building2 className="h-4 w-4" />
              <span className="text-xs font-medium">Total</span>
            </div>
            <p className="text-2xl font-bold">{data.totalTenant}</p>
            <p className="text-xs text-muted-foreground mt-1">Tenant Unit</p>
          </div>

          {/* Available */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-green-600 mb-1">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs font-medium">Available</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{data.available}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {data.totalTenant > 0 ? ((data.available / data.totalTenant) * 100).toFixed(0) : 0}% dari total
            </p>
          </div>

          {/* Reserved */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-amber-600 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-medium">Reserved</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">{data.reserved}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {data.totalTenant > 0 ? ((data.reserved / data.totalTenant) * 100).toFixed(0) : 0}% dari total
            </p>
          </div>

          {/* Occupied */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs font-medium">Occupied</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{data.occupied}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {data.totalTenant > 0 ? ((data.occupied / data.totalTenant) * 100).toFixed(0) : 0}% dari total
            </p>
          </div>
        </div>

        {/* Occupancy Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Occupancy Rate</span>
            <span className="text-sm font-semibold">{occupancyRate.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${occupancyRate}%` }}
            />
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-xs text-muted-foreground">Reserved</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-xs text-muted-foreground">Occupied</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
