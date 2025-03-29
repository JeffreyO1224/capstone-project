//'class' for dummy data, will adjust later and export it to the petgrid to use properties
import {Pet} from '../../types/pets.ts'
    
  //ensures that the props recieved from parents the types are all matching above Pet type we declared
  interface PetCardProps {
    pet: Pet;
  }
  
  export default function PetCard({ pet }: PetCardProps) {
    return (
      <div style={{ 
        margin: '10px', 
        padding: '15px', 
        border: '1px solid #ddd', 
        borderRadius: '8px' 
      }}>
        {/* display relevant information */}
        <h3>{pet.name}</h3>
        <p>Species: {pet.species}</p>
      </div>
    );
  }