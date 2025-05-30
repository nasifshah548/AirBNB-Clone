import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./utility/NavigationBar/NavigationBar";
import Home from "./pages/Home/Home";
import SingleFullVenue from "./pages/SingleFullVenue/SingleFullVenue";
import Modal from "./utility/Modal/Modal";

class App extends Component {
  render() {
    return (
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/venue/:vid" element={<SingleFullVenue />} />
          <Route path="/" element={<Modal />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
