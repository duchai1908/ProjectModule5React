import { Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function CategoryHeader() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-300 p-14 m-5 rounded-3xl">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <div
            className="w-full h-[250px] bg-cover bg-center rounded-3xl"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/736x/bb/03/be/bb03be3373d101ad3e175fd10bb74afd.jpg')",
            }}
          >
            {/* Optionally, you can add content here */}
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-3">Danh sách sản phẩm</h1>
          <Breadcrumb
            items={[
              {
                title: (
                  <Link
                    to="/"
                    className="hover:text-blue-500 transition-colors duration-300 text-red-700"
                  >
                    Home
                  </Link>
                ),
              },
              {
                title: "Danh sách sản phẩm",
              },
            ]}
          />
        </div>
        {/* This div will be hidden on small screens and shown on medium and larger screens */}
        <div className="hidden md:block ">
          <div
            className="w-[250px] h-[250px] bg-cover bg-center rounded-3xl"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/564x/de/2d/2d/de2d2dcbbc8796d20a9b81b274b2fa3d.jpg')",
            }}
          >
            {/* Optionally, you can add content here */}
          </div>
        </div>
      </div>
    </>
  );
}
