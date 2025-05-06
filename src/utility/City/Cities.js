import React from "react";
import City from "./City";
import SlickSlider from "../Slider/Slider";

const Cities = (props) => {
  const cities = props.cities.map((x, i) => (
    <div className="col s3" key={i}>
      <City city={x} />
    </div>
  ));

  return (
    <div className="cities-wrapper">
      <h1 className="main-header-text">{props.header}</h1>
      <SlickSlider elements={cities} />
    </div>
  );
};

export default Cities;
