import { NextRequest, NextResponse } from 'next/server';
import Amadeus from '../../../../../../amadeus-node/src/amadeus';

const amadeus = new Amadeus({
    clientId: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_SECRET
});

export async function GET(
  request: NextRequest,
  { params }: { params: { coordinates: string } }
) {
  const { coordinates } = await params;
  const [latitude, longitude] = coordinates.split(',');

  if (!latitude || !longitude) {
    return NextResponse.json({ error: 'Invalid coordinates' }, { status: 400 });
  }

  if (isNaN(Number(latitude)) || isNaN(Number(longitude))) {
    return NextResponse.json({ error: 'Coordinates must be numeric' }, { status: 400 });
  }

  try {
    const activitiesResponse = await amadeus.shopping.activities.get({
      latitude: Number(latitude),
      longitude: Number(longitude),
      radius: 10,
    });

    if (!activitiesResponse) {
      return NextResponse.json({ error: 'No activities found' }, { status: 404 });
    }

    return NextResponse.json(activitiesResponse);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || 'An error occurred while fetching data' }, { status: 500 }
      );
    }

    return NextResponse.json({ error: 'Failed to fetch city data' }, { status: 500 });
  }
}
