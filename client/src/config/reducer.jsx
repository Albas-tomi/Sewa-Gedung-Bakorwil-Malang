import { combineReducers } from "@reduxjs/toolkit";
import { todoListReducer } from "./todo/todoSlice";
import { officesReducer } from "./BookingOffice/officesSlice";

const reducer = combineReducers({
  todoList: todoListReducer,
  offices: officesReducer,
});
export default reducer;
