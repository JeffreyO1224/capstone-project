import "leaflet/dist/leaflet.css";
import "./MapPage.css";
import petData from "./PetData.js";
import { useState, useEffect } from "react";
import { useAuth } from '../../App';
import axios from "axios";
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
import Modal from "react-modal";

//allows our modal content to center itself and draw "attention"
//reduicing noise and allowing the modal to not be crowded with other visuals
Modal.setAppElement("#root");

// Clicking on the map automatically sets the view to wherever you clicked
function SetViewOnClick() {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });

  return null;
}

function CreateMarkerOnClick({ setClickedPosition, setIsModalOpen }) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      //allow our position to be used to send down the form component
      setClickedPosition(e.latlng);
      setIsModalOpen(true);
    },
  });
  return position ? <Marker position={position} icon={icon}></Marker> : null;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedPosition, setClickedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const retrieveAllPets = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/post/");
        setPosts(data.posts);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };
    retrieveAllPets();
  }, []);
  
  const petMarkers = posts ? posts.map((post, index) => {
    // const img = axios.get(`https://localhost:8080/s3/image/${post.imageUrl}`);
    // console.log(img);
    const imgUrl = `http://localhost:8080/s3/image/${post.imageUrl}`;

    return (
    <Marker key={index} position={{ lat: 40.7678, lng: -73.9645 }} icon={icon}>
      <Popup>
        <div className="popup-content">
          <img
            src={imgUrl}
            className="popup-image"
            alt={`${post.petName}'s photo`}
          />
          <div className="popup-details">
            <h3 className="popup-title">Name: {post.petName} </h3>
            <p>Species: [Insert Species Here] </p>
            <p>Owner's Name: {post.userName} </p>
            <p>Owner's Phone Number: (123) 456-7890 </p>
          </div>
        </div>
      </Popup>
    </Marker>
  )}) : null ;

  return (
    <>
      <div id="map">
        <MapContainer center={position} zoom={50} scrollWheelZoom={true}>
          <CenterOnCurrentLocation
            setPosition={(newCoords) => setPosition(newCoords)}
            setCenterFound={() => setCenterFound(true)}
            centerFound={centerFound}
          />
          <SetViewOnClick />
          <CreateMarkerOnClick
            setClickedPosition={setClickedPosition}
            setIsModalOpen={setIsModalOpen}
          />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
          {petMarkers}
        </MapContainer>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Report Missing Pet"
          className="pet-modal"
          overlayClassName="modal-overlay"
        >
          <FormComponent locationCoordinates = {clickedPosition} closeModal={() => setIsModalOpen(false)}/>
        </Modal>
      </div>
    </>
  );
}
