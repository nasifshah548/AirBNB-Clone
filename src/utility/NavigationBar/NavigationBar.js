import React, { useEffect } from "react";
import "./NavigationBar.css";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import openModal from "../../actions/openModal";
import logOutAction from "../../actions/logOutAction";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/Login/SignUp";

const NavigationBar = ({ auth, openModal, logOutAction }) => {
  const location = useLocation();
  const navColour = location.pathname !== "/" ? "black" : "transparent";

  useEffect(() => {
    openModal("closed", "");
  }, [auth.token, openModal]); // Run this effect only when auth.token changes

  return (
    <div className="container-fluid nav">
      <div className="row">
        <nav className={navColour}>
          <div className="nav-wrapper">
            <Link to="/" className="left">
              AirBNB
            </Link>
            <ul id="nav-mobile" className="right">
              <li>
                <Link to="/">English</Link>
              </li>
              <li>
                <Link to="/">$ CAD</Link>
              </li>
              <li>
                <Link to="/">Become a host</Link>
              </li>
              <li>
                <Link to="/">Help</Link>
              </li>
              {auth?.email ? (
                <>
                  <li>Hello, {auth.email}</li>
                  <li onClick={logOutAction}>Logout</li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      className="login-signup"
                      onClick={() => openModal("open", <SignUp />)}
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="login-signup"
                      onClick={() => openModal("open", <Login />)}
                    >
                      Log in
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openModal,
      logOutAction,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
