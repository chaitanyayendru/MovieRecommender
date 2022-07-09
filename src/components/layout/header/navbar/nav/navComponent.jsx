import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { NavLink } from "react-router-dom";
import { FormControl } from "@mui/material";
import {
  selectMoviesCollection,
  selectSearchInput,
} from "../../../../../redux/search/searchSelectors";
import Logo from "../../../../../static/assets/logo.png";
import { getSingleDecimalValue } from "../../../../../redux/movies/movieUtil";
import { selectWatchlistItems } from "../../../../../redux/watchlist/watchlistSelectors";
import WatchlistBtn from "../../../../../components/watchlist-btn/watchlistBtnComponent";
import {
  searchInput,
  fetchSearchMovieStart,
  expandSearchInput,
} from "../../../../../redux/search/searchActions";
import { clearSearchData } from "../../../../../redux/search/searchUtil";

import { selectIsSearchExpanded } from "../../../../../redux/search/searchSelectors";
import { selectCurrentUser } from "../../../../../redux/user/userSelectors";
import { signOutStart } from "../../../../../redux/user/userActions";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ArrowDropDownCircleRoundedIcon from "@mui/icons-material/ArrowDropDownCircleRounded";
import MovieFilterRoundedIcon from "@mui/icons-material/MovieFilterRounded";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import CollectionsBookmarkRoundedIcon from "@mui/icons-material/CollectionsBookmarkRounded";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  HamburgerMenuSvg,
  ImdbProSvg,
  WatchlistSvg,
} from "../../headerSvgsComponent";

import SearchForm from "../../../../search-form/searchFormComponent";
import ProfileDropdown from "../../../../auth/profile-dropdown/profileDropdownComponent";
import { styled, alpha } from "@mui/material/styles";
import { Icon } from "@mui/material";

const menuItems = [
  {
    title: "Movies",
    svg: <MovieFilterRoundedIcon />,
  },
  {
    title: "TV Shows",
    svg: <LiveTvRoundedIcon />,
  },
  {
    title: "Celebs",
    svg: <PeopleOutlineRoundedIcon />,
  },
  {
    title: "Collections",
    svg: <CollectionsBookmarkRoundedIcon />,
  },
];

const NavigBar = ({ isSearchExpanded, currentUser, signOutStart }) => {
  const watchlistItems = useSelector(selectWatchlistItems);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const showSidebar = () => setShowNav(!showNav);
  const history = useNavigate();

  return (
    <Box
      sx={{ flexGrow: 1 }}
      className={`${
        isSearchExpanded ? "navbar-search-sm navbar-custom" : "navbar-custom"
      }`}
      variant="dark"
    >
      <AppBar
        position="sticky"
        style={{ background: "transparent", boxShadow: "none", elevation: 0 }}
      >
        <Toolbar>
          <div className="navbar" onClick={showSidebar}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <Link to="#" className="menu-bars">
                <MenuIcon />
              </Link>
            </IconButton>
          </div>
          <nav className={showNav ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <CloseRoundedIcon />
                </Link>
              </li>
              {menuItems.map(({ title, svg }, index) => {
                return (
                  <li key={index} className="nav-text">
                    <Link to="/">
                      {svg}
                      <span>{title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => history("/")}
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Movie Genie
          </Typography>
          <SearchForm />
          <div className="verticle-line hide-responsive"></div>
          <NavLink to="/watchlist" className="watchlist hide-responsive">
            <WatchlistSvg />
            <span>Watchlist</span>
            <span
              className={`${
                !!watchlistItems && watchlistItems.length
                  ? "watchlist-cart"
                  : "hide-display"
              }`}
            >
              {watchlistItems.length}
            </span>
          </NavLink>
          {currentUser ? (
            <div className="profile">
              <div
                className={`${isSearchExpanded ? "display-none" : "sign-out"}`}
                onClick={() => setToggleDropdown(!toggleDropdown)}
              >
                <AccountCircleRoundedIcon size="lg" />
                <span className="hide-responsive">
                  {!!currentUser.displayName
                    ? currentUser.displayName.split(" ")[0]
                    : ""}
                </span>
                <ArrowDropDownCircleRoundedIcon
                  size="sm"
                  className="hide-responsive"
                />
              </div>
              <ProfileDropdown
                signOutStart={signOutStart}
                toggleDropdown={toggleDropdown}
                currentUser={currentUser}
              />
            </div>
          ) : (
            <NavLink
              to="/register/sign-in"
              className={`${isSearchExpanded ? "display-none" : null}`}
              onClick={() => setToggleDropdown(false)}
            >
              <span>Sign In</span>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  isSearchExpanded: selectIsSearchExpanded,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigBar);
