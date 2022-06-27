Feature: Specify the number of events

Scenario: When the user hasn't specified a number, 32 is the default
Given the user has no preference
When the user visits the page
Then a default of 32 events is displayed

Scenario: The User has specified a count preference
Given the user had specified the number of events to be displayed
When the user visits the page
Then the specified count of events will display