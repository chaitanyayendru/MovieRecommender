import React from "react";
import { useNavigate, useMatch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Container from "react-bootstrap/Container";

import Logo from "../../static/assets/logo.png";
import EditAccountForm from "./editAccountFormComponent";

const EditAccount = () => {
  const history = useNavigate();
  const match = useMatch();

  const matchNameUrl = match.url.includes("name");
  const matchEmailUrl = match.url.includes("email");

  const fetchTitle = () => {
    if (matchNameUrl) {
      return "name";
    } else if (matchEmailUrl) {
      return "email";
    } else {
      return "password";
    }
  };

  return (
    <div className="edit-account">
      <div className="form-page">
        <Helmet>
          <body class="light-bg"></body>
        </Helmet>
        <Container>
          <img src={Logo} alt="logo" onClick={() => history("/")} />
          <div className="main">
            <h3 className="title">Change your {fetchTitle()}</h3>
            <div className="form-container">
              <EditAccountForm data={fetchTitle()} />
              <div className="spacing"></div>
            </div>
          </div>
        </Container>
        <div className="divider-section">
          <div className="divider-inner"></div>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
