import React, { useEffect, useState } from "react";
import { updateUser } from "../../../../services/userService";
import { useDispatch } from "react-redux";
import { Button, Upload, Modal } from "antd";
import { FaPlus } from "react-icons/fa";
import Cookies from "js-cookie";
import { logout } from "../../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function UserInformationPage({ onUserUpdated }) {
  // Kiểm tra cookie 'token' trước khi parse
  const token = Cookies.get("token");
  const data = token ? JSON.parse(token) : null; // Thêm kiểm tra trước khi parse

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [message, setMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFileChange = (info) => {
    if (info.fileList.length > 0) {
      const selectedFile = info.fileList[0].originFileObj;
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setImageURL(url);
    }
  };

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    if (data) {
      setUserInfo({
        ...userInfo,
        fullName: data.data.fullName,
        phone: data.data.phone,
        email: data.data.email,
        image: data.data.image,
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("phone", phone);
    formData.append("email", email);
    if (file) {
      formData.append("image", file);
    }

    try {
      const response = await dispatch(updateUser(formData));
      console.log(response);
      setMessage(
        "Cập nhật thông tin thành công! Bạn sẽ được yêu cầu đăng nhập lại."
      );
      setIsModalVisible(true);

      onUserUpdated(response.data);
      dispatch(logout());
    } catch (error) {
      console.error("Error updating user information:", error);
      setMessage("Cập nhật thông tin thất bại!");
      setIsModalVisible(true);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate("/login");
  };

  return (
    <>
      <div className="user_main-right">
        <div className="title_right">
          <h2>Thông Tin Tài Khoản</h2>
        </div>
        <div className="user_line"></div>
        <form className="user_form" onSubmit={handleSubmit}>
          <div className="checkout_address-payment">
            <h3>Upload</h3>
            <Upload
              beforeUpload={() => false}
              onChange={handleFileChange}
              showUploadList={false}
              accept="image/*"
            >
              <Button className="upload-button" icon={<FaPlus />}>
                Chọn ảnh
              </Button>
            </Upload>
            {imageURL && (
              <img
                src={imageURL}
                alt="Selected"
                style={{ width: "100px", height: "100px", marginLeft: "10px" }}
              />
            )}
          </div>
          <div className="checkout_delivery">
            <p>Full name</p>
            <div className="checkout_address-input">
              <input
                type="text"
                className="checkout_address-item"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <p>Phone</p>
            <div className="checkout_address-input">
              <input
                type="text"
                className="checkout_address-item"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <p>Email</p>
            <div className="checkout_address-input">
              <input
                type="text"
                className="checkout_address-item"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="checkout_address-input">
            <button className="checkout-button" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>

      <Modal
        title="Thông báo"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
      >
        <p>{message}</p>
      </Modal>
    </>
  );
}
