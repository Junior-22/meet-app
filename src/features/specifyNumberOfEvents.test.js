import React from "react";
import { mount, shallow } from "enzyme";
import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";
import NumberOfEvents from "../NumberOfEvents";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, test => {

  let AppWrapper;

  test("When the user hasn't specified a number, 32 is the default", ({ given, when, then }) => {
    given("the user has no preference", async () => {
      AppWrapper = await mount(<App />);
    });

    when("the user visits the page", () => {

    });

    then("a default of 32 events is displayed", () => {
      expect(AppWrapper.state("NumberOfEvents")).toBe(32);
    });
  });

  test("The User has specified a count preference", ({ given, when, then }) => {
    given("the user had specified the number of events to be displayed", () => {
      AppWrapper.update();
      AppWrapper.find(".events-number").simulate("change", { target: { value: 10 } });
    });

    when("the user visits the page", async () => {
      AppWrapper = await mount(<App />);
    });

    then("the specified count of events will display", () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      NumberOfEventsWrapper.find(".events-number").simulate("change", { target: { value: 10 } });
      expect(AppWrapper.state("NumberOfEvents")).toBe(10);
    });
  });

});
