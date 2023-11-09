import { useSelector } from "react-redux";

export const useBookingSelector = () =>
  useSelector((state) => state.booking.booking);

export const useBookingByIdSelector = () =>
  useSelector((state) => state.booking.bookingById);

export const useBookingTypeSelector = () =>
  useSelector((state) => state.booking.typeAction);
