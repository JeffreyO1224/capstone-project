import "leaflet/dist/leaflet.css";
import "./MapPage.css";
import petData from "./PetData.js";
import { useState, useEffect } from "react";
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

//Clicking on the map automatically sets the view to wherever you clicked
function SetViewOnClick() {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });

  return null;
}

function CreateMarkerOnClick({ onAddMarker }) {
  const map = useMap();
  
  useMapEvent("click", (e) => {
      const newMarker = (
          <Marker position={e.latlng} icon={icon}>
            <Popup>
              <div className="popup-content">
                <img
                  src={logo}
                  className="popup-image"
                  alt={`Pet's photo`}
                />
              </div>
              <div className="popup-details">
              <h3 className="popup-title">Name: {"Name"} </h3>
                  <p>Species: {'Species'} </p>
                  <p>Owner's Name: {'Owner Name'} </p>
                  <p>Owner's Phone Number: {'Phone Number'} </p>
              </div>
            </Popup>
          </Marker>
        );
      onAddMarker(newMarker);
    }
  );

  return null;
}

function CenterOnCurrentLocation() {
  const map = useMap();

  map.locate();

  useMapEvents({
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom());
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
  const [petMarkers, setPetMarkers] = useState(petData.map((marker) => {
    return (
      <Marker position={marker.lastSeen} icon={icon}>
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
    );
  }));

  return (
    <MapContainer
      center={{ lat: 40.7678, lng: -73.9645 }}
      zoom={50}
      scrollWheelZoom={true}
    >
      <SetViewOnClick />
      <CenterOnCurrentLocation />
      <CreateMarkerOnClick onAddMarker={(newMarker) => setPetMarkers([...petMarkers, newMarker])} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      {petMarkers}
    </MapContainer>
  );
}
