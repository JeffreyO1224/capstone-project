import PetCard, { type Pet } from '../PetCard/PetCard';

//array of type pets from petcard to contain all pets 
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
