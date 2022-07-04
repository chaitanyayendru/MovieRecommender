import { call, all, put, takeEvery } from 'redux-saga/effects';

import { getMovies } from './../../api/tmdbApi';

import { fetchDataFailure, fetchDataSuccess } from "./moviesActions";

import MoviesActionType from "./moviesTypes";

export function* fetchDataAsync({ url }) {
    try {
      const request = yield call(getMovies, url);
  
      yield put(fetchDataSuccess(request.data.results, url));
    } catch (error) {
      yield put(fetchDataFailure(error, url));
    }
  }
  
  export function* fetchDataStart() {
    yield takeEvery(MoviesActionType.FETCH_DATA_START, fetchDataAsync);
  }
  
  export function* movieSaga() {
    yield all([call(fetchDataStart)]);
  }