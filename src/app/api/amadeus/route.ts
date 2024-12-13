import { NextResponse } from 'next/server';
import Amadeus from '../../../../amadeus-node/src/amadeus';
import { RequestBody } from '@/types/amadeus';

const amadeus = new Amadeus({
  clientId: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_SECRET
});

export async function POST(request: Request) {
  const { city }: RequestBody = await request.json();

  try {
    const cityResponse = await amadeus.referenceData.locations.cities.get({
      keyword: city,
    });

    return NextResponse.json({ cityResponse }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error fetching city data:', errorMessage);

    return NextResponse.json(
      { error: 'Failed to fetch city data', details: errorMessage },
      { status: 500 }
    );
  }

}
