import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from './actions';
import { FetchCountryAction } from './types';

export function* fetchCountry(action: FetchCountryAction) {
  const requestURL = `https://api.carerev.com/api/v1/countries/${action.payload}`;

  try {
    const country = yield call(request, requestURL);

    if (country) {
      yield put(actions.fetchCountrySuccess(country));
    } else {
      yield put(actions.fetchCountryError('No country found.'));
    }
  } catch (err) {
    yield put(actions.fetchCountryError(err.toString()));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* saga() {
  yield takeLatest(actions.fetchCountry.type, fetchCountry);
}
