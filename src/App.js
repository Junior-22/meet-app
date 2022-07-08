import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { extractLocations, getEvents, checkToken, getAccessToken } from "./api";
import { OfflineAlert } from "./Alert";
import WelcomeScreen from "./WelcomeScreen";
import EventGenre from "./EventGenre";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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

  // async componentDidMount() {
  //   this.mounted = true;
  //   const accessToken = localStorage.getItem("access_token");
  //   let isTokenValid;
  //   if (accessToken && !navigator.onLine) {
  //     isTokenValid = true;
  //   } else {
  //     isTokenValid = await checkToken(accessToken).error ? false : true;
  //   }

  //   const searchParams = new URLSearchParams(window.location.search);
  //   const code = searchParams.get("code");
  //   this.setState({
  //     showWelcomeScreen: !(code || isTokenValid)
  //   });

  //   if ((code || isTokenValid) && this.mounted) {
  //     getEvents().then((events) => {
  //       if (this.mounted) {
  //         this.setState({
  //           events,
  //           locations: extractLocations(events),
  //         });
  //       }
  //     });
  //   }

  //   if (!navigator.onLine) {
  //     this.setState({
  //       offLineText: "You are operating offline"
  //     });
  //   } else {
  //     this.setState({
  //       offLineText: "Is online"
  //     });
  //   }

  // }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    // let isTokenValid = await checkToken(accessToken)
    // isTokenValid = isTokenValid.error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({
      showWelcomeScreen: !(code || isTokenValid)
    });

    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }

    if (!navigator.onLine) {
      this.setState({
        offLineText: "You are operating offline"
      });
    } else {
      this.setState({
        offLineText: ""
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  // prepare data for chart
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(", ").shift()
      return { city, number };
    })
    return data;
  }

  render() {

    const { locations, NumberOfEvents, events } = this.state;

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
        <div className="data-vis-wrapper">
          <EventGenre events={events} />
          <ResponsiveContainer height={400}>
            <ScatterChart
              margin={{
                top: 20, right: 20, bottom: 20, left: 20
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
              <Scatter data={this.getData()} fill="#82ca9d" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
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
