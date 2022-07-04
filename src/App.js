import React, { useEffect, lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { ToastContainer, Slide } from "react-toastify";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/layout/header/headerComponent";
import Footer from "./components/layout/footer/footerComponent";
import Spinner from "./components/spinner/spinnerComponent";

import { selectCurrentUser } from "./redux/user/userSelectors";
import { checkUserSession } from "./redux/user/userActions";
import AccountsPage from "./pages/account/accountComponent";
import EditAccount from "./components/edit-account/editAccountComponent";
import ResetPassword from "./components/reset-password/resetPasswordComponent";

const HomePage = lazy(() => import("./pages/homepage/homepageComponent"));
const RegistrationPage = lazy(() =>
  import("./pages/registration/registrationComponent")
);
const SignUpPage = lazy(() => import("./pages/sign-up/signUpComponent"));
const SignInPage = lazy(() => import("./pages/sign-in/signInComponent"));
const WatchlistPage = lazy(() =>
  import("./pages/watchlist/watchlistComponent")
);
const NotFoundPage = lazy(() =>
  import("./pages/not-found/notFoundPageComponent")
);
const ErrorBoundary = lazy(() =>
  import("./components/error-boundary/errorBoundaryComponent")
);



function App({ checkUserSession, currentUser }) {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    
    <div className="App">
      <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar= {true}
closeOnClick= {true}
pauseOnHover= {true}
draggable= {true}
progress= {undefined}
transition= {Slide}
>
</ToastContainer>
      <Header />
      <Suspense fallback={<Spinner />}>
        <ErrorBoundary>
          <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route
              exact
              path="/register/sign-in"
              element = {
                currentUser ? (
                  <Navigate to="/" checkUserSession />
                ) : (
                  <RegistrationPage />
                )
              }
            />
            <Route
              exact
              path="/sign-in"
              element = {
                currentUser ? (
                  <Navigate to="/" checkUserSession />
                ) : (
                  <SignInPage />
                )
              }
            />
            <Route
              path="/sign-up"
              element = {
                currentUser ? (
                  <Navigate to="/" checkUserSession />
                ) : (
                  <SignUpPage />
                )
              }
            />
            <Route
              path="/watchlist"
              element = {
                !currentUser ? (
                  <Navigate to="/register/sign-in" checkUserSession />
                ) : (
                  <WatchlistPage />
                )
              }
            />
            <Route
              exact
              path="/account"
              element = {
                !currentUser ? (
                  <Navigate to="/" checkUserSession />
                ) : (
                  <AccountsPage />
                )
              }
            />
            <Route
              path="/account/edit/:info"
              element = {
                !currentUser ? (
                  <Navigate to="/" checkUserSession />
                ) : (
                  <EditAccount />
                )
              }
            />
            <Route path="/account/reset-password" element={ResetPassword} />
            <Route path="/404" element={<NotFoundPage/>} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
      <Footer />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
