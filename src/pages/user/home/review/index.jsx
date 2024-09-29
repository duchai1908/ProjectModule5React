import React from "react";
import "./review.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css'
import 'swiper/css/navigation'
export default function Review() {
  return (
    <>
      <section className="block p-0 w-full max-w-[1200px] m-[0_auto] z-20 mt-14 review-b mb-14 ">
        <div className="w-full flex flex-col items-center justify-between  m-[0_auto] relative z-[10] ">
          <Swiper 
            navigation={true}
            modules={[Navigation]}
            className="mySwiper  rounded-2xl shadow-lg "
            loop={true}
          >
            <SwiperSlide >
              <div className="flex flex-col items-center justify-center text-center review-bg ">
                <p className="mt-8 mb-8 ">
                  <i
                    className="bi bi-chat-quote"
                    style={{
                      fontSize: "36px",
                      marginRight: "10px",
                      color: "blue",
                    }}
                  ></i>
                </p>
                <p className="font-bold w-[800px]">
                  Being an avid language learner, I've always sought ways to
                  practice and im-prove my skills. Minimalin has become my
                  language learing companion.
                </p>
                <p className="mt-8 mb-8">Emily Smith</p>
              </div>
            </SwiperSlide>
            <SwiperSlide >
              <div className="flex flex-col items-center justify-center text-center review-bg">
                <p className="mt-8 mb-8 ">
                  <i
                    className="bi bi-chat-quote"
                    style={{
                      fontSize: "36px",
                      marginRight: "10px",
                      color: "blue",
                    }}
                  ></i>
                </p>
                <p className="font-bold w-[800px]">
                  Being an avid language learner, I've always sought ways to
                  practice and im-prove my skills. Minimalin has become my
                  language learing companion.
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
