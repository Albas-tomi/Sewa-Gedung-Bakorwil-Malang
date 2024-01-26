import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const retrieveUsers = createAsyncThunk(
  "users/retrieveUsers",
  async () => {
    const res = await axios.get("http://localhost:4000/get-users");
    return res.data;
  }
);
export const deleteUserById = createAsyncThunk(
  "users/deletedUserById",
  async (param) => {
    const res = await axios.delete(
      `http://localhost:4000/delete-user/${param.id}`,
      param
    );
    return res.data;
  }
);

export const retrieveUserById = createAsyncThunk(
  "users/retrieveUserById",
  async (param) => {
    const res = await axios.get(`http://localhost:4000/get-UserById/${param}`);
    return res.data;
  }
);

export const updateUserById = createAsyncThunk(
  "users/updateUserById",
  async (param) => {
    const res = await axios.put(
      `http://localhost:4000/edit-user/${param.id}`,
      param
    );
    return res.data;
  }
);
