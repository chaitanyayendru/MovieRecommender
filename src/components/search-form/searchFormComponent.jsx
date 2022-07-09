import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Form from "react-bootstrap/Form";

import SearchDropdown from "../search-dropdown/searchDropdownComponent";
import { styled, alpha } from '@mui/material/styles';

import {
  selectMoviesCollection,
  selectSearchInput,
  selectIsSearchExpanded,
} from "../../redux/search/searchSelectors";

import Search from "../search/searchComponent";
const SearchStyledForm = styled('Form')(({ theme }) => ({
  position: 'relative',
  inline: 'true',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchForm = ({ collections, searchEntry, isSearchExpanded }) => {
  return (
    <SearchStyledForm>
      <Search searchEntry={searchEntry} isSearchExpanded={isSearchExpanded} />
      <SearchDropdown collections={collections} searchEntry={searchEntry} />
    </SearchStyledForm>
        );
};

const mapStateToProps = createStructuredSelector({
  collections: selectMoviesCollection,
  searchEntry: selectSearchInput,
  isSearchExpanded: selectIsSearchExpanded,
});

export default connect(mapStateToProps)(SearchForm);
