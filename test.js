import { render, screen, fireEvent } from '@testing-library/react';
import App, { initializeTimes, updateTimes } from './App';

test('Renders the BookingForm heading safely', () => {
    render(<App />);
    const headingElement = screen.getByText(/Reserve a Table/i);
    expect(headingElement).toBeInTheDocument();
});

test('initializeTimes returns initial available arrays', () => {
    expect(initializeTimes().length).toBeGreaterThan(0);
});

test('updateTimes returns dynamic updates', () => {
    expect(updateTimes([], "2026-12-25").length).toBeGreaterThan(0);
});