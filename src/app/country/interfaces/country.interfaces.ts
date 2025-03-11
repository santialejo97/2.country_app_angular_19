export interface Country {
  cca2: string;
  flag: string;
  flagSvg: string;
  name: string;
  capital: string;
  population: number;
  // currencies: Currencies;
  region: string;
  subRegion: string;
  // language: string;
  independent: boolean;
}

interface Currencies {
  name: string;
  symbol: string;
}

export type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Antarctic';
