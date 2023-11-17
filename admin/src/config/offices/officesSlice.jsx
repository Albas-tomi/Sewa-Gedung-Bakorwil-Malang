import { createSlice } from "@reduxjs/toolkit";
import {
  createdOffice,
  deleteOffice,
  retrieveOffices,
  retrieveOfficesById,
  updateOffice,
} from "./officesThunk";

const initialState = {
  officeData: [],
  officeByIdData: [],
  officesLoading: false,
  officeError: undefined,

  createdOfficesLoading: false,
  createdOfficeError: undefined,

  deleteOfficesLoading: false,
  deleteOfficeError: undefined,

  officesByIdLoading: false,
  officeErrorById: undefined,

  updateOfficesLoading: false,
  updateOfficeError: undefined,
  typeAction: "",
};
const officesSlice = createSlice({
  name: "Office",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //#REGION GET OFFICE===
    builder
      .addCase(retrieveOffices.pending, (state, action) => {
        return {
          ...state,
          officesLoading: true,
          officeError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(retrieveOffices.fulfilled, (state, action) => {
        return {
          ...state,
          officeData: action.payload,
          officesLoading: false,
          officeError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(retrieveOffices.rejected, (state, action) => {
        return {
          ...state,
          officesLoading: false,
          officeError: action.payload,
          typeAction: action.type,
        };
      });
    //#END-REGION GET OFFICE===
    //#REGION BY ID OFFICE===
    builder
      .addCase(retrieveOfficesById.pending, (state, action) => {
        return {
          ...state,
          officesByIdLoading: true,
          officeErrorById: undefined,
          typeAction: action.type,
        };
      })
      .addCase(retrieveOfficesById.fulfilled, (state, action) => {
        return {
          ...state,
          officeByIdData: action.payload,
          officesByIdLoading: false,
          officeErrorById: undefined,
          typeAction: action.type,
        };
      })
      .addCase(retrieveOfficesById.rejected, (state, action) => {
        return {
          ...state,
          officesByIdLoading: false,
          officeErrorById: action.payload,
          typeAction: action.type,
        };
      })
      //#END-REGION BY ID OFFICE===
      //#REGION CREATED OFFICE===
      .addCase(createdOffice.pending, (state, action) => {
        return {
          ...state,
          createdOfficesLoading: true,
          createdOfficeError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(createdOffice.fulfilled, (state, action) => {
        return {
          ...state,
          officeData: action.payload,
          createdOfficesLoading: false,
          createdOfficeError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(createdOffice.rejected, (state, action) => {
        return {
          ...state,
          createdOfficesLoading: false,
          createdOfficeError: action.payload,
          typeAction: action.type,
        };
      })
      //#END-REGION CREATED OFFICE===
      //#REGION DELETE OFFICE===
      .addCase(deleteOffice.pending, (state, action) => {
        return {
          ...state,
          deleteOfficesLoading: true,
          deleteOfficeError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(deleteOffice.fulfilled, (state, action) => {
        return {
          ...state,
          officeData: action.payload,
          deleteOfficesLoading: false,
          deleteOfficeError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(deleteOffice.rejected, (state, action) => {
        return {
          ...state,
          deleteOfficesLoading: false,
          deleteOfficeError: action.payload,
          typeAction: action.type,
        };
      })
      //#END-REGION DELETE OFFICE===
      //#REGION UPDATE OFFICE===
      .addCase(updateOffice.pending, (state, action) => {
        return {
          ...state,
          updateOfficesLoading: true,
          updateOfficeError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(updateOffice.fulfilled, (state, action) => {
        return {
          ...state,
          updateOfficesLoading: false,
          updateOfficeError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(updateOffice.rejected, (state, action) => {
        return {
          ...state,
          updateOfficesLoading: false,
          updateOfficeError: action.payload,
          typeAction: action.type,
        };
      });
    //#END-REGION UPDATE OFFICE===
  },
});

const { actions: officesAction, reducer: officesReducer } = officesSlice;
export { officesReducer, officesAction };
export default officesSlice;
