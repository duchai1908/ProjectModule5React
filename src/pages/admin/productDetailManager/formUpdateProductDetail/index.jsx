import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Image,
  Input,
  Modal,
  notification,
  Select,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  findAllProductDetail,
  updateProductDetail,
} from "../../../../services/productDetailService";
import { getAllPDI } from "../../../../services/pdi";

const UpdateProductDetailModal = ({
  visible,
  onClose,
  currentProductUpdate,
  id,
  colorList,
  sizeList,
}) => {
  const {
    data: productDetailAndImage,
    status: productDetailAndImageStatus,
    error: productDetailAndImageError,
  } = useSelector((state) => state.PDI);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true); // If you have status to include
  const [file, setFile] = useState([]);
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [colorId, setColorId] = useState(0);
  const [sizeId, setSizeId] = useState(0);
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    if (currentProductUpdate) {
      setName(currentProductUpdate.name);
      setDescription(currentProductUpdate.description);
      setStock(currentProductUpdate.stock);
      setPrice(currentProductUpdate.price);
      setColorId(currentProductUpdate.color.id);
      setSizeId(currentProductUpdate.size.id);

      dispatch(getAllPDI({ productDetailId: currentProductUpdate?.id }));
    }
  }, [currentProductUpdate]);

  const handleUpload = (info) => {
    setFile([...file, info.file]);
  };

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
    } else {
      formData.append("images", []);
    }
    const productDetailId = currentProductUpdate.id;

    // dispatch

    try {
      await dispatch(updateProductDetail({ productDetailId, formData }))
        .then(() => {
          dispatch(findAllProductDetail({ id, page: 0, size: 5 })); // Refresh product details list
          onClose(); // Close the modal when successful
        })
        .catch((error) => {
          console.error("Error update product detail:", error);
        });
    } catch (err) {
      // Handle the error
      console.error("err cua 1:", err); // Example of handling the error
    }
  };

  const handleChangeColor = (value) => {
    // console.log("selected color:", value);
    setColorId(value);
  };
  const handleChangeSize = (value) => {
    // console.log("selected color:", value);
    setSizeId(value);
  };

  if (currentProductUpdate) {
    return (
      <Modal
        title="Chỉnh sửa sản phẩm chi tiết"
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
        {/* List old image */}
        {/* {currentProductUpdate.image &&
          !file &&
          currentProductUpdate.image.map((item, index) => {
            <>
              <p>Ảnh Cũ</p>
              <img
                src={currentProductUpdate.image}
                alt="Current product"
                className="mb-3 max-w-xs"
              />
            </>;
          })} */}
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
          {/* <img src={productDetailAndImage?.images?.[0]} alt="" /> */}
          <div className="mt-3">
            <h1>Ảnh hiện tại</h1>
            <div className="flex overflow-x-auto space-x-4">
              {productDetailAndImage?.images?.map((imgg, i) => (
                <Image
                  key={i}
                  width={100}
                  height={100}
                  src={imgg}
                  className="object-cover rounded-md"
                />
              ))}
            </div>
          </div>
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
          {/* <Input
            value={colorId}
            type="number"
            onChange={(e) => setColorId(e.target.value)}
          /> */}
          <Select
            value={colorId}
            // style={{
            //   width: 150,
            // }}
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
          {/* <Input
            value={sizeId}
            type="number"
            onChange={(e) => setSizeId(e.target.value)}
          /> */}
          <Select
            value={sizeId}
            // style={{
            //   width: 150,
            // }}
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
  } else {
    return <></>;
  }
};
export default UpdateProductDetailModal;
