import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import { formatRupiah } from "../../rpFormatter";
import { useFormik } from "formik";
import { DateRange, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // t

const BookingWidget = ({ office }) => {
  const { user } = useContext(UserContext);
  const [dataBooked, setDataBooked] = useState([]);
  const [dayBooked, setDayBooked] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [booking, setBooking] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    // axios.get("/bookingoffice").then(({ data }) => {
    //   setDataBooked(data);
    // });
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
        console.log(values);
        // values.price = amountDayBooked * office.price;
        // values.checkIn = new Date(dayBooked[0].startDate);
        // values.checkOut = new Date(dayBooked[0].endDate);
        // document.getElementById("modal_payment").showModal();
        // setBooking(values);
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
              //   disabledDates={disabledDates}
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
      {/* <ModalFormPayment booking={booking} /> */}
    </div>
  );
};

export default BookingWidget;
