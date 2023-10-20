import { useSelector } from "react-redux";

export const useTodolistSelecctor = () =>
  useSelector((state) => state.todoList.todoList);

export const useTodolistLoadingSelecctor = () =>
  useSelector((state) => state.todoList.loading);

export const useCompleteTodolistSelecctor = () =>
  useSelector((state) => state.todoList.completedTodoList);
