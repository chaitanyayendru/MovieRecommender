import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {Container} from 'react-bootstrap';

import { useSelector } from "react-redux";
import {Badge} from "react-bootstrap"
import {Navbar} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import {
  HamburgerMenuSvg,
  ImdbProSvg,
  WatchlistSvg,
} from "../../headerSvgsComponent";

import SearchForm from "../../../../search-form/searchFormComponent";
import { selectWatchlistItems } from "../../../../../redux/watchlist/watchlistSelectors";
import ProfileDropdown from "../../../../auth/profile-dropdown/profileDropdownComponent";

const NavLinks = ({ currentUser, signOutStart, isSearchExpanded }) => {
  const watchlistItems = useSelector(selectWatchlistItems);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <Navbar>
      <Container>
      <div
        className={`${toggleDropdown ? "overlay" : "hide-display"}`}
        onClick={() => setToggleDropdown(!toggleDropdown)}
      ></div>
      <NavLink to="" className="hide-responsive">
      <SearchForm />
      </NavLink>
      <NavLink to="" className="hide-responsive">
        <ImdbProSvg />
      </NavLink>
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
            <FontAwesomeIcon icon={faUserCircle} size="lg" />
            <span className="hide-responsive">
              {!!currentUser.displayName
                ? currentUser.displayName.split(" ")[0]
                : ""}
            </span>
            <FontAwesomeIcon
              icon={faCaretDown}
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
      </Container>
    </Navbar>
  );
};

export default NavLinks;
