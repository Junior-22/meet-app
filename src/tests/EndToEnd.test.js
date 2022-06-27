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

