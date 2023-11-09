import { createSlice } from "@reduxjs/toolkit";
import {
  createdBooking,
  deleteBookingById,
  retrieveBooking,
  retrieveBookingById,
  updateBookingById,
} from "./bookingThunk";

const initialState = {
  //REGION RETRIEVE
  booking: [],
  bookingById: [],
  bookingLoading: false,
  bookingError: undefined,
  //REGION RETRIEVE

  //REGION CREATE
  createBookingLoading: false,
  createBookingError: undefined,
  //REGION CREATE

  //REGION DELETE
  deleteBookingByIdLoading: false,
  deleteBookingByIdError: undefined,
  //REGION DELETE

  //REGION GET BY ID
  retrieveBookingByIdLoading: false,
  retrieveBookingByIdError: undefined,
  //REGION GET BY ID

  //REGION EDIT BY ID
  updateBookingByIdLoading: false,
  updateBookingByIdError: undefined,
  //REGION EDIT BY ID
  typeAction: "",
};

const bookingSlice = createSlice({
  name: "Booking",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(retrieveBooking.pending, (state, action) => {
        return {
          ...state,
          bookingLoading: true,
          bookingError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(retrieveBooking.fulfilled, (state, action) => {
        return {
          ...state,
          booking: action.payload,
          bookingLoading: false,
          bookingError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(retrieveBooking.rejected, (state, action) => {
        return {
          ...state,
          bookingLoading: false,
          bookingError: action.payload,
          typeAction: action.type,
        };
      })
      //#region CreateBooking
      .addCase(createdBooking.pending, (state, action) => {
        return {
          ...state,
          createBookingLoading: true,
          createBookingError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(createdBooking.fulfilled, (state, action) => {
        return {
          ...state,
          booking: action.payload,
          createBookingLoading: false,
          createBookingError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(createdBooking.rejected, (state, action) => {
        return {
          ...state,
          createBookingLoading: false,
          createBookingError: action.payload,
          typeAction: action.type,
        };
      })
      //#END region CreateBooking

      //#region deletedBooking
      .addCase(deleteBookingById.pending, (state, action) => {
        return {
          ...state,
          deleteBookingByIdLoading: true,
          deleteBookingByIdError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(deleteBookingById.fulfilled, (state, action) => {
        return {
          ...state,
          booking: action.payload,
          deleteBookingByIdLoading: false,
          deleteBookingByIdError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(deleteBookingById.rejected, (state, action) => {
        return {
          ...state,
          deleteBookingByIdLoading: false,
          deleteBookingByIdError: action.payload,
          typeAction: action.type,
        };
      })
      //#END region deletedBooking

      //#region BOOKINGBYID
      .addCase(retrieveBookingById.pending, (state, action) => {
        return {
          ...state,
          retrieveBookingByIdLoading: true,
          retrieveBookingByIdError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(retrieveBookingById.fulfilled, (state, action) => {
        return {
          ...state,
          bookingById: action.payload,
          retrieveBookingByIdLoading: false,
          retrieveBookingByIdError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(retrieveBookingById.rejected, (state, action) => {
        return {
          ...state,
          retrieveBookingByIdLoading: false,
          retrieveBookingByIdError: action.payload,
          typeAction: action.type,
        };
      })
      //#END region BOOKINGBYID
      //#region  UPDATE BY ID
      .addCase(updateBookingById.pending, (state, action) => {
        return {
          ...state,
          updateBookingByIdLoading: true,
          updateBookingByIdError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(updateBookingById.fulfilled, (state, action) => {
        return {
          ...state,
          updateBookingByIdLoading: false,
          updateBookingByIdError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(updateBookingById.rejected, (state, action) => {
        return {
          ...state,
          updateBookingByIdLoading: false,
          updateBookingByIdError: action.payload,
          typeAction: action.type,
        };
      });
    //#END region  UPDATE BY ID
  },
});

const { actions: bookingAction, reducer: bookingReducer } = bookingSlice;
export { bookingAction, bookingReducer };
export default bookingSlice;
