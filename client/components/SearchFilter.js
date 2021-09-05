import React, { useState} from 'react';

function SearchFilter(props) {
    const {fetchData} = props
    const [virtualOnly, setVirtualOnly] = useState(false)

    const handleSearchFilter = () => {
        const currTimestamp = Math.floor((Date.now()) / 1000)
        const api = `https://api.mobilize.us/v1/events?timeslot_start=gte_${currTimestamp}&is_virtual=${virtualOnly}&per_page=15`
        fetchData(api)
    }
    
    return (
        <div id="search-filter">
            <p>Filter event results: </p>

            <form onSubmit={handleSearchFilter}>
            <input id="virtual-only" type="checkbox" onChange={() => setVirtualOnly(!virtualOnly)}/>
            <label htmlFor="virtual-only">Virtual Only Events</label>

            <button type="submit">Get Events</button>
            </form>

        </div>
    )
}

export default SearchFilter
