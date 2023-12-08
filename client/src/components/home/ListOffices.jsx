import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { retrieveOffices } from "../../config/BookingOffice/officesThunk";
import { useOfficesSelector } from "../../config/BookingOffice/officesSelector";
import Carousel from "react-multi-carousel";
import { formatRupiah } from "../../rpFormatter";
import { Link } from "react-router-dom";
const ListOffices = () => {
  const offices = useOfficesSelector();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveOffices());
  }, []);
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-x-4 gap-y-8 mt-4 px-3 ">
      {offices.length > 0 &&
        offices.map((data) => (
          <div key={data._id} className="">
            <Carousel responsive={responsive}>
              {data.photos?.map((photo, idx) => (
                <div key={idx}>
                  <img
                    className="rounded-2xl mb-2 aspect-square object-cover"
                    src={`http://localhost:4000/uploads/office/${photo}`}
                    alt="office"
                  />
                </div>
              ))}
            </Carousel>
            <Link to={"/office/" + data._id}>
              <h3 className=" font-bold hover:text-gray-400 duration-300">
                {data.title}
              </h3>
              <h2 className="text-sm truncate text-gray-600">
                {data.extraInfo}
              </h2>
            </Link>
            <p className="mt-2">
              <span className="font-semibold">
                {" "}
                {data.title === "Gedung Arjuna"
                  ? `${formatRupiah(data.price)}`
                  : "Gratis "}
              </span>
              {data.title === "Gedung Arjuna"
                ? "/ 8 Jam Penyewaan"
                : "/ 4 Jam Penyewaan"}
            </p>
          </div>
        ))}
    </div>
  );
};

export default ListOffices;
