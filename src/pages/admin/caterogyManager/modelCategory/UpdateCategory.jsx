import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function UpdateCategory({ visible, onClose, category, onSave }) {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  // Lấy dữ liệu từ category lên form khi modal mở
  useEffect(() => {
    if (category) {
      setName(category.name);
      setFile(category.file); // giả sử file là đối tượng chứa thông tin file hình ảnh
      setDescription(category.description);
    }
  }, [category]);

  const handleUpload = ({ file }) => {
    setFile(file);
  };
  const handleSubmitUpdate = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (file) {
      formData.append("image", file);
    }

    const updatedCategoryData = {
      categoryId: category.id, // ID của danh mục cần cập nhật
      formData: formData, // Dữ liệu cần cập nhật
    };

    onSave(updatedCategoryData); // Gọi hàm onSave
  };

  return (
    <>
      <Modal
        title="Thêm mới danh mục"
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmitUpdate}>
            Lưu
          </Button>,
        ]}
      >
        <div>
          <label className="block font-medium mb-2">Tên</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Ảnh danh muc</label>
          {/* Hiển thị ảnh cũ nếu có và nếu người dùng chưa chọn ảnh mới */}
          {category?.image && !file && (
            <>
              <p>Ảnh Cũ</p>
              <img
                src={category.image}
                alt="Current category"
                className="mb-3 max-w-xs"
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
    </>
  );
}
