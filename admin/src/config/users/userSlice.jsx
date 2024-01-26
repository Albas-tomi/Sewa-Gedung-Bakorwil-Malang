import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUserById,
  retrieveUserById,
  retrieveUsers,
  updateUserById,
} from "./userThunk";

const initialState = {
  users: [],
  userById: [],

  usersLoading: false,
  usersError: undefined,

  userByIdLoading: false,
  userByIdError: undefined,

  updateUserByIdLoading: false,
  updateUserByIdError: undefined,

  deleteUserByIdLoading: false,
  deleteUserByIdError: undefined,

  typeAction: "",
};

const usersSlice = createSlice({
  name: "Users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(retrieveUsers.pending, (state, action) => {
        return {
          ...state,
          usersLoading: true,
          usersError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(retrieveUsers.fulfilled, (state, action) => {
        return {
          ...state,
          users: action.payload,
          usersLoading: false,
          usersError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(retrieveUsers.rejected, (state, action) => {
        return {
          ...state,
          usersLoading: false,
          usersError: action.payload,
          typeAction: action.type,
        };
      })
      .addCase(retrieveUserById.pending, (state, action) => {
        return {
          ...state,
          userByIdLoading: true,
          userByIdError: undefined,
          typeAction: action.type,
        };
      })
      //start Region USER BY ID
      .addCase(retrieveUserById.fulfilled, (state, action) => {
        return {
          ...state,
          userById: action.payload,
          userByIdLoading: false,
          userByIdError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(retrieveUserById.rejected, (state, action) => {
        return {
          ...state,
          userByIdLoading: false,
          userByIdError: action.payload,
          typeAction: action.type,
        };
      })
      //#END region USERBYID

      //#region  UPDATE BY ID
      .addCase(updateUserById.pending, (state, action) => {
        return {
          ...state,
          updateUserByIdLoading: true,
          updateUserByIdError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        return {
          ...state,
          updateUserByIdLoading: false,
          updateUserByIdError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(updateUserById.rejected, (state, action) => {
        return {
          ...state,
          updateUserByIdLoading: false,
          updateUserByIdError: action.payload,
          typeAction: action.type,
        };
      })
      //#END region  UPDATE BY ID

      //#region  DELETE BY ID
      .addCase(deleteUserById.pending, (state, action) => {
        return {
          ...state,
          deleteUserByIdLoading: true,
          deleteUserByIdError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        return {
          ...state,
          deleteUserByIdLoading: false,
          deleteUserByIdError: undefined,
          typeAction: action.type,
        };
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        return {
          ...state,
          deleteUserByIdLoading: false,
          deleteUserByIdError: action.payload,
          typeAction: action.type,
        };
      });
    //#END region  DELETE BY ID
  },
});

const { actions: usersAction, reducer: usersReducer } = usersSlice;
export { usersAction, usersReducer };
export default usersSlice;
