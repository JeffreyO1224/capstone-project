import axios from "axios";
import "./PetIndvPage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PetPost } from "../../types/pets";

export default function PetIndvPage() {
  //grab the petId from the parameters (the link from the postId)
  //this was defined in the route in the App file
  const { petId } = useParams();
  //save the pet post
  const [post, setPost] = useState<PetPost | null>(null)

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

  return (
    <div>
      {post ? (
        <p>Viewing pet: {post.petName}</p>
      ) : (
        <p>Loading pet data...</p>
      )}
    </div>
  );
}
