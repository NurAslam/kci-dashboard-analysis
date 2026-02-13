// API Response Types
export interface DashboardData {
  tanggal: string;
  dashboard_summary: DashboardSummary;
  kategori: Kategori;
  data: DataContainer;
}

// New API Response wrapper
export interface AnalyticsApiResponse {
  statusCode: number;
  message: string;
  data: AnalyticsDataContainer;
}

export interface AnalyticsDataContainer {
  externalData: DashboardData;
  featureAnalysis: FeatureAnalysis;
}

export interface FeatureAnalysis {
  totalTenant: number;
  occupied: number;
  reserved: number;
  available: number;
}

export interface DashboardSummary {
  total_transaksi: MetricValue;
  total_penumpang_unik: MetricValue;
  high_loyalty_penumpang: MetricValuePercentage;
  gate_tersibuk: MetricValueGate;
  morning_peak_traffic: MetricValuePercentage;
  evening_peak_traffic: MetricValuePercentage;
  rata_rata_usia: MetricValueAge;
  stasiun_asal_dominan: MetricValueStasiun;
}

export interface MetricValue {
  nilai: number;
  label: string;
  deskripsi: string;
  delta: string;
}

export interface MetricValuePercentage extends MetricValue {
  nilai: string;
  persentase: number;
}

export interface MetricValueGate extends MetricValue {
  nilai: string;
  gate_id_full: string;
}

export interface MetricValueAge extends MetricValue {
  nilai: string;
  usia: number;
}

export interface MetricValueStasiun extends MetricValue {
  nilai: string;
  persentase: number;
  stasiun: string;
}

export interface Kategori {
  efisiensi_operasional: string;
  demografi: string;
  segmentasi_perjalanan: string;
  segmentasi_loyaltas: string;
  korelasi_perilaku: string;
}

export interface DataContainer {
  efisiensi_operasional: EfisiensiOperasional;
  demografi: Demografi;
  segmentasi_perjalanan: SegmentasiPerjalanan;
  segmentasi_loyaltas: SegmentasiLoyaltas;
  korelasi_perilaku: KorelasiPerilaku;
}

// Efisiensi Operasional
export interface EfisiensiOperasional {
  tanggal: string;
  total_transaksi: number;
  trafik_per_jam: TrafikPerJam[];
  penggunaan_gate: PenggunaanGate[];
  trafik_per_zona: TrafikPerZona[];
  keseimbangan_arah: KeseimbanganArah[];
  ringkasan: RingkasanEfisiensi;
  insight_ai: InsightAIEfisiensi;
  rekomendasi_operasi: string[];
  rekomendasi_strategis: string[];
}

export interface TrafikPerJam {
  jam: number;
  jumlah: number;
  periode: string;
}

export interface PenggunaanGate {
  gate_id: string;
  zona: string;
  jumlah: number;
  tingkat_utilisasi: number;
}

export interface TrafikPerZona {
  zona: string;
  jumlah: number;
  persentase: number;
}

export interface KeseimbanganArah {
  zona: string;
  arah: string;
  jumlah: number;
  persentase: number;
}

export interface RingkasanEfisiensi {
  transaksi_pagi: number;
  persentase_pagi: number;
  transaksi_sore: number;
  persentase_sore: number;
  rata_utilisasi_gate: number;
  gate_tertersibuk: string;
  zona_tertersibuk: string;
}

export interface InsightAIEfisiensi {
  pola_trafik: string;
  intensitas_peak: string;
  keseimbangan_gate: string;
  rekomendasi_optimalisasi: string;
  analisis_detail: string;
}

// Demografi
export interface Demografi {
  tanggal: string;
  total_penumpang: number;
  distribusi_usia: DistribusiUsia[];
  distribusi_pekerjaan: DistribusiPekerjaan[];
  distribusi_gender: DistribusiGender[];
  distribusi_stasiun_asal: DistribusiStasiunAsal[];
  ringkasan: RingkasanDemografi;
  insight_ai: InsightAIDemografi;
  rekomendasi_operasional: string[];
}

export interface DistribusiUsia {
  rentang_usia: string;
  jumlah: number;
  persentase: number;
}

export interface DistribusiPekerjaan {
  pekerjaan: string;
  jumlah: number;
  persentase: number;
}

export interface DistribusiGender {
  gender: string;
  jumlah: number;
  persentase: number;
}

export interface DistribusiStasiunAsal {
  stasiun: string;
  jumlah: number;
  persentase: number;
}

export interface RingkasanDemografi {
  rata_usia: number;
  penumpang_usia_produktif: number;
  persentase_usia_produktif: number;
  penumpang_pekerja: number;
  persentase_pekerja: number;
  stasiun_asal_dominan: string;
}

export interface InsightAIDemografi {
  profil_penumpang: string;
  rasio_demografi: string;
  stasiun_prioritas: string;
  analisis_peluang: string;
  target_promosi_utama: string;
  fasilitas_prioritas: string;
}

// Segmentasi Perjalanan
export interface SegmentasiPerjalanan {
  tanggal: string;
  total_transaksi: number;
  distribusi_stasiun_awal: DistribusiStasiunAwal[];
  distribusi_arah: DistribusiArah[];
  distribusi_waktu_perjalanan: DistribusiWaktuPerjalanan[];
  ringkasan: RingkasanSegmentasiPerjalanan;
  insight_ai: InsightAISegmentasiPerjalanan;
  rekomendasi_operasional: string[];
  rekomendasi_strategis: string[];
}

export interface DistribusiStasiunAwal {
  stasiun: string;
  jumlah: number;
  persentase: number;
}

export interface DistribusiArah {
  arah: string;
  jumlah: number;
  persentase: number;
}

export interface DistribusiWaktuPerjalanan {
  segmen_waktu: string;
  jumlah: number;
  persentase: number;
}

export interface RingkasanSegmentasiPerjalanan {
  stasiun_asal_terbanyak: string;
  jumlah_stasiun_asal: number;
  persentase_stasiun_asal: number;
  arah_dominan: string;
  segmen_waktu_dominan: string;
  persentase_waktu_dominan: number;
}

export interface InsightAISegmentasiPerjalanan {
  pola_perjalanan: string;
  tipe_penumpang: string;
  rekomendasi_kapasitas: string;
  analisis_origin: string;
}

// Segmentasi Loyaltas
export interface SegmentasiLoyaltas {
  tanggal: string;
  total_penumpang: number;
  segmentasi_loyal: SegmentasiLoyal[];
  loyal_berdasarkan_pekerjaan: LoyalBerdasarkanPekerjaan[];
  ringkasan: RingkasanLoyaltas;
  insight_ai: InsightAILoyaltas;
  rekomendasi_operasional: string[];
  rekomendasi_strategis: string[];
}

export interface SegmentasiLoyal {
  segmen: string;
  jumlah: number;
  persentase: number;
  frekuensi_min: number;
  frekuensi_max: number;
}

export interface LoyalBerdasarkanPekerjaan {
  pekerjaan: string;
  jumlah_penumpang: number;
  rata_frekuensi: number;
  persentase_dari_total: number;
}

export interface RingkasanLoyaltas {
  persentase_loyal_tinggi: number;
  persentase_loyal_sedang: number;
  persentase_loyal_rendah: number;
  jumlah_loyal_tinggi: number;
  jumlah_loyal_sedang: number;
  jumlah_loyal_rendah: number;
  pekerjaan_paling_loyal: string;
  frekuensi_loyal_tertinggi: number;
}

export interface InsightAILoyaltas {
  strategi_loyal: string;
  profil_loyal: string;
  pekerjaan_tertinggi: string;
  rekomendasi_high: string;
  rekomendasi_medium: string;
  rekomendasi_low: string;
}

// Korelasi Perilaku
export interface KorelasiPerilaku {
  tanggal: string;
  korelasi_usia_loyal: KorelasiUsiaLoyal[];
  distribusi_gender_per_jam: DistribusiGenderPerJam[];
  preferensi_zona_pekerjaan: PreferensiZonaPekerjaan[];
  ringkasan: RingkasanKorelasi;
  insight_ai: InsightAIKorelasi;
}

export interface KorelasiUsiaLoyal {
  usia: number;
  rata_loyal: number;
  jumlah: number;
}

export interface DistribusiGenderPerJam {
  jam: number;
  jumlah_pria: number;
  jumlah_wanita: number;
  persentase_pria: number;
  persentase_wanita: number;
}

export interface PreferensiZonaPekerjaan {
  pekerjaan: string;
  jumlah_utara: number;
  jumlah_barat: number;
  preferensi: string;
}

export interface RingkasanKorelasi {
  insight_korelasi_usia_loyal: string;
  rata_loyal_muda: number;
  rata_loyal_senior: number;
  gender_dominan_pagi: string;
  gender_dominan_sore: string;
  jumlah_preferensi_zona_kuat: number;
}

export interface InsightAIKorelasi {
  korelasi_usia: string;
  pola_gender_waktu: string;
  fasilitas_waktu: FasilitasWaktu;
  analisis_zona: AnalisisZona;
  rekomendasi_promosi: RekomendasiPromosi;
}

export interface FasilitasWaktu {
  pagi: string;
  sore: string;
}

export interface AnalisisZona {
  pola: string;
  rekomendasi: string;
}

export interface RekomendasiPromosi {
  morning: string;
  sore: string;
}
