import React from "react";
import LoginInput from "../components/login/LoginInput";

const LoginPage = () => {
  return (
    <div>
      <div className="grow flex justify-around items-center">
        <div className="mb-64">
          <h1 className="mb-4 text-4xl text-center">Login</h1>
        </div>
        <LoginInput />
      </div>
    </div>
  );
};

export default LoginPage;
