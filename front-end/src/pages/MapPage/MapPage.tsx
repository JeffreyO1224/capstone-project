import "leaflet/dist/leaflet.css";
import './MapPage.css';

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';

export default function MapPage() {
    return (
        <MapContainer center={[40.7678, -73.9645]} zoom={50} scrollWheelZoom={true}>
            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
}