"use client";

import { Demografi } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AgeDistributionChart,
  GenderDistributionChart,
  OccupationDistributionChart,
  OriginStationChart,
} from "@/components/charts/traffic-chart";
import { Lightbulb, Settings2 } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface DemografiTabProps {
  data: Demografi;
  loading?: boolean;
}

export function DemografiTab({ data, loading }: DemografiTabProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-muted/20 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-[350px] bg-muted/20 rounded-lg animate-pulse" />
          <div className="h-[350px] bg-muted/20 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  const { distribusi_usia, distribusi_pekerjaan, distribusi_gender, distribusi_stasiun_asal, ringkasan, insight_ai, rekomendasi_operasional } = data;

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Penumpang</p>
            <p className="text-2xl font-bold">{formatNumber(data.total_penumpang)}</p>
            <p className="text-xs text-muted-foreground">Total penumpang hari ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Rata-rata Usia</p>
            <p className="text-2xl font-bold">{ringkasan.rata_usia} thn</p>
            <p className="text-xs text-muted-foreground">Usia rata-rata penumpang</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Usia Produktif</p>
            <p className="text-2xl font-bold">{ringkasan.persentase_usia_produktif}%</p>
            <p className="text-xs text-muted-foreground">{formatNumber(ringkasan.penumpang_usia_produktif)} penumpang</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pekerja</p>
            <p className="text-2xl font-bold">{ringkasan.persentase_pekerja}%</p>
            <p className="text-xs text-muted-foreground">{formatNumber(ringkasan.penumpang_pekerja)} penumpang</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AgeDistributionChart data={distribusi_usia} />
        <GenderDistributionChart data={distribusi_gender} />
        <OccupationDistributionChart data={distribusi_pekerjaan} />
        <OriginStationChart data={distribusi_stasiun_asal} />
      </div>

      {/* AI Insights */}
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Insight AI</AlertTitle>
        <AlertDescription>
          <div className="space-y-2 mt-2">
            <p><strong>Profil Penumpang:</strong> {insight_ai.profil_penumpang}</p>
            <p><strong>Rasio Demografi:</strong> {insight_ai.rasio_demografi}</p>
            <p><strong>Stasiun Prioritas:</strong> {insight_ai.stasiun_prioritas}</p>
            <p><strong>Analisis Peluang:</strong> {insight_ai.analisis_peluang}</p>
            <p><strong>Target Promosi Utama:</strong> {insight_ai.target_promosi_utama}</p>
          </div>
        </AlertDescription>
      </Alert>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Rekomendasi Operasional
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {rekomendasi_operasional.map((rec, idx) => (
              <li key={idx} className="text-sm flex gap-2">
                <span className="text-muted-foreground">{idx + 1}.</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
