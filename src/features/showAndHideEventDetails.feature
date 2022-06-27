Feature: Show and hide event details

Scenario: An event element is collapsed by default
Given the user is on the main page
When nothing is selected
Then the event details will be hidden

Scenario: The user can expand an event to see its details
Given the user wants to see more info about an event
When the user clicks on that event
Then the hidden info for that event will be expanded

Scenario: The user can collapse an event to hide its details
Given the user has seen the details and chooses to collapse the view
When the user clicks on the expand view
Then the view should collapse