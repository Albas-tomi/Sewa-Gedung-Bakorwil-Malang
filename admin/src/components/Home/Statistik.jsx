import React from "react";
import { useBookingSelector } from "../../config/booking/bookingUseSelector";
import { useUsersSelector } from "../../config/users/userSelector";

const Statistik = () => {
  const bookingData = useBookingSelector();
  const userData = useUsersSelector();
  const diterima = bookingData.filter((data) => data.statusDiterima === true);
  const ditolak = bookingData.filter((data) => data.statusDiterima === false);
  return (
    <div className="grid gap-8  grid-cols-3 mt-4">
      <div className=" flex-col flex text-white bg-blue-500/60 h-28 rounded-xl p-2 font-bold text-xl">
        Permohonan Diterima
        <span className="text-white text-5xl text-center">
          {diterima.length}
        </span>
      </div>
      <div className="flex-col flex text-white bg-green-500/60 h-28 rounded-xl p-2 font-bold text-xl">
        Pengguna
        <span className="text-white text-5xl text-center">
          {userData.length}
        </span>
      </div>
      <div className="flex-col flex text-white bg-purple-500/60 h-28 rounded-xl p-2 font-bold text-xl">
        Permohonan Ditolak
        <span className="text-white text-5xl text-center">
          {" "}
          {ditolak.length}
        </span>
      </div>
    </div>
  );
};

export default Statistik;
