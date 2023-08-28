export interface ICurrencies {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
}

export interface ICurrency {
  id: number;
  flagUrl?: string;
  currencyCode: string;
  checked?: boolean;
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
