import { useSelector } from "react-redux";

export const useMybookingSelector = () =>
  useSelector((state) => state.booking.myBookings);

export const useMybookingLoadingSelector = () =>
  useSelector((state) => state.booking.myBookingsLoading);

export const useBookingSelector = () =>
  useSelector((state) => state.booking.bookings);

export const useBookingTypeSelector = () =>
  useSelector((state) => state.booking.typeAction);
