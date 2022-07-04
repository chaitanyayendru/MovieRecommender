import {
  call,
  all,
  put,
  select,
  fork,
  take,
  takeLatest,
  cancel,
} from "redux-saga/effects";

import { selectSearchInput } from "./searchSelectors";

import { searchParamsMovies } from "./../../api/tmdbApi";

import {
  fetchSearchMovieSuccess,
  fetchSearchMovieFailure,
} from "./searchActions";

import SearchActionType from "./searchTypes";

export function* searchMovies(input) {
  try {
    const request = yield call(searchParamsMovies, input);
    const results = request.data.results;
    yield put(fetchSearchMovieSuccess(results));
  } catch (error) {
    yield put(fetchSearchMovieFailure(error));
  }
}

export function* cancelTask(task, type) {
  const action = yield take([type]);
  if (type === "CLEAR_SEARCH_COLLECTIONS") {
    yield cancel(task);
  }
}

export function* fetchSearchMovieAsync() {
  const searchInput = yield select(selectSearchInput);

  if (!!searchInput && searchInput.trim() !== "") {
    const task = yield fork(searchMovies, searchInput);

    // cancel the pending search api call when the below action gets triggered
    yield call(cancelTask, task, "CLEAR_SEARCH_COLLECTIONS");
  }
}

export function* fetchSearchMovieStart() {
  yield takeLatest(
    SearchActionType.FETCH_SEARCH_MOVIE_START,
    fetchSearchMovieAsync
  );
}

export function* searchSagas() {
  yield all([call(fetchSearchMovieStart)]);
}
