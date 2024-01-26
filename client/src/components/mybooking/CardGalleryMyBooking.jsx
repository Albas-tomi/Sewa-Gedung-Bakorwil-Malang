import React from "react";

const CardGalleryMyBooking = ({ office }) => {
  return (
    <div className="grid relative gap-4 grid-cols-[2fr_1fr]">
      <div>
        {office.photos?.[0] && (
          <div>
            <img
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
              className="aspect-square cursor-pointer object-cover"
              src={"http://localhost:4000/uploads/office/" + office.photos?.[1]}
              alt="office"
            />
          </div>
        )}
        {office.photos?.[2] && (
          <div className="overflow-hidden">
            <img
              className="aspect-square cursor-pointer  object-cover relative top-2"
              src={"http://localhost:4000/uploads/office/" + office.photos?.[2]}
              alt="office"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardGalleryMyBooking;
