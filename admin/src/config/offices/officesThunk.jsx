import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const retrieveOffices = createAsyncThunk(
  "offices/retrieveOffices",
  async () => {
    const res = await axios.get("http://localhost:4000/offices");
    return res.data;
  }
);
export const retrieveOfficesById = createAsyncThunk(
  "offices/retrieveOfficesById",
  async (param) => {
    const res = await axios.get(`http://localhost:4000/office/${param}`);
    return res.data;
  }
);
export const createdOffice = createAsyncThunk(
  "offices/createOffice",
  async (param) => {
    const res = await axios.post("http://localhost:4000/office", param);
    return res.data;
  }
);
export const updateOffice = createAsyncThunk(
  "offices/updateOffice",
  async (param) => {
    const res = await axios.patch(
      `http://localhost:4000/office/${param.id}`,
      param
    );
    return res.data;
  }
);
export const deleteOffice = createAsyncThunk(
  "offices/deleteOfficeById",
  async (param) => {
    const res = await axios.delete(
      `http://localhost:4000/office/${param.id}`,
      param
    );
    return res.data;
  }
);
