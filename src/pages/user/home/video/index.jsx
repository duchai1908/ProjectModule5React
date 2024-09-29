import React from "react";
import ReactPlayer from "react-player";

export default function ProductIntroductionVideo() {
  return (
    <>
      <section className="block p-0 w-full max-w-[1200px] m-[0_auto] z-20 mt-14">
        <div className="w-full flex flex-col items-center justify-between  m-[0_auto] relative z-[10]">
          <ReactPlayer url={"https://www.youtube.com/watch?v=WVUCl-sWp4Q&t=1s"} width={974} height={487}/>
        {/* <iframe width="974" height="487" src="https://www.youtube.com/embed/WVUCl-sWp4Q" title="TÍNH NĂNG ĐỈNH NHẤT TRÊN iPHONE 16 PRO MAX LÀ ĐÂY !??" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
        </div>
      </section>
    </>
  );
}
