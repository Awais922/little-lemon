import { render, screen } from "@testing-library/react";
import BookingForm from "./BookingForm";
import { initializeTimes, updateTimes } from "./App";

test("Renders the BookingForm heading/labels", () => {
  render(
    <BookingForm 
      availableTimes={["17:00", "18:00"]} 
      dispatch={() => {}} 
    />
  );
  const labelElement = screen.getByText("Full Name");
  expect(labelElement).toBeInTheDocument();
});

test("initializeTimes returns correct initial values", () => {
  const expectedTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
  expect(initializeTimes()).toEqual(expectedTimes);
});

test("updateTimes returns identical array state upon action dispatch", () => {
  const initialState = ["17:00", "18:00"];
  const action = { type: "UPDATE_TIMES", payload: "2026-07-10" };
  const newState = updateTimes(initialState, action);
  expect(newState).toEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
});