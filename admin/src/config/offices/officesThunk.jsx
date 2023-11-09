import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const retrieveOffices = createAsyncThunk(
  "offices/retrieveOffices",
  async () => {
    const res = await axios.get("http://localhost:4000/offices");
    return res.data;
  }
);
