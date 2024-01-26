import React from "react";
import RegisterInput from "../components/register/RegisterInput";

const Register = () => {
  return (
    <div className="grow my-28 mx-4 flex justify-around items-center">
      <div className="mb-64">
        <h1 className="mb-4 text-4xl text-center">Register</h1>
        <RegisterInput />
      </div>
    </div>
  );
};

export default Register;
