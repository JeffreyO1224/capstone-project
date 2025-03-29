//ensure recieved props are of these types to prevent errors
interface SearchBarProps {
    userInput: string;
    handleSearchChange: (query: string) => void;
  }
  
  export default function SearchBar({ userInput, handleSearchChange }: SearchBarProps) {
    return (
      <input
        type="text"
        placeholder="Search pets..."
        value={userInput} //here ensure to render the value held in the state variable
        //use recieved state setter to set the state variable as typing event occurs
        onChange={(e) => handleSearchChange(e.target.value)}
        style={{
          padding: '8px',
          width: '100%',
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />
    );
  }