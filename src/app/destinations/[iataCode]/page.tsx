"use client"
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CityShoppingActivity } from '@/types/amadeus';

export default function CityPage() {
  const searchParams = useSearchParams();

  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');
  const cityName = searchParams.get('cityName');

  const [cityData, setCityData] = useState<CityShoppingActivity[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!latitude || !longitude) return;

    const fetchCityData = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/amadeus/city/${latitude},${longitude}`);

        if (!response.ok) {
          throw new Error('Failed to fetch city data');
        }

        const data = await response.json();
        setCityData(data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [latitude, longitude]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData =
    cityData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) || [];
  const totalPages = cityData ? Math.ceil(cityData.length / itemsPerPage) : 1;

  const generatePagination = () => {
    const pageArray = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageArray.push(i);
      }
    } else {
      pageArray.push(1, 2);

      if (currentPage > 4) {
        pageArray.push('...');
      }

      for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) {
        pageArray.push(i);
      }

      if (currentPage < totalPages - 3) {
        pageArray.push('...');
      }

      pageArray.push(totalPages - 1, totalPages);
    }

    return pageArray;
  };
  const pagination = generatePagination();


  if (loading)
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl font-medium text-gray-600">Loading activities...</p>
    </div>
  );

  if (error)
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl font-medium text-red-500">{error}</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700">{cityName}</h1>
        <p className="text-gray-600 text-lg mt-2">
          Discover activities and experiences in {cityName}
        </p>
      </header>

      {paginatedData.length > 0 ? (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paginatedData.map((activity) => (
              <li
                key={activity.id}
                className="p-6 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-blue-600">{activity.name}</h2>
                <p className="mt-2 text-gray-700">{activity.description}</p>
              </li>
            ))}
          </ul>

          {/* Пагинация */}
          <div className="flex justify-center mt-8 space-x-2">
            {pagination.map((page, index) =>
              page === '...' ? (
                <span key={index} className="px-4 py-2 text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => handlePageChange(page as number)}
                  className={`px-4 py-2 border ${
                    currentPage === page
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-blue-500 border-blue-300'
                  } rounded hover:bg-blue-500 hover:text-white transition`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-gray-500">No activities found for {cityName}.</p>
        </div>
      )}
    </div>
  );
}
