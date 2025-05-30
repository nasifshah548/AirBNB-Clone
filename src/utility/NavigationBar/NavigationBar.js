import React from "react";
import "./NavigationBar.css";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import openModal from "../../actions/openModal";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/Login/SignUp";

const NavigationBar = (props) => {
  const location = useLocation();
  let navColour = location.pathname !== "/" ? "black" : "transparent";

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
              <li>
                <Link
                  className="login-signup"
                  onClick={() => {
                    props.openModal("open", <SignUp />);
                  }}
                >
                  Sign Up
                </Link>
                <Link
                  className="login-signup"
                  onClick={() => {
                    props.openModal("open", <Login />);
                  }}
                >
                  Log in
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatcher) {
  return bindActionCreators({
    openModal: openModal,
  });
}

export default connect(null, mapDispatchToProps)(NavigationBar);
