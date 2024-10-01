import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider() {
  return (
    <section className="slider-swiper h-[600px] w-full">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper w-full h-full"
      >
        <SwiperSlide>
          <div
            className="bg-black w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('https://cdn2.cellphones.com.vn/x/media/wysiwyg/1-Pro.jpg')" }}
          >
            {/* Your content here */}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="bg-black w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('https://marithe-official.com/main_banner/24FW/011_OHJAEHUN/pc_1.jpg')" }}
          >
            {/* Your content here */}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="bg-black w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('https://marithe-official.com/main_banner/24FW/011_OHJAEHUN/pc_1.jpg')" }}
          >
            {/* Your content here */}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="bg-black w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('https://marithe-official.com/main_banner/24FW/011_OHJAEHUN/pc_1.jpg')" }}
          >
            {/* Your content here */}
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
