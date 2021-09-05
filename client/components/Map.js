import mapboxgl from 'mapbox-gl';
import React, { useState, useEffect, useRef } from 'react';
mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN

function Map() {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [-95.58, 39.83],
            zoom: 3
        })
    })

  return (
    <div>
      <div ref={mapContainerRef} id="map-container"></div>
    </div>
  )
}

export default Map
