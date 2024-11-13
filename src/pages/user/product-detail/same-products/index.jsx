import { Button } from "antd";
import React from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Pagination, Navigation } from "swiper/modules";

import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import { formatCurrencyVND } from "../../../../utils/formatMoney";

export default function SameProductsProductDetail({
  listSameProducts,
  productRelate,
  productDetailRelateList,
}) {
  return (
    <>
      <div>
        <div className="text-center text-[40px] my-5 font-bold">
          <p>Related Products</p>
        </div>
        <div className="w-full flex flex-col items-center justify-between  m-[0_auto] relative z-[10] px-5">
          <div className="relative flex flex-wrap justify-between w-full">
            <Swiper
              slidesPerView={4}
              spaceBetween={15}
              loop={true}
              navigation={{
                prevEl: ".swiper-new-prev",
                nextEl: ".swiper-new-next",
              }}
              modules={[Navigation]}
              breakpoints={{
                0: { slidesPerView: 1 },
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="mySwiper"
            >
              {productRelate?.map((product, index) => {
                // Tìm productDetail đầu tiên khớp với product.id
                const productDetail = productDetailRelateList?.find(
                  (productDetailsItem) =>
                    productDetailsItem?.product?.id === product?.id
                );
                if (product != productDetail) {
                  return (
                    <SwiperSlide key={index}>
                      <div
                        key={index}
                        className="w-full h-auto text-center border rounded-lg"
                      >
                        <div
                          className="relative h-[300px] rounded-t-md bg-cover bg-center transition duration-300 ease-in-out hover:bg-black hover:bg-opacity-50"
                          style={{
                            backgroundImage: `url('${product.image}')`,
                          }}
                        >
                          {/* Button container */}
                          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
                            <button className="flex items-center justify-center border bg-gray-200 rounded-full p-2 m-1 shadow transition hover:bg-gray-200 hover:text-black hover:border-white">
                              <FaShoppingCart className="text-lg" />
                            </button>
                            <button className="flex items-center justify-center border bg-gray-200 rounded-full p-2 m-1 shadow transition hover:bg-white hover:text-red-600 hover:border-white">
                              <FaHeart className="text-lg" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-5">
                          {productDetail ? (
                            <>
                              <Link to={`/product-detail/${product.id}`}>
                                <p className="cursor-pointer hover:text-blue-500 mb-3  font-bold">
                                  {product.name}
                                </p>
                              </Link>
                            </>
                          ) : (
                            <>
                              <p className="cursor-not-allowed text-gray-500  font-bold">
                                {product.name}
                              </p>
                            </>
                          )}
                          {productDetail?.price ? (
                            <>
                              <p className="mb-3 line-through">
                                {formatCurrencyVND(productDetail?.price)} vnd
                              </p>
                              <p className="mb-3 font-bold">
                                {formatCurrencyVND(productDetail?.price)} vnd
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="mb-3 line-through opacity-0">
                                555 vnd
                              </p>
                              <p className="mb-3 font-bold">Không sẵn hàng</p>
                            </>
                          )}
                          {/* <p className="mb-3 line-through">
                            {productDetail?.price} vnd
                          </p>
                          <p className="mb-3 font-bold">
                            {productDetail?.price} vnd
                          </p> */}
                        </div>
                        <div className="my-3 flex justify-center gap-2">
                          <FaStar className="text-yellow-300" />
                          <p>3.3/5</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                } else {
                  return <></>;
                }
              })}
            </Swiper>

            {/* Custom navigation buttons */}
            <div className="swiper-new-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
              <GrLinkPrevious className="w-10 h-10 p-2 text-white bg-blue-500 rounded-md" />
            </div>
            <div className="swiper-new-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
              <GrLinkNext className="w-10 h-10 p-2 text-white bg-blue-500 rounded-md" />
            </div>
          </div>

          <Button className="text-center mt-8 bg-blue-600 text-white">
            View All
          </Button>
        </div>
      </div>
    </>
  );
}
