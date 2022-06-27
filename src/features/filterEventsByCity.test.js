import React from "react";
import { mount, shallow } from "enzyme";
import { loadFeature, defineFeature } from "jest-cucumber";
import { mockData } from "../mock-data";
import App from "../App";
import CitySearch from "../CitySearch";
import { extractLocations } from "../api";

const feature = loadFeature("./src/features/filterEventsByCity.feature");
const locations = extractLocations(mockData);

defineFeature(feature, test => {

  test("When a user hasn't searched for a city, show upcoming events from all cities.", ({ given, when, then }) => {
    given("a user hasn't searched for any city", () => {

    });

    let AppWrapper;

    when("the user opens the app", () => {
      AppWrapper = mount(<App />);
    });

    then("the user should see a list of all upcoming events", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event")).toHaveLength(mockData.length);
    });
  });

  test("A user should see a list of suggestions when they search for a city.", ({ given, when, then }) => {

    let CitySearchWrapper;

    given("the main page is open", () => {
      CitySearchWrapper = shallow(<CitySearch updateEvents={() => { }} locations={locations} />);
    });

    when("the user starts typing in the city textbox", () => {
      CitySearchWrapper.find(".city").simulate("change", { target: { value: "Berlin" } });
    });

    then("the user should see a list of cities that match what they've typed", () => {
      expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(2);
    });
  });

  test("A user can select a city from the suggested list.", ({ given, and, when, then }) => {

    let AppWrapper;

    given("the user was typing 'Berlin' in the city textbox", async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.find(".city").simulate("change", { target: { value: "Berlin" } });
    });

    and("the list of suggested cities is showing", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".suggestions li")).toHaveLength(2);
    });

    when("the user selects a city from the list (e.g., 'Berlin, Germany')", () => {
      AppWrapper.find(".suggestions li").at(0).simulate("click");
    });

    then("their city should be changed to that city (i.e., 'Berlin, Germany')", () => {
      const CitySearchWrapper = AppWrapper.find(CitySearch);
      expect(CitySearchWrapper.state("query")).toBe("Berlin, Germany");
    });

    and("the user should receive a list of upcoming events in that city", () => {
      expect(AppWrapper.find(".event")).toHaveLength(mockData.length);
    });
  });

});