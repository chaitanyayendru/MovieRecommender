import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Form from "react-bootstrap/Form";

import SearchDropdown from "../search-dropdown/searchDropdownComponent";

import {
  selectMoviesCollection,
  selectSearchInput,
  selectIsSearchExpanded,
} from "../../redux/search/searchSelectors";

import Search from "../search/searchComponent";

const SearchForm = ({ collections, searchEntry, isSearchExpanded }) => {
  return (
    <Form inline="true">
      <Search searchEntry={searchEntry} isSearchExpanded={isSearchExpanded} />
      <SearchDropdown collections={collections} searchEntry={searchEntry} />
    </Form>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectMoviesCollection,
  searchEntry: selectSearchInput,
  isSearchExpanded: selectIsSearchExpanded,
});

export default connect(mapStateToProps)(SearchForm);
