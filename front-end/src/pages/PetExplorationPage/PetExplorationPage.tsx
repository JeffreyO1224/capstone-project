import { useState} from 'react';
import SearchBar from '../SearchBar/SearchBar.tsx';
import PetGrid from '../PetGrid/PetGrid.tsx';

export default function PetExplorationPage(){
    //save the input from the user
    const [userInput, setUserInput] = useState<string>('');

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <h1>Pet Explorer 🐾</h1>
          <SearchBar 
          //pass down the setter and state variable to searchbar as props
            userInput={userInput} 
            handleSearchChange={setUserInput} 
          />
          <PetGrid searchTerm={userInput} />
        </div>
      );
}