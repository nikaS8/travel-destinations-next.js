import Amadeus from '../../amadeus-node/src/amadeus';

class AmadeusClient {
  private static instance: Amadeus;

  private constructor() {}

  public static getInstance(): Amadeus {
    if (!AmadeusClient.instance) {
      AmadeusClient.instance = new Amadeus({
        clientId: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_ID || '',
        clientSecret: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_SECRET || '',
      });
    }
    return AmadeusClient.instance;
  }
}

export default AmadeusClient;
