Feature: Show/Hide an Event’s Details

Scenario: An event element is collapsed by default.
Given user has not selected show details
When they see a list of upcoming events
Then the details will be hidden by default

Scenario: User can expand an event to see its details.
Given the list of upcoming events are displayed.
When the user expands an event.
Then the details of the event will be displayed.

Scenario: User can collapse an event to hide its details.
Given the details for upcoming events are displayed
When the user collapses the event
Then the details of the event will be hidden