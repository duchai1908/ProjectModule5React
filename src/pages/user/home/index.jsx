import React from "react";
import "./home.css";
import CategoryPage from "./categorypage";
import Slider from "./slider";
import Feartured from "./featuredpage";
import BannerArea from "./bannerarea";
import NewCollection from "./newproduct";
import ProductIntroductionVideo from "./video";
import Review from "./review";
import { useSelector } from "react-redux";


export default function Home() {

  const data = useSelector((state)=> state.auth)
  console.log(data);
  
  return (
    <>
      <Slider/>
      <CategoryPage/>
      <Feartured/>
      <BannerArea/>
      <NewCollection/>
      {/* <ProductIntroductionVideo/> */}
      <Review/>
    </>
  );
}
