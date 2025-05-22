import axios from "axios";
import "./PetIndvPage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PetPost } from "../../types/pets";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import { useAuth } from "../../App";
import { useNavigate } from "react-router-dom";

export default function PetIndvPage() {
  //grab the petId from the parameters (the link from the postId)
  //this was defined in the route in the App file
  const { petId } = useParams();
  //save the pet post
  const [post, setPost] = useState<PetPost | null>(null);

  //use a navigator after delete to refresh 
  const navigate = useNavigate();

    //authUser just grabs the user, which we then grab username to see if the petid belongs to them
    var authUser = useAuth().user
    if (authUser) {
      //grab the username from the authUser
      var { userName } = authUser;
      } //otherwise this flag will prevent nonloggedin users from crashing/submitting 
      else var userName = "";

  //use the id we got from the params to send a requet to our backend
  //which will retrieve the pet post by its id 
  //to display the information for each pet more cleanly
  const retrievePetById = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/post/${petId}`);
      setPost(response.data.specificPost);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  //this function allows ONLY the creator of the post to delete the petpost
  const deletePetPost = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/post/delete/${petId}`);
      console.log(response.data)
      navigate("/petexplore")
    }
    catch(err){
      console.log(err);
    }
  };

  //useEffect to retrieve the pet on page load
  useEffect(() => {
    if (petId) {
      retrievePetById();
    }
  }, [petId]);
  //in our return statement, we need to safely load our petpost
  //if not, we will instantly crash the frontend as we do not have a post
  //to unwrap and render, and thus on first render, we must first unwrap
  //safely by creating a conditional rendering block
  //render the p tag without a post, and render the proper page\
  //once the post has been retrieved
  return (
    <>
      {post ? (
        <div className="page-container">
          <div className="left-column">
            {post.imageUrl ? (
              <img
                src={`http://localhost:8080/s3/image/${post.imageUrl}`}
                alt={post.petName}
                className="pet-image"
              />
            ) : (
              <p>No image available</p>
            )}           
            <div>
              {post.userName == userName ? (
                <button className="delete-button" onClick={deletePetPost}> 
                    Delete Post
                </button>
              ) : (<></>)}
            </div>
          </div>

          <div className="right-column">
            <div className="top-row">
              <h2>{post.petName || "Unknown Pet"}</h2>
              <p>Posted by: {post.userName || "Unknown owner"}</p>
              <p>Status:{post.status || "Unknown status"}</p>
              <p>Location: {post.location || "Unknown location"}</p>
              <p>Breed: {post.breed || "Unknown breed"}</p>
            </div>
            <div className="bottom-row">
              {post.latitude && post.longitude ? (
                <MapContainer
                  center={[post.latitude, post.longitude]}
                  zoom={50}
                  style={{ width: "100%", height: "100%" }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[post.latitude, post.longitude]} />
                  <Circle
                    center={[post.latitude, post.longitude]}
                    radius={500} //the average lost pet gets found within 
                    //500 meters of where they were last seen
                    pathOptions={{ color: "blue", fillOpacity: 0.2 }}
                  />
                </MapContainer>
              ) : (
                //safely unwrap the coordinates 
                //especially since earlier pets had no coordinates
                <p>No coordinates available for this pet.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        //safely unwrap the entire post so that we dont cause page crash
        <p>Loading pet data...</p>
      )}
    </>
  );
}
