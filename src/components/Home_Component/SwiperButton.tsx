import { useSwiper } from "swiper/react";
import {
  CaretRightIcon,
  CaretLeftIcon
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

const SwiperButton = () => {
  const swiper = useSwiper();
  return (
    <div className="relative float-right mt-3 space-x-1">
      <Button
        variant="secondary" size="icon"
        onClick={() => swiper.slidePrev()}
      >
        <CaretLeftIcon weight="bold" className="!size-5"/>
      </Button>
      <Button
        variant="secondary" size="icon"
        onClick={() => swiper.slideNext()}
      >
        <CaretRightIcon weight="bold" className="!size-5"/>
      </Button>
    </div>
  );
};

export default SwiperButton;
