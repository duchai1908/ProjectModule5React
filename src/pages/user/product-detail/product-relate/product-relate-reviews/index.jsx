import React, { useEffect, useState } from "react";
import "./index.css";
import FormReviewUsers from "./form-review";
import { FaStar } from "react-icons/fa";
import { Button, Rate, Select } from "antd";
import { useParams } from "react-router-dom";
import {
  addAllReviewProduct,
  countRating,
} from "../../../../../services/review";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export default function ProductRelateReviews({ product }) {
  const [isOpenReviews, setIsOpenReviews] = useState(false);
  const [listReview, setListReview] = useState([]);
  const [countRate, setCountRate] = useState({});
  const { id } = useParams();
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
  };
  const handleOpen = () => {
    if (isOpenReviews) {
      setIsOpenReviews(false);
    } else {
      setIsOpenReviews(true);
    }
  };
  /**
   *
   * @param {*} dateString chuỗi Date
   * @description format 1 chuỗi Date về 1 chuỗi có kiểu dd/MM/yyyy
   * @returns 1 chuỗi ngày tháng năm
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [reload, setReload] = useState(false);

  const handleReload = () => setReload(!reload);

  useEffect(() => {
    loadingReview();
  }, [reload]);
  const loadingReview = () => {
    const fetchAllReview = async () => {
      try {
        const response = await addAllReviewProduct(id);
        setListReview(response.data.data.content);
      } catch (error) {
        console.error("Error fetching review: ", error.response);
      }
    };
    // tạo hàm để gọi api bất đồng bộ review
    const fetchCountReview = async () => {
      try {
        const countRating1 = await countRating(id);
        console.log("data: ",countRating1);
        
        setCountRate(countRating1);
      } catch (error) {
        console.error("Error fetching review: ", error.response);
      }
    };
    fetchAllReview();
    fetchCountReview();
  };
  return (
    <>
      {console.log("rate", countRate)}
      <div className=" p-4 bg-gray-100 rounded-lg" id="product-review">
        {product.reviews == 0 ? (
          <>
            <FormReviewUsers product={product} handleReload={handleReload} />
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
                  <p>
                    {console.log(countRate)
                    }
                    Rate:{" "}
                    {countRate?.data?.data?.averageRating != null
                      ? JSON.stringify(countRate?.data?.data?.averageRating)
                      : 0 }
                    /5
                  </p>
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
                      <p className="text-black">
                        ({countRate?.data?.data?.ratingCount["5"] || "0"})
                      </p>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <div className="flex text-yellow-400 justify-start">
                      <p className="text-black">
                        ({countRate?.data?.data?.ratingCount["4"] || "0"})
                      </p>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <div className="flex text-yellow-400 justify-start">
                      <p className="text-black">
                        ({countRate?.data?.data?.ratingCount["3"] || "0"})
                      </p>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <div className="flex text-yellow-400 justify-start">
                      <p className="text-black">
                        ({countRate?.data?.data?.ratingCount["2"] || "0"})
                      </p>
                      <FaStar />
                      <FaStar />
                    </div>
                    <div className="flex text-yellow-400 justify-start">
                      <p className="text-black">
                        ({countRate?.data?.data?.ratingCount["1"] || "0"})
                      </p>
                      <FaStar />
                    </div>
                  </div>
                </div>
                <div class="p-4 flex items-center justify-center">
                  {Cookies.get("token") && (
                    <Button className="p-7 text-[16px]" onClick={handleOpen}>
                      Write a comment
                    </Button>
                  )}
                </div>
              </div>
              <hr />
              {isOpenReviews ? (
                <div className="transition-all duration-500 ease-in-out overflow-hidden max-h-[500px]">
                  <FormReviewUsers handleReload={handleReload} />
                </div>
              ) : (
                <div className="transition-all duration-500 ease-in-out overflow-hidden max-h-0">
                  <FormReviewUsers handleReload={handleReload} />
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
                  {listReview &&
                    listReview.map((item) => {
                      return (
                        <>
                          <div className="w-full relative mt-5">
                            <div className="flex text-yellow-400">
                              {Array.from(
                                { length: item.rating },
                                (_, index) => (
                                  <FaStar key={index} />
                                )
                              )}
                            </div>
                            <div className="flex items-center my-4">
                              <div
                                className="w-[40px] h-[40px] bg-cover bg-center rounded-full"
                                style={{
                                  backgroundImage: `url(${item.user.image})`,
                                }}
                              ></div>
                              <div className="ml-2">{item.user.username}</div>
                            </div>
                            <div className="">
                              <p>{item.comment}</p>
                            </div>
                            <div className="absolute top-0 right-0">
                              {formatDate(item.createdAt)}
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
