import React from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Slider() {
  return (
    <section className="slider-swiper">
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: false,
      // }}
      // pagination={{
      //   clickable: true,
      // }}
      navigation={true}
      modules={[ Navigation]}
      className="mySwiper"
      
    >
      <SwiperSlide className="slide1">
        <div className="backgroud-slider">
          <img
            src="/images/electronics-slideshow_5_1920x.webp"
            alt=""
            className="slide-image"
          />
          <div className="background-content">
            <div className="slider-left">Ipad pro</div>
            <div>
              Making them suitable for tasks such as note-taking, drawing,
              and graphics design
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="backgroud-slider">
          <img
            src="/images/electronics-slideshow_1_1920x.webp"
            alt=""
            className="slide-image"
          />
          <div className="background-content">
            <div className="slider-left">Ipad pro</div>
            <div>
              Making them suitable for tasks such as note-taking, drawing,
              and graphics design
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="backgroud-slider">
          <img
            src="/images/electronics-slideshow_1_1920x.webp"
            alt=""
            className="slide-image"
          />
          <div className="background-content">
            <div className="slider-left">Ipad pro</div>
            <div>
              Making them suitable for tasks such as note-taking, drawing,
              and graphics design
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 5</SwiperSlide>
      <SwiperSlide>Slide 6</SwiperSlide>
      <SwiperSlide>Slide 7</SwiperSlide>
    </Swiper>
  </section>
  )
}
