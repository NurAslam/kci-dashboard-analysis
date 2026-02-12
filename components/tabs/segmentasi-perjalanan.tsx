"use client";

import { SegmentasiPerjalanan } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { OriginStationChart, DirectionDistributionChart, TimeTravelChart } from "@/components/charts/traffic-chart";
import { Lightbulb, Settings2, TrendingUp } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface SegmentasiPerjalananTabProps {
  data: SegmentasiPerjalanan;
  loading?: boolean;
}

export function SegmentasiPerjalananTab({ data, loading }: SegmentasiPerjalananTabProps) {
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

  const { distribusi_stasiun_awal, distribusi_arah, distribusi_waktu_perjalanan, ringkasan, insight_ai, rekomendasi_operasional, rekomendasi_strategis } = data;

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Transaksi</p>
            <p className="text-2xl font-bold">{formatNumber(data.total_transaksi)}</p>
            <p className="text-xs text-muted-foreground">Total transaksi hari ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Stasiun Asal Terbanyak</p>
            <p className="text-2xl font-bold">{ringkasan.stasiun_asal_terbanyak}</p>
            <p className="text-xs text-muted-foreground">{ringkasan.persentase_stasiun_asal}% dari total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Arah Dominan</p>
            <p className="text-2xl font-bold">{ringkasan.arah_dominan}</p>
            <p className="text-xs text-muted-foreground">Arah perjalanan dominan</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Segmen Waktu Dominan</p>
            <p className="text-lg font-bold">{ringkasan.segmen_waktu_dominan}</p>
            <p className="text-xs text-muted-foreground">{ringkasan.persentase_waktu_dominan}% dari total</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OriginStationChart data={distribusi_stasiun_awal} title="4.1 Distribusi Stasiun Awal" />
        <DirectionDistributionChart data={distribusi_arah} />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <TimeTravelChart data={distribusi_waktu_perjalanan} />
      </div>

      {/* AI Insights */}
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Insight AI</AlertTitle>
        <AlertDescription>
          <div className="space-y-2 mt-2">
            <p><strong>Pola Perjalanan:</strong> {insight_ai.pola_perjalanan}</p>
            <p><strong>Tipe Penumpang:</strong> {insight_ai.tipe_penumpang}</p>
            <p><strong>Rekomendasi Kapasitas:</strong> {insight_ai.rekomendasi_kapasitas}</p>
            <p><strong>Analisis Origin:</strong> {insight_ai.analisis_origin}</p>
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
