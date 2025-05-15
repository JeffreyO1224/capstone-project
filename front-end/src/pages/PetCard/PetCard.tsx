//'class' for dummy data, will adjust later and export it to the petgrid to use properties
import {Pet} from '../../types/pets.ts'
    
  //ensures that the props recieved from parents the types are all matching above Pet type we declared
  interface PetCardProps {
    pet: Pet;
  }
  export default function PetCard({ pet }: PetCardProps) {
    let imageKey = `http://localhost:8080/s3/image/${pet.imageUrl}`
    return (
      <div style={{ 
        margin: '10px', 
        padding: '15px', 
        border: '1px solid #ddd', 
        borderRadius: '8px' 
      }}>
        {/* display relevant information */}
        {imageKey ? (
        <img 
          src={imageKey} 
          alt={pet.petName} 
          style={{ 
            width: '100%', 
            height: '200px', 
            objectFit: 'cover', 
            borderRadius: '8px', 
            marginTop: '10px' 
          }} 
        />
      ) : (
        <p>No image available</p>
      )} 
      <h3 style={{ margin: '0', textAlign: 'center' }}>{pet.petName}</h3>
      </div>
    );
  }