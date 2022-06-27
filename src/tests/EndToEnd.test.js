import puppeteer from "puppeteer";

describe("show and hide event details", () => {

  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".event");
  });

  afterAll(() => {
    browser.close();
  });

  test("an event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event .event-details");
    expect(eventDetails).toBeNull();
  });

  test("The user can expand an event to see its details", async () => {
    await page.click(".event .btn-details");
    const eventDetails = await page.$(".event .event-details");
    expect(eventDetails).toBeDefined();
  });

  test("The user can collapse an event to hide its details", async () => {
    await page.click(".event .btn-details");
    const eventDetails = await page.$(".event .event-details");
    expect(eventDetails).toBeNull();
  });

});

describe("filter events by city", () => {

  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    // await page.waitForSelector(".event");
  });

  afterAll(() => {
    browser.close();
  });

  // test("when a user hasn't searched for a city, show upcoming events from all cities", async () => {
  //   await page.waitForSelector(".EventList");
  //   const eventCount = await page.$$(".event").length;
  //   expect(eventCount).toBe(10);
  // });

  // test("a user should see a list of suggestions when they search for a city", async () => {
  //   await page.waitForSelector(".CitySearch");
  //   await page.type(".city", "Berlin");
  //   const suggestionCount = await page.$$(".suggestions li").length;
  //   expect(suggestionCount).toBe(2);
  // });

  // test("a user can select a city from the suggested list", async () => {
  //   await page.reload();
  //   await page.waitForSelector(".CitySearch");
  //   await page.type(".city", "Berlin");
  //   await page.click(".suggestions li");
  //   const eventCount = await page.$(".event").length;
  //   expect(eventCount).toBe(3);
  // });

  test("when a user hasn't searched for a city, show upcoming events from all cities", async () => {
    const countEvents = await page.$$eval(".event", (element) => element.length);
    expect(countEvents).toBe(10);
  });

  test("a user should see a list of suggestions when they search for a city", async () => {
    await page.type(".city", "Berlin");
    const countCities = await page.$$eval(".suggestions li", (element) => element.length);
    expect(countCities).toBe(2);
  });

  test("a user can select a city from the suggested list", async () => {
    await page.reload();
    await page.type(".city", "Berlin");
    await page.click(".suggestions li");
    const countEvents = await page.$$eval(".event", (element) => element.length);
    expect(countEvents).toBe(5);
  });

});