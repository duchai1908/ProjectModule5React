import React, { useState } from "react";
import "./index.css";
import FormReviewUsers from "./form-review";
import { FaStar } from "react-icons/fa";
import { Button, Rate, Select } from "antd";

export default function ProductRelateReviews({ product }) {
  const [isOpenReviews, setIsOpenReviews] = useState(false);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleOpen = () => {
    if (isOpenReviews) {
      setIsOpenReviews(false);
    } else {
      setIsOpenReviews(true);
    }
  };
  return (
    <>
      <div className=" p-4 bg-gray-100 rounded-lg" id="product-review">
        {product.reviews == 0 ? (
          <>
            <FormReviewUsers product={product} />
          </>
        ) : (
          <>
            {/* Customer Reivews */}
            <div>
              <p className="text-[24px] font-bold text-center">
                Customer Reviews
              </p>
              <div class="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-1">
                <div class=" p-4 flex flex-col items-center justify-center text-[22px]">
                  <p>Rate: 3.8/5</p>
                  <div className="flex text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
                <div class=" p-4 flex justify-center text-[22px]">
                  <div>
                    <div className="flex text-yellow-400 justify-start">
                      <p className="text-black">(5)</p>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <div className="flex text-yellow-400 justify-start">
                      <p className="text-black">(4)</p>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <div className="flex text-yellow-400 justify-start">
                      <p className="text-black">(3)</p>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <div className="flex text-yellow-400 justify-start">
                      <p className="text-black">(2)</p>
                      <FaStar />
                      <FaStar />
                    </div>
                    <div className="flex text-yellow-400 justify-start">
                      <p className="text-black">(1)</p>
                      <FaStar />
                    </div>
                  </div>
                </div>
                <div class="p-4 flex items-center justify-center">
                  <Button className="p-7 text-[16px]" onClick={handleOpen}>
                    Write a comment
                  </Button>
                </div>
              </div>
              <hr />
              {isOpenReviews ? (
                <div className="transition-all duration-500 ease-in-out overflow-hidden max-h-[500px]">
                  <FormReviewUsers />
                </div>
              ) : (
                <div className="transition-all duration-500 ease-in-out overflow-hidden max-h-0">
                  <FormReviewUsers />
                </div>
              )}

              <Select
                defaultValue="Most Recent"
                style={{
                  width: 240,
                }}
                className="my-4"
                onChange={handleChange}
                options={[
                  {
                    value: "Most Recent",
                    label: "Most Recent",
                  },
                  {
                    value: "Highest Rating",
                    label: "Highest Rating",
                  },
                  {
                    value: "Lowest Rating",
                    label: "Lowest Rating",
                  },
                ]}
              />
              {/* comments */}
              <hr />
              <div className="my-4">
                <div className="relative">
                  <div className="w-full">
                    <div className="flex text-yellow-400">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <div className="flex items-center my-4">
                      <div
                        className="w-[40px] h-[40px] bg-cover bg-center rounded-full"
                        style={{
                          backgroundImage:
                            "url('https://i.pinimg.com/564x/ce/57/49/ce5749d1ac57126a1215c2ac584720f4.jpg')",
                        }}
                      >
                        {/* Avatar (background image is handled by inline style) */}
                      </div>
                      <div className="ml-2">username</div>
                    </div>
                    <div className="">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Animi odio tenetur maxime officia corporis quasi,
                        laboriosam reprehenderit unde temporibus eaque sunt,
                        doloribus eligendi consequatur delectus nam, dolores
                        tempore obcaecati ipsam?
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">Date: 5/2/2024</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
