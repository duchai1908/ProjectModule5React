import React, { useState, useRef } from "react";
import { Carousel } from "antd";

const ProductMainContent = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    carouselRef.current.goTo(index);
  };

  const images = product.images;

  return (
    <div className="m-5 md:flex md:gap-8">
      {/* Left Side: Carousel and Thumbnails */}
      <div className="flex-1 h-[370px] md:w-[570px] md:h-[570px]">
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
                activeIndex === index ? "scale-125 border-2 border-blue-500" : ""
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
      </div>

      {/* Right Side: Product Information */}
      <div className="flex-1 md:pl-5 md:pr-5 mt-[120px] md:mt-0">
        <h1 className="text-xl font-bold">Name Product</h1>
        <h2 className="text-lg text-blue-500">Price</h2>
        <p className="mt-2">Description lorem ipsum dolor sit amet.</p>

        <div className="mt-4">
          <div className="flex">
            <p className="font-bold">Availability:</p>
            <p className="text-blue-500 ml-2">11 left in stock</p>
          </div>
          <div className="flex">
            <p className="font-bold">SKU:</p>
            <p className="ml-2">9911</p>
          </div>
          <div className="flex">
            <p className="font-bold">Type:</p>
            <p className="ml-2">Category Type</p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-bold">Colors:</h3>
          <ul className="list-disc list-inside">
            <li>Color1</li>
            <li>Color2</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductMainContent;
