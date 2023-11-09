import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import { formatRupiah } from "../../rpFormatter";
import { useFormik } from "formik";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // t
import { useDispatch } from "react-redux";
import {
  createBooking,
  retrieveBooking,
} from "../../config/Booked/bookingThunk";
import { useBookingSelector } from "../../config/Booked/bookingSelector";
import { getWeekDay } from "../../getWeekDay";
import { format } from "date-fns";
import ModalBooking from "./ModalBooking";

const BookingWidget = ({ office }) => {
  const { user } = useContext(UserContext);
  const [dayBooked, setDayBooked] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const dataBooked = useBookingSelector();
  const [booking, setBooking] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(retrieveBooking());
  }, []);
  let amountDayBooked = 0;

  const formik = useFormik({
    initialValues: {
      office: office._id,
      order_id: `order_${uuidv4()}`,
      checkIn: dayBooked[0].startDate,
      checkOut: dayBooked[0].endDate,
      guest: "",
      fullName: "",
      phone: "",
      price: 0,
    },
    onSubmit: async (values, { resetForm }) => {
      if (user) {
        values.price = amountDayBooked * office.price;
        values.checkIn = new Date(dayBooked[0].startDate);
        values.checkOut = new Date(dayBooked[0].endDate);
        values.office = office._id;
        if (values.phone && values.fullName && values.fullName !== "") {
          setBooking(values);
          document.getElementById("modal_payment").showModal();
        }
      } else {
        navigate("/login");
      }

      resetForm();
    },
  });

  //  ====== REGION CHECK JUMLAH HARI BOOKING ======
  let startDates = dayBooked[0].startDate;
  let endDates = dayBooked[0].endDate;
  if (startDates && endDates) {
    const checkInDate = new Date(startDates);
    const checkOutDate = new Date(endDates);

    // Calculate the difference in days, and if it's zero, set it to 1
    const differenceInDays = differenceInCalendarDays(
      checkOutDate,
      checkInDate
    );
    amountDayBooked = differenceInDays === 0 ? 1 : differenceInDays + 1;
  }
  //  ====== REGION CHECK JUMLAH HARI BOOKING ======

  //  ====== REGION DISABLE DATE ======
  // Dapatkan Data Hari Senin - Jumat
  const dayWeek = getWeekDay(2);
  //  =========== GET DATE BOOKED
  const checkInCheckOutDates = dataBooked
    .filter((data) => data.office === id)
    .map((item) => ({
      checkIn: format(new Date(item.checkIn), "yyyy-MM-dd"), // Ubah format checkIn
      checkOut: format(new Date(item.checkOut), "yyyy-MM-dd"), //
    }));

  // Convert the checkIn and checkOut dates to Date objects
  const checkInDate = checkInCheckOutDates.map(
    (date) => new Date(date.checkIn)
  );

  const checkOutDate = checkInCheckOutDates.map(
    (date) => new Date(date.checkOut)
  );

  const disabledDates = [...dayWeek];
  // AMBIL SEMUA TANGGAL CHECKIN
  for (let i = 0; i < checkInDate.length; i++) {
    let currentDate = new Date(checkInDate[i]);

    // CEK RANGE DATE CHECKIN DAN CHECKOUT
    while (currentDate <= checkOutDate[i]) {
      disabledDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  //  ====== REGION DISABLE DATE ======
  return (
    <div className="bg-white mt-2  shadow p-4 rounded-2xl">
      <div className="text-xl text-center">
        Price : {formatRupiah(office.price)} / Booked
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="border bg-white rounded-2xl">
          <div className="flex justify-around">
            <DateRange
              minDate={new Date()}
              onChange={(item) => setDayBooked([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={1}
              disabledDates={disabledDates}
              ranges={dayBooked}
              direction="horizontal"
            />
          </div>
        </div>
        <div className="border rounded-2xl mt-2 px-4 py-3">
          <label htmlFor="">Number of Guest : </label>
          <input
            name="guest"
            id="guest"
            onChange={formik.handleChange}
            value={formik.values.guest}
            className="block"
            type="number"
          />
        </div>
        <div>
          {amountDayBooked > 0 && (
            <>
              <label htmlFor="">Full Name : </label>
              <input
                name="fullName"
                id="fullName"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                className="block"
                type="text"
              />
              <label htmlFor="">Phone : </label>
              <input
                name="phone"
                id="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                className="block"
                type="tel"
              />
            </>
          )}
        </div>
        <button
          type="submit"
          className="bg-red-500 mt-4 w-full text-white rounded-full py-2 px-4"
        >
          Book this office
          {amountDayBooked > 0 && (
            <span className="mx-2">
              {" "}
              {formatRupiah(amountDayBooked * office.price)}
            </span>
          )}
        </button>
      </form>
      <ModalBooking booking={booking} />
    </div>
  );
};

export default BookingWidget;
