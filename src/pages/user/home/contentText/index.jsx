import React from "react";
import "./content.css";
import { Button } from "antd";

export default function ContentHome() {
  return (
    // <section className="content-banner">
    //   <div className="container-content">
    //     <div className="content">
    //       <div className="content-left">
    //         <h3>Exclusive Collection</h3>
    //         <h1>3D Video Game Controller.</h1>
    //         <p>
    //           When referring to a "3D video game controller," it's important to
    //           note that most modern video game controllers are designed to
    //           operate in three dimensions, allowing users to navigate characters
    //           and objects within a 3D virtual space. However, if you are
    //           specifically looking for controllers that incorporate 3D spatial
    //           tracking or other advanced features, here are a few examples:
    //         </p>
    //         <div className="text-button">
    //           <Button className="button">
    //             <span>Shop now</span>
    //           </Button>
    //         </div>
    //       </div>
    //       <div className="content-right">
    //         <div className="content-img">
    //           <img
    //             src="https://minimalin-demo.myshopify.com/cdn/shop/files/video-banner_1200x.jpg?v=1708786140"
    //             alt=""
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <>
      <div className="w-full h-[700px] mt-10">
        <img
          src="https://img.freepik.com/free-photo/office-desk-surface-with-two-laptops_23-2148821893.jpg?w=2000&t=st=1728534925~exp=1728535525~hmac=ef4345fdae4281101e0072ad87a71230e6aba608db0ffedd644edfea718734fd"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </>
  );
}
