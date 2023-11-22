import React, { useCallback, useState } from "react";

const CarrouselHeader = () => {
  const [active, setActive] = useState("item1");
  const handleTabActived = useCallback((item) => {
    setActive(item);
  });
  return (
    <>
      <div className="carousel w-full">
        <div
          id="item1"
          className="carousel-item w-full max-h-[26rem] object-cover "
        >
          <img
            src="https://alexandra.bridestory.com/image/upload/assets/upload-j8Abk8ylt.jpg"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          id="item2"
          className="carousel-item w-full max-h-[26rem] object-cover "
        >
          <img
            src="https://berita.kedirikab.go.id/asset/foto_berita/Gedung_RSKK_(2).jpeg"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          id="item3"
          className="carousel-item w-full max-h-[26rem] object-cover "
        >
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/1*uCvyWsGUAr-_5zbxEY0ipA.jpeg"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          id="item4"
          className="carousel-item w-full max-h-[26rem] object-cover "
        >
          <img
            src="https://image.popbela.com/content-images/post/20211014/195457100-472312690528944-2739616733483032719-n-731afc8fe83bf6a36fcf5c6c9171f971.jpg?width=1600&format=webp&w=1600"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a
          onClick={() => handleTabActived("item1")}
          href="#item1"
          className={`btn btn-xs ${
            active === "item1" && "bg-blue-500 text-white"
          }`}
        >
          1
        </a>
        <a
          onClick={() => handleTabActived("item2")}
          href="#item2"
          className={`btn btn-xs ${
            active === "item2" && "bg-blue-500 text-white"
          }`}
        >
          2
        </a>
        <a
          onClick={() => handleTabActived("item3")}
          href="#item3"
          className={`btn btn-xs ${
            active === "item3" && "bg-blue-500 text-white"
          }`}
        >
          3
        </a>
        <a
          onClick={() => handleTabActived("item4")}
          href="#item4"
          className={`btn btn-xs ${
            active === "item4" && "bg-blue-500 text-white"
          }`}
        >
          4
        </a>
      </div>
    </>
  );
};

export default CarrouselHeader;
