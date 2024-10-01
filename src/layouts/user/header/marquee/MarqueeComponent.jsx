import React from "react";
import Marquee from "react-fast-marquee";

export default function MarqueeComponent() {
  return (
    <>
      <div className="w-full overflow-hidden whitespace-nowrap bg-gradient-to-r from-green-300 to-blue-300 p-2">
        <div className="inline-block w-[100%]">
          <Marquee className="flex gap-16 text-white text-[16px]">
            <div className="pr-6">Free return shipping</div>
            <div className="pr-6">No restocking fee</div>
            <div className="pr-6">No final sale items</div>
            <div className="pr-6">100% Payment Secure</div>
            <div className="pr-6">Returns accepted for 30 days</div>
            <div className="pr-6">Online Support</div>
            <div className="pr-6">Free return shipping</div>
            <div className="pr-6">No restocking fee</div>
            <div className="pr-6">No final sale items</div>
            <div className="pr-6">100% Payment Secure</div>
            <div className="pr-6">Returns accepted for 30 days</div>
          </Marquee>
        </div>
      </div>
    </>
  );
}
