import React from "react";
import LoginInput from "../components/login/LoginInput";

const LoginPage = () => {
  return (
    <div>
      <div className="grow flex-col gap-4 px-3 flex justify-around items-center">
        <h1 className="mb-4 text-4xl text-center">Login</h1>
        <LoginInput />
      </div>
    </div>
  );
};

export default LoginPage;
