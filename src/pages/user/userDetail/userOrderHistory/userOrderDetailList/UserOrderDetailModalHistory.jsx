import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useDispatch } from "react-redux";
import { jsonAxios } from "../../../../../api";
import { formatCurrencyVND } from "../../../../../utils/formatMoney";

const UserOrderDetailModalHistory = ({ visible, onClose, currentOrder }) => {
  const dispatch = useDispatch();
  const [orderDetail, setOrderDetail] = useState([]);

  const loadData = () => {
    jsonAxios
      .get(`/user/orders/${currentOrder?.id}`)
      .then((resp) => {
        console.log("resp:", resp.data.data.orderDetail);
        const data = resp.data.data.orderDetail;
        setOrderDetail(data);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  useEffect(() => {
    console.log("check current order:", currentOrder);
    if (currentOrder) {
      loadData();
    }
  }, [currentOrder]);

  return (
    <Modal
      title="Chi tiết đơn hàng"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Hủy
        </Button>,
      ]}
    >
      <div>Mã: {currentOrder?.code}</div>
      <div>Ngày tạo: {currentOrder?.createdAt}</div>
      <div>Ngày nhận dự tính: {currentOrder?.receivedAt}</div>
      <div>Người nhận: {currentOrder?.receiveName}</div>
      <div>Địa chỉ nhận: {currentOrder?.receiveAddress}</div>
      <div>Số điện thoại người nhận: {currentOrder?.receivePhone}</div>
      <div>Trạng thái: {currentOrder?.status}</div>
      <div>
        Tổng giá tiền:{" "}
        <span className="font-bold">
          {formatCurrencyVND(currentOrder?.totalPrice)}
        </span>
      </div>
      <hr className="my-5" />

      {/* Order Details Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Tên sản phẩm</th>
              <th className="py-2 px-4 text-left">Chi tiết sản phẩm</th>
              <th className="py-2 px-4 text-left">Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {orderDetail.length > 0 ? (
              orderDetail.map((item) => (
                <tr key={item?.id} className="border-b">
                  <td className="py-2 px-4">{item?.id}</td>
                  <td className="py-2 px-4">{item?.productName}</td>
                  <td className="py-2 px-4">
                    {item?.productDetail ? (
                      <div>
                        Tên: {item?.productDetail?.name} <br />
                        Màu: {item?.productDetail?.color?.color} <br />
                        Kích thước: {item?.productDetail?.size?.size}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="py-2 px-4">{item.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-2 px-4 text-center">
                  Không có dữ liệu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default UserOrderDetailModalHistory;
