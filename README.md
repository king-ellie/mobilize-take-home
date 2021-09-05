# mobilize-take-home

## Running the App
- Open terminal and enter "npm i" to install packages
- Create .env file in root directory and add MAPBOX_ACCESS_TOKEN=/*mapbox token here*/ I will provide the key via email for security purposes.
- "npm run start:dev" to initiate Webpack build and start server in local dev environment, accessible at http://localhost:3000/  

## Design Decisions
- Map
  - I chose to make the map a separate page view for several reasons. First, many events are virtual without mappable locations. As a result, rendering the events on the map in tandem with the event list as it currently stands would make for a sparse map of events. Second, re-rendering the data layer on the map with every new page slows performance. Third, when a user wants to use a map to find events, location is likely their primary focus. Thus, a larger view is ideal, and they are able to interact and learn more about the events in a location-based way.
- Filter Feature
  - I built the SearchFilter component to receive a fetchData function as a prop, allowing it to be tailored to whichever fetchData function that its parent prop uses (e.g., for future implementation on the Map component). For example, the EventList fetchAndSetData function works in tandem with pagination, however, the Map fetchData function does not need pagination. The SearchFilter component will still work with the Map's fetchData function once implemented.
  - Additional filter options will be fairly easy to add. To do so, you would 1) add new input+label html tags, 2) declare corresponding state and setState using the useState hook, and 3), add the new state variable into the parameters as a template literal within the function "handleSearchFilter."
- Component routing in App component
  - The App component serves primarily as a routing component using react router. This allows for an easy understanding of which routes lead to which components. It also makes it easy to add additional pages moving forward. Tags (like the header) and components that are shared across routes & page views can also be placed here.