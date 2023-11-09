import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const retrieveOffices = createAsyncThunk(
  "offices/retrieveOffices",
  async () => {
    const res = await axios.get("http://localhost:4000/offices");
    return res.data;
  }
);

export const retrieveOfficeById = createAsyncThunk(
  "offices/retrieveOfficeById",
  async (officeId) => {
    const res = await axios.get(`http://localhost:4000/office/${officeId}`);
    return res.data;
  }
);
