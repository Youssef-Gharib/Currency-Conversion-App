import { IConversionRates } from './iconversion-rates';

export interface ICurrencies {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: IConversionRates;
}

export interface Currency {
  id: number;
  currencyCode: string;
  flagUrl: string;
}
export interface CurrencyResponse {
  currencyList: Currency[];
}

export interface ICurrency {
  code: string;
  flagUrl?: string;
  desc: string;
}

export interface ICurrencyConvert {
  from: string;
  to: string;
  amount: number;
}

export interface IConvertResponse {
  result: number;
  time_last_update_utc: string;
}
