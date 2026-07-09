import { useState, useReducer } from "react";
import BookingForm from "./BookingForm";
import ConfirmedBooking from "./ConfirmedBooking";

// Initial state for available booking times required by the project specifications
export const initializeTimes = () => {
  return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
};

// Reducer function to update times based on selected date
export const updateTimes = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES":
      // For this project phase, returning the same initial times or varying them based on date is standard
      return initializeTimes();
    default:
      return state;
  }
};

function App() {
  const [submitted, setSubmitted] = useState(false);
  
  // Managing available times state in the parent component using useReducer
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  const submitForm = () => {
    setSubmitted(true);
  };

  return (
    <>
      <header style={{ backgroundColor: "#495E57", padding: "10px", color: "#F4CE14" }}>
        <nav aria-label="Main Navigation" style={{ maxWidth: "600px", margin: "auto" }}>
          <h2>Little Lemon</h2>
        </nav>
      </header>

      <main className="App" aria-live="polite">
        <h1 style={{ color: "#495E57" }}>Table Reservation</h1>
        {!submitted ? (
          <BookingForm 
            submitForm={submitForm} 
            availableTimes={availableTimes} 
            dispatch={dispatch} 
          />
        ) : (
          <ConfirmedBooking />
        )}
      </main>

      <footer style={{ textAlign: "center", padding: "20px", marginTop: "20px", background: "#EDEFEE" }}>
        <p>&copy; 2026 Little Lemon Restaurant. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;