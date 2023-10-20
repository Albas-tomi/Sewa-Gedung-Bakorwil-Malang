import { createSlice } from "@reduxjs/toolkit";
import { retrieveTodo } from "./todoThunk";

const initialState = {
  todoList: [],
  loading: false,
  errorRetrieveTodo: undefined,
  completedTodoList: [],
};

const todoSlice = createSlice({
  name: "TODO LIST",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(retrieveTodo.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(retrieveTodo.fulfilled, (state, action) => {
        return {
          ...state,
          todoList: action.payload,
          loading: false,
        };
      })
      .addCase(retrieveTodo.rejected, (state, action) => {
        return {
          ...state,
          errorRetrieveTodo: action.payload,
          loading: false,
        };
      });
  },

  // LOCAL DUMMY
  // reducers: {
  //   updateStateTodoList: (state, action) => {
  //     return {
  //       ...state,
  //       todoList: action.payload,
  //     };
  //   },
  //   updateCompleteTodoList: (state, action) => {
  //     return {
  //       ...state,
  //       completedTodoList: action.payload,
  //     };
  //   },
  // },
});

const { actions: todoListAction, reducer: todoListReducer } = todoSlice;
export { todoListAction, todoListReducer };
export default todoSlice;
