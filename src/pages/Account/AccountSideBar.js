import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AccountSideBar.css";

const AccountSideBar = () => {
  const { pathname } = useLocation();

  const navItems = [
    {
      to: "/account/reservations/confirmed",
      label: "Confirmed Bookings",
    },
    {
      to: "/account/reservations/past",
      label: "My Past Bookings",
    },
    {
      to: "/account/change-pass",
      label: "Change Password",
    },
  ];

  return (
    <aside className="account-sidebar card-panel sidenav sidenav-fixed">
      <h5 className="sidebar-title">Account Settings</h5>

      <div className="user-view center-align">
        <img
          className="profile-img"
          src="https://airbnb-clone-prexel-images.s3.amazonaws.com/genericAvatar.png"
          alt="Profile"
        />
      </div>

      <ul className="collection">
        {navItems.map((x, index) => (
          <li
            key={index}
            className={`collection-item ${
              pathname === x.to ? "active-link" : ""
            }`}
          >
            <Link to={x.to}>{x.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AccountSideBar;
