import React from "react";
import ReactPlayer from "react-player";

export default function AboutBannerImageFooter() {
  return (
    <>
      <div className="flex flex-col lg:flex-row p-0 w-full max-w-[1200px] m-[0_auto] z-20 mt-14 gap-2">
        {/* Left: Big Image */}
        <div
          className="flex justify-center rounded-2xl bg-cover bg-center h-[300px] md:h-[500px] w-full lg:w-[60%]"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/45/33/4e/45334e54eebaacdefe01708e00e82e55.jpg')",
          }}
        ></div>

        {/* Right: Two Stacked Images */}
        <div className="flex flex-col justify-between w-full lg:w-[40%] gap-2">
          <div
            className="flex justify-center rounded-2xl bg-cover bg-center h-[300px] md:h-[240px]"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/564x/1a/dc/e1/1adce19d53b61c5670f8207fa0c48e38.jpg')",
            }}
          ></div>
          <div
            className="flex justify-center rounded-2xl bg-cover bg-center h-[300px] md:h-[240px]"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/736x/a0/c8/ea/a0c8ea3d69d896fb7ca9aaacacd1855e.jpg')",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
