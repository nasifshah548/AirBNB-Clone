import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import Spinner from "../../utility/Spinner/Spinner";
import Bookings from "../Bookings/Bookings";
import ChangePassword from "../ChangePassword/ChangePassword";
import "./Account.css";
import AccountSideBar from "./AccountSideBar";

const Account = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [pastBookings, setPastBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!auth?.token) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${window.apiHost}/user/getBookings`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        const { pastBookings, upcomingBookings } = response.data;
        setPastBookings(pastBookings);
        setUpcomingBookings(upcomingBookings);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setError("Unable to load your bookings.");
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [auth, navigate]);

  if (isLoading) return <Spinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="account-page container row">
      <div className="col m3 s12">
        <AccountSideBar />
      </div>
      <div className="col m9 s12 account-content">
        <h2 className="center">Welcome back, {auth?.email}!</h2>
        <Bookings past={pastBookings} upcoming={upcomingBookings} />
        <ChangePassword />
        <div className="last-login center">
          Last login:{" "}
          {DateTime.fromISO(
            auth?.lastLogin || new Date().toISOString()
          ).toLocaleString(DateTime.DATETIME_MED)}
        </div>
      </div>
    </div>
  );
};

export default Account;
