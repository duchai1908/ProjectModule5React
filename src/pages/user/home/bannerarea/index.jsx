import React from "react";
import "./banner.css";
export default function BannerArea() {
  return (
    <section className="block p-0 w-full max-w-[1300px] m-[0_auto] z-20 mt-20">
      <div className="banner-container">
        {/* items */}
        <div className="banner-items">
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <a href="" className="banner-link">
                  <img
                    src="https://minimalin-demo.myshopify.com/cdn/shop/files/electronics-banner_9_470x.png?v=1708774566"
                    className="banner-img"
                  />
                </a>
              </div>
              <div class="flip-card-back">
                <p class="title">BACK</p>
                <p>Leave Me</p>
              </div>
            </div>
          </div>
          {/* item */}
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <a href="" className="banner-link">
                  <img src="/images/macbook_air2.png" className="banner-img" />
                </a>
              </div>
              <div class="flip-card-back">
                <p class="title">BACK</p>
                <p>Leave Me</p>
              </div>
            </div>
          </div>

          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <a href="" className="banner-link">
                  <img src="/images/macbook_air2.png" className="banner-img" />
                </a>
              </div>
              <div class="flip-card-back">
                <p class="title">BACK</p>
                <p>Leave Me</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
  <div className="flex flex-col items-center justify-center p-4  rounded-md">
          <div>
              <a href="">
                <img
                  src="/images/macbook_air2.png"
                  className="border rounded-3xl"
                />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-4  rounded-md">
          <div>
              <a href="">
                <img
                  src="/images/5mmg3xe1-729-airpod-4.jpg"
                  className="border rounded-3xl"
                />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-md sm:col-span-2 lg:col-span-1">
         
            <div>
              <a href="">
                <img
                  src="/images/z5161535934667-aab9ab5c6b74a128a79b2aaf2021d25a.webp"
                  className="border rounded-3xl"
                />
              </a>
            </div>
          </div>
 */
