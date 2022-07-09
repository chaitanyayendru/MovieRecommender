import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import FormControl from "react-bootstrap/FormControl";
import SearchIcon from '@mui/icons-material/Search';

import {
  searchInput,
  fetchSearchMovieStart,
  expandSearchInput,
} from "../../redux/search/searchActions";

import {
  SearchButtonSvg,
  DropDownIconSvg,
} from "../layout/header/headerSvgsComponent";


import { clearSearchData } from "../../redux/search/searchUtil";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const Search = ({ searchEntry, isSearchExpanded }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery.length > 0) {
      dispatch(searchInput(searchQuery));
      dispatch(fetchSearchMovieStart());
    } else {
      clearSearchData(dispatch);
    }
  }, [searchQuery, dispatch]);

  return (
    <>
    <StyledInputBase
      placeholder="Search…"
      inputProps={{ 'aria-label': 'search' }}
      onChange={(e) => setSearchQuery(e.target.value)}
      className={`${isSearchExpanded ? "search-sm" : null}`}>
                <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            </StyledInputBase>
      {/* <div className="search-category-selector">
        <span>All</span>
        <DropDownIconSvg />
      </div> */}
      {/* <div className="search-input-container">
        <FormControl
          type="text"
          placeholder="Search IMDb"
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`${isSearchExpanded ? "search-sm" : null}`}
        /> */}
        {/* <FontAwesomeIcon
          icon={faTimes}
          color="white"
          size="1x"
          className={`${
            isSearchExpanded
              ? "cancel-search-expanded cancel-search"
              : "cancel-search"
          }`}
          onClick={() => {
            clearSearchData(dispatch);
            dispatch(expandSearchInput(false));
          }}
        /> */}
      {/* </div> */}

      {/* <div className="search-btn-container">
        <button
          type="button"
          className={`${
            isSearchExpanded ? "display-none search-button" : "search-button"
          }`}
          onClick={() => dispatch(expandSearchInput(true))}
        >
          <SearchButtonSvg />
        </button>
      </div>
      <div
        className={`${searchEntry && !isSearchExpanded ? "overlay" : null}`}
        onClick={() => clearSearchData(dispatch)}
      ></div> */}
    </>
  );
};

export default Search;
