import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const Schema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
});

const RegisterInput = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post("/register", values);
        alert("berhasil register");
        resetForm();
      } catch (error) {
        alert("gagal register");
        console.error(" error:", error);
      }
    },
  });
  return (
    <div className="mt-4">
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto ">
        <input
          type="text"
          placeholder="Jhon Doe"
          name="name"
          id="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <input
          type="email"
          placeholder="your@email.com"
          name="email"
          id="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button type="submit" className="primary">
          Register
        </button>
      </form>
      <div className="text-center py-2 text-gray-500">
        Already a member ? <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
};

export default RegisterInput;
