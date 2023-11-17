import { createSlice } from "@reduxjs/toolkit";
import { retrieveUsers } from "./userThunk";

const initialState = {
  users: [],
  usersLoading: false,
  usersError: undefined,
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
      });
  },
});

const { actions: usersAction, reducer: usersReducer } = usersSlice;
export { usersAction, usersReducer };
export default usersSlice;
