import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import searchReducers from "./search/searchReducers";
import movieReducer from "./movies/movieReducer";
import userReducers from "./user/userReducers";
import watchlistReducers from "./watchlist/watchlistReducers";
const persistConfig = {
    key: "root",
    storage,
  };
const mainReducer = combineReducers({
  search: searchReducers,
  movies: movieReducer,
  user: userReducers,
  watchlist: watchlistReducers
});
// https://dev.to/dawnind/persist-redux-state-with-redux-persist-3k0d
export default persistReducer(persistConfig,mainReducer)
  