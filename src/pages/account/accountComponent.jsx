import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import Logo from "../../static/assets/logo.png";
import AccountForm from "../../components/account-form/accountFormComponent";

const AccountsPage = () => {
  const history = useNavigate();
  return (
    <div className="account">
      <div className="form-page">
        <Helmet>
          <body class="light-bg"></body>
        </Helmet>
        <Container>
          <img src={Logo} alt="logo" onClick={() => history("/")} />
          <div className="main">
            <h3 className="title">Login & Security</h3>
            <div className="form-container">
              <AccountForm />
              <div className="spacing"></div>
            </div>
            <Button className="done" onClick={() => history("/")}>
              Done
            </Button>
          </div>
        </Container>
        <div className="divider-section">
          <div className="divider-inner"></div>
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
