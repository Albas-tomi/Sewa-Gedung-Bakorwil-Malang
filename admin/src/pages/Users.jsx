import React from "react";
import HeaderUsers from "../components/users/HeaderUsers";
import ListUsers from "../components/users/ListUsers";

const Users = () => {
  return (
    <div className="bg-gray-100 min-h-screen shadow-sm rounded-xl p-3 mt-1">
      <HeaderUsers />
      <ListUsers />
    </div>
  );
};

export default Users;
