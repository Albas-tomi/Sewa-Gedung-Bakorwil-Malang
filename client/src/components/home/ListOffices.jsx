import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { retrieveOffices } from "../../config/BookingOffice/officesThunk";
import { useOfficesSelector } from "../../config/BookingOffice/officesSelector";

const ListOffices = () => {
  const offices = useOfficesSelector();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveOffices());
  }, []);
  return <div></div>;
};

export default ListOffices;
