import React from "react";
import InputOffice from "../components/offices/InputOffice";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const FormOffices = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen shadow-sm rounded-xl p-3 mt-1">
      <div className="flex gap-7 items-center">
        <button onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack className="text-3xl hover:text-blue-500 duration-300" />
        </button>
        <h1 className="text-xl font-bold">Form Data Offices</h1>
      </div>
      <InputOffice />
    </div>
  );
};

export default FormOffices;
