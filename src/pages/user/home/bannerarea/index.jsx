import React from "react";

export default function BannerArea() {
  return (
    <section className="block p-0 w-full max-w-[1200px] m-[0_auto] z-20 mt-14">
      <div className="w-full relative z-[10]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            {/* Căn giữa trên màn hình vừa */}
            <div>
              <a href="">
                <img
                  src="/images/z5161535934667-aab9ab5c6b74a128a79b2aaf2021d25a.webp"
                  className="border rounded-3xl"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
