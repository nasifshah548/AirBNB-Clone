import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleFullVenue.css";
import Point from "./Point";
import axios from "axios";

const SingleFullVenue = () => {
  const { vid } = useParams();
  const [singleVenue, setSingleVenue] = useState({});
  const [points, setPoints] = useState([]);
  const [numberOfGuests, setNumberOfGuests] = useState(1); // Default to 1 guest
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
        const pointsAxiosResponse = await axios.get(pointsUrl);

        const pointElements = venue.points
          ?.split(",")
          .map((x, index) => (
            <Point key={index} pointDesc={pointsAxiosResponse.data} point={x} />
          ));

        setPoints(pointElements);
      } catch (error) {
        console.error("Error fetching venue:", error);
      }
    };

    fetchVenue();
  }, [vid]);

  const changeNumberOfGuests = (e) => {
    setNumberOfGuests(Number(e.target.value)); // number instead of object
  };

  const changeCheckIn = (e) => {
    setCheckIn(e.target.value); // simple string
  };

  const changeCheckOut = (e) => {
    setCheckOut(e.target.value);
  };

  const reserveNow = () => {
    console.log("Reserve clicked!");
    console.log("Guests:", numberOfGuests);
    console.log("Check-In:", checkIn);
    console.log("Check-Out:", checkOut);
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
            <div className="col s12 center">
              <button onClick={reserveNow} className="btn red accent-2">
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFullVenue;
