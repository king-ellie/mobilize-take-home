import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Map from './Map';
import EventList from './EventList';

function App() {

  return (
    <Router>
      <div>
        <header>
          <h1>Take Action!</h1>
        </header>

        <Switch>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/">
            <EventList />
          </Route>
        </Switch>

      </div>
    </Router>
  )
}

export default App
