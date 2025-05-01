import "leaflet/dist/leaflet.css";
import "./MapPage.css";
import petData from "./PetData.js";
import { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo.png";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMapEvent,
  useMap,
} from "react-leaflet";
import { LatLng, Icon } from "leaflet";
import FormComponent from "../FormComponent/FormComponent.js";

// Clicking on the map automatically sets the view to wherever you clicked
function SetViewOnClick() {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });

  return null;
}

function CreateMarkerOnClick({ markerRef }) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [position]);

  return position ? (
    <Marker position={position} icon={icon} ref={markerRef}>
      <Popup autoClose={false} closeOnClick={true}>
        <FormComponent />
      </Popup>
    </Marker>
  ) : null;
}

function CenterOnCurrentLocation({ setPosition, setCenterFound, centerFound }) {
  const map = useMap();

  map.locate();

  useMapEvents({
    locationfound(e) {
      if (!centerFound) {
        map.flyTo(e.latlng, map.getZoom());
        setPosition(e.latlng);
        setCenterFound();
      }
    },
  });

  return null;
}

const icon = new Icon({
  iconUrl: logo,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  className: "custom-marker",
});

const currentLocationMarkerIcon = new Icon({
  iconUrl: "../../assets/current-location-marker.png",
  iconSize: [38, 38], // size of the icon
});

const petLocationMarkerIcon = new Icon({
  iconUrl: "../../assets/logo.png",
  iconSize: [38, 38],
});

function LocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null);

  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Your Location</Popup>
    </Marker>
  );
}

export default function MapPage() {
  const [position, setPosition] = useState({ lat: 40.7678, lng: -73.9645 });
  const [centerFound, setCenterFound] = useState(false);
  const markerRef = useRef(null); // ✅ useRef instead of useState for refs

  const petMarkers = petData.map((marker, index) => (
    <Marker key={index} position={marker.lastSeen} icon={icon}>
      <Popup>
        <div className="popup-content">
          <img
            src={logo}
            className="popup-image"
            alt={`${marker.name}'s photo`}
          />
          <div className="popup-details">
            <h3 className="popup-title">Name: {marker.name} </h3>
            <p>Species: {marker.species} </p>
            <p>Owner's Name: {marker.ownerName} </p>
            <p>Owner's Phone Number: {marker.phoneNumber} </p>
          </div>
        </div>
      </Popup>
    </Marker>
  ));

  return (
    <div>
      <MapContainer center={position} zoom={50} scrollWheelZoom={true}>
        <CenterOnCurrentLocation
          setPosition={(newCoords) => setPosition(newCoords)}
          setCenterFound={() => setCenterFound(true)}
          centerFound={centerFound}
        />
        <SetViewOnClick />
        <CreateMarkerOnClick markerRef={markerRef} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        {petMarkers}
      </MapContainer>
    </div>
  );
}
