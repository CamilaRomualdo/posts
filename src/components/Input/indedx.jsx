import "./styles.css";

export const Input = ({ handleChange, searchValue }) => (
  <input 
    className="input" 
    onChange={handleChange} 
    placeholder="Type your search..."
    type="Search"
    value={searchValue}
  />
)
