import { all, call } from "redux-saga/effects";
import { movieSaga } from "./movies/movieSaga";
import { searchSagas } from "./search/searchSagas";
import { userSagas } from "./user/userSagas";
import { watchlistSagas } from "./watchlist/watchlistSagas";

export default function* rootSaga() {
  yield all([
    call(movieSaga),
    call(searchSagas),
    call(userSagas),
    call(watchlistSagas),
  ]);
}