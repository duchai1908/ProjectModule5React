import React from "react";

export default function ContactContent() {
  return (
    <section className="block p-0 w-full max-w-[1300px] m-[0_auto] z-20 mt-14">
      <div className="flex flex-wrap justify-between ">
        <div className="flex-1  min-w-[300px] p-4 ">
          <div className="flex flex-col items-center justify-center border p-6 rounded-xl">
            <p className="font-bold text-xl mb-1">Email Address</p>
            <p>
              example@example.com
              <br />
              example2@example.com
            </p>
          </div>
        </div>
        <div className="flex-1  min-w-[300px] p-4">
          <div className="flex flex-col items-center justify-center border p-6 rounded-xl">
            <p className="font-bold text-xl mb-1">Phone Number</p>
            <p>
              +0123-456789
              <br />
              +9879-654321
            </p>
          </div>
        </div>
        <div className="flex-1  min-w-[300px] p-4">
          <div className="flex flex-col items-center justify-center border p-6 rounded-xl">
            <p className="font-bold text-xl mb-1">Office Address</p>
            <p className="text-center">
              Your Street Address, City Name, State, ZIP Code, Country.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
