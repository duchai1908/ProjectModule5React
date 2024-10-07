import { LockFilled } from "@ant-design/icons";
import React, { useState } from "react";
import ConfirmationModal from "../../../components/model/ConfirmationModal";

export default function CartItem({ item, onDelete }) {
  // State quản lý modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  // Hiển thị modal de xac nhan
  const showDeleteConfirmation = () => {
    setIsModalVisible(true);
  };
  const handleConfirmDelete = () => {
    onDelete(); // Xóa item khi người dùng chọn "OK"
    setIsModalVisible(false);
  };
  const handleCancelDelete = () => {
    setIsModalVisible(false); // Đóng modal khi người dùng chọn "Cancel"
  };

  return (
    <>
      <div className="cart_item">
        <div className="cart_img-product">
          {/* item delete */}
          <div className="cart_item-close" onClick={showDeleteConfirmation}>
            <i className="bx bx-x"></i>
          </div>
          {/* alt={item.productDetail.name} */}
          <img src={item.productDetail.product.image} />
        </div>
        <div className="cart_content">
          <h4 className="cart_title">{item.productDetail.name}</h4>
          {/* Accessing the product name */}
          <div className="cart_content-quantity">
            <div className="cart_color">{item.productDetail.size.size}</div>
            <div className="cart_size">{item.productDetail.color.color}</div>
            <div className="cart_quantity">
              <span className="cart_quantity-detail">{item.quantity}</span>
              <i className="bx bx-x"></i>

              <p className="cart_price">
                {item.productDetail.price * item.quantity} VND
              </p>
              {/* Format price */}
            </div>
          </div>
        </div>
      </div>
      <div className="cart_line"></div>
      {/* Hiển thị ConfirmationModal */}
      <ConfirmationModal
        visible={isModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Xác nhận xóa"
        content={`Bạn có chắc chắn muốn xóa sản phẩm ${item.productDetail.name} khỏi giỏ hàng?`}
      />
    </>
  );
}
