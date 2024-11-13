import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Upload, Alert } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ConfirmationUpdate from "../../../../components/model/ConfirmationUpdate";

export default function UpdateCategory({
  visible,
  onClose,
  onSave,
  catUpdate,
  error,
}) {
  console.log(catUpdate);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [confirmVisible, setConfirmVisible] = useState(false);

  // Lấy dữ liệu từ category lên form khi modal mở
  useEffect(() => {
    if (catUpdate) {
      setName(catUpdate.name);
      setFile(catUpdate.file);
      setDescription(catUpdate.description);
    }
  }, [catUpdate]);

  const handleUpload = ({ file }) => {
    setFile(file);
  };
  const handleSubmitUpdate = async () => {
    try {
      // Tạo formData với dữ liệu danh mục
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (file) {
        formData.append("image", file);
      }

      const updatedCategoryData = {
        categoryId: catUpdate.id, // ID của danh mục cần cập nhật
        formData: formData, // Dữ liệu cần cập nhật
      };
      const result = await onSave(updatedCategoryData);

      if (result?.error) {
        setError(result.error);
      } else {
        setConfirmVisible(false);
      }
    } catch (error) {
      console.log("Cập nhật thất bại:", error);
    }
  };

  // Hiển thị modal xác nhận khi nhấn nút Lưu
  const handleShowConfirm = () => {
    setConfirmVisible(true);
  };

  return (
    <>
      <Modal
        title="Cập nhật danh mục"
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleShowConfirm}>
            Lưu
          </Button>,
        ]}
      >
        <div>
          {error && error.message?.name && (
            <Alert
              message="Lỗi"
              description={error.message.name}
              type="error"
              showIcon
            />
          )}
          <label className="block font-medium mb-2">Tên</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          {/* Hiển thị lỗi bằng Alert */}
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Ảnh danh muc</label>
          {/* Hiển thị ảnh cũ nếu có và nếu người dùng chưa chọn ảnh mới */}
          {catUpdate?.image && !file && (
            <>
              <p>Ảnh Cũ</p>
              <img
                src={catUpdate.image}
                alt="Current category"
                style={{ width: "120px", height: "auto" }}
              />
            </>
          )}
          {/* Component Upload để chọn ảnh mới */}
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
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </Modal>
      {/* Modal xác nhận */}
      <ConfirmationUpdate
        visible={confirmVisible}
        onConfirm={handleSubmitUpdate}
        onCancel={() => setConfirmVisible(false)}
        title="Xác nhận cập nhật"
      />
    </>
  );
}
