import React, { Component } from "react";
import "./Activity.css";
import Activity from "./Activity";

class Activities extends Component {
  render() {
    const activities = this.props.activities.map((x, index) => {
      return (
        <div className="col s2" key={index}>
          <Activity activity={x} />
        </div>
      );
    });
    return (
      <div className="activities">
        <h1 className="main-header-text">{this.props.header}</h1>
        {activities}
      </div>
    );
  }
}

export default Activities;
