import "./styles.css"

export const Button = ({ disabled, onClick, text }) => (
  <button 
    disabled={disabled}
    className="button" 
    onClick={onClick}
  >
    {text}
  </button>
)
