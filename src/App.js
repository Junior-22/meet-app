import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { extractLocations, getEvents, checkToken, getAccessToken } from "./api";
import { OfflineAlert } from "./Alert";
import WelcomeScreen from "./WelcomeScreen";

class App extends Component {
  state = {
    events: [],
    locations: [],
    NumberOfEvents: 32,
    showWelcomeScreen: undefined
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

  // componentDidMount() {
  //   this.mounted = true;
  //   getEvents().then((events) => {
  //     if (this.mounted) {
  //       this.setState({ events, locations: extractLocations(events) });
  //     }
  //   });
  // }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    let isTokenValid;
    if (accessToken && !navigator.onLine) {
      isTokenValid = true;
    } else {
      isTokenValid = await checkToken(accessToken).error ? false : true;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({
      showWelcomeScreen: !(code || isTokenValid)
    });

    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events,
            locations: extractLocations(events),
          });
        }
      });
    }

    console.log("Navigator status: ", navigator.onLine)

    if (!navigator.onLine) {
      this.setState({
        offLineText: "You are operating offline"
      });
    } else {
      this.setState({
        offLineText: "Is online"
      });
    }

  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {

    if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    return (
      <div className="App">
        <h1>Welcome to my meet-app</h1>
        <OfflineAlert text={this.state.offLineText} />
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          NumberOfEvents={this.state.NumberOfEvents}
          updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events} />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    )
  }
}

export default App;
