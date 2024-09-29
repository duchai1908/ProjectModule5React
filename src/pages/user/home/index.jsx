import React from "react";
import "./home.css";
import CategoryPage from "./categorypage";
import Slider from "./slider";
import Feartured from "./featuredpage";
import BannerArea from "./bannerarea";
import NewCollection from "./newproduct";
import ProductIntroductionVideo from "./video";
import Review from "./review";


export default function Home() {
  return (
    <>
      <Slider/>
      <CategoryPage/>
      <Feartured/>
      <BannerArea/>
      <NewCollection/>
      <ProductIntroductionVideo/>
      <Review/>
    </>
  );
}
