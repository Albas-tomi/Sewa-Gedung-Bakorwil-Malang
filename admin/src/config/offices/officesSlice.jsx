import { createSlice } from "@reduxjs/toolkit";
import { retrieveOffices } from "./officesThunk";

const initialState = {
  officeData: [],
  officesLoading: false,
  officeError: undefined,
};
const officesSlice = createSlice({
  name: "Office",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(retrieveOffices.pending, (state, action) => {
        return {
          ...state,
          officesLoading: true,
          officeError: undefined,
        };
      })
      .addCase(retrieveOffices.fulfilled, (state, action) => {
        return {
          ...state,
          officeData: action.payload,
          officesLoading: false,
          officeError: undefined,
        };
      })
      .addCase(retrieveOffices.rejected, (state, action) => {
        return {
          ...state,
          officesLoading: false,
          officeError: action.payload,
        };
      });
  },
});

const { actions: officesAction, reducer: officesReducer } = officesSlice;
export { officesReducer, officesAction };
export default officesSlice;
