import React from "react";
import { useMatch } from "react-router-dom";

import { useWindowSize } from "../../../redux/movies/movieUtil";

const Footer = () => {
  const [windowWidth, windowHeight] = useWindowSize();

  let signUpUrlMatch = useMatch("/sign-up");
  let signInUrlMatch = useMatch("/sign-in");

  return (
    <footer
      className={`${
        windowWidth && windowHeight < 750 && (signUpUrlMatch || signInUrlMatch)
          ? "hide-display"
          : "footer"
      } `}
    >
      <div className="footer__copyright">
        <span role="img" aria-label="footer">
          &copy; 2020 Made with ❤️ by {""}
          <a
            href="https://www.linkedin.com/in/chaitanyayendru/"
            target="_blank"
            without="true"
            rel="noopener noreferrer"
          >
            {"Chaitanya Yendru"}
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
