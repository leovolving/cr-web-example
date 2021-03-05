import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './reducer';

const selectDomain = (state: RootState) => {
  return state.country || initialState;
};

export const selectLoading = createSelector(
  [selectDomain],
  countryState => countryState.isLoading,
);

export const selectError = createSelector(
  [selectDomain],
  countryState => countryState.error,
);

export const selectCountryItem = (key: string) =>
  createSelector([selectDomain], countryState => countryState.country[key]);
