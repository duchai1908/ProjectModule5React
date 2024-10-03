import React, { useState } from "react";
import { Button, Input, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  addCategory,
  findAllCategory,
} from "../../../../services/categoryService";

const AddCategoryModal = ({ visible, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleUpload = (info) => {
    setFile(info.file);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("status", status);
    if (file) {
      formData.append("image", file); // Thêm file vào FormData
    }

    // Gọi action addCategory với formData
    dispatch(addCategory(formData))
      .then(() => {
        onClose(); // Đóng modal khi thêm thành công
        dispatch(findAllCategory({ page: 0, size: 3 }));
      })
      .catch((error) => {
        console.error("Lỗi khi thêm danh mục:", error);
      });
  };

  return (
    <Modal
      title="Thêm mới danh mục"
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
        <Input onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Ảnh sản phẩm</label>
        <Upload
          action="/api/upload"
          listType="picture"
          file={file}
          value={file}
          onChange={handleUpload}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
        </Upload>
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Mô tả</label>
        <Input.TextArea onChange={(e) => setDescription(e.target.value)} />
      </div>
    </Modal>
  );
};

export default AddCategoryModal;
