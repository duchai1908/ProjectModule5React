import React from "react";
import { Select } from "antd";
import { Input, Space } from "antd";
const { Search } = Input;

import { FaShoppingCart, FaHeart, FaStar } from "react-icons/fa"; // Importing the icons
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import { changePageProductDetail } from "../../../../../redux/slices/productDetailSlice";
import { useDispatch } from "react-redux";
import { changePageProduct } from "../../../../../redux/slices/productSlice";

export default function ProductsPanagation({
  data,
  handleSearch,
  handleFilterValue,
  productDetails,
  number,
  size,
  totalElements,
}) {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    handleFilterValue(value);
  };
  const onSearch = (value) => {
    console.log("Value: ", value);

    handleSearch(value);

    console.log("trong con:", productDetails);
  };

  const dispatch = useDispatch();
  // Function to handle page change
  const handleChangePage = async (page, pageSize) => {
    console.log("Page changed to:", page);
    dispatch(changePageProduct(page - 1)); // Adjusting for 0-based index
  };

  return (
    <>
      <div className="mb-5 md:m-5 w-[100%]">
        <div className="md:flex w-[100%] items-center justify-between px-5">
          <div>
            <Select
              defaultValue="aToZ"
              className="md:w-[250px] w-[100%] mb-4"
              // style={{
              //   width: 100,
              // }}
              onChange={handleChange}
              options={[
                {
                  value: "aToZ",
                  label: "Alphabetically, A-Z",
                },
                {
                  value: "zToA",
                  label: "Alphabetically, Z-A",
                },
                {
                  value: "oldToNew",
                  label: "Date, old to new",
                },
                {
                  value: "newToOld",
                  label: "Price, new to old",
                },
              ]}
            />
          </div>
          <div>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
              className="md:w-[250px] w-[100%]"
            />
          </div>
        </div>
        {/* List product */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-5"> */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4  py-5 md:gap-5 gap-24 place-items-center">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((product, index) => {
              // Tìm productDetail đầu tiên khớp với product.id
              const productDetail = productDetails.find(
                (productDetailsItem) =>
                  productDetailsItem.product.id === product.id
              );

              return (
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
                      {productDetail ? (
                        <>
                          <button className="flex items-center justify-center border bg-gray-200 rounded-full p-2 m-1 shadow transition hover:bg-gray-200 hover:text-black hover:border-white">
                            <FaShoppingCart className="text-lg" />
                          </button>
                          <button className="flex items-center justify-center border bg-gray-200 rounded-full p-2 m-1 shadow transition hover:bg-white hover:text-red-600 hover:border-white">
                            <FaHeart className="text-lg" />
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    {/* Hiển thị giá của product detail đầu tiên */}
                    {productDetail ? (
                      <>
                        <Link to={`/product-detail/${product.id}`}>
                          <p className="cursor-pointer hover:text-blue-500 mb-3 font-bold">
                            {product.name}
                          </p>
                        </Link>
                        <p className="mb-3 line-through">
                          {productDetail.price} vnd
                        </p>
                        <p className="mb-3 font-bold">
                          {productDetail.price} vnd
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="cursor-not-allowed text-gray-400 hover:text-blue-500 mb-3 font-bold">
                          {product.name}
                        </p>
                        <p className="mb-3 opacity-0 line-through">hihi</p>
                        <p className="mb-3 font-bold">Giá không có sẵn</p>
                      </>
                    )}

                    <ul className="flex justify-center list-none gap-3">
                      <li className="cursor-pointer rounded-full w-[16px] h-[16px] bg-blue-500"></li>
                      <li className="cursor-pointer rounded-full w-[16px] h-[16px] bg-red-500"></li>
                      <li className="cursor-pointer rounded-full w-[16px] h-[16px] bg-green-500"></li>
                      <li className="cursor-pointer rounded-full w-[16px] h-[16px] bg-yellow-500"></li>
                    </ul>
                  </div>
                  <div className="my-3 flex justify-center gap-2">
                    <FaStar className="text-yellow-300" />
                    <p>3.3/5</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No products available</div>
          )}
        </div>
        {/* <Pagination align="center" defaultCurrent={1} total={50} /> */}
        <Pagination
          align="center"
          total={totalElements}
          pageSize={size}
          current={number + 1}
          onChange={handleChangePage}
        />
      </div>
    </>
  );
}
