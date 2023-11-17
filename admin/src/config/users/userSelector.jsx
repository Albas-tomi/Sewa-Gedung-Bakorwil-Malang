import { useSelector } from "react-redux";

export const useUsersSelector = () => useSelector((state) => state.users.users);
