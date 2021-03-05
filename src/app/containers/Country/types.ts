import { Country } from 'types/Country';

/* --- ACTIONS --- */
export interface FetchCountryAction {
  type: string;
  payload: string;
}

/* --- STATE --- */
export interface CountryState {
  isLoading: boolean;
  error?: string;
  country: Country;
}
