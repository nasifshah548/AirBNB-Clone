import React from "react";
import City from "./City";
import SlickSlider from "../Slider/Slider";

const Cities = (props) => {
  const cities = props.cities.map((x, i) => (
    <div className="col s3" key={i}>
      <City city={x} />
    </div>
  ));

  return <SlickSlider elements={cities} />;
};

export default Cities;
