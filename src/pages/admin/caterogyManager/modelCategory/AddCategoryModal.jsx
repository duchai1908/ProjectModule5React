import React, { useEffect, useState } from "react";
import { Alert, Button, Input, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  findAllCategory,
} from "../../../../services/categoryService";
import SuccessModal from "../../../../components/model/ SuccessModal";

const AddCategoryModal = ({ visible, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [file, setFile] = useState(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false); // State cho modal thành công
  const [errorMessage, setErrorMessage] = useState(null); // State lưu lỗi
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
      .then((response) => {
        // Kiểm tra phản hồi từ server
        if (response.error) {
          throw new Error(response.error); // Ném lỗi nếu server phản hồi lỗi
        }
        setSuccessModalVisible(true); // Hiển thị modal thành công
        onClose(); // Đóng modal khi thêm thành công
        dispatch(findAllCategory({ page: 0, size: 3 }));
        setName("");
        setDescription("");
        setFile(null);
      })
      .catch((error) => {
        // Bắt lỗi nếu có phản hồi lỗi từ server
        if (error.response && error.response.status === 400) {
          setErrorMessage("Tên danh mục đã tồn tại. Vui lòng chọn tên khác.");
        } else {
          setErrorMessage("Tên danh mục đã tồn tại. Vui lòng chọn tên khác");
        }
      });
  };

  const handleSuccessModalClose = () => {
    setSuccessModalVisible(false); // Đóng modal thông báo thành công
  };

  const handleModalClose = () => {
    setName(""); // Reset tên
    setDescription(""); // Reset mô tả
    setFile(null); // Reset file ảnh
    setErrorMessage(null); // Reset lỗi (nếu có)
    onClose(); // Gọi hàm onClose để đóng modal
  };

  return (
    <>
      <SuccessModal
        visible={successModalVisible}
        onClose={handleSuccessModalClose}
      />

      <Modal
        title="Thêm mới danh mục"
        visible={visible}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={onClose}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Thêm
          </Button>,
        ]}
      >
        {errorMessage && (
          <Alert
            message="Lỗi"
            description={errorMessage}
            type="error"
            showIcon
            closable
            onClose={() => setErrorMessage(null)}
          />
        )}
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
    </>
  );
};

export default AddCategoryModal;
