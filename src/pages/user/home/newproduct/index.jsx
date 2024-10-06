import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "antd";

export default function NewCollection() {
  return (
    <section className="block p-0 w-full max-w-[1300px] m-[0_auto] z-20 mt-14">
      <p className="text-center font-bold text-4xl mb-6">New Collection</p>
      <div className="w-full flex flex-col items-center justify-between m-[0_auto] relative z-[10]">
        <div className="flex flex-wrap justify-between w-full">
          <Swiper
            slidesPerView={4} // Default for larger screens
            spaceBetween={15}
            loop={true}
            breakpoints={{
              0: {
                slidesPerView: 1, // Single column on small screens
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 1, // Single column on small screens
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2, // Two columns on tablets
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 3, // Three columns on larger tablets
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 4, // Four columns on large screens
                spaceBetween: 15,
              },
            }}
            className="mySwiper"
          >
            {Array(5)
              .fill("")
              .map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col items-center justify-center flex-1 min-w-[200px] m-2 group">
                    <div>
                      <a href="#">
                        <img
                          src="/images/e1_11_600x.webp"
                          className="border rounded-3xl"
                        />
                      </a>
                    </div>
                    <div className="mt-4">
                      <a
                        href="#"
                        className="font-bold text-black group-hover:text-blue-500"
                      >
                        Ha. HX 12 Note Pro
                      </a>
                      <p>1.999.000 đ</p>
                      <Button className="mt-2">Add to cart</Button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <Button className="text-center mt-8 bg-blue-600 text-white">
          View All
        </Button>
      </div>
    </section>
  );
}
