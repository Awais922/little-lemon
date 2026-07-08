import React, { useReducer, useState } from 'react';
import { fetchAPI, submitAPI } from './utils/api';
import Header from './components/Header';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import './App.css';

export function updateTimes(state, date) {
  const times = fetchAPI(date);
  return times.length > 0 ? times : ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
}

export function initializeTimes() {
  const today = new Date().toISOString().split('T')[0];
  return fetchAPI(today);
}

export default function App() {
  const [availableTimes, dispatch] = useReducer(updateTimes, null, initializeTimes);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDateChange = (date) => {
    dispatch(date);
  };

  const submitForm = (formData) => {
    if (submitAPI(formData)) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#EDEFEE]">
      <Header />
      <main className="flex-grow px-4">
        {isSubmitted ? (
          <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-xl shadow-lg text-center border border-green-200" role="alert">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-700 mb-2">Reservation Confirmed!</h2>
            <p className="text-gray-600">Thank you for dining with Little Lemon.</p>
            <button onClick={() => setIsSubmitted(false)} className="mt-6 px-4 py-2 bg-[#495E57] text-white rounded-lg text-sm font-semibold">Book Another Table</button>
          </div>
        ) : (
          <BookingForm availableTimes={availableTimes} updateTimes={handleDateChange} submitForm={submitForm} />
        )}
      </main>
      <Footer />
    </div>
  );
}