import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {

  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });

  test("render event", () => {
    expect(EventWrapper.find(".event")).toHaveLength(1);
  });

  test("render title", () => {
    expect(EventWrapper.find(".title")).toHaveLength(1);
  });

  test("render start time", () => {
    expect(EventWrapper.find(".start-time")).toHaveLength(1);
  });

  test("render location", () => {
    expect(EventWrapper.find(".location")).toHaveLength(1);
  });

  test("render details button", () => {
    expect(EventWrapper.find(".btn-details")).toHaveLength(1);
  });

  test("collapsed event by default", () => {
    expect(EventWrapper.state("collapsed")).toBe(true);
  });

  test("expand event details onClick", () => {
    EventWrapper.setState({ collapsed: true });
    EventWrapper.find(".btn-details").simulate("click");
    expect(EventWrapper.state("collapsed")).toBe(false);
  });

  test("collapse event details onClick", () => {
    EventWrapper.setState({ collapsed: false });
    EventWrapper.find(".btn-details").simulate("click");
    expect(EventWrapper.state("collapsed")).toBe(true);
  });

  test("show correct event title", () => {
    expect(EventWrapper.find(".title").text()).toEqual(mockData[0].summary);
  });

  test("show correct time", () => {
    const mockDataDateFormat = `${new Date(mockData[0].start.dateTime)}`;
    expect(EventWrapper.find(".start-time").text()).toEqual(`${mockDataDateFormat}`);
  });

  test("show correct event location", () => {
    expect(EventWrapper.find(".location").text()).toEqual(mockData[0].location);
  });

  test("show event details when expanded", () => {
    EventWrapper.setState({ collapsed: false });
    expect(EventWrapper.find(".event-details").text()).toEqual(mockData[0].description);
  });

  test("not show event details when collapsed", () => {
    EventWrapper.setState({ collapsed: true });
    expect(EventWrapper.find(".event-details")).toHaveLength(0);
  });

  test("when event is collapsed, btn name 'show details'", () => {
    EventWrapper.setState({ collapsed: true });
    expect(EventWrapper.find(".btn-details").text()).toEqual("show details");
  });

  test("when event is expanded, btn name 'hide details'", () => {
    EventWrapper.setState({ collapsed: false });
    expect(EventWrapper.find(".btn-details").text()).toEqual("hide details");
  });

});