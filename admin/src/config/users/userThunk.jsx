import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const retrieveUsers = createAsyncThunk(
  "users/retrieveUsers",
  async () => {
    const res = await axios.get("http://localhost:4000/get-users");
    return res.data;
  }
);
