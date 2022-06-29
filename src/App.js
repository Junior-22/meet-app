import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { extractLocations, getEvents } from "./api";

class App extends Component {
  state = {
    events: [],
    locations: [],
    NumberOfEvents: 32
  }

  updateEvents = (location, eventCount) => {
    if (!location) location = "all";
    !eventCount
      ? (eventCount = this.state.NumberOfEvents)
      : this.setState({ NumberOfEvents: eventCount });
    getEvents().then((events) => {
      const locationEvents = (location === "all") ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, eventCount),
        NumberOfEvents: eventCount
      });
    });
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className='App'>
        <h1>Welcome to my meet-app</h1>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          NumberOfEvents={this.state.NumberOfEvents}
          updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events} />
      </div>
    )
  }
}

export default App;
