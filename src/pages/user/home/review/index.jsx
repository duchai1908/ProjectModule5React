import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Review() {
  return (
    <>
      <section className="block p-0 w-full max-w-[1200px] mx-auto z-20 mt-14 mb-14">
        <div className="w-full flex flex-col items-center justify-between relative z-10">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper rounded-2xl shadow-lg"
            loop={true}
          >
            <SwiperSlide>
              <div className="flex flex-col items-center justify-center text-center w-full bg-gray-200">
                <p className="mt-8 mb-8">
                  <i
                    className="bi bi-chat-quote text-[36px] mr-[10px] text-blue-500"
                  ></i>
                </p>
                <p className="font-bold w-[800px]">
                  Being an avid language learner, I've always sought ways to
                  practice and improve my skills. Minimalin has become my
                  language learning companion.
                </p>
                <p className="mt-8 mb-8">Emily Smith</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col items-center justify-center text-center w-full bg-gray-200">
                <p className="mt-8 mb-8">
                  <i
                    className="bi bi-chat-quote text-[36px] mr-[10px] text-blue-500"
                  ></i>
                </p>
                <p className="font-bold w-[800px]">
                  Being an avid language learner, I've always sought ways to
                  practice and improve my skills. Minimalin has become my
                  language learning companion.
                </p>
                <p className="mt-8 mb-8">Emily Smith</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
}
