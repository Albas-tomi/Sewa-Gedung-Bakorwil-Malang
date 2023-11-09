import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const retrieveMyBooking = createAsyncThunk(
  "booking/retrieveMyBooking",
  async () => {
    const res = await axios.get("http://localhost:4000/mybooking");
    return res.data;
  }
);
export const retrieveBooking = createAsyncThunk(
  "booking/retrieveBooking",
  async () => {
    const res = await axios.get("http://localhost:4000/bookings");
    return res.data;
  }
);

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (param) => {
    const res = await axios.post("http://localhost:4000/booked", param);
    return res.data;
  }
);
