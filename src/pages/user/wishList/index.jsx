import React from "react";
import "./wishList.css";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
export default function WishList() {
  <Breadcrumb
    separator=">"
    items={[
      {
        title: "Home",
      },
      {
        title: "Wishlist",
        href: "",
      },
    ]}
  />;

  return (
    <>
      <div className="wish_container">
        <div className="wish_header">
          <h1 className="wish_title">Your Shopping Cart</h1>
          {/* <div className="wish_link">
            <Breadcrumb
              separator=">"
              items={[
                {
                  title: <span className="wish_home">Home</span>,
                  href: "",
                },
                {
                  title: <span className="wish_list">Wishlist</span>,
                },
              ]}
              className="wish_link-icon"
            />
          </div> */}
        </div>
        <div className="wish_content">
          <div className="wish_content-items">
            {/*item wishlist start*/}
            <div className="wish_content-item">
              <Link className="wish_img" to="#">
                <img
                  className="wish_img-product"
                  src="https://minimalin-demo.myshopify.com/cdn/shop/files/e1_6_600x.png?v=1708683199"
                  alt=""
                />
              </Link>
              <div className="wish_content-detail">
                <h4 className="post-title">
                  <Link className="link_wish-item" to="#">
                    Ea. V92 Ultra Pro Max
                  </Link>
                </h4>
                <p class="wish-pro-price">973.000₫</p>
                <div className="wish_button">
                  <Link to="/order" className="wish_button-item">
                    Order Now
                  </Link>
                  <Link to="#" className="wish_button-item remove">
                    Remove
                  </Link>
                </div>
              </div>
            </div>
            <div className="wish_content-item">
              <Link className="wish_img" to="#">
                <img
                  className="wish_img-product"
                  src="https://minimalin-demo.myshopify.com/cdn/shop/files/e1_6_600x.png?v=1708683199"
                  alt=""
                />
              </Link>
              <div className="wish_content-detail">
                <h4 className="post-title">
                  <Link className="link_wish-item" to="">
                    Ea. V92 Ultra Pro Max
                  </Link>
                </h4>
                <p class="wish-pro-price">973.000₫</p>
                <div className="wish_button">
                  <button className="wish_button-item">Order Now</button>
                  <button className="wish_button-item remove">Remove</button>
                </div>
              </div>
            </div>
            <div className="wish_content-item">
              <Link to="#" className="wish_img">
                <img
                  className="wish_img-product"
                  src="https://minimalin-demo.myshopify.com/cdn/shop/files/e1_6_600x.png?v=1708683199"
                  alt=""
                />
              </Link>
              <div className="wish_content-detail">
                <h4 className="post-title">
                  <Link className="link_wish-item" to="">
                    Ea. V92 Ultra Pro Max
                  </Link>
                </h4>
                <p class="wish-pro-price">973.000₫</p>
                <div className="wish_button">
                  <button className="wish_button-item">Order Now</button>
                  <button className="wish_button-item remove">Remove</button>
                </div>
              </div>
            </div>
            <div className="wish_content-item">
              <Link to="#" className="wish_img">
                <img
                  className="wish_img-product"
                  src="https://minimalin-demo.myshopify.com/cdn/shop/files/e1_6_600x.png?v=1708683199"
                  alt=""
                />
              </Link>
              <div className="wish_content-detail">
                <h4 className="post-title">
                  <Link className="link_wish-item" to="">
                    Ea. V92 Ultra Pro Max
                  </Link>
                </h4>
                <p class="wish-pro-price">973.000₫</p>
                <div className="wish_button">
                  <button className="wish_button-item">Order Now</button>
                  <button className="wish_button-item remove">Remove</button>
                </div>
              </div>
            </div>
            <div className="wish_content-item">
              <Link to="#" className="wish_img">
                <img
                  className="wish_img-product"
                  src="https://minimalin-demo.myshopify.com/cdn/shop/files/e1_6_600x.png?v=1708683199"
                  alt=""
                />
              </Link>
              <div className="wish_content-detail">
                <h4 className="post-title">
                  <Link className="link_wish-item" to="">
                    Ea. V92 Ultra Pro Max
                  </Link>
                </h4>
                <p class="wish-pro-price">973.000₫</p>
                <div className="wish_button">
                  <button className="wish_button-item">Order Now</button>
                  <button className="wish_button-item remove">Remove</button>
                </div>
              </div>
            </div>
            {/*item wishlist end*/}
          </div>
        </div>
      </div>
    </>
  );
}
