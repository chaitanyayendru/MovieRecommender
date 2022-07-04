import {
  clearSearchEntry,
  clearSearchCollections,
  expandSearchInput,
} from "./searchActions";

export const clearSearchData = (dispatch) => {
  dispatch(clearSearchEntry());
  dispatch(clearSearchCollections());
  dispatch(expandSearchInput(false));
};
