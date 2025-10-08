'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  getWaterRefillStations,
  getShowerStations,
  getRestrooms,
  getMedicalStations,
  getAccommodations
} from '@/lib/api';
import {
  WaterRefillStations,
  ShowerStations,
  RestRooms,
  MedicalStation,
  Accommodations
} from '@/lib/types';
import InfoCard from '@/components/InfoCard';
import DropdownSelect from '@/components/DropdownSelect';
import CategoryButton from './CategoryButton';

type LocationCategory =
  | 'all'
  | 'water_refill_stations'
  | 'shower_stations'
  | 'restrooms'
  | 'medical_stations'
  | 'accommodations';
type ShowMode = 'mapShow' | 'listShow';

const CATEGORIES = [
  {
    key: 'all',
    name: '全部'
  },
  {
    key: 'water_refill_stations',
    name: '加水站'
  },
  {
    key: 'shower_stations',
    name: '洗澡點'
  },
  {
    key: 'restrooms',
    name: '廁所'
  },
  {
    key: 'medical_stations',
    name: '醫療站'
  },
  {
    key: 'accommodations',
    name: '住宿'
  }
];

const MAP_URL = 'https://guangfu250923-map.pttapp.cc/map.html';
const MAP_HEIGHT = 422;

export default function SiteMap() {
  const searchParams = useSearchParams();
  const [showMode, setShowMode] = useState<ShowMode>('mapShow');
  const [selectedCategory, setSelectedCategory] =
    useState<LocationCategory>('all');
  const [waterRefillStations, setWaterRefillStations] = useState<
    WaterRefillStations[]
  >([]);
  const [showerStations, setShowerStations] = useState<ShowerStations[]>([]);
  const [restRooms, setRestRooms] = useState<RestRooms[]>([]);
  const [medicalStations, setMedicalStations] = useState<MedicalStation[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodations[]>([]);
  const [allData, setAllData] = useState<
    (
      | WaterRefillStations
      | ShowerStations
      | RestRooms
      | MedicalStation
      | Accommodations
    )[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 處理 URL 參數
  useEffect(() => {
    const view = searchParams.get('view');
    const category = searchParams.get('category');

    if (view === 'list') {
      setShowMode('listShow');
      if (category === 'accommodations') {
        setSelectedCategory('accommodations');
        fetchAccommodations();
      }
    }
  }, [searchParams]);

  async function fetchWaterRefillStations() {
    try {
      setLoading(true);
      setError(null);
      const response = await getWaterRefillStations(50, 0);
      setWaterRefillStations(response.member);
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入失敗');
    } finally {
      setLoading(false);
    }
  }

  async function fetchShowerStations() {
    try {
      setLoading(true);
      setError(null);
      const response = await getShowerStations(50, 0);
      setShowerStations(response.member);
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入失敗');
    } finally {
      setLoading(false);
    }
  }

  async function fetchRestRooms() {
    try {
      setLoading(true);
      setError(null);
      const response = await getRestrooms(50, 0);
      setRestRooms(response.member);
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入失敗');
    } finally {
      setLoading(false);
    }
  }

  async function fetchMedicalStations() {
    try {
      setLoading(true);
      setError(null);
      const response = await getMedicalStations(50, 0);
      setMedicalStations(response.member);
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入失敗');
    } finally {
      setLoading(false);
    }
  }

  async function fetchAccommodations() {
    try {
      setLoading(true);
      setError(null);
      const response = await getAccommodations(50, 0);
      setAccommodations(response.member);
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入失敗');
    } finally {
      setLoading(false);
    }
  }

  async function fetchAll() {
    try {
      setLoading(true);
      setError(null);
      const [
        responseWaterRefillStations,
        responseShowerStations,
        responseRestrooms,
        responseMedicalStations,
        responseAccommodations
      ] = await Promise.all([
        getWaterRefillStations(50, 0),
        getShowerStations(50, 0),
        getRestrooms(50, 0),
        getMedicalStations(50, 0),
        getAccommodations(50, 0)
      ]);
      setWaterRefillStations(responseWaterRefillStations.member);
      setShowerStations(responseShowerStations.member);
      setRestRooms(responseRestrooms.member);
      setMedicalStations(responseMedicalStations.member);
      setAccommodations(responseAccommodations.member);

      const combined = [
        ...responseWaterRefillStations.member,
        ...responseShowerStations.member,
        ...responseRestrooms.member,
        ...responseMedicalStations.member,
        ...responseAccommodations.member
      ];
      combined.sort((a, b) => a.created_at - b.created_at);
      setAllData(combined);
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入失敗');
    } finally {
      setLoading(false);
    }
  }

  const handleCategoryClick = async (categoryKey: LocationCategory) => {
    setSelectedCategory(categoryKey);
    if (categoryKey === 'all') {
      await fetchAll();
    } else if (categoryKey === 'water_refill_stations') {
      await fetchWaterRefillStations();
    } else if (categoryKey === 'shower_stations') {
      await fetchShowerStations();
    } else if (categoryKey === 'restrooms') {
      await fetchRestRooms();
    } else if (categoryKey === 'medical_stations') {
      await fetchMedicalStations();
    } else if (categoryKey === 'accommodations') {
      await fetchAccommodations();
    }
  };

  const handleModeChange = (value: ShowMode) => {
    setShowMode(value);
    fetchAll();
  };

  const options = [
    { label: '地圖顯示', value: 'mapShow' },
    { label: '列表顯示', value: 'listShow' }
  ];

  return (
    <div>
      <div className="flex my-3">
        <DropdownSelect
          value={showMode}
          onChange={handleModeChange as (value: string) => void}
          options={options}
        />
        {showMode === 'listShow' && (
          <div className="ml-4 flex gap-2 overflow-y-scroll [scrollbar-width:none]">
            {CATEGORIES.map(({ key, name }) => (
              <CategoryButton
                key={key}
                onClick={() => handleCategoryClick(key as LocationCategory)}
                active={selectedCategory === key}
              >
                {name}
              </CategoryButton>
            ))}
          </div>
        )}
      </div>
      <div>
        {showMode === 'mapShow' && (
          <iframe
            src={MAP_URL}
            title="地圖顯示"
            width="100%"
            height={MAP_HEIGHT}
            allow="geolocation"
            sandbox="
              allow-scripts
              allow-same-origin
            "
          />
        )}
        {showMode === 'listShow' && (
          <div className="space-y-4">
            {loading && (
              <div className="text-center py-8 text-[var(--gray)]">
                載入中...
              </div>
            )}

            {error && (
              <div className="text-center py-8 text-red-500">錯誤: {error}</div>
            )}

            {!loading && !error && selectedCategory === 'all' && (
              <>
                {allData.length === 0 ? (
                  <div className="text-center py-8 text-[var(--gray)]">
                    此分類暫無資料
                  </div>
                ) : (
                  allData.map((station) => (
                    <InfoCard
                      key={station.id}
                      name={station.name}
                      address={station.location}
                      contact={station.phone}
                      hours={station.opening_hours || ''}
                      mapUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        station.location
                      )}`}
                      fullData={station}
                    />
                  ))
                )}
              </>
            )}

            {!loading &&
              !error &&
              selectedCategory === 'water_refill_stations' && (
                <>
                  {waterRefillStations.length === 0 ? (
                    <div className="text-center py-8 text-[var(--gray)]">
                      此分類暫無資料
                    </div>
                  ) : (
                    waterRefillStations.map((station) => (
                      <InfoCard
                        key={station.id}
                        name={station.name}
                        type={station.water_type}
                        address={station.location}
                        contact={station.phone}
                        hours={station.opening_hours || ''}
                        mapUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          station.location
                        )}`}
                        fullData={station}
                      />
                    ))
                  )}
                </>
              )}

            {!loading && !error && selectedCategory === 'shower_stations' && (
              <>
                {showerStations.length === 0 ? (
                  <div className="text-center py-8 text-[var(--gray)]">
                    此分類暫無資料
                  </div>
                ) : (
                  showerStations.map((station) => (
                    <InfoCard
                      key={station.id}
                      type={station.facility_type}
                      name={station.name}
                      address={station.location}
                      contact={station.phone}
                      hours={station.time_slots || ''}
                      mapUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        station.location
                      )}`}
                      fullData={station}
                    />
                  ))
                )}
              </>
            )}

            {!loading && !error && selectedCategory === 'restrooms' && (
              <>
                {restRooms.length === 0 ? (
                  <div className="text-center py-8 text-[var(--gray)]">
                    此分類暫無資料
                  </div>
                ) : (
                  restRooms.map((station) => (
                    <InfoCard
                      key={station.id}
                      type={station.facility_type}
                      name={station.name}
                      address={station.location}
                      contact={station.phone}
                      hours={station.opening_hours || ''}
                      mapUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        station.location
                      )}`}
                      fullData={station}
                    />
                  ))
                )}
              </>
            )}

            {!loading && !error && selectedCategory === 'medical_stations' && (
              <>
                {medicalStations.length === 0 ? (
                  <div className="text-center py-8 text-[var(--gray)]">
                    此分類暫無資料
                  </div>
                ) : (
                  medicalStations.map((station) => (
                    <InfoCard
                      key={station.id}
                      type={station.station_type}
                      name={station.name}
                      address={station.location}
                      contact={station.phone}
                      hours={station.operating_hours || ''}
                      mapUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        station.location
                      )}`}
                      fullData={station}
                    />
                  ))
                )}
              </>
            )}

            {!loading && !error && selectedCategory === 'accommodations' && (
              <>
                {accommodations.length === 0 ? (
                  <div className="text-center py-8 text-[var(--gray)]">
                    此分類暫無資料
                  </div>
                ) : (
                  accommodations.map((station) => (
                    <InfoCard
                      key={station.id}
                      name={station.name}
                      address={station.location}
                      contact={station.contact_info}
                      hours={station.available_period || ''}
                      mapUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        station.location
                      )}`}
                      fullData={station}
                    />
                  ))
                )}
              </>
            )}
          </div>
        )}
      </div>
      <br />
    </div>
  );
}
