import React, { useEffect, useState } from "react";
import Input from "./Input";
import ListTodo from "./ListTodo";
import { useDispatch } from "react-redux";
import {
  useCompleteTodolistSelecctor,
  useTodolistSelecctor,
} from "../config/todo/todoListSelector";
import { todoListAction } from "../config/todo/todoSlice";
import { retrieveTodo } from "../config/todo/todoThunk";
const TodoList = () => {
  const [idSelected, setIdSelected] = useState(null);
  const [dataEditSelected, setDataEditSelected] = useState(null);
  // ==== GET TODO ========
  const todo = useTodolistSelecctor();
  const completedTodo = useCompleteTodolistSelecctor();
  const dispatch = useDispatch();

  // GET TODO FROM API
  useEffect(() => {
    dispatch(retrieveTodo());
  }, []);

  //   TODO LIST===============
  const handleDelete = (idToDelete) => {
    // ====== JIKA DATA PADA TODO === IDNYA MAKA KEMBALIKAN ARRAY BARU TANPA DATA ITU ===========
    const updatedTodo = todo.filter((item) => item.id !== idToDelete);
    dispatch(todoListAction.updateStateTodoList(updatedTodo));
  };
  const handleCompleteTodo = (id) => {
    const dataCompleted = todo.find((item) => item.id === id);
    dispatch(
      todoListAction.updateCompleteTodoList([...completedTodo, dataCompleted])
    );
    handleDelete(id);
  };
  //   TODO LIST===============

  //  COMPLETED TODO LIST===============
  const handleUncompleteDelete = (idToDelete) => {
    // ====== JIKA DATA PADA TODO === IDNYA MAKA KEMBALIKAN ARRAY BARU TANPA DATA ITU ===========
    const updatedTodo = completedTodo.filter((item) => item.id !== idToDelete);
    dispatch(todoListAction.updateCompleteTodoList(updatedTodo));
  };

  const handleUncompleteTodo = (id) => {
    const dataUnCompleted = completedTodo.find((item) => item.id === id);
    dispatch(todoListAction.updateStateTodoList([...todo, dataUnCompleted]));
    handleUncompleteDelete(id);
  };

  //  COMPLETED TODO LIST===============
  return (
    <>
      <Input
        idSelected={idSelected}
        dataEditSelected={dataEditSelected}
        setIdSelected={setIdSelected}
        setDataEditSelected={setDataEditSelected}
      />
      <ListTodo
        handleUncompleteTodo={handleUncompleteTodo}
        handleUncompleteDelete={handleUncompleteDelete}
        handleDelete={handleDelete}
        todo={todo}
        handleCompleteTodo={handleCompleteTodo}
        completedTodo={completedTodo}
        IdSelected={idSelected}
        setIdSelected={setIdSelected}
        setDataEditSelected={setDataEditSelected}
      />
      ;
    </>
  );
};

export default TodoList;
