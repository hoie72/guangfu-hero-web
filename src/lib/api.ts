import {
  AccommodationsResponse,
  RestRoomsResponse,
  ShowerStationsResponse,
  WaterRefillStationsResponse,
  ShelterResponse,
  MedicalStationResponse,
  MentalHealthResourceResponse,
  ReportRequest,
  ReportResponse,
  MentalHealthResource,
  MedicalStation,
  Shelter,
  SupplyResponse,
  ReportSupplyProvider,
  ReportSupplyProviderResponse,
} from "./types";

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

export async function getAccommodations(
  limit: number = 50,
  offset: number = 0
): Promise<AccommodationsResponse> {
  return fetchAPI<AccommodationsResponse>("/accommodations", {
    limit,
    offset,
  });
}

export async function getRestrooms(
  limit: number = 50,
  offset: number = 0
): Promise<RestRoomsResponse> {
  return fetchAPI<RestRoomsResponse>("/restrooms", {
    limit,
    offset,
  });
}

export async function getShowerStations(
  limit: number = 50,
  offset: number = 0
): Promise<ShowerStationsResponse> {
  return fetchAPI<ShowerStationsResponse>("/shower_stations", {
    limit,
    offset,
  });
}

export async function getWaterRefillStations(
  limit: number = 50,
  offset: number = 0
): Promise<WaterRefillStationsResponse> {
  return fetchAPI<WaterRefillStationsResponse>("/water_refill_stations", {
    limit,
    offset,
  });
}

export async function getShelters(
  limit: number = 50,
  offset: number = 0
): Promise<ShelterResponse> {
  const response = await fetchAPI<ShelterResponse>("/shelters", {
    limit,
    offset,
  });
  return {
    ...response,
    member: filterValidLocations(response.member as Shelter[]) as Shelter[],
  };
}

export async function getMedicalStations(
  limit: number = 50,
  offset: number = 0
): Promise<MedicalStationResponse> {
  const response = await fetchAPI<MedicalStationResponse>("/medical_stations", {
    limit,
    offset,
  });
  return {
    ...response,
    member: filterValidLocations(
      response.member as MedicalStation[]
    ) as MedicalStation[],
  };
}

export async function getMentalHealthResources(
  limit: number = 50,
  offset: number = 0
): Promise<MentalHealthResourceResponse> {
  const response = await fetchAPI<MentalHealthResourceResponse>(
    "/mental_health_resources",
    {
      limit,
      offset,
    }
  );
  return {
    ...response,
    member: filterValidLocations(
      response.member as MentalHealthResource[]
    ) as MentalHealthResource[],
  };
}

export async function submitReport(
  data: ReportRequest
): Promise<ReportResponse> {
  const response = await fetch(`${API_BASE_URL}/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("提交失敗,請稍後再試");
  }

  return response.json();
}

type Location = (MentalHealthResource | MedicalStation | Shelter)[];
function filterValidLocations(locations: Location): Location {
  return locations.filter(
    (location) =>
      location.status !== "test" &&
      location.status !== "need_delete" &&
      location.name !== ""
  );
}

export async function getSupplies(
  limit: number = 50,
  offset: number = 0
): Promise<SupplyResponse> {
  const response = await fetchAPI<SupplyResponse>("/supplies", {
    embed: "all",
    limit,
    offset,
    // filterOutComplete: "true",
  });
  return response;
}

export async function submitSupplyProvider(
  data: ReportSupplyProvider
): Promise<ReportSupplyProviderResponse> {
  const response = await fetch(`${API_BASE_URL}/supply_providers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("提交失敗,請稍後再試");
  }

  return response.json();
}
