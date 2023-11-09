import { combineReducers } from "@reduxjs/toolkit";
import { todoListReducer } from "./todo/todoSlice";
import { officesReducer } from "./BookingOffice/officesSlice";
import { bookingReducer } from "./Booked/bookingSlice";

const reducer = combineReducers({
  booking: bookingReducer,
  todoList: todoListReducer,
  offices: officesReducer,
});
export default reducer;
