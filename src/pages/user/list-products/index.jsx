import React, { useEffect, useState } from "react";
import CategoryHeader from "./category-header";
import ProductsContent from "./list-products-content";
import { useDispatch, useSelector } from "react-redux";
import { findAllProductWithCondition } from "../../../services/productService";
import {
  findAllProductDetail,
  findAllProductDetailByNothing,
} from "../../../services/productDetailService";
import { jsonAxios } from "../../../api";

export default function ListProducts() {
  const {
    data: products,
    status: productStatus,
    error: productError,
    number,
    size,
    totalElements,
  } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [sortOption, setSortOption] = useState("none");

  const [productDetailsList, setProductDetailsList] = useState([]);
  // Fetch products when component mounts and whenever relevant filters change
  useEffect(() => {
    dispatch(
      findAllProductWithCondition({
        page: number,
        size: 8,
        search: searchValue,
        sortOption,
      })
    );
  }, [dispatch, number, size, searchValue, sortOption]);

  const loadData = () => {
    jsonAxios
      .get(`/productDetail`)
      .then((resp) => {
        const data = resp.data.data;
        setProductDetailsList(data);
      })
      .catch((err) => {
        // Xử lý lỗi
      });
  };

  // Fetch all product details when component mounts
  useEffect(() => {
    loadData();
  }, []);

  // Handle search input
  const handleSearch = (value) => {
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
      {productStatus === "pending" && <div>Loading...</div>}
      {/* {productError && <div>Error fetching data: {productError}</div>} */}

      <CategoryHeader />
      <ProductsContent
        data={products}
        onSearch={handleSearch}
        handleFilterValue={handleFilterValue}
        handleFilterValueLeft={handleFilterValueLeft}
        productDetails={productDetailsList}
        number={number}
        size={size}
        totalElements={totalElements}
      />
    </>
  );
}

// page, size, search, minPrice, maxPrice, color, sortOption
