export interface ICurrency {
  id: number;
  currencyCode: string;
  flagUrl: string;
}
export interface ICurrencyResponse {
  currencyList: ICurrency[];
}
