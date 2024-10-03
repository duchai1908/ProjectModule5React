import React from "react";
import Navigation from "./navigation";
import ForUsers from "./forUser";
import { IoMenu } from "react-icons/io5";
import MarqueeComponent from "./marquee/MarqueeComponent";
import { Link } from "react-router-dom";

export default function HeaderGenaral() {
  return (
    <>
      <MarqueeComponent />
      <div className="p-[24px] flex justify-between items-baseline">
        <div className="block md:hidden">
          <button className="text-[16px] bg-white border-none p-2 rounded-md hover:bg-gray-100 focus:outline-none">
            <IoMenu />
          </button>
        </div>

        <Link to="/">
          <div
            className="w-[150px] h-[29px] bg-white"
            style={{ backgroundImage: "url('/logoMinima.avif')" }}
          ></div>
        </Link>

        {/* when responsive -> hide this navigation */}
        <Navigation />

        <ForUsers />
      </div>
    </>
  );
}
