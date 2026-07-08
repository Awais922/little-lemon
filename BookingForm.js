import React, { useState, useEffect } from 'react';

export default function BookingForm({ availableTimes, updateTimes, submitForm }) {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => { updateTimes(date); }, [date]);

  useEffect(() => {
    if (availableTimes?.length > 0 && !time) setTime(availableTimes[0]);
  }, [availableTimes, time]);

  useEffect(() => {
    let formErrors = {};
    if (!date) formErrors.date = "Date is required";
    if (date < today) formErrors.date = "Cannot select a past date";
    if (!time) formErrors.time = "Please select a time slot";
    if (guests < 1) formErrors.guests = "Must have at least 1 guest";
    if (guests > 10) formErrors.guests = "Max 10 guests allowed online";

    setErrors(formErrors);
    setIsFormValid(Object.keys(formErrors).length === 0);
  }, [date, time, guests, today]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) submitForm({ date, time, guests, occasion });
  };

  return (
    <section id="booking" className="max-w-md mx-auto my-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-extrabold text-[#495E57] mb-6 text-center">Reserve a Table</h2>
      <form onSubmit={handleSubmit} className="space-y-5" noValidate data-testid="booking-form">
        <div>
          <label htmlFor="res-date" className="block text-sm font-bold text-gray-700 mb-1">Choose date *</label>
          <input type="date" id="res-date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2.5 border rounded-lg" aria-required="true" aria-invalid={!!errors.date} />
          {errors.date && <p className="text-xs text-red-600 mt-1" aria-live="polite">{errors.date}</p>}
        </div>
        <div>
          <label htmlFor="res-time" className="block text-sm font-bold text-gray-700 mb-1">Choose time *</label>
          <select id="res-time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-2.5 border rounded-lg bg-white" aria-required="true">
            {availableTimes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="guests" className="block text-sm font-bold text-gray-700 mb-1">Number of guests *</label>
          <input type="number" id="guests" min="1" max="10" value={guests} onChange={(e) => setGuests(parseInt(e.target.value) || 0)} className="w-full p-2.5 border rounded-lg" aria-required="true" aria-invalid={!!errors.guests} />
          {errors.guests && <p className="text-xs text-red-600 mt-1" aria-live="polite">{errors.guests}</p>}
        </div>
        <div>
          <label htmlFor="occasion" className="block text-sm font-bold text-gray-700 mb-1">Occasion</label>
          <select id="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)} className="w-full p-2.5 border rounded-lg bg-white">
            <option>Birthday</option>
            <option>Anniversary</option>
          </select>
        </div>
        <button type="submit" disabled={!isFormValid} className={`w-full py-3 font-bold rounded-lg ${isFormValid ? 'bg-[#F4CE14] text-[#495E57]' : 'bg-gray-200 text-gray-400'}`} data-testid="submit-btn">Make Your Reservation</button>
      </form>
    </section>
  );
}