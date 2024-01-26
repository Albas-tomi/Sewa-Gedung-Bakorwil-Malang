import { combineReducers } from "@reduxjs/toolkit";
import { officesReducer } from "./BookingOffice/officesSlice";
import { bookingReducer } from "./Booked/bookingSlice";

const reducer = combineReducers({
  booking: bookingReducer,
  offices: officesReducer,
});
export default reducer;
