import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {

  state = {
    NumberOfEvents: 32
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 0 && value <= 32) {
      this.setState({
        NumberOfEvents: value,
        infoText: ""
      });
    } else {
      this.setState({
        infoText: "Please select a number range from 1 - 32"
      });
    }
    this.props.updateEvents(undefined, value);
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <label id="events-number-label" htmlFor="events-number">Number of events: </label>
        <br />
        <input
          type="number"
          className="events-number"
          value={this.state.NumberOfEvents}
          onChange={this.handleInputChange}
          autoComplete="off"
        />
        <ErrorAlert text={this.state.infoText} />

      </div>
    );
  }
}

export default NumberOfEvents;