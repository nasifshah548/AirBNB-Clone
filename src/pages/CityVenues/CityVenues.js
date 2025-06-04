import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CityVenues.css";
import axios from "axios";
import Spinner from "../../utility/Spinner/Spinner";
import Venues from "../../utility/Venue/Venues";

const CityVenues = () => {
  const { cityName } = useParams(); // ⬅️ Grab the URL param
  const [venues, setVenues] = useState([]);
  const [header, setHeader] = useState("");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const url = `${window.apiHost}/venues/city/${cityName}`;
        const response = await axios.get(url);
        setVenues(response.data.venues);
        setHeader(response.data.header);
      } catch (err) {
        console.error("Error fetching venues:", err);
      }
    };

    fetchVenues();
  }, [cityName]);

  if (!header) {
    return <Spinner />;
  }

  return (
    <div className="col s12">
      <Venues venues={venues} header={header} />
    </div>
  );
};

export default CityVenues;
