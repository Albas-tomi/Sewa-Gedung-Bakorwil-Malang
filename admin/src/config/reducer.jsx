import { combineReducers } from "@reduxjs/toolkit";
import { bookingReducer } from "./booking/bookingSlice";
import { officesReducer } from "./offices/officesSlice";

const reducer = combineReducers({
  booking: bookingReducer,
  office: officesReducer,
});

export default reducer;
