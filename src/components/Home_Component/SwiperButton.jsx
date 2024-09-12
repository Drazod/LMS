import React from "react";
import { useSwiper } from "swiper/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const SwiperButton = () => {
  const swiper = useSwiper();
  return (
    <div className=" relative float-right mr-10">
      <button
        className="bg-orange-500 text-black mt-4 hover:bg-purple-800 p-2 rounded-2xl mr-2 h-8 w-8"
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeftIcon />
      </button>
      <button
        className="bg-orange-500 text-black mt-4 hover:bg-purple-800 p-2 rounded-2xl h-8 w-8"
        onClick={() => swiper.slideNext()}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default SwiperButton;
