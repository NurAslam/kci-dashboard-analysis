"use client";

import { KorelasiPerilaku } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AgeLoyaltyCorrelationChart,
  ZonePreferenceChart,
  GenderPerHourChart,
} from "@/components/charts/traffic-chart";
import { Lightbulb, TrendingUp } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface KorelasiPerilakuTabProps {
  data: KorelasiPerilaku;
  loading?: boolean;
}

export function KorelasiPerilakuTab({ data, loading }: KorelasiPerilakuTabProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-muted/20 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-[400px] bg-muted/20 rounded-lg animate-pulse" />
          <div className="h-[400px] bg-muted/20 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  const { korelasi_usia_loyal, preferensi_zona_pekerjaan, distribusi_gender_per_jam, ringkasan, insight_ai } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">5️⃣ Behavior Correlation</h2>
        <p className="text-sm text-muted-foreground">Analisis Korelasi Antara Variabel Penumpang</p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Korelasi Usia-Loyalty</p>
            <p className="text-2xl font-bold">{ringkasan.insight_korelasi_usia_loyal}</p>
            <p className="text-xs text-muted-foreground">Positif = usia lebih tinggi lebih loyal</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Young Avg Loyalty</p>
            <p className="text-2xl font-bold">{ringkasan.rata_loyal_muda}x/minggu</p>
            <p className="text-xs text-muted-foreground">Rata-rata loyalty penumpang muda</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Senior Avg Loyalty</p>
            <p className="text-2xl font-bold">{ringkasan.rata_loyal_senior}x/minggu</p>
            <p className="text-xs text-muted-foreground">Rata-rata loyalty penumpang senior</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Strong Zone Preference</p>
            <p className="text-2xl font-bold">{ringkasan.jumlah_preferensi_zona_kuat} pekerjaan</p>
            <p className="text-xs text-muted-foreground">Jumlah pekerjaan dengan preferensi zona kuat</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AgeLoyaltyCorrelationChart data={korelasi_usia_loyal} />
        <ZonePreferenceChart data={preferensi_zona_pekerjaan} />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <GenderPerHourChart data={distribusi_gender_per_jam} />
      </div>

      {/* AI Insights */}
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Insight AI - Behavior Correlation</AlertTitle>
        <AlertDescription>
          <div className="space-y-2 mt-2">
            <p><strong>Korelasi Usia:</strong> {insight_ai.korelasi_usia}</p>
            <p><strong>Pola Gender Waktu:</strong> {insight_ai.pola_gender_waktu}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="p-3 rounded bg-muted/50">
                <p className="text-sm font-medium">Fasilitas Pagi:</p>
                <p className="text-xs text-muted-foreground">{insight_ai.fasilitas_waktu.pagi}</p>
              </div>
              <div className="p-3 rounded bg-muted/50">
                <p className="text-sm font-medium">Fasilitas Sore:</p>
                <p className="text-xs text-muted-foreground">{insight_ai.fasilitas_waktu.sore}</p>
              </div>
            </div>
            <div className="p-3 rounded bg-muted/50 mt-2">
              <p className="text-sm font-medium">Analisis Zona:</p>
              <p className="text-xs text-muted-foreground">{insight_ai.analisis_zona.pola}</p>
              <p className="text-xs text-muted-foreground">{insight_ai.analisis_zona.rekomendasi}</p>
            </div>
            <div className="p-3 rounded bg-muted/50">
              <p className="text-sm font-medium">Rekomendasi Promosi:</p>
              <p className="text-xs text-muted-foreground"><strong>Morning:</strong> {insight_ai.rekomendasi_promosi.morning}</p>
              <p className="text-xs text-muted-foreground"><strong>Sore:</strong> {insight_ai.rekomendasi_promosi.sore}</p>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Gender Insight */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Insight Gender per Jam
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">
              <strong>Morning (06:00-11:00):</strong> Dominan {ringkasan.gender_dominan_pagi}
            </p>
            <p className="text-sm">
              <strong>Evening (16:00-19:00):</strong> Dominan {ringkasan.gender_dominan_sore}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Ini membantu KCI memahami pola perjalanan pria dan wanita untuk optimalisasi fasilitas.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
