import React, { Component } from "react";
import "./Home.css";
import SearchBox from "./SearchBox";
import Spinner from "../../utility/Spinner/Spinner";
import axios from "axios";
import Cities from "../../utility/City/Cities";
import Activities from "../../utility/Activity/Activities";
import Venues from "../../utility/Venue/Venues";

class Home extends Component {
  state = {
    cities: [],
    europeanCities: {},
    asianCities: {},
    exoticCities: {},
    activities: [],
    recVenues: {
      venues: [],
      header: "",
    },
  };
  async componentDidMount() {
    const citiesUrl = `${window.apiHost}/cities/recommended`;
    const europeanCitiesUrl = `${window.apiHost}/cities/europe`;
    const asianCitiesUrl = `${window.apiHost}/cities/asia`;
    const exoticCitiesUrl = `${window.apiHost}/cities/exotic`;

    const citiesPromises = [];

    // Making the API requests to multiple URLs using Axios

    citiesPromises.push(axios.get(citiesUrl));
    citiesPromises.push(axios.get(europeanCitiesUrl));
    citiesPromises.push(axios.get(asianCitiesUrl));
    citiesPromises.push(axios.get(exoticCitiesUrl));

    // Promise API

    Promise.all(citiesPromises).then((responseData) => {
      const recommendedCities = responseData[0].data;
      const europeanCities = responseData[1].data;
      const asianCities = responseData[2].data;
      const exoticCities = responseData[3].data;
      this.setState({
        cities: recommendedCities,
        europeanCities,
        asianCities,
        exoticCities,
      });
    });

    const activitiesUrl = `${window.apiHost}/activities/today`;
    const activities = await axios(activitiesUrl);
    this.setState({
      activities: activities.data,
    });

    const recVenuesUrl = `${window.apiHost}/venues/recommended`;
    const venues = await axios(recVenuesUrl);
    this.setState({
      recVenues: venues.data,
    });
  }
  render() {
    if (
      this.state.cities.length === 0 ||
      !this.state.recVenues ||
      !this.state.recVenues.venues
    ) {
      return <Spinner />;
    }

    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="home col s12">
              <div className="upper-fold">
                <SearchBox history={this.props.history} />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid lower-fold">
          <div className="row">
            <div className="col s12">
              <Cities
                cities={this.state.cities}
                header="Recommeneded Cities For You"
              />
            </div>
            <div className="col s12">
              <Activities
                activities={this.state.activities}
                header="Today in your area"
              />
            </div>
            <div className="col s12">
              <Cities
                cities={this.state.europeanCities.cities}
                header={this.state.europeanCities.header}
              />
            </div>
            <div className="col s12">
              <Venues
                venues={this.state.recVenues?.venues || []}
                header={this.state.recVenues?.header || "Recommended Venues"}
              />
            </div>
            <div className="col s12">
              <Cities
                cities={this.state.asianCities.cities}
                header={this.state.asianCities.header}
              />
            </div>
            <div className="col s12">
              <Cities
                cities={this.state.exoticCities.cities}
                header={this.state.exoticCities.header}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
