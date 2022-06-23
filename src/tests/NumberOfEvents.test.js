import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {

  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => { }} />);
  });

  test("render textbox", () => {
    expect(NumberOfEventsWrapper.find(".events-number")).toHaveLength(1);
  });

  test("display default number 32", () => {
    expect(NumberOfEventsWrapper.find(".events-number").get(0).props.value).toEqual(32);
  });

  test("user specifies a number of events", () => {
    NumberOfEventsWrapper.find(".events-number").simulate("change", {
      target: { value: 10 },
    });
    expect(NumberOfEventsWrapper.state("NumberOfEvents")).toEqual(10);
  });

  test("allow numbers above 1 event", () => {
    NumberOfEventsWrapper.setState({ NumberOfEvents: 32 });
    NumberOfEventsWrapper.find(".events-number").simulate("change", {
      target: { value: -1 },
    });
    expect(NumberOfEventsWrapper.state("NumberOfEvents")).toEqual(32);
  });

  test("allow only figures", () => {
    NumberOfEventsWrapper.setState({ NumberOfEvents: 32 });
    NumberOfEventsWrapper.find(".events-number").simulate("change", {
      target: { value: "string" },
    });
    expect(NumberOfEventsWrapper.state("NumberOfEvents")).toEqual(32);
  });

});