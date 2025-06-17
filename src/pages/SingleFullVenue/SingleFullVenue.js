import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleFullVenue.css";
import Point from "./Point";
import axios from "axios";
import { connect } from "react-redux";
import openModal from "../../actions/openModal";
import { bindActionCreators } from "redux";
import Login from "../Login/Login";
import { DateTime } from "luxon";
import swal from "sweetalert";
import loadScript from "../../utilityFunctions/loadScript";

const SingleFullVenue = (props) => {
  const { vid } = useParams();
  const [singleVenue, setSingleVenue] = useState({});
  const [points, setPoints] = useState([]);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const url = `${window.apiHost}/venue/${vid}`;
        const response = await axios.get(url);
        const venue = response.data;
        setSingleVenue(venue);

        const pointsUrl = `${window.apiHost}/points/get`;
        const pointsResponse = await axios.get(pointsUrl);

        const pointElements = venue.points
          ?.split(",")
          .map((x, index) => (
            <Point key={index} pointDesc={pointsResponse.data} point={x} />
          ));

        setPoints(pointElements);
      } catch (error) {
        console.error("Error fetching venue:", error);
      }
    };

    fetchVenue();
  }, [vid]);

  const changeNumberOfGuests = (e) => setNumberOfGuests(Number(e.target.value));
  const changeCheckIn = (e) => setCheckIn(e.target.value);
  const changeCheckOut = (e) => setCheckOut(e.target.value);

  const reserveNow = async () => {
    console.log("Reserve clicked!");
    console.log("Guests:", numberOfGuests);
    console.log("Check-In:", checkIn);
    console.log("Check-Out:", checkOut);

    const checkInDate = DateTime.fromISO(checkIn);
    const checkOutDate = DateTime.fromISO(checkOut);

    if (!checkInDate.isValid || !checkOutDate.isValid) {
      swal({
        title: "Please make sure that the dates entered are valid!",
        icon: "error",
      });
      return;
    }

    const diffDays = Math.ceil(checkOutDate.diff(checkInDate, "days").days);

    if (diffDays < 1) {
      swal({
        title: "Check Out date must be after Check In date",
        icon: "error",
      });
      return;
    }

    const pricePerNight = singleVenue.pricePerNight;
    const totalPrice = diffDays * pricePerNight;
    const scriptUrl = "https://js.stripe.com/v3";
    const stripePublickKey =
      "pk_test_5198HtPL5CfCPYJ3X8TTrO06ChWxotTw6Sm2el4WkYdrfN5Rh7vEuVguXyPrTezvm3ntblRX8TpjAHeMQfHkEpTA600waD2fMrT";

    // Loading Stripe Script
    await loadScript(scriptUrl); // We dont need a variable, we just need to wait

    const stripe = window.Stripe(stripePublickKey); // Invoking Stripe
    const stripeSessionUrl = `${window.apiHost}/payment/create-session`;
    const data = {
      venueData: props.singleVenue,
      totalPrice,
      diffDays,
      pricePerNight,
      checkIn: props.checkIn,
      checkOut: props.checkOut,
      token: props.auth.token,
      currency: "CAD",
    };

    const sessionVar = await axios.post(stripeSessionUrl, data);
    // console.log(sessionVar);
    stripe.redirectToCheckout({
      sessionID: sessionVar.data.id,
    }).then((response) => {
      
    });

    swal({
      title: `Total price: C$${totalPrice.toFixed(2)} for ${diffDays} night(s)`,
      icon: "info",
    });

    // Continue to booking flow...
  };

  return (
    <div className="row single-venue">
      <div className="col s12 center">
        <img src={singleVenue.imageUrl} alt="Venue" />
      </div>

      <div className="col s8 location-details">
        <div className="col s8 left-details">
          <div className="location">{singleVenue.location}</div>
          <div className="title">{singleVenue.title}</div>
          <div className="guests">{singleVenue.guests}</div>
          <div className="divider"></div>
          {points}
          <div className="details">{singleVenue.details}</div>
          <div className="amenities">{singleVenue.amenities}</div>
        </div>

        <div className="col s4 right-details">
          <div className="price-per-day">
            C${singleVenue.pricePerNight} <span>per day</span>
            <div className="rating">{singleVenue.rating}</div>
            <div className="col s6">
              Check-In
              <input type="date" value={checkIn} onChange={changeCheckIn} />
            </div>
            <div className="col s6">
              Check-Out
              <input type="date" value={checkOut} onChange={changeCheckOut} />
            </div>
            <div className="col s12">
              <select
                className="browser-default"
                value={numberOfGuests}
                onChange={changeNumberOfGuests}
              >
                {[...Array(8)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
            <div className="col s12 center" style={{ marginTop: "20px" }}>
              {props.auth?.token ? (
                <button onClick={reserveNow} className="btn red accent-2">
                  Reserve
                </button>
              ) : (
                <div>
                  You must{" "}
                  <span
                    className="text-link"
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => props.openModal("open", <Login />)}
                  >
                    log in
                  </span>{" "}
                  to reserve!
                </div>
              )}
            </div>
          </div>
        </div>
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
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleFullVenue);
