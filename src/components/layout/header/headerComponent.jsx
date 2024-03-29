import React from "react";
import { useMatch } from "react-router-dom";

import { useWindowSize } from "../../../redux/movies/movieUtil";

import NavigBar from "./navbar/nav/navComponent";

const Header = () => {
  const [windowWidth] = useWindowSize();

  let signUpUrlMatch = useMatch("/sign-up");
  let signInUrlMatch = useMatch("/sign-in");
  let accountUrlMatch = useMatch("/account");
  let notFoundMatch = useMatch("/404");

  return (
    <div
      className={`${
        (windowWidth < 600 && (signUpUrlMatch || signInUrlMatch)) ||
        (accountUrlMatch || notFoundMatch)
          ? "display-none hide-display"
          : "header"
      }`}
    >
      <NavigBar />
    </div>
  );
};

export default Header;
