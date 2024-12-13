import destinations from '../data/destinations';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="text-center mb-5">
        <h1 className="text-5xl font-extrabold text-blue-700">
          Explore the World`s Most Beautiful Destinations
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Discover top travel destinations and exciting activities tailored for you
        </p>
      </header>

      <div className="text-center mb-12">
        <Link href="/destinations">
          <p className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded shadow-md hover:bg-blue-700 transition">
            Search for Activities
          </p>
        </Link>
      </div>

      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Travel Destinations</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destinations.map((destination) => (
            <li
              key={destination.id}
              className="p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white"
            >
              <picture>
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </picture>
              <h2 className="text-2xl font-semibold text-blue-600">{destination.name}</h2>
              <p className="mt-2 text-gray-700">{destination.description}</p>
              <div className="mt-1 text-sm text-yellow-500">
                {'★'.repeat(Math.round(destination.rating)) +
                  '☆'.repeat(5 - Math.round(destination.rating))}
              </div>
              <h4 className="mt-4 font-semibold">Highlights:</h4>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                {destination.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
              <Link
                href={{
                  pathname: `/destinations/${destination.iataCode}`,
                  query: {
                    cityName: destination.name,
                    latitude: destination.geoCode?.latitude,
                    longitude: destination.geoCode?.longitude
                  }
                }}
              >
                <p className="inline-block mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded shadow-md hover:bg-blue-600 transition">
                  Explore Activities
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
