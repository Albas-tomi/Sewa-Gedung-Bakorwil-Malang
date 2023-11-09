import { createSlice } from "@reduxjs/toolkit";
import {
  createBooking,
  retrieveBooking,
  retrieveMyBooking,
} from "./bookingThunk";

const initialState = {
  //#Region Bookings
  bookings: [],
  bookingsLoading: false,
  bookingsError: undefined,
  //#EndRegion Bookings

  //#Region CreateBookings
  createBookingLoading: false,
  createBookingError: undefined,
  //#Region CreateBookings

  //#Region MyBookings
  myBookings: [],
  myBookingsLoading: false,
  myBookingsError: undefined,
  //#End Region MyBookings

  typeAction: "",
};

const bookingSlice = createSlice({
  name: "Booking",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //#region GetMyBooking
      .addCase(retrieveMyBooking.pending, (state, action) => {
        return {
          ...state,
          myBookingsLoading: true,
          myBookingsError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(retrieveMyBooking.fulfilled, (state, action) => {
        return {
          ...state,
          myBookings: action.payload,
          myBookingsLoading: false,
          myBookingsError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(retrieveMyBooking.rejected, (state, action) => {
        return {
          ...state,
          myBookingsLoading: false,
          myBookingsError: action.payload,
          typeAction: action.type,
        };
      })
      //#END region GetMyBooking

      //#region Booking
      .addCase(retrieveBooking.pending, (state, action) => {
        return {
          ...state,
          bookingsLoading: true,
          bookingsError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(retrieveBooking.fulfilled, (state, action) => {
        return {
          ...state,
          booking: action.payload,
          bookingsLoading: false,
          bookingsError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(retrieveBooking.rejected, (state, action) => {
        return {
          ...state,
          bookingsLoading: false,
          bookingsError: action.payload,
          typeAction: action.type,
        };
      })
      //#END region GetBooking

      //#region CreateBooking
      .addCase(createBooking.pending, (state, action) => {
        return {
          ...state,
          createBookingLoading: true,
          createBookingError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        return {
          ...state,
          bookings: action.payload,
          createBookingLoading: false,
          createBookingError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(createBooking.rejected, (state, action) => {
        return {
          ...state,
          createBookingLoading: false,
          createBookingError: action.payload,
          typeAction: action.type,
        };
      });
    //#END region CreateBooking
  },
});
const { actions: bookingAction, reducer: bookingReducer } = bookingSlice;
export { bookingAction, bookingReducer };
export default bookingSlice;
