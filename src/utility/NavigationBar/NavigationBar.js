import React from "react";
import "./NavigationBar.css";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
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
                <Link to="/">$ USD</Link>
              </li>
              <li>
                <Link to="/">Become a host</Link>
              </li>
              <li>
                <Link to="/">Help</Link>
              </li>
              <li>
                <Link to="/">Sign up</Link>
              </li>
              <li>
                <Link to="/">Log in</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavigationBar;
