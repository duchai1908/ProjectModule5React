import React from "react";
import ReactPlayer from "react-player";

export default function ProductIntroductionVideo() {
  return (
    <>
      <div className="">
        <section className="block p-0 px-4 w-full max-w-[1200px] m-[0_auto] z-20 mt-14">
          <div className="w-full flex flex-col items-center justify-between m-[0_auto] relative z-[10]">
            <ReactPlayer
              url={"https://www.youtube.com/watch?v=WVUCl-sWp4Q&t=1s"}
              width="974px"
              height="487px"
              className=""
            />
          </div>
        </section>
      </div>
    </>
  );
}
