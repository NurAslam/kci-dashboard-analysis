import { DashboardData } from "./types";

const API_BASE_URL = "https://kci-service.urbansolv.co.id";

export async function fetchAllData(date?: string): Promise<DashboardData | null> {
  try {
    let url = `${API_BASE_URL}/api/v1/layer/analytics`;
    if (date) {
      url += `?date=${date}`;
    }
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    // New API structure: data.externalData contains the actual data
    const data: DashboardData = json.data.externalData;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      cache: 'no-store',
    });
    return response.ok;
  } catch {
    return false;
  }
}
