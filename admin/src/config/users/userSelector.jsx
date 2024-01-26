import { useSelector } from "react-redux";

export const useUsersSelector = () => useSelector((state) => state.users.users);
export const useUserByIdSelector = () =>
  useSelector((state) => state.users.userById);
export const useUserTypeSelector = () =>
  useSelector((state) => state.users.typeAction);
