import React, { useState } from "react";
import { Button, Input, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  addProductDetail,
  findAllProductDetail,
} from "../../../../services/productDetailService";

const AddProductDetailModal = ({ visible, onClose, id }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true); // If you have status to include
  const [file, setFile] = useState([]);
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [colorId, setColorId] = useState(null);
  const [sizeId, setSizeId] = useState(null);
  const [productId, setProductId] = useState(null);

  //validate
  const [isNameFalse, setIsNameFalse] = useState(false);

  const dispatch = useDispatch();

  const handleUpload = (info) => {
    setFile([...file, info.file]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("colorId", colorId);
    formData.append("sizeId", sizeId);
    formData.append("productId", id);
    if (file) {
      // formData.append("images", file); // If you have multiple images, use `append` multiple times.
      for (let i = 0; i < file.length; i++) {
        formData.append("images", file[i]);
      }
    }

    console.log(file);

    // Dispatch the action to add a product detail
    await dispatch(addProductDetail(formData))
      .then(() => {
        onClose(); // Close the modal when successful
        dispatch(findAllProductDetail({ id, page: 0, size: 5 })); // Refresh product details list
      })
      .catch((error) => {
        console.error("Error adding product detail:", error);
      });
  };

  return (
    <Modal
      title="Thêm mới sản phẩm chi tiết"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Thêm
        </Button>,
      ]}
    >
      <div>
        <label className="block font-medium mb-2">Tên</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        {isNameFalse && <p className="text-red-500">Tên không được để trống</p>}
      </div>
      <div>
        <label className="block font-medium mb-2">Số lượng kho</label>
        <Input
          value={stock}
          type="number"
          onChange={(e) => setStock(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Giá</label>
        <Input
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Ảnh sản phẩm</label>
        <Upload
          action="/api/upload"
          listType="picture"
          file={file}
          onChange={handleUpload}
          beforeUpload={() => false} // Disable auto-upload
        >
          <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
        </Upload>
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Mô tả</label>
        <Input.TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {/* Add additional fields for color, size, product if required */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Mã màu</label>
        <Input
          value={colorId}
          type="number"
          onChange={(e) => setColorId(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Mã kích thước</label>
        <Input
          value={sizeId}
          type="number"
          onChange={(e) => setSizeId(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Mã sản phẩm</label>
        <Input
          value={id}
          type="number"
          readOnly
          className="text-gray-500"
          // onChange={(e) => setProductId(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default AddProductDetailModal;
