import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../utility/Spinner/Spinner";
import Cities from "../../utility/City/Cities";
import Activities from "../../utility/Activity/Activities";
import Venues from "../../utility/Venue/Venues";
import "./Search.css";
import "../Home/Home.css";

const Search = () => {
  const { searchTerm } = useParams(); // ✅ React Router V6 hook
  const [cities, setCities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [venues, setVenues] = useState([]);
  const [apiResponse, setApiResponse] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${window.apiHost}/search/${searchTerm}`;
        const response = await axios.get(url);

        setCities(response.data.cities || []);
        setActivities(response.data.activities || []);
        setVenues(response.data.venues || []);
        setApiResponse(true);
      } catch (err) {
        console.error("Search fetch failed:", err);
        setApiResponse(true); // Still stop the spinner even on error
      }
    };

    fetchData();
  }, [searchTerm]);

  if (!apiResponse) return <Spinner />;

  return (
    <div className="container-fluid lower-fold">
      <div className="row">
        <div className="col s12">
          <Cities cities={cities} header="Cities Matching Your Search" />
        </div>
        <div className="col s12">
          <Activities
            activities={activities}
            header="Activities Matching Your Search"
          />
        </div>
        <div className="col s12">
          <Venues venues={venues} header="Venues Matching Your Search" />
        </div>
      </div>
    </div>
  );
};

export default Search;
