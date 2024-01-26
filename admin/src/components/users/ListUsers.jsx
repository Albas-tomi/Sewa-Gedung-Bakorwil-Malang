import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useUserTypeSelector,
  useUsersSelector,
} from "../../config/users/userSelector";
import {
  deleteUserById,
  retrieveUserById,
  retrieveUsers,
  updateUserById,
} from "../../config/users/userThunk";
import ModalConfirmDelete from "../users/ModalConfirmDelete";
import FormEditUser from "./FormEditUser";

const ListUsers = () => {
  const [idSelected, setIdSelected] = useState(null);
  const dispatch = useDispatch();
  const usersData = useUsersSelector();

  useEffect(() => {
    dispatch(retrieveUsers());
  }, []);

  useEffect(() => {
    if (idSelected) {
      dispatch(retrieveUserById(idSelected));
    }
    return;
  }, [idSelected]);

  const usersTypeAction = useUserTypeSelector();
  console.log(usersTypeAction);

  useEffect(() => {
    if (usersTypeAction === updateUserById.fulfilled.type) {
      dispatch(retrieveUsers());
    }
    if (usersTypeAction === deleteUserById.fulfilled.type) {
      dispatch(retrieveUsers());
    }
    return;
  }, [usersTypeAction]);
  return (
    <div className="overflow-x-auto w-full bg-white shadow-sm mt-6 rounded-xl p-3">
      <table className="table w-full text-center">
        {/* head */}
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((data, idx) => (
            <tr key={data._id}>
              <td>{(idx += 1)}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      document.getElementById("formEditUser").showModal();
                      setIdSelected(data._id);
                    }}
                    className="btn btn-outline btn-warning btn-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setIdSelected(data._id);
                      document.getElementById("konfirmasi_deleteUser").show();
                    }}
                    className="btn btn-outline btn-error btn-xs"
                  >
                    Hapus
                  </button>

                  <button
                    //   onClick={() => {
                    //     setIdSelected(data._id);
                    //     document.getElementById("detailBooking").showModal();
                    //   }}
                    className="btn btn-outline btn-info btn-xs"
                  >
                    Detail
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalConfirmDelete idSelected={idSelected} />
      <FormEditUser idSelected={idSelected} setIdSelected={setIdSelected} />
    </div>
  );
};

export default ListUsers;
