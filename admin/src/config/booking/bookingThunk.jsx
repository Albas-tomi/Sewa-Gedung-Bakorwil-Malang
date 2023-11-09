import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const retrieveBooking = createAsyncThunk(
  "booking/retrieveBooking",
  async () => {
    const res = await axios.get("http://localhost:4000/bookings");
    return res.data;
  }
);
export const retrieveBookingById = createAsyncThunk(
  "booking/retrieveBookingById",
  async (param) => {
    const res = await axios.get(`http://localhost:4000/bookingById/${param}`);
    return res.data;
  }
);

export const createdBooking = createAsyncThunk(
  "booking/createBooking",
  async (param) => {
    const res = await axios.post("http://localhost:4000/booked", param);
    return res.data;
  }
);
export const deleteBookingById = createAsyncThunk(
  "booking/deleteBookingById",
  async (param) => {
    const res = await axios.delete(
      `http://localhost:4000/deletebooking/${param.id}`
    );
    return res.data;
  }
);
export const updateBookingById = createAsyncThunk(
  "booking/updateBookingById",
  async (param) => {
    const res = await axios.put(
      `http://localhost:4000/editbooking/${param.id}`,
      param
    );
    return res.data;
  }
);
