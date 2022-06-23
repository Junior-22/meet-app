import React, { Component } from "react";

class Event extends Component {
  state = {
    collapsed: true
  }

  handleDetailsClick = () => {
    this.state.collapsed
      ? this.setState({ collapsed: false })
      : this.setState({ collapsed: true });
  };

  dateNewFormat = (eventDate) => {
    const newDate = `${new Date(eventDate)}`;
    return newDate;
  };

  changeButtonText = () => {
    if (this.state.collapsed === true) {
      return "show details";
    } else {
      return "hide details"
    }
  };

  render() {
    const { event } = this.props;

    return (
      <div className="event">
        <h4 className="title">{event.summary}</h4>
        <p className="start-time">{this.dateNewFormat(event.start.dateTime)}</p>
        <p className="location">{event.location}</p>
        {!this.state.collapsed && (
          <p className="event-details">{event.description}</p>
        )}
        <button
          className="btn-details"
          onClick={this.handleDetailsClick}
        >{this.changeButtonText()}
        </button>
      </div>
    );
  }
}

export default Event;