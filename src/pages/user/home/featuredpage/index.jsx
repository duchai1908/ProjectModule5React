import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "antd";
import "./feature.css";
import "swiper/css";
import "swiper/css/autoplay"; // CSS cho autoplay
import { Link } from "react-router-dom";
import "swiper/css/autoplay"; // Import CSS cho autoplay
import { Autoplay } from "swiper/modules";
export default function Feartured() {
  return (
    <>
      <section className="block p-0 w-full max-w-[1300px] m-[0_auto] z-20 mt-14">
        <div className="text-center font-bold mb-6 feature-title">
          Featured Collection
          <div className="feature-line"></div>
        </div>
        <div className="w-full flex flex-col items-center justify-between  m-[0_auto] relative z-[10]">
          <div className="flex flex-wrap justify-between w-full">
            <Swiper
              slidesPerView={4}
              spaceBetween={15}
              s
              loop={true}
              autoplay={{
                delay: 3000, // Thời gian trễ giữa các slide (3 giây)
                disableOnInteraction: false, // Cho phép tự động chạy khi tương tác
              }}
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
              modules={[Autoplay]} // Thêm Autoplay vào modules
              className="mySwiper"
            >
              <SwiperSlide className="slide-box">
                <div className="flex flex-col items-center justify-center flex-1 min-w-[200px] m-2 group feature-box">
                  <div className="">
                    <a href="">
                      <img
                        src="/images/e1_11_600x.webp"
                        className=" border rounded-3xl "
                      />
                    </a>
                  </div>
                  <div className="mt-4">
                    <Link href="#" className="font-bol slide-link">
                      Ha. HX 12 Note Pro
                    </Link>
                    <p className="slide-text">1.999.000 đ</p>
                    <Button className="slide-button">
                      <span>Add to cart</span>
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="slide-box">
                <div className="flex flex-col items-center justify-center flex-1 min-w-[200px] m-2 group feature-box">
                  <div className="">
                    <a href="">
                      <img
                        src="/images/e1_11_600x.webp"
                        className=" border rounded-3xl "
                      />
                    </a>
                  </div>
                  <div className="mt-4">
                    <Link href="#" className="font-bol slide-link">
                      Ha. HX 12 Note Pro
                    </Link>
                    <p className="slide-text">1.999.000 đ</p>
                    <Button className="slide-button">
                      <span>Add to cart</span>
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="slide-box">
                <div className="flex flex-col items-center justify-center flex-1 min-w-[200px] m-2 group feature-box">
                  <div className="">
                    <a href="">
                      <img
                        src="/images/e1_11_600x.webp"
                        className=" border rounded-3xl "
                      />
                    </a>
                  </div>
                  <div className="mt-4">
                    <Link href="#" className="font-bol slide-link">
                      Ha. HX 12 Note Pro
                    </Link>
                    <p className="slide-text">1.999.000 đ</p>
                    <Button className="slide-button">
                      <span>Add to cart</span>
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="slide-box">
                <div className="flex flex-col items-center justify-center flex-1 min-w-[200px] m-2 group feature-box">
                  <div className="">
                    <a href="">
                      <img
                        src="/images/e1_11_600x.webp"
                        className=" border rounded-3xl "
                      />
                    </a>
                  </div>
                  <div className="mt-4">
                    <Link href="#" className="font-bol slide-link">
                      Ha. HX 12 Note Pro
                    </Link>
                    <p className="slide-text">1.999.000 đ</p>
                    <Button className="slide-button">
                      <span>Add to cart</span>
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="slide-box">
                <div className="flex flex-col items-center justify-center flex-1 min-w-[200px] m-2 group feature-box">
                  <div className="">
                    <a href="">
                      <img
                        src="/images/e1_11_600x.webp"
                        className=" border rounded-3xl "
                      />
                    </a>
                  </div>
                  <div className="mt-4">
                    <Link href="#" className="font-bol slide-link">
                      Ha. HX 12 Note Pro
                    </Link>
                    <p className="slide-text">1.999.000 đ</p>
                    <Button className="slide-button">
                      <span>Add to cart</span>
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <Button className="view-button">
            <span>View All</span>
          </Button>
        </div>
      </section>
    </>
  );
}
