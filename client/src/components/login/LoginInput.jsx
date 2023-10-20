import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { UserContext } from "../UserContext";

const Schema = Yup.object({
  email: Yup.string().required(),
  password: Yup.string().required(),
});

const LoginInput = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = await axios.post("/login", values);
        setUser(data.data);
        alert("berhasil login");
        navigate("/");
      } catch (error) {
        alert("gagal login");
        console.log("error", error.message);
      }
      resetForm();
    },
  });
  return (
    <div className="mt-4">
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto ">
        <input
          type="email"
          placeholder="your@email.com"
          name="email"
          id="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && (
          <p className="mt-1 w-full text-red-500 text-sm">
            {formik.errors.email}
          </p>
        )}
        <input
          type="password"
          placeholder="password"
          name="password"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password && (
          <p className="mt-1 w-full text-red-500 text-sm">
            {formik.errors.password}
          </p>
        )}
        <button type="submit" className="primary">
          Login
        </button>
      </form>
      <div className="text-center py-2 text-gray-500">
        Don't have an account yet ? <Link to={"/register"}>Register</Link>
      </div>
    </div>
  );
};

export default LoginInput;
