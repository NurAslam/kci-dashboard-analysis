"use client";

import { EfisiensiOperasional } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  TrafficPerJamChart,
  GateUtilizationChart,
  TrafficByZoneChart,
  BalanceDirectionChart,
} from "@/components/charts/traffic-chart";
import { Lightbulb, Settings2, TrendingUp } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface OperationalEfficiencyTabProps {
  data: EfisiensiOperasional;
  loading?: boolean;
}

export function OperationalEfficiencyTab({ data, loading }: OperationalEfficiencyTabProps) {
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

  const { trafik_per_jam, penggunaan_gate, trafik_per_zona, keseimbangan_arah, ringkasan, insight_ai, rekomendasi_operasi, rekomendasi_strategis } = data;

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Transaksi</p>
            <p className="text-2xl font-bold">{formatNumber(ringkasan.transaksi_pagi)}</p>
            <p className="text-xs text-muted-foreground">Morning Peak</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Morning Peak</p>
            <p className="text-2xl font-bold">{ringkasan.persentase_pagi}%</p>
            <p className="text-xs text-muted-foreground">07:00-09:00</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Evening Peak</p>
            <p className="text-2xl font-bold">{ringkasan.persentase_sore}%</p>
            <p className="text-xs text-muted-foreground">16:00-19:00</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Busiest Gate</p>
            <p className="text-2xl font-bold">{ringkasan.gate_tertersibuk}</p>
            <p className="text-xs text-muted-foreground">Highest utilization</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrafficPerJamChart data={trafik_per_jam} />
        <GateUtilizationChart data={penggunaan_gate} />
        <TrafficByZoneChart data={trafik_per_zona} />
        <BalanceDirectionChart data={keseimbangan_arah} />
      </div>

      {/* AI Insights */}
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Insight AI</AlertTitle>
        <AlertDescription>
          <div className="space-y-2 mt-2">
            <p><strong>Analisis Detail:</strong> {insight_ai.analisis_detail}</p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm font-medium">Pola Trafik:</p>
                <p className="text-sm text-muted-foreground">{insight_ai.pola_trafik}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Keseimbangan Gate:</p>
                <p className="text-sm text-muted-foreground">{insight_ai.keseimbangan_gate}</p>
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
              Rekomendasi Operasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {rekomendasi_operasi.map((rec, idx) => (
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
