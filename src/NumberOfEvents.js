import React, { Component } from "react";

class NumberOfEvents extends Component {

  state = {
    NumberOfEvents: 32
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 0 && value <= 32) {
      this.setState({ NumberOfEvents: value, ErrorText: "" });
    } else {
      this.setState({ ErrorText: "Please select a number range from 1 - 32" });
    }
    this.props.updateEvents(undefined, value);
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <label htmlFor="events-number">Number of events: </label>
        <input
          type="text"
          className="events-number"
          value={this.state.NumberOfEvents}
          onChange={this.handleInputChange}
          autoComplete="off"
        />

      </div>
    )
  }
}

export default NumberOfEvents;