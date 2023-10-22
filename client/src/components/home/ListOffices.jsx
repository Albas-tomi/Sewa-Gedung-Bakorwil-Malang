import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { retrieveOffices } from "../../config/BookingOffice/officesThunk";
import { useOfficesSelector } from "../../config/BookingOffice/officesSelector";
import { formatRupiah } from "../../rpFormatter";
import { Link } from "react-router-dom";
const ListOffices = () => {
  const offices = useOfficesSelector();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveOffices());
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 mt-4 px-3 ">
      {offices.length > 0 &&
        offices.map((data) => (
          <Link key={data._id} to={"/office/" + data._id}>
            <div className="">
              <div className="bg-gray-200 rounded-2xl flex">
                <img
                  className="rounded-2xl mb-2 aspect-square object-cover"
                  src="https://a0.muscache.com/im/pictures/miso/Hosting-824015985248619464/original/a0e90c4a-83d8-4392-8302-4cc24d2eebe2.jpeg?im_w=1200"
                  alt=""
                />
              </div>
              <h3 className=" font-bold">{data.address}</h3>
              <h2 className="text-sm truncate text-gray-600">{data.title}</h2>
              <p className="mt-2">
                <span className="font-semibold">
                  {formatRupiah(data.price)}
                </span>{" "}
                for booked
              </p>
            </div>
          </Link>
        ))}{" "}
    </div>
  );
};

export default ListOffices;
