import React from "react";
import { useTodolistLoadingSelecctor } from "../config/todo/todoListSelector";

const ListTodo = ({
  handleUncompleteDelete,
  handleUncompleteTodo,
  setDataEditSelected,
  handleDelete,
  completedTodo,
  todo,
  setIdSelected,
  handleCompleteTodo,
}) => {
  const isLoading = useTodolistLoadingSelecctor();
  return (
    <div>
      {isLoading && <div>Loading.... deckkkkk</div>}
      <div className="overflow-x-auto">
        TODO FOR YOUR DAY
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todo &&
              todo.map((data, idx) => (
                <tr key={idx}>
                  <th>{(idx += 1)}</th>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => {
                        setIdSelected(data.id);
                        setDataEditSelected({
                          id: data.id,
                          name: data.name,
                          email: data.email,
                        });
                      }}
                      className="btn btn-xs btn-active btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleCompleteTodo(data.id)}
                      className="btn btn-xs btn-active btn-info"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => handleDelete(data.id)}
                      className="btn btn-xs btn-active btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      COMPLETED TODO
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {completedTodo &&
            completedTodo.map((data, idx) => (
              <tr key={idx}>
                <th>{(idx += 1)}</th>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleUncompleteTodo(data.id)}
                    className="btn btn-xs btn-active btn-info"
                  >
                    UnComplete
                  </button>
                  <button
                    onClick={() => handleUncompleteDelete(data.id)}
                    className="btn btn-xs btn-active btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodo;
