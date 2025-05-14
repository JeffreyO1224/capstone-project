import PetCard from '../PetCard/PetCard';
import {Pet} from '../../types/pets.ts'
import axios from "axios";
import { useEffect, useState } from "react";

//ensure the passed down search is a string
interface PetGridProps {
  searchTerm: string;
}

export default function PetGrid({ searchTerm }: PetGridProps) {
//state that will hold the returned array of pet posts
const [retrievedPets, setPets] = useState<Pet[]>([]);
const [error, setError] = useState<string | null>(null);

//define axios call to retrieve all the pets using defined route
const retrievePets = async () => {
  try {
    const response = await axios.get("http://localhost:8080/post");
    setPets(response.data.posts);
  }
  catch (err) {
    console.error(err);
    setError('Failed to load pets.');
  } 
};

useEffect(() => {
  retrievePets();
}, []);

useEffect(() => {
  if (retrievedPets && retrievedPets.length > 0) {
    console.log(retrievedPets[0].petName);
  }
}, [retrievedPets]);

//filter the pets using the searched term
// const filteredPets = retrievedPets.filter((pet) =>
// pet.name.toLowerCase().includes(searchTerm.toLowerCase())
// );

if (error) return <div>{error}</div>;
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px' 
      }}>
        {/* iterate through pets in the pets array */}
        {/* {filteredPets.map((pet) => (
            // call PetCard component to display the information and pass the pet to decompose
          <PetCard key={pet.id} pet={pet} />
        ))} */}
      </div>
    );
  }
