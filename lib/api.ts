import { DashboardData } from "./types";

const API_BASE_URL = "http://206.237.97.19:4003";

export async function fetchAllData(date?: string): Promise<DashboardData | null> {
  try {
    let url = `${API_BASE_URL}/api/v1/all-data`;
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

    const data: DashboardData = await response.json();
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
