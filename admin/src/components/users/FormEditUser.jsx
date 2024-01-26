import { useFormik } from "formik";
import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { useUserByIdSelector } from "../../config/users/userSelector";
import { updateUserById } from "../../config/users/userThunk";
import { useDispatch } from "react-redux";

const FormEditUser = ({ idSelected, setIdSelected }) => {
  const dispatch = useDispatch();
  const notify = () => {
    toast.success("Berhasil Edit Data  !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const userData = useUserByIdSelector();
  const handleEditUser = useCallback((values) => {
    dispatch(updateUserById({ ...values, id: idSelected }));
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userData.name || "",
      email: userData.email || "",
    },
    onSubmit: async (values, { resetForm }) => {
      handleEditUser(values);
      document.getElementById("formEditUser").close();
      notify();
      setIdSelected(null);
      resetForm();
    },
  });

  return (
    <div>
      <dialog id="formEditUser" className="modal bg-black/50">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Form Data User Edit</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-3 justify-between">
              <div>
                <div className="grid grid-flow-row grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    name="name"
                    id="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder="Nama User"
                    className="input my-2 input-bordered input-sm w-full "
                  />
                  <input
                    type="email"
                    required
                    name="email"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="Email User"
                    className="input my-2 input-bordered input-sm w-full "
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-sm btn-error text-white "
                >
                  Edit User
                </button>
              </div>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={() => {
                  setIdSelected(null);
                }}
                className="btn btn-sm"
              >
                Tutup
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default FormEditUser;
