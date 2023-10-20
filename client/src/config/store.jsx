import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";
export const store = configureStore({
  reducer,
  middleware: [thunkMiddleware],
});
