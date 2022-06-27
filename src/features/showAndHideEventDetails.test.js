import React from "react";
import { mount, shallow } from "enzyme";
import { loadFeature, defineFeature } from "jest-cucumber";
import { mockData } from "../mock-data";
import App from "../App";
import Event from "../Event";

const feature = loadFeature("./src/features/showAndHideEventDetails.feature");

defineFeature(feature, test => {

  let AppWrapper;

  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user is on the main page', () => {
      AppWrapper = mount(<App />);
    });

    when('nothing is selected', () => {

    });

    then('the event details will be hidden', () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event-details")).toHaveLength(0);
    });
  });

  test('The user can expand an event to see its details', ({ given, when, then }) => {
    given('the user wants to see more info about an event', async () => {
      AppWrapper = await mount(<App />);
    });

    when('the user clicks on that event', () => {
      AppWrapper.update();
      AppWrapper.find(".btn-details").at(0).simulate("click");
    });

    then('the hidden info for that event will be expanded', () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event-details").text()).toEqual(mockData[0].description);
    });
  });

  test('The user can collapse an event to hide its details', ({ given, when, then }) => {

    let EventWrapper;

    given('the user has seen the details and chooses to collapse the view', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      EventWrapper.setState({ collapsed: false });
    });

    when('the user clicks on the expand view', () => {
      EventWrapper.update();
      EventWrapper.find(".btn-details").simulate("click");
    });

    then('the view should collapse', () => {
      expect(EventWrapper.state("collapsed")).toBe(true);
      expect(EventWrapper.find(".event-details")).toHaveLength(0);
    });
  });

});