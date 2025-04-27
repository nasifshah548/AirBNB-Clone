import React, { Component } from "react";
import "./SearchBox.css";

class SearchBox extends Component {
  state = {
    where: "",
    checkIn: "",
    checkOut: "",
    guests: 0,
  };

  changeWhere = (e) => {
    this.setState({ where: e.target.value });
  };

  changeCheckIn = (e) => {
    this.setState({ checkIn: e.target.value });
  };

  changeCheckOut = (e) => {
    this.setState({ checkOut: e.target.value });
  };

  changeGuests = (e) => {
    this.setState({ guests: e.target.value });
  };

  render() {
    return (
      <div className="home-search-box col m4">
        <h1>Book unique places to stay and things to do.</h1>
        <form className="search-box-form">
          <div className="col m12">
            <div className="form-label">Where</div>
            <div className="input-field" id="where">
              <input
                onChange={this.changeWhere}
                placeholder="Anywhere"
                value={this.state.where}
                type="text"
              />
            </div>
          </div>
          <div className="col m6">
            <div className="form-label">Check-In</div>
            <div className="input-field" id="check-in">
              <input
                onChange={this.changeCheckIn}
                placeholder="Anywhere"
                value={this.state.checkIn}
                type="date"
              />
            </div>
          </div>
          <div className="col m6">
            <div className="form-label">Check-Out</div>
            <div className="input-field" id="check-out">
              <input
                onChange={this.changeCheckOut}
                placeholder="Anywhere"
                value={this.state.checkOut}
                type="date"
              />
            </div>
          </div>
          <div className="col m12">
            <div className="form-label">Guests</div>
            <div className="input-field" id="guests">
              <input
                onChange={this.changeGuests}
                placeholder="Anywhere"
                value={this.state.guests}
                type="number"
              />
            </div>
          </div>
          <div className="col m12 submit-btn">
            <div className="input-field" id="submit-btn">
              <input
                className="btn-large waves-effect waves-light red accent-2"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBox;

// This component is a Search Box Card on the Homepage of the app. It will let the users enter
// the location they're visiting. The check in and out dates from that location and the number
// of people visiting that location so after entering these data and clicking the Search button
// will display them the suitable and available AirBNBs in that particular location.
