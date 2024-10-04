import React, { useEffect, useState } from "react";
import CategoryHeader from "./category-header";
import ProductsContent from "./list-products-content";
import { useDispatch, useSelector } from "react-redux";
import { findAllProductWithCondition } from "../../../services/productService";

export default function ListProducts() {
  const { data, status, error, totalElements, number, size } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [sortOption, setSortOption] = useState("none");

  // Fetch product details when component mounts and whenever the page changes
  useEffect(() => {
    dispatch(
      findAllProductWithCondition({
        page: number,
        size,
        search: "",
        minPrice: 0,
        maxPrice: 9999999999,
        sortOption: "none",
        colorId: 1,
      })
    );
  }, [dispatch, number, size, searchValue]);

  const handleSearch = (value) => {
    console.log("Search value: ", value);

    setSearchValue(value);
  };

  const handleFilterValue = (value) => {
    console.log("filter value: ", value);
    setSortOption(value);
  };

  const handleFilterValueLeft = (value) => {
    console.log("filter left value: ", value);
    // setSortOption(value);
  };

  // Function to handle page change
  const handleChangePage = async (page, pageSize) => {
    console.log("Page changed to:", page);
    dispatch(changePageProductDetail(page - 1)); // Adjusting for 0-based index
  };

  // Function to handle page size change
  const handlePageSizeChange = (value) => {
    console.log("Page size changed to:", value);
    // You may want to dispatch an action to set the page size in your Redux state
  };
  return (
    <>
      {status === "pending" && <div>Loading...</div>}
      {error && <div>Error fetching data: {error}</div>}
      {data.map((item, index) => (
        <>hihi,</>
      ))}
      <CategoryHeader />
      <ProductsContent
        data={data}
        onSearch={handleSearch}
        handleFilterValue={handleFilterValue}
        handleFilterValueLeft={handleFilterValueLeft}
      />
    </>
  );
}

// page, size, search, minPrice, maxPrice, color, sortOption
