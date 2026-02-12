"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { MetricCard } from "@/components/metric-card";

// Colors matching the streamlit theme
const COLORS = [
  "#3498db", // Blue
  "#e74c3c", // Red
  "#2ecc71", // Green
  "#f39c12", // Orange
  "#9b59b6", // Purple
  "#1abc9c", // Teal
  "#34495e", // Dark Blue
  "#e67e22", // Dark Orange
];

// Traffic per Jam Chart with Peak Hour Highlights
export function TrafficPerJamChart({ data, loading }: { data?: Array<{ jam: number; jumlah: number; periode: string }>; loading?: boolean }) {
  if (loading) {
    return <div className="h-[350px] w-full bg-muted/20 rounded-lg animate-pulse" />;
  }

  if (!data || data.length === 0) {
    return <div className="h-[350px] flex items-center justify-center text-muted-foreground">No data available</div>;
  }

  // Morning peak: 7-9, Evening peak: 16-19
  const morningPeakStart = 7;
  const morningPeakEnd = 9;
  const eveningPeakStart = 16;
  const eveningPeakEnd = 19;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">1.1 Traffic per Jam</h3>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="jam" label={{ value: "Jam", position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "Jumlah Penumpang", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="jumlah"
            stroke="#1f77b4"
            fill="#1f77b4"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <ReferenceArea x1={morningPeakStart} x2={morningPeakEnd} fill="red" fillOpacity={0.1} />
          <ReferenceArea x1={eveningPeakStart} x2={eveningPeakEnd} fill="orange" fillOpacity={0.1} />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex gap-4 text-sm justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500/10 border border-red-500/30 rounded" />
          <span>Morning Peak (07:00-09:00)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500/10 border border-orange-500/30 rounded" />
          <span>Evening Peak (16:00-19:00)</span>
        </div>
      </div>
    </div>
  );
}

// Gate Utilization Chart
export function GateUtilizationChart({ data, loading }: { data?: Array<{ gate_id: string; zona: string; jumlah: number; tingkat_utilisasi: number }>; loading?: boolean }) {
  if (loading) {
    return <div className="h-[350px] w-full bg-muted/20 rounded-lg animate-pulse" />;
  }

  if (!data || data.length === 0) {
    return <div className="h-[350px] flex items-center justify-center text-muted-foreground">No data available</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">1.2 Gate Utilization</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" label={{ value: "Jumlah Penggunaan", position: "insideBottom", offset: -5 }} />
          <YAxis dataKey="gate_id" type="category" width={100} label={{ value: "Gate", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="jumlah" name="Jumlah" fill="#1f77b4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Traffic by Zone Pie Chart
export function TrafficByZoneChart({ data, loading }: { data?: Array<{ zona: string; jumlah: number; persentase: number }>; loading?: boolean }) {
  if (loading) {
    return <div className="h-[350px] w-full bg-muted/20 rounded-lg animate-pulse" />;
  }

  if (!data || data.length === 0) {
    return <div className="h-[350px] flex items-center justify-center text-muted-foreground">No data available</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">1.3 Traffic by Zone</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ zona, persentase }) => `${zona}: ${persentase}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="jumlah"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Balance Direction Chart
export function BalanceDirectionChart({ data, loading }: { data?: Array<{ zona: string; arah: string; jumlah: number; persentase: number }>; loading?: boolean }) {
  if (loading) {
    return <div className="h-[350px] w-full bg-muted/20 rounded-lg animate-pulse" />;
  }

  if (!data || data.length === 0) {
    return <div className="h-[350px] flex items-center justify-center text-muted-foreground">No data available</div>;
  }

  // Transform data for grouped bar chart
  const transformedData = data.reduce((acc, item) => {
    const existing = acc.find(d => d.zona === item.zona);
    if (existing) {
      existing[item.arah.toLowerCase()] = item.jumlah;
    } else {
      acc.push({
        zona: item.zona,
        in: item.arah === "IN" ? item.jumlah : 0,
        out: item.arah === "OUT" ? item.jumlah : 0,
      });
    }
    return acc;
  }, [] as Array<{ zona: string; in: number; out: number }>);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">1.4 Balance Direction</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={transformedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="zona" label={{ value: "Zona", position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "Jumlah", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="in" name="IN" fill="#3498db" />
          <Bar dataKey="out" name="OUT" fill="#e74c3c" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Age Distribution Chart
export function AgeDistributionChart({ data, loading }: { data?: Array<{ rentang_usia: string; jumlah: number; persentase: number }>; loading?: boolean }) {
  if (loading) {
    return <div className="h-[350px] w-full bg-muted/20 rounded-lg animate-pulse" />
  }

  if (!data || data.length === 0) {
    return <div className="h-[350px] flex items-center justify-center text-muted-foreground">No data available</div>;
  }

  const ageLabels: Record<string, string> = {
    "18-24": "18-24 (Gen Z)",
    "25-34": "25-34 (Milennial)",
    "35-44": "35-44 (Milennial)",
    "45-54": "45-54 (Gen X)",
    "55+": "≥55 (Boomer)",
  };

  const transformedData = data.map(d => ({
    ...d,
    rentang_usia: ageLabels[d.rentang_usia] || d.rentang_usia,
  }));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">3.1 Distribusi Usia</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={transformedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rentang_usia" label={{ value: "Rentang Usia", position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "Jumlah", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Bar dataKey="jumlah" name="Jumlah" fill="#1f77b4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Gender Distribution Pie Chart
export function GenderDistributionChart({ data, loading }: { data?: Array<{ gender: string; jumlah: number; persentase: number }>; loading?: boolean }) {
  if (loading) {
    return <div className="h-[350px] w-full bg-muted/20 rounded-lg animate-pulse" />
  }

  if (!data || data.length === 0) {
    return <div className="h-[350px] flex items-center justify-center text-muted-foreground">No data available</div>;
  }

  const colorMap: Record<string, string> = {
    "Pria": "#3498db",
    "Wanita": "#e74c3c",
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">3.3 Distribusi Jenis Kelamin</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ gender, persentase }) => `${gender}: ${persentase}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="jumlah"
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.gender}`} fill={colorMap[entry.gender] || COLORS[0]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Occupation Distribution Pie Chart
export function OccupationDistributionChart({ data, loading }: { data?: Array<{ pekerjaan: string; jumlah: number; persentase: number }>; loading?: boolean }) {
  if (loading) {
    return <div className="h-[350px] w-full bg-muted/20 rounded-lg animate-pulse" />
  }

  if (!data || data.length === 0) {
    return <div className="h-[350px] flex items-center justify-center text-muted-foreground">No data available</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">3.2 Distribusi Pekerjaan</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ pekerjaan, persentase }) => `${pekerjaan}: ${persentase}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="jumlah"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Origin Station Distribution Chart
export function OriginStationChart({ data, loading, title }: { data?: Array<{ stasiun: string; jumlah: number; persentase: number }>; loading?: boolean; title?: string }) {
  if (loading) {
    return <div className="h-[350px] w-full bg-muted/20 rounded-lg animate-pulse" />
  }

  if (!data || data.length === 0) {
    return <div className="h-[350px] flex items-center justify-center text-muted-foreground">No data available</div>;
  }

  const sortedData = [...data].sort((a, b) => a.jumlah - b.jumlah);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title || "3.4 Distribusi Stasiun Asal"}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={sortedData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" label={{ value: "Jumlah", position: "insideBottom", offset: -5 }} />
          <YAxis dataKey="stasiun" type="category" width={100} label={{ value: "Stasiun", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Bar dataKey="jumlah" name="Jumlah" fill="#1f77b4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Direction Distribution Pie Chart
export function DirectionDistributionChart({ data, loading }: { data?: Array<{ arah: string; jumlah: number; persentase: number }>; loading?: boolean }) {
  if (loading) {
    return <div className="h-[350px] w-full bg-muted/20 rounded-lg animate-pulse" />
  }

  if (!data || data.length === 0) {
    return <div className="h-[350px] flex items-center justify-center text-muted-foreground">No data available</div>;
  }

  const colorMap: Record<string, string> = {
    "IN": "#3498db",
    "OUT": "#e74c3c",
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">4.2 Direction Distribution</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ arah, persentase }) => `${arah}: ${persentase}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="jumlah"
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.arah}`} fill={colorMap[entry.arah] || COLORS[0]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Time Travel Distribution Chart
export function TimeTravelChart({ data, loading }: { data?: Array<{ segmen_waktu: string; jumlah: number; persentase: number }>; loading?: boolean }) {
  if (loading) {
    return <div className="h-[350px] w-full bg-muted/20 rounded-lg animate-pulse" />
  }

  if (!data || data.length === 0) {
    return <div className="h-[350px] flex items-center justify-center text-muted-foreground">No data available</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">4.3 Waktu Perjalanan</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="segmen_waktu" label={{ value: "Segment Waktu", position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "Jumlah", angle: -90, position: "insideLeft" }} />
          <Tooltip formatter={(value, name) => [value, name]} />
          <Bar dataKey="jumlah" name="Jumlah" fill="#1f77b4">
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Loyalty Segmentation Pie Chart
export function LoyaltySegmentChart({ data, loading }: { data?: Array<{ segmen: string; jumlah: number; persentase: number }>; loading?: boolean }) {
  if (loading) {
    return <div className="h-[350px] w-full bg-muted/20 rounded-lg animate-pulse" />
  }

  if (!data || data.length === 0) {
    return <div className="h-[350px] flex items-center justify-center text-muted-foreground">No data available</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">5.2 Segmentasi Loyaltas</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ segmen, persentase }) => `${segmen}: ${persentase}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="jumlah"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Loyalty by Occupation Chart
export function LoyaltyByOccupationChart({ data, loading }: { data?: Array<{ pekerjaan: string; rata_frekuensi: number }>; loading?: boolean }) {
  if (loading) {
    return <div className="h-[350px] w-full bg-muted/20 rounded-lg animate-pulse" />
  }

  if (!data || data.length === 0) {
    return <div className="h-[350px] flex items-center justify-center text-muted-foreground">No data available</div>;
  }

  const sortedData = [...data].sort((a, b) => a.rata_frekuensi - b.rata_frekuensi);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">5.3 Loyaltas berdasarkan Pekerjaan</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={sortedData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" label={{ value: "Rata-rata Frekuensi (x/minggu)", position: "insideBottom", offset: -5 }} />
          <YAxis dataKey="pekerjaan" type="category" width={120} label={{ value: "Pekerjaan", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Bar dataKey="rata_frekuensi" name="Rata-rata Frekuensi" fill="#1f77b4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Age vs Loyalty Correlation Chart
export function AgeLoyaltyCorrelationChart({ data, loading }: { data?: Array<{ usia: number; rata_loyal: number; jumlah: number }>; loading?: boolean }) {
  if (loading) {
    return <div className="h-[400px] w-full bg-muted/20 rounded-lg animate-pulse" />
  }

  if (!data || data.length === 0) {
    return <div className="h-[400px] flex items-center justify-center text-muted-foreground">No data available</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">6.1 Usia vs Frekuensi Loyalty</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="usia" label={{ value: "Usia (Tahun)", position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "Rata-rata Frekuensi (x/minggu)", angle: -90, position: "insideLeft" }} />
          <Tooltip
            formatter={(value, name) => [value, name === "rata_loyal" ? "Rata-rata Loyalty" : "Jumlah Penumpang"]}
            labelFormatter={(label) => `Usia: ${label} tahun`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="rata_loyal"
            stroke="coral"
            strokeWidth={3}
            name="Rata-rata Loyalty"
            dot={{ fill: "coral", r: 6 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Zone Preference by Occupation Chart
export function ZonePreferenceChart({ data, loading }: { data?: Array<{ pekerjaan: string; jumlah_utara: number; jumlah_barat: number; preferensi: string }>; loading?: boolean }) {
  if (loading) {
    return <div className="h-[400px] w-full bg-muted/20 rounded-lg animate-pulse" />
  }

  if (!data || data.length === 0) {
    return <div className="h-[400px] flex items-center justify-center text-muted-foreground">No data available</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">6.3 Preferensi Zone berdasarkan Pekerjaan</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="pekerjaan" label={{ value: "Pekerjaan", position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "Jumlah Penumpang", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="jumlah_utara" name="TAP-NORTH" fill="#3498db" stackId="a" />
          <Bar dataKey="jumlah_barat" name="TAP-WEST" fill="#e74c3c" stackId="a" />
        </BarChart>
      </ResponsiveContainer>
      {data.some(d => d.preferensi !== "Neutral") && (
        <div className="flex flex-wrap gap-2 text-sm">
          {data.map((item, idx) => (
            item.preferensi !== "Neutral" && (
              <div key={idx} className="px-2 py-1 rounded bg-muted text-xs">
                <span className="font-medium">{item.pekerjaan}</span>: <span className={item.preferensi === "North" ? "text-blue-600" : "text-orange-600"}>{item.preferensi}</span>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}

// Gender Distribution per Hour Chart
export function GenderPerHourChart({ data, loading }: { data?: Array<{ jam: number; persentase_pria: number; persentase_wanita: number }>; loading?: boolean }) {
  if (loading) {
    return <div className="h-[350px] w-full bg-muted/20 rounded-lg animate-pulse" />
  }

  if (!data || data.length === 0) {
    return <div className="h-[350px] flex items-center justify-center text-muted-foreground">No data available</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">6.2 Persentase Gender per Jam</h3>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="jam" label={{ value: "Jam", position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "Persentase (%)", angle: -90, position: "insideLeft" }} domain={[0, 100]} />
          <Tooltip formatter={(value) => [`${value}%`, ""]} />
          <Legend />
          <Area
            type="monotone"
            dataKey="persentase_pria"
            name="% Pria"
            stroke="#3498db"
            fill="#3498db"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="persentase_wanita"
            name="% Wanita"
            stroke="#e74c3c"
            fill="#e74c3c"
            fillOpacity={0.3}
          />
          <ReferenceLine y={50} stroke="gray" strokeDasharray="3 3" label={{ value: "Seimbang (50%)", position: "right" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
