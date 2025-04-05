import "leaflet/dist/leaflet.css";
import './MapPage.css';
import petData from './PetData.js';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

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
        <MapContainer center={[40.7678, -73.9645]} zoom={50} scrollWheelZoom={true}>
            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {petMarkers}
        </MapContainer>
    );
}