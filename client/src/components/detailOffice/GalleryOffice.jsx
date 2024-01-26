import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiPhotoAlbum } from "react-icons/bi";

const GalleryOffice = ({ office }) => {
  const [showAllImg, setShowAllImg] = useState(false);
  if (showAllImg) {
    return (
      <div
        key={office._id}
        className="absolute w-full z-10 inset-0 bg-black text-white  min-h-screen"
      >
        <div className="p-8 bg-black grid gap-4">
          <div>
            <h2>{office.title}</h2>
            <button
              onClick={() => setShowAllImg(false)}
              className="flex text-black right-2 top-24 fixed shadow shadow-black justify-center py-2 px-4 rounded-2xl items-center gap-2"
            >
              Close photos
              <AiOutlineCloseCircle />
            </button>
          </div>
          {office?.photos?.length > 0 &&
            office.photos.map((photo, idx) => (
              <div key={idx}>
                <img
                  src={"http://localhost:4000/uploads/office/" + photo}
                  alt="office"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="grid relative gap-4 grid-cols-[2fr_1fr]">
      <div>
        {office.photos?.[0] && (
          <div>
            <img
              onClick={() => setShowAllImg(true)}
              className="aspect-square cursor-pointer object-cover"
              src={"http://localhost:4000/uploads/office/" + office.photos?.[0]}
              alt="office"
            />
          </div>
        )}
      </div>
      <div className="grid">
        {office.photos?.[1] && (
          <div>
            <img
              onClick={() => setShowAllImg(true)}
              className="aspect-square cursor-pointer object-cover"
              src={"http://localhost:4000/uploads/office/" + office.photos?.[1]}
              alt="office"
            />
          </div>
        )}
        {office.photos?.[2] && (
          <div className="overflow-hidden">
            <img
              onClick={() => setShowAllImg(true)}
              className="aspect-square cursor-pointer  object-cover relative top-2"
              src={"http://localhost:4000/uploads/office/" + office.photos?.[2]}
              alt="office"
            />
          </div>
        )}
        <button
          onClick={() => setShowAllImg(true)}
          className="absolute flex justify-center items-center gap-2 bottom-2 right-2 py-2 px-4 bg-white rounded-2xl  shadow-md"
        >
          <BiPhotoAlbum />
          <span>Show more photos</span>
        </button>
      </div>
    </div>
  );
};

export default GalleryOffice;
