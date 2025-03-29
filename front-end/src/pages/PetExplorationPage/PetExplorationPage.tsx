import { useState} from 'react';
import SearchBar from '../SearchBar/SearchBar.tsx';
import PetGrid from '../PetGrid/PetGrid.tsx';
import {Pet} from '../../types/pets.ts'


export default function PetExplorationPage(){
    //save the input from the user
    const [userInput, setUserInput] = useState<string>('');

    //dummy data to present
    const pets: Pet[] = [
        { id: 1, name: 'Charlie', species: 'dog' },
        { id: 2, name: 'Dior', species: 'cat' },
        { id: 3, name: 'Daemon', species: 'cat' },
        { id: 4, name: 'Sukkar', species: 'cat' },
        { id: 5, name: 'Fritzel', species: 'cat' },
        { id: 6, name: 'Eurias', species: 'cat' }
      ];
    //create a new array with the provided input from the user
    const filteredPets = pets.filter(pet =>
        pet.name.toLowerCase().includes(userInput.toLowerCase())
    );


    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <h1>Pet Explorer 🐾</h1>
          <SearchBar 
          //pass down the setter and state variable to searchbar as props
            userInput={userInput} 
            handleSearchChange={setUserInput} 
          />
          <PetGrid pets={filteredPets} />
        </div>
      );
}