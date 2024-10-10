import React, { useEffect, useState } from "react";
import "./wishList.css";
import { Link } from "react-router-dom";
import { Breadcrumb, Button } from "antd";
import { getWishList, removeAllWishlist, removeWishlist } from "../../../services/wishList";
export default function WishList() {
  const [wishlist, setWishlist] = useState(null);
  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const response = await getWishList();
        // console.log("Response: ", response.data);
        setWishlist(response);
      } catch (error) {
        console.error("Error fetching wishlist: ", error);
      }
    };
    // tạo hàm để gọi api bất đồng bộ wishlist
    fetchWishList();
  }, []);

  /**
   * @param {*} id id của sản phẩm trong wishlist 
   * @description hàm xoá 1 sản phẩm khỏi wishlist
   * Auth: Duc Hai (07/10/2024)
   */
  const handleDeleteWishlist = async(id) =>{
      const reponse = await removeWishlist(id);
      setWishlist(reponse);
  }

  /**
   * @description xoá toàn bộ sản phẩm khỏi sản phẩm yêu thích
   * Auth: Duc Hai (07/10/2024)
   */
  const handleRemoveAll = async() =>{
      const reponse = await removeAllWishlist();
      setWishlist([]);
  }
  // <Breadcrumb
  //   separator=">"
  //   items={[
  //     {
  //       title: "Home",
  //     },
  //     {
  //       title: "Wishlist",
  //       href: "",
  //     },
  //   ]}
  // />;

  return (
    <>
      <div className="wish_container">
        {console.log("wihstlist: ", wishlist)}
        <div className="wish_header">
          <h1 className="wish_title">Your Wishlist</h1>
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
        {
          wishlist && wishlist.data.data.length !== 0 ?  (<Button onClick={handleRemoveAll}>Remove All</Button>) : (<p></p>)
        }
       
        <div className="wish_content">
          
          <div className="wish_content-items">
            {wishlist && wishlist.data.data.length === 0 ? (
              <p >Danh sách yêu thích trống</p>
            ) : (
              wishlist && wishlist.data.data.map((item) => {
                return (
                  <>
                    {/*item wishlist start*/}
                    <div className="wish_content-item">
                      <Link className="wish_img" to="#">
                        <img
                          className="wish_img-product"
                          src={item.image}
                          alt=""
                        />
                      </Link>
                      <div className="wish_content-detail">
                        <h4 className="post-title">
                          <Link className="link_wish-item" to="#">
                            {item.name}
                          </Link>
                        </h4>
                        <p class="wish-pro-price">{item.category.name}</p>
                        <div className="wish_button">
                          <Link to="/order" className="wish_button-item">
                            Order Now
                          </Link>
                          <Link onClick={()=>handleDeleteWishlist(item.id)} className="wish_button-item remove">
                            Remove
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/*item wishlist end*/}
                  </>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
