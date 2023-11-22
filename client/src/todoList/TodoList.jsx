import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import ListTodo from "./ListTodo";
import { useDispatch } from "react-redux";
import {
  useCompleteTodolistSelecctor,
  useTodolistSelecctor,
} from "../config/todo/todoListSelector";
import { todoListAction } from "../config/todo/todoSlice";
import { retrieveTodo } from "../config/todo/todoThunk";
import emailjs from "@emailjs/browser";
import Carousel from "react-multi-carousel";
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

  const form = useRef();

  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gedung: "",
  });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = (e) => {
    emailjs
      .sendForm(
        "service_s3n1ppe", // Replace with your service ID
        "template_hwtabpm", // Replace with your template ID
        e.target, // Reference to the form
        "XeSkKCtKDKKBnm10x" // Replace with your public key
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("Email sent successfully!");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

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

      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" onChange={handleInputChange} name="name" />
        <label>Email</label>
        <input type="email" onChange={handleInputChange} name="email" />
        <label>gedung</label>
        <textarea onChange={handleInputChange} name="gedung" />
        <input type="submit" value="Send" />
      </form>
    </>
  );
};

export default TodoList;
