import { combineReducers } from "@reduxjs/toolkit";
import { bookingReducer } from "./booking/bookingSlice";
import { officesReducer } from "./offices/officesSlice";
import { usersReducer } from "./users/userSlice";

const reducer = combineReducers({
  booking: bookingReducer,
  office: officesReducer,
  users: usersReducer,
});

export default reducer;
