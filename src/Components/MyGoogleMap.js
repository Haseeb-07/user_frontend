import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker, InfoWindow } from '@react-google-maps/api';
import './MyGoogleMap.css'
const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 33.6844, // Latitude for Islamabad
  lng: 73.0479 // Longitude for Islamabad
};

const infoWindowStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: '15px',
  maxWidth: '600px',
  minHeight: '300px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
};

const nameStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '5px',
  color: '#f56c1f'
};

const ratingStyle = {
  fontSize: '16px',
  color: '#4CAF50',
  marginBottom: '5px'
};

const statusStyle = {
  fontSize: '16px',
  color: '#FF5722',
  marginBottom: '10px'
};

const descriptionStyle = {
  fontSize: '14px',
  color: '#333',
  marginBottom: '10px'
};

const MyGoogleMap = () => {
  const [map, setMap] = useState(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [response, setResponse] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [submit, setSubmit] = useState(false);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  useEffect(() => {
    if (submit && origin && destination) {
      setResponse(null);
      setNearbyPlaces([]);
      setSubmit(false);
    }
  }, [submit, origin, destination]);

  useEffect(() => {
    if (response && response.status === 'OK' && map) {
      const placesService = new window.google.maps.places.PlacesService(map);
      const points = response.routes[0].overview_path;
      const interval = Math.floor(points.length / 10);

      points.filter((_, index) => index % interval === 0).forEach(point => {
        const request = {
          location: point,
          radius: '700',
          type: ['park']
        };

        placesService.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setNearbyPlaces(prevPlaces => {
              const uniquePlaceIds = new Set(prevPlaces.map(p => p.place_id));
              const newPlaces = results.filter(place => !uniquePlaceIds.has(place.place_id));
              newPlaces.forEach(place => uniquePlaceIds.add(place.place_id));
              return [...prevPlaces, ...newPlaces];
            });
          }
        });
      });
    }
  }, [response, map]);

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response);
      } else {
        console.error('Directions request failed due to ', response.status);
      }
    }
  };

  const handleNavigate = () => {
    if (!origin.trim() || !destination.trim()) {
      alert('Both origin and destination are required and must not be empty.');
      return;
    }
    setSubmit(true);
  };

  const handleMarkerClick = place => {
    setSelectedPlace(place);
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCpl0BrXIZ5ddCgX4Ih-EDLkGLTFUHtVA0"  
      libraries={['places']}
    >
      <div className="form-container">
      <div className="input-group">
        <input
          className="input"
          type="text"
          value={origin}
          onChange={e => setOrigin(e.target.value)}
          placeholder="Enter your location"
        />
        <input
          className="input"
          type="text"
          value={destination}
          onChange={e => setDestination(e.target.value)}
          placeholder="Enter destination"
        />
        <button className="submit-button" onClick={handleNavigate}>Navigate</button>
      </div>
    </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {submit && (
          <DirectionsService
            options={{
              origin: origin,
              destination: destination,
              travelMode: 'DRIVING'
            }}
            callback={directionsCallback}
          />
        )}

        {response && (
          <DirectionsRenderer
            options={{
              directions: response
            }}
          />
        )}

        {nearbyPlaces.map((place, index) => (
          <Marker
            key={index}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            }}
            onClick={() => handleMarkerClick(place)}
            title={place.name}
          />
        ))}

        {selectedPlace && (
          <InfoWindow
            position={{
              lat: selectedPlace.geometry.location.lat(),
              lng: selectedPlace.geometry.location.lng()
            }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div style={infoWindowStyle}>
              <h1 style={nameStyle}>{selectedPlace.name}</h1>
              <p style={descriptionStyle}>{selectedPlace.formatted_address}</p>
              {selectedPlace.rating && <p style={ratingStyle}>Rating: {selectedPlace.rating}</p>}
              {selectedPlace.opening_hours && <p style={statusStyle}>{selectedPlace.opening_hours.open_now ? "Open Now" : "Closed"}</p>}
              {selectedPlace.description && <p style={descriptionStyle}>Description: {selectedPlace.description}</p>}
              {selectedPlace.photos && selectedPlace.photos.length > 0 && (
                <img src={selectedPlace.photos[0].getUrl({maxWidth: 350, maxHeight: 350})} alt="Place" style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MyGoogleMap;
