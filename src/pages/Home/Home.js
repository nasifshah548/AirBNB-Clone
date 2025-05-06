import React, { Component } from "react";
import "./Home.css";
import SearchBox from "./SearchBox";
import Spinner from "../../utility/Spinner/Spinner";
import axios from "axios";
import Cities from "../../utility/City/Cities";

class Home extends Component {
  state = {
    cities: [],
    europeanCities: {},
    asianCities: {},
    exoticCities: {},
  };
  async componentDidMount() {
    const citiesUrl = `${window.apiHost}/cities/recommended`;
    const europeanCitiesUrl = `${window.apiHost}/cities/europe`;
    const asianCitiesUrl = `${window.apiHost}/cities/asia`;
    const exoticCitiesUrl = `${window.apiHost}/cities/exotic`;

    const citiesPromises = [];

    // Maxing the API requests to multiple URLs using Axios

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
  }
  render() {
    if (this.state.cities.length === 0) {
      return <Spinner />;
    }

    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="home col s12">
              <div className="upper-fold">
                <SearchBox />
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
              <Cities
                cities={this.state.europeanCities.cities}
                header={this.state.europeanCities.header}
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
