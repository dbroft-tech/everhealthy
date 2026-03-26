export type Currency = 'USD' | 'UGX';

interface ExchangeRates {
  UGX: number;
  lastUpdated: number;
}

const CACHE_DURATION = 60 * 60 * 1000;

let cachedRates: ExchangeRates | null = null;

export async function getExchangeRate(): Promise<number> {
  if (cachedRates && Date.now() - cachedRates.lastUpdated < CACHE_DURATION) {
    return cachedRates.UGX;
  }

  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();

    cachedRates = {
      UGX: data.rates.UGX,
      lastUpdated: Date.now(),
    };

    return cachedRates.UGX;
  } catch (error) {
    console.error('Failed to fetch exchange rate:', error);
    return 3700;
  }
}

export function convertPrice(priceUSD: number, rate: number, currency: Currency): number {
  if (currency === 'USD') {
    return priceUSD;
  }
  return Math.round(priceUSD * rate);
}

export function formatPrice(price: number, currency: Currency): string {
  if (currency === 'USD') {
    return `$${price.toFixed(2)}`;
  }
  return `UGX ${price.toLocaleString()}`;
}
