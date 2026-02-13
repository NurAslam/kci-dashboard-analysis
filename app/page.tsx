"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { MetricCard } from "@/components/metric-card";
import { FeatureAnalysisCard } from "@/components/feature-analysis-card";
import { OperationalEfficiencyTab } from "@/components/tabs/operational-efficiency";
import { DemografiTab } from "@/components/tabs/demografi";
import { SegmentasiPerjalananTab } from "@/components/tabs/segmentasi-perjalanan";
import { SegmentasiLoyaltasTab } from "@/components/tabs/segmentasi-loyaltas";
import { KorelasiPerilakuTab } from "@/components/tabs/korelasi-perilaku";
import { fetchAllData, checkApiHealth } from "@/lib/api";
import { DashboardData } from "@/lib/types";
import { Activity, AlertCircle, TrainIcon, Calendar } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [featureAnalysis, setFeatureAnalysis] = useState<{ totalTenant: number; available: number; reserved: number; occupied: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [nestedActiveTab, setNestedActiveTab] = useState("efisiensi");
  const [apiConnected, setApiConnected] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      // Check API health
      const isHealthy = await checkApiHealth();
      setApiConnected(isHealthy);

      // Fetch data
      const result = await fetchAllData(selectedDate);
      if (result.data) {
        setData(result.data);
        setFeatureAnalysis(result.featureAnalysis);
      } else {
        setError("Gagal memuat data. Pastikan API tersedia.");
      }

      setLoading(false);
    };

    loadData();
  }, [selectedDate]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <TrainIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">KCI Stasiun BNI City</h1>
                <p className="text-sm text-muted-foreground">Behavior Analysis Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {apiConnected ? (
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Connected
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-1.5 rounded-full">
                  <AlertCircle className="h-4 w-4" />
                  Disconnected
                </div>
              )}
              <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-muted border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </label>
                {data && (
                  <div className="text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                    {formatDate(data.tanggal)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          // Loading Skeleton
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 animate-pulse" />
              <p className="text-muted-foreground">Memuat data...</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-[350px]" />
              <Skeleton className="h-[350px]" />
            </div>
          </div>
        ) : data ? (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Overview - Semua Kategori</h2>
                <p className="text-sm text-muted-foreground">Ringkasan metrik utama dari seluruh kategori analisis</p>
              </div>

              {/* Dashboard Summary Metrics - Reduced to 3 cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <MetricCard
                  label={data.dashboard_summary.total_penumpang_unik.label}
                  value={data.dashboard_summary.total_penumpang_unik.nilai}
                  delta={data.dashboard_summary.total_penumpang_unik.delta}
                  description={data.dashboard_summary.total_penumpang_unik.deskripsi}
                />
                <MetricCard
                  label={data.dashboard_summary.gate_tersibuk.label}
                  value={data.dashboard_summary.gate_tersibuk.nilai}
                  delta={data.dashboard_summary.gate_tersibuk.delta}
                  description={data.dashboard_summary.gate_tersibuk.deskripsi}
                />
                <MetricCard
                  label={data.dashboard_summary.rata_rata_usia.label}
                  value={data.dashboard_summary.rata_rata_usia.nilai}
                  delta={data.dashboard_summary.rata_rata_usia.delta}
                  description={data.dashboard_summary.rata_rata_usia.deskripsi}
                />
              </div>

              {/* Feature Analysis Card */}
              {featureAnalysis && (
                <FeatureAnalysisCard data={featureAnalysis} />
              )}

              {/* Nested Tabs for Categories */}
              <Tabs value={nestedActiveTab} onValueChange={setNestedActiveTab}>
                <TabsList className="w-full justify-start bg-muted/30 p-1">
                  <TabsTrigger value="efisiensi">1️⃣ Operational Efficiency</TabsTrigger>
                  <TabsTrigger value="demografi">2️⃣ Profil Demografi</TabsTrigger>
                  <TabsTrigger value="segmentasi">3️⃣ Segmentasi Perjalanan</TabsTrigger>
                  <TabsTrigger value="loyaltas">4️⃣ Segmentasi Loyaltas</TabsTrigger>
                  <TabsTrigger value="korelasi">5️⃣ Behavior Correlation</TabsTrigger>
                </TabsList>

                <TabsContent value="efisiensi" className="mt-6">
                  <OperationalEfficiencyTab data={data.data.efisiensi_operasional} />
                </TabsContent>
                <TabsContent value="demografi" className="mt-6">
                  <DemografiTab data={data.data.demografi} />
                </TabsContent>
                <TabsContent value="segmentasi" className="mt-6">
                  <SegmentasiPerjalananTab data={data.data.segmentasi_perjalanan} />
                </TabsContent>
                <TabsContent value="loyaltas" className="mt-6">
                  <SegmentasiLoyaltasTab data={data.data.segmentasi_loyaltas} />
                </TabsContent>
                <TabsContent value="korelasi" className="mt-6">
                  <KorelasiPerilakuTab data={data.data.korelasi_perilaku} />
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        ) : null}    
      </main>
    </div>
  );
}
