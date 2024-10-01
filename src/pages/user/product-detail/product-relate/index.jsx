import React, { useState } from "react";
import ProductRelateDescription from "./product-relate-description";
import ProductRelateReviews from "./product-relate-reviews";
import ProductRelateShipping from "./product-relate-shipping";

export default function ProductRelate({product}) {
  const [selectedValue, setSelectedValue] = useState("Description");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <>
      <div className="mt-14 mx-5">
        {/* Form with Radio Inputs */}
        <div className="radio-inputs w-full flex rounded-lg bg-blue-400  px-4 pt-4 space-x-4">
          {/* Description Radio */}
          <label className="radio relative cursor-pointer">
            <input
              type="radio"
              name="radio"
              value="Description"
              checked={selectedValue === "Description"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`name flex items-center justify-center rounded-t-lg px-3 py-2 transition-all duration-150 relative ${
                selectedValue === "Description"
                  ? "bg-gray-200 font-semibold"
                  : "hover:text-white"
              }`}
            >
              Description
            </span>
            {selectedValue === "Description" && (
              <>
                <span className="absolute w-2.5 h-2.5 bg-blue-300 bottom-0 right-[-10px] rounded-bl-full shadow-lg"></span>
                <span className="absolute w-2.5 h-2.5 bg-blue-300 bottom-0 left-[-10px] rounded-br-full shadow-lg"></span>
              </>
            )}
          </label>

          {/* Review Radio */}
          <label className="radio relative cursor-pointer">
            <input
              type="radio"
              name="radio"
              value="Reviews"
              checked={selectedValue === "Reviews"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`name flex items-center justify-center rounded-t-lg px-3 py-2 transition-all duration-150 relative ${
                selectedValue === "Reviews"
                  ? "bg-gray-200 font-semibold"
                  : "hover:text-white"
              }`}
            >
              Review
            </span>
            {selectedValue === "Reviews" && (
              <>
                <span className="absolute w-2.5 h-2.5 bg-blue-300 bottom-0 right-[-10px] rounded-bl-full shadow-lg"></span>
                <span className="absolute w-2.5 h-2.5 bg-blue-300 bottom-0 left-[-10px] rounded-br-full shadow-lg"></span>
              </>
            )}
          </label>

          {/* Shipping Radio */}
          <label className="radio relative cursor-pointer">
            <input
              type="radio"
              name="radio"
              value="Shipping"
              checked={selectedValue === "Shipping"}
              onChange={handleChange}
              className="hidden"
            />
            <span
              className={`name flex items-center justify-center rounded-t-lg px-3 py-2 transition-all duration-150 relative ${
                selectedValue === "Shipping"
                  ? "bg-gray-200 font-semibold"
                  : "hover:text-white"
              }`}
            >
              Shipping
            </span>
            {selectedValue === "Shipping" && (
              <>
                <span className="absolute w-2.5 h-2.5 bg-blue-300 bottom-0 right-[-10px] rounded-bl-full shadow-lg"></span>
                <span className="absolute w-2.5 h-2.5 bg-blue-300 bottom-0 left-[-10px] rounded-br-full shadow-lg"></span>
              </>
            )}
          </label>
        </div>

        {/* Conditional Divs */}
        {selectedValue === "Description" && <ProductRelateDescription />}

        {selectedValue === "Reviews" && <ProductRelateReviews product={product}/>}

        {selectedValue === "Shipping" && <ProductRelateShipping />}
      </div>
    </>
  );
}
