import { combineReducers } from "@reduxjs/toolkit";
import { todoListReducer } from "./todo/todoSlice";

const reducer = combineReducers({
  todoList: todoListReducer,
});
export default reducer;
