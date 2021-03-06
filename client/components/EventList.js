import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchFilter from './SearchFilter';

function EventList() {
  const [events, setEvents] = useState(null)
  const [nextPage, setNextPage] = useState(null)
  const [previousPage, setPreviousPage] = useState(null)

  const fetchAndSetData = async(api) => {
    const response = (await axios.get(api)).data
    const { data, next, previous } = response
    
    setEvents(data)
    setNextPage(next)
    setPreviousPage(previous)
  } 

  // fetch and set data upon page load
  useEffect(() => {
    const currTimestamp = Math.floor((Date.now()) / 1000)
    fetchAndSetData(`https://api.mobilize.us/v1/events?timeslot_start=gte_${currTimestamp}&per_page=15`)
  }, []);

  const handlePageChange = (prevOrNext) => {
    if (prevOrNext === "next"){
      fetchAndSetData(nextPage)
    }
    if (prevOrNext === "previous"){
      fetchAndSetData(previousPage)
    }
  }


  return (
    <div>
      <h3>Upcoming Events</h3>

      <Link to="/map">Go to Map View</Link>

      <SearchFilter fetchData={fetchAndSetData} />
      
      { events ? 
        <div>
          <ul> {events.map((event, idx) => {
            const { title, sponsor, location, timeslots, browser_url, is_virtual } = event

            let firstTimeSlot = (new Date(timeslots[0].start_date * 1000)).toString()

            return (
                <li key={idx} className="event-listing">
                  <h3>{title}</h3>
                  <h4>{sponsor.name} | {is_virtual ? "Virtual" : location.region}</h4>
                  <p>{firstTimeSlot} {timeslots.length > 1 ? `and ${timeslots.length} more dates` : null} </p>
                  <a href={`${browser_url}`}>Go to Event</a>
                </li>
            )
          })}
          </ul>

          <div id="pagination-buttons">
              { previousPage ? <button onClick={() => handlePageChange("previous")}>Previous Page</button> : null }
              <button onClick={() => handlePageChange("next")}>Next Page</button>
            </div>
        </div>

        : <h1>Loading</h1>
      }

    </div>
  )
}

export default EventList
