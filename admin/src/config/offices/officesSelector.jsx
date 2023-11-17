import { useSelector } from "react-redux";

export const useOfficesSelector = () =>
  useSelector((state) => state.office.officeData);

export const useOfficesTypeSelector = () =>
  useSelector((state) => state.office.typeAction);

export const useOfficesByIdSelector = () =>
  useSelector((state) => state.office.officeByIdData);
