import React, { useEffect, useState } from "react";
import "./home.css";
import CategoryPage from "./categorypage";
import Slider from "./slider";
import Feartured from "./featuredpage";
import BannerArea from "./bannerarea";
import NewCollection from "./newproduct";
import ProductIntroductionVideo from "./video";
import Review from "./review";
import { useSelector } from "react-redux";
import ContentHome from "./contentText";
import { jsonAxios } from "../../../api";

export default function Home() {
  const data = useSelector((state) => state.auth);
  console.log(data);

  const [productNewest, setProductNewest] = useState(null);
  const [categoryLimit, setCategoryLimit] = useState(null);
  useEffect(() => {
    jsonAxios
      .get(`/product/newest`)
      .then((resp) => {
        const data = resp.data.data;
        setProductNewest(data);
      })
      .catch((err) => {
        // Xử lý lỗi
      });
    jsonAxios
      .get(`/category/listCategory/limit`)
      .then((resp) => {
        const data2 = resp.data.data;
        setCategoryLimit(data2);
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <Slider />
      <CategoryPage categoryLimit={categoryLimit} />
      <Feartured productNewest={productNewest} />
      <ContentHome />
      <BannerArea />
      {/* <NewCollection /> */}
      {/* <ProductIntroductionVideo/> */}
      <Review />
    </>
  );
}
