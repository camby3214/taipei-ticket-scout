// Demo data only. Real subscriptions will come from the AWS API (DynamoDB via Lambda) later.
export type RouteInfo = { code: string; city: string; cityEn: string; typical: number };

export const POPULAR_ROUTES: RouteInfo[] = [
  { code: "NRT", city: "東京", cityEn: "Tokyo", typical: 9800 },
  { code: "KIX", city: "大阪", cityEn: "Osaka", typical: 8900 },
  { code: "ICN", city: "首爾", cityEn: "Seoul", typical: 7600 },
  { code: "BKK", city: "曼谷", cityEn: "Bangkok", typical: 8200 },
  { code: "OKA", city: "沖繩", cityEn: "Okinawa", typical: 6400 },
  { code: "SIN", city: "新加坡", cityEn: "Singapore", typical: 10500 },
  { code: "HKG", city: "香港", cityEn: "Hong Kong", typical: 5200 },
  { code: "DAD", city: "峴港", cityEn: "Da Nang", typical: 7100 },
];

export type Watch = {
  id: string;
  dest: string;
  target: number;
  current: number;
  createdAt: string;
};

export const formatTWD = (n: number) => `NT$${n.toLocaleString("en-US")}`;

export const routeByCode = (code: string) => POPULAR_ROUTES.find((r) => r.code === code);
