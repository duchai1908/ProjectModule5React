import React from "react";
import { Select } from "antd";
import { Input, Space } from "antd";
const { Search } = Input;
import { FaShoppingCart, FaHeart, FaStar } from "react-icons/fa"; // Importing the icons
import { Pagination } from "antd";
import { Link } from "react-router-dom";

export default function ProductsPanagation() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  // Example usage with sample data
  const products = [
    {
      id: 1,
      image:
        "https://i.pinimg.com/736x/bb/03/be/bb03be3373d101ad3e175fd10bb74afd.jpg",
      name: "Điện thoại iPhone 16 Pro 128GB",
      price: "200.000",
    },
    {
      image:
        "https://i.pinimg.com/736x/bb/03/be/bb03be3373d101ad3e175fd10bb74afd.jpg",
      name: "Product 2",
      price: "250.000",
    },
    {
      image:
        "https://i.pinimg.com/736x/bb/03/be/bb03be3373d101ad3e175fd10bb74afd.jpg",
      name: "Product 2",
      price: "250.000",
    },
    {
      image:
        "https://i.pinimg.com/736x/bb/03/be/bb03be3373d101ad3e175fd10bb74afd.jpg",
      name: "Product 2",
      price: "250.000",
    },
    {
      image:
        "https://i.pinimg.com/736x/bb/03/be/bb03be3373d101ad3e175fd10bb74afd.jpg",
      name: "Product 2",
      price: "250.000",
    },
    // Add more products as needed
  ];
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
                  value: "lowToHigh",
                  label: "Price, low to high",
                },
                {
                  value: "highToLow",
                  label: "Price, high to low",
                },
                {
                  value: "oldToNew",
                  label: "Date, old to new",
                },
                {
                  value: "highToLow",
                  label: "Date, new to old",
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
          {products.map((product, index) => (
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
                <Link to={`/product-detail/${product.id}`}>
                  <p className="cursor-pointer hover:text-blue-500 mb-3  font-bold">
                    {product.name}
                  </p>
                </Link>
                <p className="mb-3 line-through">{product.price} vnd</p>
                <p className="mb-3 font-bold">{product.price} vnd</p>
                <ul className="flex justify-center list-none gap-3">
                  <li className="cursor-pointer rounded-full w-[16px] h-[16px] bg-blue-500"></li>
                  <li className="cursor-pointer rounded-full w-[16px] h-[16px] bg-red-500"></li>
                  <li className="cursor-pointer rounded-full w-[16px] h-[16px] bg-green-500"></li>
                  <li className="cursor-pointer rounded-full w-[16px] h-[16px] bg-yellow-500"></li>
                </ul>
              </div>
              <div className="my-3 flex justify-center gap-2">
              <FaStar className="text-yellow-300"/>
              <p>3.3/5</p>
              </div>
            </div>
          ))}
        </div>
        <Pagination align="center" defaultCurrent={1} total={50} />
      </div>
    </>
  );
}
