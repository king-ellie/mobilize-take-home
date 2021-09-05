import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      const currTimestamp = Math.floor((Date.now()) / 1000)
      const response = (await axios.get(`https://api.mobilize.us/v1/events?timeslot_start=gte_${currTimestamp}&per_page=15`)).data
      const { data } = response
      
      setEvents(data)
    }
    fetchData()

  }, []);


  return (
    <div>
      <h1>Take Action!</h1>
      <h3>Upcoming Events</h3>

      <ul>
        { events ? 
          <ul> {events.map((event, idx) => {
            const { title, sponsor, location, timeslots, browser_url } = event

            let firstTimeSlot = (new Date(timeslots[0].start_date * 1000)).toString()

            return (
              <li key={idx} className="event-listing">
                <h3>{title}</h3>
                <h4>{sponsor.name} | {event.is_virtual ? "Virtual" : location.region}</h4>
                <p>{firstTimeSlot} {timeslots.length > 1 ? `and ${timeslots.length} more dates` : null} </p>
                <a href={`${browser_url}`}>Go to Event</a>
              </li>
            )})}
          </ul>

        : <h1>Loading</h1>
      }
      </ul>
    </div>
  )
}

export default App
