import React, { useState } from "react";
// import SideNav, { MenuIcon } from "react-simple-sidenav";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import {
  HamburgerMenuSvg,
} from "../layout/header/headerSvgsComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm,
  faTv,
  faGlobe,
  faAward,
  faUserFriends,
  faVideo,
  faTimes,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  {
    title: "Movies",
    svg: faFilm,
  },
  {
    title: "TV Shows",
    svg: faTv,
  },
  {
    title: "Awards & Event",
    svg: faAward,
  },
  {
    title: "Celebs",
    svg: faUserFriends,
  },
  {
    title: "Videos",
    svg: faVideo,
  },
  {
    title: "Community",
    svg: faGlobe,
  },
];

const SideNavContainer = ({ isSearchExpanded }) => {
  const [showNav, setShowNav] = useState(false);
  const showSidebar = () => setShowNav(!showNav);

  return (
    <div className={`${isSearchExpanded ? "display-none sidenav" : "sidenav"}`}>
      <div className="navbar" onClick={showSidebar}>
        <Link to="#" className="menu-bars">
        <HamburgerMenuSvg/>
          <span>Menu</span>
        </Link>
      </div>
      <nav className={showNav ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {menuItems.map(({ title, svg }, index) => {
            return (
              <li key={index} className="nav-text">
                <Link to="/">
                  <FontAwesomeIcon icon={svg} color="white" size="1x" />
                  <span>{title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SideNavContainer;
