import React, { useState } from "react";
import { Button, Input, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

const UserOrderDetailModalHistory = ({ visible, onClose, currentOrder }) => {
  const dispatch = useDispatch();

  //   const handleSubmit = async () => {
  //     const formData = new FormData();
  //     formData.append("name", name);
  //     formData.append("description", description);
  //     formData.append("status", status);
  //     formData.append("stock", stock);
  //     formData.append("price", price);
  //     formData.append("colorId", colorId);
  //     formData.append("sizeId", sizeId);
  //     formData.append("productId", id);
  //     if (file) {
  //       // formData.append("images", file); // If you have multiple images, use `append` multiple times.
  //       for (let i = 0; i < file.length; i++) {
  //         formData.append("images", file[i]);
  //       }
  //     }

  //     // Dispatch the action to add a product detail
  //     await dispatch(addProductDetail(formData))
  //       .then(() => {
  //         onClose(); // Close the modal when successful
  //         dispatch(findAllProductDetail({ id, page: 0, size: 5 })); // Refresh product details list
  //       })
  //       .catch((error) => {
  //         console.error("Error adding product detail:", error);
  //       });
  //   };

  return (
    <Modal
      title="Thêm mới sản phẩm chi tiết"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Hủy
        </Button>,
      ]}
    >
      <div>hihi</div>
    </Modal>
  );
};

export default UserOrderDetailModalHistory;
