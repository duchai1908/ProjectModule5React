import { Button, Form, Input, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import { addAddress, deleteAddress, listAddress } from "../../../../services/addressService";

export default function UserAddressPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listAddressUser, setListAddressUser] = useState([]);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const onFinish = async (values) => {
    const data = await addAddress(values);
    notification.success({
        message: "Thêm địa chỉ thành công"
    })
    loadingData();
    setIsModalOpen(false);
  };
  const loadingData = async () => {
    const listData = await listAddress();
    setListAddressUser(listData.data.data);
  };
  const handleDeleteAddress = async (id) => {
    const deleteAddressAPI = await deleteAddress(id);
    notification.success({
        message: "Xoá địa chỉ thành công"
    })
    loadingData();
  }
  useEffect(() => {
    loadingData();
  }, []);
  return (
    <div className="user_main-right">
      <div className="title_right">
        <h2>Địa chỉ</h2>
      </div>
      <div>
        <Button className="bg-blue-300" onClick={showModal}>
          Thêm địa chỉ
        </Button>
      </div>
      <div className="user_line"></div>
      {listAddressUser && listAddressUser.length > 0 ? (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">STT</th>
              <th className="border border-gray-300 px-4 py-2">Địa chỉ</th>
              <th className="border border-gray-300 px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {listAddressUser.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td className="border border-gray-300 px-4 py-2">{index +1}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.address}</td>
                  <td className="border border-gray-300 px-4 py-2"><Button onClick={() => handleDeleteAddress(item.id)}>Xoá</Button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>Không có dữ liệu</div>
      )}

      <Modal
        title="Thêm mới địa chỉ"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Huỷ
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Gửi
          </Button>,
        ]}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="Địa chỉ"
            name="address"
            className="mt-4"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ !",
              },
            ]}
          >
            <Input placeholder="Vui lòng nhập địa chỉ" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            className="mt-4"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại !",
              },
            ]}
          >
            <Input placeholder="Vui lòng nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            label="Tên người nhận"
            name="receiveName"
            className="mt-4"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên người nhận !",
              },
            ]}
          >
            <Input placeholder="Vui lòng nhập tên người nhận" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
