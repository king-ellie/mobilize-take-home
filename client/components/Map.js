import mapboxgl from 'mapbox-gl';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN

function Map() {
    const mapContainerRef = useRef(null)
    const [loading, setLoading] = useState(true)

    const fetchData = async() => {
        const currTimestamp = Math.floor((Date.now()) / 1000)
        const { data } = (await axios.get(`https://api.mobilize.us/v1/events?timeslot_start=gte_${currTimestamp}&per_page=200`)).data
        setLoading(false)
        return data
    }

    // this function changes mobilize data into geoJSON format for mapbox layering
    const geoJsonFormatter = (data) => {
        const mapEvents = {
            "type": "FeatureCollection",
            "features": []
        }
        data.forEach((event) => {
            // return if the event doesn't have a mappable location
            if (!event.location || !event.location.location) return;

            const { title, sponsor, location, timeslots, browser_url } = event
            let firstTimeSlot = (new Date(timeslots[0].start_date * 1000)).toString()

            const mapEvent = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [`${location.location.longitude}`, `${location.location.latitude}`]
                },
                "properties": {
                    "title": `${title}`,
                    "sponsor": `${sponsor.name}`,
                    "timeslots": `${firstTimeSlot} ${timeslots.length > 1 ? `and ${timeslots.length} more times` : null}`,
                    "browser_url": `${browser_url}`,
                }
                
            }
            mapEvents.features.push(mapEvent)
        })
        return mapEvents
    }

    // initialize map with events data layer
    useEffect(() => {
        async function addEventsToMap() {
            // fetch data
            const data = await fetchData()
            
            // initialize map
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/light-v10',
                center: [-95.58, 39.83],
                zoom: 3
            })

            // add events layer to map
            map.on('load', () => {
                const mapSourceData = geoJsonFormatter(data)

                map.addLayer({
                    id: 'eventLocations',
                    type: 'circle',
                    source: {
                        type: 'geojson',
                        data: mapSourceData
                    }
                })
            })
        }
        addEventsToMap()
    }, [])

    return (
        <div>
            <h3>Map View</h3>
            <Link to="/">Go to List View</Link>
            { !loading ? <div ref={mapContainerRef} id="map-container"></div> : <h1>Loading...</h1> }
        </div>
    )
}

export default Map
