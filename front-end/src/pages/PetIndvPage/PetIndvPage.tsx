import axios from "axios";
import "./PetIndvPage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PetPost } from "../../types/pets";
import { MapContainer } from "react-leaflet";

export default function PetIndvPage() {
  //grab the petId from the parameters (the link from the postId)
  //this was defined in the route in the App file
  const { petId } = useParams();
  //save the pet post
  const [post, setPost] = useState<PetPost | null>(null);

  const retrievePetById = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/post/${petId}`);
      setPost(response.data.specificPost);
      console.log(response.data);
    } catch (err) {
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
          </div>

          <div className="right-column">
            <div className="top-row">
              <h2>{post.petName}</h2>
              <p>
                <strong>Posted by:</strong> {post.userName}
              </p>
              <p>
                <strong>Status:</strong> {post.status}
              </p>
              <p>
                <strong>Location:</strong> {post.location}
              </p>
            </div>
            <div className="bottom-row">
              <p> Map </p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading pet data...</p>
      )}
    </>
  );
}
