# Travel Destinations Finder 🌍

A user-friendly Next.js application for discovering popular travel destinations and exciting activities.

## Features
- **Popular Destinations**: Browse through a curated list of top-rated travel destinations.
- **Activity Search**: Search for activities by city with detailed location data.
- **Dynamic Pages**: View activity details dynamically for each destination.
- **Pagination**: Efficiently navigate through activity results with a clean and responsive UI.
- **API Integration**: Powered by Amadeus Travel API for real-time activity data.

## Technologies Used
- **Next.js**: Framework for server-side rendering and dynamic routing.
- **React**: Frontend library for building interactive user interfaces.
- **TailwindCSS**: Modern styling with utility-first classes.
- **Amadeus Travel API**: Fetches live activity data based on geographic coordinates.

## How to Use
1. Visit the homepage to explore popular destinations.
2. Search for activities by entering a city name.
3. View detailed information about activities in your selected city.

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### My comments
Root Layout - служит основой для всего приложения и задает общие элементы интерфейса, которые будут использоваться на всех страницах вашего сайта.
В директории app названия папок - это руты, например destinations = /destinations. Обязателен файл page.tsx - это как index.tsx для это рута.

Папка app/api используется для определения API маршрутов, а структура папок внутри неё напрямую определяет пути (URLs) для вызова этих маршрутов. Вызов в коде /api/amadeus/city пойдет искать файл route.ts в директорию api/amadeus/city
