import { Button } from "@/components/ui/button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EnvelopeOpenIcon, ArrowCircleUpRightIcon } from "@phosphor-icons/react/dist/ssr";

import slide1 from "@/assets/courses/slide1.jpg";
import slide2 from "@/assets/courses/slide2.jpg";

const SliderComponent = () => {
  return (
    <div className="relative w-full h-full">
      <Swiper
        navigation={true}
        loop={true}
        slidesPerView={1}
        modules={[Navigation]}
        autoplay={{ delay: 10000 }}
        className="w-full h-full"
      >
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide1})` }}
          >
            {/* <div className="absolute inset-0 bg-black/50"></div> */}
            <div className="flex flex-col items-center justify-center h-full bg-black/70">
              <h1 className="text-5xl font-bold text-white">Welcome To Học Tiếng Việt.AI</h1>
              <p className="mt-3 text-white text-center max-w-sm">
                Choose from over 220,000 online video courses with new additions published every month
              </p>
              <div className="flex gap-4 mt-6">
                <Button variant="outline">
                  <EnvelopeOpenIcon weight="duotone" className="!size-5" /> Contact Us
                </Button>
                <Button variant="outline">
                  <ArrowCircleUpRightIcon weight="duotone" className="!size-5" /> Read more
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide2})` }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="flex items-center justify-center h-full bg-black/50 relative">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold">Built for success</h1>
                <p className="mt-4">
                  Launch a new career in as little as 6 months
                </p>
                <div className="mt-8">
                  <Button
                    variant="outline"
                    className="text-white mr-4 hover:bg-gray-500 hover:text-black transition ease-in-out duration-300"
                  >
                    Contact Us
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white hover:bg-gray-500 hover:text-black transition ease-in-out duration-300"
                  >
                    Read more
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderComponent;
