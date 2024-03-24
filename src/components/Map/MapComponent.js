import React from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
// const REACT_APP_GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;
const REACT_APP_GOOGLE_MAPS_KEY = 'AIzaSyDB-3k9HvfUv5lKox7E4oj6CIA3RRzKF40';

const MapComponent = ({ selectedLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY,
  });
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  if (loadError) return "Error";
  if (!isLoaded) return "Maps";

  return (
    <div style={{ marginTop: "20px" }}>
      <GoogleMap
        mapContainerStyle={{
          height: "600px",
        }}
        center={selectedLocation}
        zoom={13}
        onLoad={onMapLoad}
      >
        <MarkerF
          position={selectedLocation}
          icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
        />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;