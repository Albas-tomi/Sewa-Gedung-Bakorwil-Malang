import { createSlice } from "@reduxjs/toolkit";
import { retrieveOfficeById, retrieveOffices } from "./officesThunk";

const initialState = {
  offices: [],
  officesLoading: false,
  officeError: undefined,
  //# region ByID
  officeById: [],
  officeByIdLoading: false,
  officeByIdError: undefined,
  //#end region ByID
};
const officesSlice = createSlice({
  name: "Office",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //#region get OFFICEID
      .addCase(retrieveOfficeById.pending, (state, action) => {
        return {
          ...state,
          officeByIdLoading: true,
          officeByIdError: undefined,
        };
      })
      .addCase(retrieveOfficeById.fulfilled, (state, action) => {
        return {
          ...state,
          officeById: action.payload,
          officeByIdLoading: false,
          officeByIdError: undefined,
        };
      })
      .addCase(retrieveOfficeById.rejected, (state, action) => {
        return {
          ...state,
          officeByIdLoading: false,
          officeByIdError: action.payload,
        };
      })
      //#END region get OFFICEID

      //#region get OFFICEID
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
          offices: action.payload,
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
    //#END region get OFFICEID
  },
});

const { actions: officesAction, reducer: officesReducer } = officesSlice;
export { officesReducer, officesAction };
export default officesSlice;
