import React, { useState } from "react";
import ProductMainContent from "./product-main-content";
import ProductRelate from "./product-relate";
import SameProductsProductDetail from "./same-products";

export default function ProductDetail() {
  // const [product, setProduct] = useState("huhu");
  const product = {
    images: [
      "https://i.pinimg.com/736x/bb/03/be/bb03be3373d101ad3e175fd10bb74afd.jpg",
      "https://i.pinimg.com/564x/24/17/e4/2417e49cf2dfbbda30d3db2940c0a97a.jpg",
      "https://i.pinimg.com/736x/af/57/e0/af57e07303c006521412c3d6981344cd.jpg",
      "https://i.pinimg.com/736x/ea/1b/09/ea1b09d888d64b2f3e95abb202cf70ea.jpg",
    ],
    reviews: [{rate:5,comment:"hihi"},{rate:4,comment:"hihi"},]
    // reviews: []
  };
  const listSameProducts = [
    {
      image:
        "https://i.pinimg.com/736x/bb/03/be/bb03be3373d101ad3e175fd10bb74afd.jpg",
      name: "Product 1",
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
      name: "Product 3",
      price: "250.000",
    },
    {
      image:
        "https://i.pinimg.com/736x/bb/03/be/bb03be3373d101ad3e175fd10bb74afd.jpg",
      name: "Product 4",
      price: "250.000",
    },
    {
      image:
        "https://i.pinimg.com/736x/bb/03/be/bb03be3373d101ad3e175fd10bb74afd.jpg",
      name: "Product 5",
      price: "250.000",
    },
  ];

  return (
    <>
      <div className="mb-[120px]">
        <ProductMainContent product={product} />
        {/* Description, review, Shipping */}
        <ProductRelate product={product} />
        <SameProductsProductDetail  listSameProducts={listSameProducts} />
      </div>
    </>
  );
}
