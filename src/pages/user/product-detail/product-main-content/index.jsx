import React, { useState, useRef, useEffect } from "react";
import { Carousel, Button, Badge, InputNumber } from "antd";
import {
  FaCheck,
  FaPlus,
  FaMinus,
  FaRegHeart,
  FaHeart,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa"; // Import the check icon from react-icons
import { TbTruckDelivery } from "react-icons/tb";
import { Link } from "react-router-dom";

const ProductMainContent = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    carouselRef.current.goTo(index);
  };

  const images = product.images;

  // State to track the selected color (default is red)
  const [selectedColor, setSelectedColor] = useState("red");

  // Array of colors to display
  const colors = [
    { name: "red", bgClass: "bg-red-500" },
    { name: "blue", bgClass: "bg-blue-500" },
    { name: "green", bgClass: "bg-green-500" },
    { name: "black", bgClass: "bg-black" },
  ];

  const [number, setNumber] = useState(1);

  const onChangeQuantity = (value) => {
    if (value > 0) {
      setNumber(value);
    }
  };

  // useEffect({},number)
  return (
    <div className="m-5 md:flex md:gap-8">
      {/* Left Side: Carousel and Thumbnails */}
      <div className="flex-1 h-[370px] md:w-[570px] md:h-[570px] relative  ">
        <Carousel
          ref={carouselRef}
          dotPosition="bottom"
          afterChange={(current) => setActiveIndex(current)}
          className="rounded-xl"
        >
          {images.map((image, index) => (
            <div key={index}>
              <div
                className="w-full h-[370px] md:h-[570px] bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          ))}
        </Carousel>

        <div className="flex justify-between md:justify-center md:gap-8 mt-4">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`cursor-pointer rounded-lg overflow-hidden transition-transform ${
                activeIndex === index
                  ? "scale-125 border-2 border-blue-500"
                  : ""
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-[80px] h-[80px] object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute top-2 left-2">
          <FaHeart className="text-pink-500 text-[32px] cursor-pointer" />
        </div>
      </div>

      {/* Right Side: Product Information */}
      <div className="flex-1 md:pl-5 md:pr-5 mt-[120px] md:mt-0">
        <h1 className="text-[40px] font-bold">Name Product</h1>
        <div className="flex gap-3 items-baseline">
          <p className="text-[28px] text-gray-500 line-through">Price</p>
          <p className="text-[32px] text-blue-500">Price</p>
          <p className="text-[16px] bg-gray-300 ml-[-8px]">-10%</p>
        </div>

        <p className="mt-2">Description lorem ipsum dolor sit amet.</p>

        <div className="mt-4">
          <div className="flex mb-3">
            <p className="font-bold">Availability:</p>
            <p className="text-blue-500 ml-2">11 left in stock</p>
          </div>
          <div className="flex mb-3">
            <p className="font-bold">SKU:</p>
            <p className="ml-2">9911</p>
          </div>
          <div className="flex mb-3">
            <p className="font-bold">Type:</p>
            <p className="ml-2">Category Type</p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-200 my-1"></div>
        <div className="mt-4">
          <h3 className="font-bold mb-3">Colors:</h3>
          <ul className="flex gap-3 list-none">
            {colors.map((color) => (
              <li
                key={color.name}
                className={`relative w-[24px] h-[24px] rounded-[10px] cursor-pointer ${color.bgClass}`}
                onClick={() => setSelectedColor(color.name)}
              >
                {/* If this color is selected, show the check icon */}
                {selectedColor === color.name && (
                  <FaCheck className="absolute top-[-5px] right-[-5px] text-white text-[12px] bg-blue-500 rounded-full" />
                )}
              </li>
            ))}
          </ul>
        </div>
        <hr className="mt-3" />
        {/* btn quantity, add to cart, add to order */}
        <div className="mt-4">
          <div className="md:flex items-center gap-1 md:h-[60px]">
            <div className="flex h-[60px] justify-center">
              <Button
                className="h-[100%] rounded"
                onClick={() => onChangeQuantity(number - 1)}
              >
                <FaMinus />
              </Button>
              {/* <input type="number" className="border-2 rounded px-5 h-full flex items-center text-center" value={number}/> */}
              <InputNumber
                className="border-2 rounded px-5 h-full flex items-center text-center text-[20px] font-bold"
                min={1}
                max={100}
                value={number}
                onChange={onChangeQuantity}
              />
              {/* <input className="border-2 rounded px-5 h-full flex items-center text-center">{number}</input> */}
              <Button
                className="h-[100%] rounded"
                onClick={() => onChangeQuantity(number + 1)}
              >
                <FaPlus />
              </Button>
            </div>
            <div className="flex mt-4 ml-3 gap-5 cart_button">
              <button type="button" className="cart_button-item">
                <Link to="/cart-detail" className="cart_link">
                  View cart
                </Link>
              </button>
              <button type="button" className="cart_button-item">
                <Link className="cart_link">Check out</Link>
              </button>
            </div>
          </div>
        </div>
        <hr className="mt-4" />
        <div className="mt-4 flex gap-4 items-center">
          <TbTruckDelivery className="text-[32px]" />
          <p className="text-[16px]">
            Estimated Delivery Date :{" "}
            <span className="font-bold">02 - 04 October, 2024.</span>
          </p>
        </div>
        <div className="w-full h-[1px] bg-gray-200 my-1"></div>
        {/* return information */}
        <div className="mt-4">
          <p className="text-[16px] font-bold">Return rules summary</p>
          <ul className="list-disc pl-4">
            <li className="mt-2">Returns accepted for 30 days</li>
            <li className="mt-2">Free return shipping</li>
            <li className="mt-2">No restocking fee</li>
            <li className="mt-2">No final sale items</li>
          </ul>
        </div>
        <hr className="mt-3" />
        <div className="flex mt-4">
          <p>Share:</p>
          <div className="flex">
            <FaFacebookF className="ml-3 mr-1" />
            <p>Facebook</p>
          </div>
          <div className="flex">
            <FaInstagram className="ml-3 mr-1" />
            <p>Instagram</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMainContent;
