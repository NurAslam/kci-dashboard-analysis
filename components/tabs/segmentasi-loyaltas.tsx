"use client";

import { SegmentasiLoyaltas } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  LoyaltySegmentChart,
  LoyaltyByOccupationChart,
} from "@/components/charts/traffic-chart";
import { Lightbulb, Settings2, TrendingUp, Award } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface SegmentasiLoyaltasTabProps {
  data: SegmentasiLoyaltas;
  loading?: boolean;
}

export function SegmentasiLoyaltasTab({ data, loading }: SegmentasiLoyaltasTabProps) {
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

  const { segmentasi_loyal, loyal_berdasarkan_pekerjaan, ringkasan, insight_ai, rekomendasi_operasional, rekomendasi_strategis } = data;

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
            <p className="text-sm text-muted-foreground">High Loyalty</p>
            <p className="text-2xl font-bold">{ringkasan.persentase_loyal_tinggi}%</p>
            <p className="text-xs text-muted-foreground">{formatNumber(ringkasan.jumlah_loyal_tinggi)} penumpang</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Loyal Workers</p>
            <p className="text-2xl font-bold">{formatNumber(ringkasan.jumlah_loyal_tinggi)}</p>
            <p className="text-xs text-muted-foreground">Penumpang sangat loyal</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Most Loyal Occupation</p>
            <p className="text-lg font-bold">{ringkasan.pekerjaan_paling_loyal}</p>
            <p className="text-xs text-muted-foreground">{ringkasan.frekuensi_loyal_tertinggi}x/minggu</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LoyaltySegmentChart data={segmentasi_loyal} />
        <LoyaltyByOccupationChart data={loyal_berdasarkan_pekerjaan} />
      </div>

      {/* AI Insights */}
      <Alert>
        <Award className="h-4 w-4" />
        <AlertTitle>Insight AI - Segmentasi Loyaltas</AlertTitle>
        <AlertDescription>
          <div className="space-y-2 mt-2">
            <p><strong>Strategi Loyal:</strong> {insight_ai.strategi_loyal}</p>
            <p><strong>Profil Loyal:</strong> {insight_ai.profil_loyal}</p>
            <p><strong>Pekerjaan Tertinggi:</strong> {insight_ai.pekerjaan_tertinggi}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
              <div className="p-2 rounded bg-muted/50">
                <p className="text-xs font-medium">High Tier:</p>
                <p className="text-xs text-muted-foreground">{insight_ai.rekomendasi_high}</p>
              </div>
              <div className="p-2 rounded bg-muted/50">
                <p className="text-xs font-medium">Medium Tier:</p>
                <p className="text-xs text-muted-foreground">{insight_ai.rekomendasi_medium}</p>
              </div>
              <div className="p-2 rounded bg-muted/50">
                <p className="text-xs font-medium">Low Tier:</p>
                <p className="text-xs text-muted-foreground">{insight_ai.rekomendasi_low}</p>
              </div>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Rekomendasi Strategis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {rekomendasi_strategis.map((rec, idx) => (
                <li key={idx} className="text-sm flex gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
