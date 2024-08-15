import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

// Add your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1IjoiaGFzZWViY2giLCJhIjoiY2x2cWI0bGpiMGFnZDJsbnY5Ymo2cHo3eiJ9.rlE7GJrvDr77VhtVftvB_g';

export default function Map() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const successLocation = (position) => {
      setupMap([position.coords.longitude, position.coords.latitude]);
    }

    const errorLocation = () => {
      setupMap([-2.24, 53.48]);
    }

    const setupMap = (center) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 10
      });

      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav);

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
      });

      map.addControl(directions, 'top-left');
    }

    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true
    });

  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return (
    <div>
      <div id="map" ref={mapContainer} style={{ width: '100%', height: '80vh' }} />
    </div>
  );
}
