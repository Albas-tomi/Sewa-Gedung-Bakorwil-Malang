import { useSelector } from "react-redux";

export const useOfficesSelector = () =>
  useSelector((state) => state.offices.offices);
