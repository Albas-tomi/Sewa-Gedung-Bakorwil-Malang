import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { retrieveBooking } from "../../config/booking/bookingThunk";
import { useBookingSelector } from "../../config/booking/bookingUseSelector";
import dayjs from "dayjs";
import { retrieveOffices } from "../../config/offices/officesThunk";
import { useOfficesSelector } from "../../config/offices/officesSelector";
import { retrieveUsers } from "../../config/users/userThunk";

const ListBookings = () => {
  const dispatch = useDispatch();
  const bookingData = useBookingSelector();

  const officeData = useOfficesSelector();

  useEffect(() => {
    dispatch(retrieveBooking());
    dispatch(retrieveUsers());
    dispatch(retrieveOffices());
  }, []);
  return (
    <div className="overflow-x-auto w-full bg-white shadow-sm mt-6 rounded-xl p-3">
      <table className="table w-full text-center">
        {/* head */}
        <thead>
          <tr>
            <th>No</th>
            <th>Penanggung Jawab</th>
            <th>Nama Kegiatan</th>
            <th>Tanggal / Jam</th>
            <th>Tempat</th>
            <th>Lembaga</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((data, idx) => (
            <tr key={data._id}>
              <td>{(idx += 1)}</td>
              <td>{data.penanggungjawab}</td>
              <td>{data.namaKegiatan}</td>
              <td className="">
                {dayjs(data.dateTime).format("DD-MMM-YYYY")}
                <br />
                <span className="text-xs font-bold">
                  {dayjs(data.startTime).format("HH:mm")} -{" "}
                  {dayjs(data.endTime).format("HH:mm")}
                </span>
              </td>
              <td className="font-bold text-lg">
                {officeData.find((item) => item._id === data.office)?.title ||
                  ""}
              </td>
              <td>{data.lembaga}</td>
              <td>Terima/Tolak</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBookings;
