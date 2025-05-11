import React from "react";
import Venue from "./Venue";
import "./Venue.css";

function Venues(props) {
  console.log(props);
  const venues = props.venues.map((x, index) => {
    // console.log(venue);
    return (
      <div key={index} className="col m6 l3">
        <Venue venue={x} />
      </div>
    );
  });
  return (
    <div className="venues">
      <h1 className="main-header-text">{props.header}</h1>
      <div className="row">{venues}</div> {/* Wrap the venue cards in a row */}
    </div>
  );
}

export default Venues;
