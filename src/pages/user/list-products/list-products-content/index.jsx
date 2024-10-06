import React from "react";
import FilterContent from "./filter-content";
import ProductsPanagation from "./products-content";

export default function ProductsContent({
  data,
  onSearch,
  handleFilterValue,
  handleFilterValueLeft,
  productDetails,
  number,
  size,
  totalElements,
}) {
  return (
    <div className="md:flex gap-10">
      <FilterContent
        data={data}
        handleFilterValueLeft={handleFilterValueLeft}
      />
      <ProductsPanagation
        data={data}
        handleSearch={onSearch}
        handleFilterValue={handleFilterValue}
        productDetails={productDetails}
        number={number}
        size={size}
        totalElements={totalElements}
      />
    </div>
  );
}
