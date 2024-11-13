import React, { useEffect, useState } from "react";
import { Button, Input, Modal, notification, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  addProductDetail,
  findAllProductDetail,
} from "../../../../services/productDetailService";

const AddProductDetailModal = ({
  visible,
  onClose,
  id,
  colorList,
  sizeList,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true); // If you have status to include
  const [file, setFile] = useState([]);
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [colorId, setColorId] = useState(
    colorList && colorList?.length > 0 ? colorList[0].color : null
  );
  const [sizeId, setSizeId] = useState(
    sizeList && sizeList?.length > 0 ? sizeList[0].size : null
  );
  const [productId, setProductId] = useState(null);

  //validate
  const [isNameFalse, setIsNameFalse] = useState(false);

  const dispatch = useDispatch();

  const handleUpload = (info) => {
    setFile([...file, info.file]);
  };

  const clearData = () => {
    setName("");
    setDescription("");
    setStatus(true);
    setFile([]);
    setStock(0);
    setPrice(0);
    setColorId(colorList && colorList?.length > 0 ? colorList[0].color : null);
    setSizeId(sizeList && sizeList?.length > 0 ? sizeList[0].size : null);
    setProductId(null);
  };
  useEffect(() => {
    clearData();
  }, [onClose]);

  const handleSubmit = async () => {
    if (name === "") {
      notification.error({ message: "Tên đang bị trống", duration: 300 });
      return;
    }
    if (description === "") {
      notification.error({ message: "Mô tả đang bị trống", duration: 300 });
      return;
    }
    if (stock < 0) {
      notification.error({
        message: "Số lượng phải lớn hơn hoặc bằng 0",
        duration: 300,
      });
      return;
    }
    if (price < 0) {
      notification.error({
        message: "Giá phải lớn hơn hoặc bằng 0",
        duration: 300,
      });
      return;
    }
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

    // Dispatch the action to add a product detail
    await dispatch(addProductDetail({ formData, onClose, clearData }));
    // .then(() => {
    //   notification.success({
    //     message: "Thêm mới sản phẩm chi tiết thành công",
    //     duration: 3,
    //   });
    //   onClose(); // Close the modal when successful
    //   clearData();
    //   dispatch(findAllProductDetail({ id, page: 0, size: 5 })); // Refresh product details list
    // })
    // .catch((error) => {
    //   notification.error({
    //     message: "Thêm mới sản phẩm chi tiết thất bại",
    //     duration: 3,
    //   });
    // });
  };

  const handleChangeColor = (value) => {
    // console.log("selected color:", value);
    setColorId(value);
  };
  const handleChangeSize = (value) => {
    // console.log("selected color:", value);
    setSizeId(value);
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
        <Select
          defaultValue={
            colorList && colorList?.length > 0 ? colorList[0].color : undefined
          }
          className="w-full"
          onChange={handleChangeColor}
          options={colorList?.map((c) => ({
            value: c?.id,
            label: c?.color,
          }))}
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Mã kích thước</label>
        <Select
          defaultValue={
            sizeList && sizeList?.length > 0 ? sizeList[0].size : undefined
          }
          className="w-full"
          onChange={handleChangeSize}
          options={sizeList?.map((s) => ({
            value: s?.id,
            label: s?.size,
          }))}
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
