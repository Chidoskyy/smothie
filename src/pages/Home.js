// Import the Supabase client (configured in ../config/supabaseClient.js)
import supabase from "../config/supabaseClient"

// Import React hooks for managing state and running side effects
import { useEffect, useState } from "react"

// Import the SmothieCard component (used to display each smoothie)
import SmothieCard from "../components/SmothieCard"

const Home = () => {
  // State to store any error message that happens during fetching
  const [errorFetching, setErrorFetching] = useState(null)

  // State to store the list of smoothies fetched from the Supabase table
  const [smoothies, setSmoothies] = useState([])

  // useEffect runs after the component first mounts (page load)
  useEffect(() => {
    // Async function to fetch smoothies from Supabase
    const fetchSmoothies = async () => {
      // Query the "smothies" table and get all rows
      const { data, error } = await supabase.from("smothies").select()

      // If an error occurred, update error state and clear smoothies
      if (error) {
        setErrorFetching("Error fetching data")
        setSmoothies([])
        console.error("Error fetching data:", error)
      }

      // If data was returned, update smoothies state and clear any error
      if (data) {
        setSmoothies(data)
        setErrorFetching(null)
        console.log("Data fetched successfully:", data)
      }
    }

    // Call the fetch function once when the component loads
    fetchSmoothies()
  }, []) 
  // 👆 empty array [] ensures this runs only once (on component mount)

  // JSX returned by the component
  return (
    <div className="page home">
      {/* Show error message if there is one */}
      {errorFetching && <p>{errorFetching}</p>}

      {/* If smoothies exist, render them using SmothieCard components */}
      {smoothies.length > 0 ? (
        <div className="smoothies">
          <div className="smoothie-list">
            {smoothies.map((item) => (
              // Render a SmothieCard for each smoothie row
              // Pass the smoothie object as a prop to SmothieCard
              // Use item.id as the key (important for React list rendering)
              <SmothieCard key={item.id} smothie={item} />
            ))}
          </div>
        </div>
      ) : (
        // If no smoothies and no error, display a fallback message
        !errorFetching && <p>No smoothies found.</p>
      )}
    </div>
  )
}

// Export the Home component so it can be used in routes or App.js
export default Home
