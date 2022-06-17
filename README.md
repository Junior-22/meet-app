<h1>meet-app</h1>

meet-app is an application for users to find events based on their location. It is a serverless progressive web application (PWA) using React and built using the test-driven development (TDD) technique. The app utilises the Google Calendar API.

<h5>FEATURE 1: FILTER EVENTS BY CITY</h5>

As a user, I should be able to filter events by city so that I can see the list of events that take place in that city.

<b>Scenario 1: When a user hasn’t searched for a city, show upcoming events from all cities.</b>

- Given a user hasn't searched for any city
- When the user opens the app
- Then the user should see a list of all upcoming events

<b>Scenario 2: A user should see a list of suggestions when they search for a city.</b>

- Given the main page is open
- When the user starts typing in the city textbox
- Then the user should see a list of cities that match what they've typed

<b>Scenario 3: A user can select a city from the suggested list.</b>

- Given the user was typing "Hamburg" in the city textbox
- When the user selects a city from the list (e.g., "Hamburg, Germany")
- Then their city should be changed to that city (i.e., "Hamburg, Germany")

<h5>Feature 2: Show and hide event details</h5>

As a user, I should be able to show and hide event details so that I can see more or less info about an event based on my preferences.

<b>Scenario 1: An event element is collapsed by default</b>

- Given the user is on the main page
- When nothing is selected
- Then the event details will be hidden

<b>Scenario 2: The user can expand an event to see its details</b>

- Given the user wants to see more info about an event
- When the user clicks on that event
- Then the hidden info for that event will be expanded

<b>Scenario 3: The user can collapse an event to hide its details</b>

- Given the user has seen the details and chooses to collapse the view
- When the user clicks on the expand view
- Then the view should collapse

<h5>Feature 3: Specify the number of events</h5>

As a user, I should be able to specify the number of events I want to view so that I can see more or fewer events in the events list at once.

<b>Scenario 1: When the user hasn’t specified a number, 32 is the default</b>

- Given the user has no preference
- When the user visits the page
- Then a default of 32 events is displayed

<b>Scenario 2: The User has specified a count preference</b>

- Given the user had specified the number of events to be displayed
- When the user visits the page
- Then the specified count of events will display

<h5>Feature 4: Use the app when offline</h5>

As a user, I should be able to use the app when offline so that I can see the events I viewed the last time I was online.

<b>Scenario 1: Show cached data when there’s no internet connection</b>

- Given the user has no internet connection
- When the user opens the app
- Then the data will be accessible to the user

<b>Scenario 2: Show error when the user changes the settings (city, time range)</b>

- Given the user has no internet connection
- When the user wants to alter info
- Then an error message will be displayed

<h5>Feature 5: Data visualisation</h5>

As a user, I should be able to see a chart showing the upcoming events in each city so that I know what events are organised.

<b>Scenario 1: Show a chart with the number of upcoming events in each city</b>

- Given the user is on the main page
- When the user wants to see upcoming events
- Then the user will see a chart containing upcoming events
