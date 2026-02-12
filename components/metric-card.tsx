import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { InfoIcon } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: number | string;
  delta?: string;
  description?: string;
  loading?: boolean;
}

export function MetricCard({ label, value, delta, description, loading }: MetricCardProps) {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const displayValue = typeof value === "number" ? formatNumber(value) : value;

  return (
    <Card className="group relative">
      <CardContent className="p-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{displayValue}</p>
          {delta && (
            <p className="text-xs text-muted-foreground">{delta}</p>
          )}
          {description && (
            <div className="relative group/tooltip">
              <InfoIcon className="h-3 w-3 text-muted-foreground cursor-help" />
              <div className="absolute bottom-full left-0 mb-2 hidden w-48 rounded-md bg-popover p-2 text-xs shadow-md group-hover/tooltip:block z-10">
                {description}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
