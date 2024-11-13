import React, { useEffect, useState } from "react";
import { Alert, Button, Input, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../../../services/categoryService";
import SuccessModal from "../../../../components/model/ SuccessModal";
import { clearError } from "../../../../redux/slices/categorySlice";

const AddCategoryModal = ({ visible, onClose, error }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]); // Quản lý danh sách file
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const handleUpload = ({ file }) => {
    setFile(file);
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
          throw new Error(response.error);
        }
        setSuccessModalVisible(true);
        handleModalClose();
        onClose();
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
    setName("");
    setDescription("");
    setFile();
    setErrorMessage(null);
    onClose();
    dispatch(clearError());
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
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          {/* {error && error.message?.name && (
            <p style={{ color: "red" }}>{error.message.name}</p>
          )} */}
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Ảnh sản phẩm</label>
          <Upload
            listType="picture"
            fileList={file ? [file] : []}
            file={file}
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
};

export default AddCategoryModal;
