import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "./BookingWidget";
import GalleryOffice from "./GalleryOffice";

const ListDetailOffice = () => {
  const [office, setOffice] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`office/${id}`).then((res) => {
      setOffice(res.data);
    });
  }, [id]);

  if (!office) return "";
  return (
    <div className="mt-4 md:mx-3 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{office.title}</h1>
      <a className="my-2 block font-semibold underline">{office.address}</a>
      <div className="relative">
        <GalleryOffice office={office} />

        <div className="grid mt-8 gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div>
              <h2 className="font-semibold text-2xl my-2">Description</h2>
              {office.description}
            </div>
            Check-in : {office.checkIn}
            <br />
            Check-out : {office.checkOut}
            <br />
            Max of Guest : {office.maxGuest}
          </div>
          <div>
            <BookingWidget office={office} />
          </div>
        </div>
      </div>
      <div className="text-2xl font-semibold">Extra info</div>
      <div className="text-sm text-gray-700 mt-4 leading-4">
        {office.extraInfo}
      </div>
    </div>
  );
};

export default ListDetailOffice;
