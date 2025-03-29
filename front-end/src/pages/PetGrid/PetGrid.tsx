import PetCard from '../PetCard/PetCard';
import {Pet} from '../../types/pets.ts'

//ensure the array recieved from parent explorationpage match type for Pet
interface PetGridProps {
    pets: Pet[];
  }

  export default function PetGrid({ pets }: PetGridProps) {
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px' 
      }}>
        {/* iterate through pets in the pets array */}
        {pets.map((pet) => (
            // call PetCard component to display the information and pass the pet to decompose
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    );
  }
