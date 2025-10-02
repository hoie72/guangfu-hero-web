const API_BASE_URL = "https://guangfu250923.pttapp.cc";

export async function fetchAPI<T>(
  endpoint: string,
  params?: Record<string, string | number>
): Promise<T> {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export interface Shelter {
  id: string;
  name: string;
  location: string;
  phone: string;
  link: string | null;
  status: string;
  capacity: number | null;
  current_occupancy: number | null;
  available_spaces: number | null;
  facilities: string | null;
  contact_person: string;
  notes: string | null;
  coordinates: string | null;
  opening_hours: string | null;
  created_at: number;
  updated_at: number;
}

export interface ShelterResponse {
  "@context": string;
  "@type": string;
  limit: number;
  member: Shelter[];
  next: string | null;
  offset: number;
  previous: string | null;
  totalItems: number;
}

export async function getShelters(
  limit: number = 50,
  offset: number = 0
): Promise<ShelterResponse> {
  return fetchAPI<ShelterResponse>("/shelters", { limit, offset });
}
