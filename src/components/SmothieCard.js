// Define a functional component called SmothieCard
// It receives "props", but we destructure it directly to get { smothie }
// So instead of writing props.smothie, we can just use smothie
const SmothieCard = ({ smothie }) => {
  return (
    // Main container for the card, styled with a CSS class
    <div className="smothie-card">
      {/* Display the title of the smoothie (e.g., "Mango Blast") */}
      <h3>{smothie.title}</h3>

      {/* Display the method/recipe text from the smoothie object */}
      <p>{smothie.method}</p>

      {/* Display the rating (e.g., stars or numeric value) */}
      <div className="rating">{smothie.rating}</div>
    </div>
  )
}

// Export the component so it can be imported and used in other files
export default SmothieCard
