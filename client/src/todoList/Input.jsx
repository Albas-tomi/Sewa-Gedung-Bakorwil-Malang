import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { todoListAction } from "../config/todo/todoSlice";
import { v4 as uuidv4 } from "uuid";
import { useTodolistSelecctor } from "../config/todo/todoListSelector";
const Input = ({ setIdSelected, dataEditSelected, setDataEditSelected }) => {
  // MENDAPATKAN DATA TODO
  const todo = useTodolistSelecctor();
  //   MENDAPATKAN FUNCTION STATE REDUXX
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: dataEditSelected?.id || "",
      name: dataEditSelected?.name || "",
      email: dataEditSelected?.email || "",
    },
    onSubmit: (values, { resetForm }) => {
      if (!dataEditSelected) {
        const newData = { ...values, id: uuidv4() };
        dispatch(todoListAction.updateStateTodoList([...todo, newData]));
      } else {
        // ========== JIKA ID SAMA GANTI DENGAN VALUES =============
        // Mendapatkan data todo berdasarka id true ? values
        const updatedTodo = todo.map((item) =>
          item.id === dataEditSelected.id ? values : item
        );
        // Mendapatkan data todo berdasarka id
        dispatch(todoListAction.updateStateTodoList(updatedTodo));
        setDataEditSelected(null);
        setIdSelected(null);
      }
      resetForm();
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          name="name"
          placeholder="Type here"
          className="input input-bordered input-sm w-full max-w-xs"
        />
        <input
          id="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          name="email"
          placeholder="Type here"
          className="input input-bordered input-sm w-full max-w-xs"
        />
        <button type="submit" className="btn btn-xs btn-info">
          Kirim
        </button>
      </form>
    </div>
  );
};

export default Input;
