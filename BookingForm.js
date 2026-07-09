import { useState } from "react";

function BookingForm({ submitForm, availableTimes, dispatch }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("");

  // Client-side HTML5 constraint checks as well as validation states
  const isFormValid = () => {
    return name.trim().length >= 2 && date !== "" && time !== "" && guests >= 1 && guests <= 10 && occasion !== "";
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    // Dispatch action to update times when date changes
    dispatch({ type: "UPDATE_TIMES", payload: selectedDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      submitForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Reservation Form" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <label htmlFor="res-name">Full Name</label>
      <input
        id="res-name"
        type="text"
        required
        minLength="2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="John Doe"
      />

      <label htmlFor="res-date">Choose Date</label>
      <input
        id="res-date"
        type="date"
        required
        value={date}
        onChange={handleDateChange}
      />

      <label htmlFor="res-time">Choose Time</label>
      <select
        id="res-time"
        required
        value={time}
        onChange={(e) => setTime(e.target.value)}
      >
        <option value="">Select a time</option>
        {availableTimes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <label htmlFor="guests">Number of Guests</label>
      <input
        id="guests"
        type="number"
        placeholder="1"
        min="1"
        max="10"
        required
        value={guests}
        onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
      />

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        required
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
      >
        <option value="">Select an occasion</option>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>

      <button 
        type="submit" 
        disabled={!isFormValid()}
        aria-label="On click to reserve table"
        style={{
          backgroundColor: isFormValid() ? "#F4CE14" : "#EDEFEE",
          color: "#333333",
          fontWeight: "bold",
          padding: "10px",
          border: "none",
          cursor: isFormValid() ? "pointer" : "not-allowed"
        }}
      >
        Reserve Table
      </button>
    </form>
  );
}

export default BookingForm;