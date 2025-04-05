import "leaflet/dist/leaflet.css";
import './MapPage.css';
import petData from './PetData.js';
import { useState, useEffect } from 'react';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMapEvent, useMap } from 'react-leaflet';
import { LatLng, Icon } from "leaflet";

//Clicking on the map automatically sets the view to wherever you clicked
function SetViewOnClick() {
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true,
      })
    })
  
    return null
}

function CenterOnCurrentLocation() {
    const map = useMap();

    map.locate();

    useMapEvents({
        locationfound(e) {
            map.flyTo(e.latlng, map.getZoom());
        }
    })

    return null;
}

const currentLocationMarkerIcon = new Icon({
    iconUrl: '../../assets/current-location-marker.png',
    iconSize: [38, 38] // size of the icon
});

const petLocationMarkerIcon = new Icon({
    iconUrl: "../../assets/pet-marker-icon.png",
    iconSize: [38, 38],
})

function LocationMarker() {
    const [position, setPosition] = useState<LatLng | null>(null);

    const map = useMapEvents({
        locationfound(e) {
            setPosition(e.latlng)
        },
    });

    return position === null ? null : 
        <Marker position={position}>
            <Popup>Your Location</Popup>
        </Marker>
    ;
}

export default function MapPage() {
    
    const petMarkers = petData.map((marker) => {
        return (
            <Marker position={marker.lastSeen}>
                <Popup>
                    Name: {marker.name} <br />
                    Species: {marker.species} <br />
                    Owner's Name: {marker.ownerName} <br />
                    Owner's Phone Number: {marker.phoneNumber} <br />
                </Popup>
            </Marker>
        )
    })

    return (
        <MapContainer center={{lat: 40.7678, lng: -73.9645}} zoom={50} scrollWheelZoom={true} >
            <SetViewOnClick />
            <CenterOnCurrentLocation />
            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            {petMarkers}
        </MapContainer>
    );
}