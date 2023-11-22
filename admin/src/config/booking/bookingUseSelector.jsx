import { useSelector } from "react-redux";

export const useBookingSelector = () =>
  useSelector((state) => state.booking.booking);

export const useBookingLoadingSelector = () =>
  useSelector((state) => state.booking.bookingLoading);

export const useBookingByIdSelector = () =>
  useSelector((state) => state.booking.bookingById);

export const useBookingTypeSelector = () =>
  useSelector((state) => state.booking.typeAction);
