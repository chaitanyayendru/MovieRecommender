import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectIsSearchExpanded } from "../../../../redux/search/searchSelectors";
import { selectCurrentUser } from "../../../../redux/user/userSelectors";
import { signOutStart } from "../../../../redux/user/userActions";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import Logo from "../../../../static/assets/logo.png";

import SideNavContainer from "../../../sidenav/sidenavComponent";
import NavLinks from "./nav/navComponent";

const NavBar = ({ isSearchExpanded, currentUser, signOutStart }) => {
  const history = useNavigate();

  return (
    <Navbar
      className={`${
        isSearchExpanded ? "navbar-search-sm navbar-custom" : "navbar-custom"
      }`}
      variant="dark"
    >
      <Container>
        <SideNavContainer isSearchExpanded={isSearchExpanded} />
        <Navbar.Brand>
          <img
            className={`${isSearchExpanded ? "display-none logo" : "logo"}`}
            src={Logo}
            alt="logo"
            onClick={() => history("/")}
          />
        </Navbar.Brand>
        <NavLinks
          currentUser={currentUser}
          signOutStart={signOutStart}
          isSearchExpanded={isSearchExpanded}
        />
      </Container>
    </Navbar>
  );
};

const mapStateToProps = createStructuredSelector({
  isSearchExpanded: selectIsSearchExpanded,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
