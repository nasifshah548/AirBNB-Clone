import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./utility/NavigationBar/NavigationBar";
import Home from "./pages/Home/Home";
import SingleFullVenue from "./pages/SingleFullVenue/SingleFullVenue";
import Modal from "./utility/Modal/Modal";
import CityVenues from "./pages/CityVenues/CityVenues";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import Account from "./pages/Account/Account";
import Search from "./pages/Search/Search";

class App extends Component {
  render() {
    return (
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/venue/:vid" element={<SingleFullVenue />} />
          <Route exact path="/city/:cityName" element={<CityVenues />} />
          <Route
            exact
            path="/payment-success/:stripeToken"
            element={<PaymentSuccess />}
          />
          <Route path="/account" element={<Account />} />
          <Route path="/search/:searchTerm" element={<Search />} />
          <Route path="/" element={<Modal />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
