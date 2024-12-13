"use client"

import { useState, FormEvent } from 'react';
import { CityData, ApiResponse } from '@/types/amadeus';
import Link from 'next/link';

export default function Destinations() {
  const [city, setCity] = useState<string>('');
  const [results, setResults] = useState<CityData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setResults(null);

      try {
          const response = await fetch('/api/amadeus', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ city }),
          });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Error fetching city data');
          }

          const data: ApiResponse = await response.json();
          setResults(data.cityResponse?.result.data || []);
      } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error('Error fetching city data:', errorMessage);
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Search Travel Destinations</h1>

      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {results && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Results for &quot;{city}&quot;</h2>
          {results && results.length > 0 ? (
            <ul className="space-y-4">
              {results.map((item) => (
                <li key={`${item.iataCode}-${item.geoCode?.latitude}`} className="p-4 border border-gray-300 rounded shadow">
                <Link
                    href={{
                      pathname: `/destinations/${item.iataCode}`,
                      query: {
                        cityName: item.name,
                        latitude: item.geoCode?.latitude,
                        longitude: item.geoCode?.longitude
                      }
                    }}
                >
                      <p>Name: {item.name}</p>
                      <p>Country code: {item.address.countryCode}</p>
                      {item.geoCode && (
                        <p>
                          Location: {item.geoCode.latitude}, {item.geoCode.longitude}
                        </p>
                      )}
                </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found for &quot;{city}&quot;.</p>
          )}
        </div>
      )}
    </div>
  );
}
