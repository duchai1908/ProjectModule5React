import React, { useState, useRef, useEffect } from "react";
import { Carousel, Button, Badge, InputNumber } from "antd";
import {
  FaCheck,
  FaPlus,
  FaMinus,
  FaRegHeart,
  FaHeart,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa"; // Import the check icon from react-icons
import { TbTruckDelivery } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  addItemProductToCart,
  findAllCart,
} from "../../../../services/cartService";
import {
  formatCurrencyVND,
  newDateArrive,
} from "../../../../utils/formatMoney";

const ProductMainContent = ({ product, productDetailList, piscValue }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const dispatch = useDispatch();

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    carouselRef.current.goTo(index);
  };

  const images = product.images;

  const [listColors, setListColors] = useState([]);
  const [listSizes, setListSizes] = useState([]);
  const [listImages, setListImages] = useState([]);

  // State to track the selected color (default is red)
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  //listSize by color
  const [listSizeByCondition, setListSizeByCondition] = useState([]);

  useEffect(() => {
    if (piscValue && piscValue.colors && piscValue.sizes) {
      // Set the extracted colors and sizes to state
      setListColors(piscValue?.colors);
      setListSizes(piscValue?.sizes);
      if (piscValue?.colors?.length > 0) {
        setSelectedColor(piscValue?.colors[0].color);

        //setSelectedSize(piscValue?.sizes[0].size);

        // Chỉ lấy màu và kích thước nếu chúng tồn tại
        if (piscValue.colors.length > 0) {
          setSelectedColor(piscValue.colors[0].color);
        }

        if (piscValue.sizes.length > 0) {
          setSelectedSize(piscValue.sizes[0].size);
        }
      }
    }
  }, [productDetailList, piscValue]);

  //create quantity value
  const [number, setNumber] = useState(1);

  //value quantity
  const onChangeQuantity = (value) => {
    if (value > 0) {
      setNumber(value);
    }
  };
  //hihhi
  useEffect(() => {}, [listSizeByCondition]);
  // Hàm tìm `ProductDetail` dựa trên màu sắc và kích thước
  const findProductDetail = (color, size) => {
    return productDetailList.find((product) => {
      console.log(
        `Kiểm tra sản phẩm: Màu: ${product.color.color}, Kích thước: ${product.size.size}`
      );
      return (
        product.color.color.toLowerCase().trim() ===
          color.toLowerCase().trim() &&
        product.size.size.toLowerCase().trim() === size.toLowerCase().trim()
      );
    });
  };

  const handleAddToCart = () => {
    // Kiểm tra xem người dùng đã chọn số lượng, kích thước và màu sắc chưa
    if (number <= 0) {
      alert("Vui lòng chọn số lượng sản phẩm!");
      return;
    }
    if (!selectedSize) {
      alert("Vui lòng chọn kích thước sản phẩm!");
      return;
    }
    if (!selectedColor) {
      alert("Vui lòng chọn màu sắc sản phẩm!");
      return;
    }
    const selectedProductDetail = findProductDetail(
      selectedColor.trim(),
      selectedSize.trim()
    );

    if (!selectedProductDetail) {
      alert("Không tìm thấy chi tiết sản phẩm với màu và kích thước đã chọn");
      console.log(
        "Không tìm thấy chi tiết sản phẩm với màu và kích thước đã chọn"
      );
      return;
    } else {
      console.log("Sản phẩm chi tiết đã tìm thấy:", selectedProductDetail);
      alert("success full");
    }

    const productToAdd = {
      productDetailId: selectedProductDetail.id,
      name: selectedProductDetail.name,
      price: selectedProductDetail.price,
      quantity: number,
      color: selectedColor,
      size: selectedSize,
    };

    console.log("Product to add:", productToAdd);
    dispatch(addItemProductToCart(productToAdd)).then(() => {
      dispatch(findAllCart()); // Gọi lại để cập nhật danh sách cart sau khi thêm
    });
  };

  const handleChangeColor = (colorName, e) => {
    setSelectedColor(colorName);
    console.log("details: ", productDetailList);

    // Filter out only the product details that match the color
    const filteredList = productDetailList.filter(
      (productDetail) => productDetail.color.color === colorName
    );
    console.log("list size normal", listSizes);
    setListSizeByCondition(filteredList);
    console.log("Filtered List: ", filteredList);
  };

  const [colorHasSize, setColorHasSize] = useState(null);

  //
  useEffect(() => {
    if (selectedColor) {
      setColorHasSize(
        productDetailList
          .filter(
            (productDetail) => productDetail.color.color === selectedColor
          )
          .map((productDetail) => productDetail.size)
      );
    }
  }, [selectedColor]);

  return (
    <div className="m-5 md:flex md:gap-8">
      {console.log("color has sizes = ", colorHasSize)}
      {/* Left Side: Carousel and Thumbnails */}
      <div className="flex-1 h-[370px] md:w-[570px] md:h-[570px] relative  ">
        <Carousel
          ref={carouselRef}
          dotPosition="bottom"
          afterChange={(current) => setActiveIndex(current)}
          className="rounded-xl"
        >
          {piscValue && piscValue.images && piscValue.images.length > 0 ? (
            piscValue.images.map((image, index) => {
              if (index < 4) {
                return (
                  <div key={index}>
                    <div
                      className="w-full h-[370px] md:h-[570px] bg-cover bg-center"
                      style={{ backgroundImage: `url(${image})` }}
                    />
                  </div>
                );
              } else {
                return <></>;
              }
            })
          ) : (
            <div>No images available</div> // Thông báo khi không có hình ảnh
          )}
        </Carousel>
        <div className="flex justify-between md:justify-center md:gap-8 mt-4">
          {piscValue && piscValue.images && piscValue.images.length > 0 ? (
            piscValue.images.map((image, index) => {
              if (index < 4) {
                return (
                  <div
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`cursor-pointer rounded-lg overflow-hidden transition-transform ${
                      activeIndex === index
                        ? "scale-125 border-2 border-blue-500"
                        : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-[80px] h-[80px] object-cover"
                    />
                  </div>
                );
              } else {
                return <></>;
              }
            })
          ) : (
            <div>No thumbnails available</div> // Thông báo khi không có hình thu nhỏ
          )}
        </div>
        <div className="absolute top-2 left-2">
          {/* <FaHeart className="text-pink-500 text-[32px] cursor-pointer" /> */}
          {/* From Uiverse.io by catraco  */}
          <div title="Like" className="heart-container">
            <input id="Give-It-An-Id" className="checkbox" type="checkbox" />
            <div className="svg-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="svg-outline"
                viewBox="0 0 24 24"
              >
                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="svg-filled"
                viewBox="0 0 24 24"
              >
                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={100}
                width={100}
                className="svg-celebrate"
              >
                <polygon points="10,10 20,20" />
                <polygon points="10,50 20,50" />
                <polygon points="20,80 30,70" />
                <polygon points="90,10 80,20" />
                <polygon points="90,50 80,50" />
                <polygon points="80,80 70,70" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Right Side: Product Information */}
      <div className="flex-1 md:pl-5 md:pr-5 mt-[120px] md:mt-0">
        <h1 className="text-[40px] font-bold">{piscValue?.product?.name}</h1>
        <div className="flex gap-3 items-baseline">
          <p className="text-[28px] text-gray-500 line-through">
            {formatCurrencyVND(productDetailList[0]?.price)}
          </p>
          <p className="text-[32px] text-blue-500">
            {formatCurrencyVND(
              productDetailList[0]?.price -
                productDetailList[0]?.price * (piscValue?.product?.sale / 100)
            )}
          </p>
          <p className="text-[16px] bg-gray-300 ml-[-8px]">
            -{piscValue?.product?.sale}%
          </p>
        </div>

        <p className="mt-2">{piscValue?.product?.description}</p>

        <div className="mt-4">
          {/* <div className="flex mb-3">
            <p className="font-bold">Availability:</p>
            <p className="text-blue-500 ml-2">11 left in stock</p>
          </div> */}
          <div className="flex mb-3">
            <p className="font-bold">Loại:</p>
            <p className="ml-2">{piscValue?.product?.category?.name}</p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-200 my-1"></div>
        <div className="mt-4">
          <h3 className="font-bold mb-3">Màu:</h3>
          <ul className="flex gap-3 list-none">
            {listColors && listColors.length > 0 ? (
              listColors.map((color) => (
                <li
                  key={color.color}
                  className={`relative w-[24px] h-[24px] rounded-[10px] cursor-pointer bg-${color.color}-500`}
                  // onClick={() => setSelectedColor(color.color)}
                  onClick={() => handleChangeColor(color.color)}
                >
                  {selectedColor === color.color && (
                    <FaCheck className="absolute top-[-5px] right-[-5px] text-white text-[12px] bg-blue-500 rounded-full" />
                  )}
                </li>
              ))
            ) : (
              <div>No colors available</div> // Thông báo khi không có màu
            )}
          </ul>
        </div>
        <div className="w-full h-[1px] bg-gray-200 my-1"></div>
        <div className="mt-4">
          <h3 className="font-bold mb-3">Kích cỡ:</h3>
          <ul className="flex gap-3 list-none">
            {listSizes && listSizes.length > 0 ? (
              listSizes.map((size) => {
                if (colorHasSize?.map((item) => item.id).includes(size.id)) {
                  return (
                    <li
                      key={size.size}
                      className={`relative cursor-pointer p-3 rounded-xl`}
                      style={{ border: "1px solid black" }}
                      onClick={() => setSelectedSize(size.size)}
                    >
                      <p>{size.size}</p>
                      {selectedSize === size.size && (
                        <FaCheck className="absolute top-[-5px] right-[-5px] p-[2px] text-white text-[20px] bg-blue-500 rounded-full" />
                      )}
                    </li>
                  );
                } else {
                  return (
                    <li
                      key={size.size}
                      className={`relative p-3 rounded-xl opacity-20 cursor-not-allowed`}
                      style={{ border: "1px solid black" }}
                      // onClick={() => setSelectedSize(size.size)}
                    >
                      <p>{size.size}</p>
                      {selectedSize === size.size && (
                        <FaCheck className="absolute top-[-5px] right-[-5px] p-[2px] text-white text-[20px] bg-blue-500 rounded-full" />
                      )}
                    </li>
                  );
                }
              })
            ) : (
              <div>No sizes available</div> // Thông báo khi không có kích thước
            )}
          </ul>
        </div>
        <hr className="mt-3" />
        {/* btn quantity, add to cart, add to order */}
        <div className="mt-4">
          <div className="md:flex items-center gap-1 md:h-[60px]">
            <div className="flex h-[60px] justify-center">
              <Button
                className="h-[100%] rounded"
                onClick={() => onChangeQuantity(number - 1)}
              >
                <FaMinus />
              </Button>
              {/* <input type="number" className="border-2 rounded px-5 h-full flex items-center text-center" value={number}/> */}
              <InputNumber
                className="border-2 rounded px-5 h-full flex items-center text-center text-[20px] font-bold"
                min={1}
                max={100}
                value={number}
                onChange={onChangeQuantity}
              />
              {/* <input className="border-2 rounded px-5 h-full flex items-center text-center">{number}</input> */}
              <Button
                className="h-[100%] rounded"
                onClick={() => onChangeQuantity(number + 1)}
              >
                <FaPlus />
              </Button>
            </div>
            <div className="flex mt-4 ml-3 gap-5 cart_button">
              <button type="button" className="cart_button-item">
                <div className="cart_link" onClick={handleAddToCart}>
                  Add to cart
                </div>
              </button>
              <button type="button" className="cart_button-item">
                <Link className="cart_link">Check out</Link>
              </button>
            </div>
          </div>
        </div>
        <hr className="mt-4" />
        <div className="mt-4 flex gap-4 items-center">
          <TbTruckDelivery className="text-[32px]" />
          <p className="text-[16px]">
            Ngày giao hàng dự kiến :{" "}
            <span className="font-bold">{newDateArrive()}</span>
          </p>
        </div>
        <div className="w-full h-[1px] bg-gray-200 my-1"></div>
        {/* return information */}
        <div className="mt-4">
          <p className="text-[16px] font-bold">Tóm tắt quy định trả hàng</p>
          <ul className="list-disc pl-4">
            <li className="mt-2">Chấp nhận trả hàng trong vòng 30 ngày</li>
            <li className="mt-2">Miễn phí vận chuyển trả hàng</li>
            <li className="mt-2">Không thu phí lưu kho</li>
            <li className="mt-2">Không có mặt hàng bán cuối cùng</li>
          </ul>
        </div>
        <hr className="mt-3" />
        <div className="flex mt-4">
          <p>Chia sẻ qua:</p>
          <div className="flex">
            <FaFacebookF className="ml-3 mr-1" />
            <p>Facebook</p>
          </div>
          <div className="flex">
            <FaInstagram className="ml-3 mr-1" />
            <p>Instagram</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMainContent;
