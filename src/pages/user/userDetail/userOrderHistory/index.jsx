import React, { useEffect, useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dropdown,
  Image,
  Input,
  notification,
  Pagination,
  Select,
  Tag,
} from "antd";
import { FaFilter } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { useParams } from "react-router-dom";
import {
  cancelOrderByUser,
  getAllOrderByUser,
} from "../../../../services/userOderService";
import { changePageUserOder } from "../../../../redux/slices/userOrderSlice";
import { formatCurrencyVND } from "../../../../utils/formatMoney";
import { formAxios } from "../../../../api";
import UserOrderDetailModalHistory from "./userOrderDetailList/UserOrderDetailModalHistory";

export default function UserOrderHistoryPage() {
  const { id } = useParams();

  const { data, status, error, totalElements, number, size, numberOfElements } =
    useSelector((state) => state.userOrder);

  const dispatch = useDispatch();
  //for model add
  const [isModalVisible, setIsModalVisible] = useState(false);
  //for model edit
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);

  const [currentOrder, setCurrentOrder] = useState(null);

  // Fetch product details when component mounts and whenever the page changes
  useEffect(() => {
    dispatch(getAllOrderByUser({ page: number, size }));
  }, [dispatch, number, size]);

  // Function to handle page change
  const handleChangePage = async (page, pageSize) => {
    dispatch(changePageUserOder(page - 1)); // Adjusting for 0-based index
  };

  const handleAddProductDetail = async (newProductDetail) => {
    // dispatch(addProductDetail(newProductDetail));
    setIsModalVisible(false); // Close modal after success
  };

  // Handle delete product detail
  const handleCancel = async (order) => {
    formAxios
      .put(`/user/orders/cancel/${order.id}`)
      .then((response) => {
        if (response.data.statusCode === 200) {
          // Thông báo thành công
          notification.success({
            message: "Thành công",
            description: "Chúc mừng bạn huỷ đơn hàng thành công",
          });
          dispatch(getAllOrderByUser({ page: number, size }));
        } else {
          // Thông báo lỗi nếu có vấn đề khác
          notification.error({
            message: "Lỗi",
            description: "Không thể huỷ đơn hàng.",
          });
        }
      })
      .catch((error) => {
        // Thông báo lỗi khi gặp lỗi từ phía server
        notification.error({
          message: "Lỗi",
          description: "Không thể huỷ đơn hàng hihi.",
        });
        // console.error("Lỗi:", error);
      });
  };

  // Handle edit product detail
  const handleOpenOderDetail = async (order) => {
    console.log("check order in history:", order);
    setCurrentOrder(order);
    setIsModalVisible(true);
  };

  return (
    <>
      {status === "pending" && <div>Loading...</div>}
      {/* {error && <div>Error fetching data: {error}</div>} */}
      <div>
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-[24px] font-bold">Lịch sử mua hàng</h1>
          </div>

          {data && data.length > 0 ? (
            <>
              {/* <div className="flex items-center justify-between mb-6">
              <h1 className="text-[24px] font-bold">
                Danh sách sản phẩm chi tiết
              </h1>
              <Button type="primary" onClick={() => setIsModalVisible(true)}>
                Thêm mới sản phẩm
              </Button>
            </div> */}
              <div className="overflow-x-auto max-h-[65vh] overflow-scroll">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 h-11 text-center">STT</th>
                      <th className="px-4 h-11 text-center">Mã</th>
                      <th className="px-4 h-11 text-left">Ghi chú</th>
                      <th className="px-4 h-11 text-left">Người nhận</th>
                      <th className="px-4 h-11 text-center">SDT người nhận</th>
                      <th className="px-4 h-11 text-center">Giá</th>
                      <th className="px-4 h-11 text-left">Ngày nhận dự kiến</th>
                      <th className="px-4 h-11 text-left">Trạng thái</th>
                      <th className="px-4 h-11 text-left">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
                      // Define options dynamically for each item
                      const options = [
                        {
                          key: "4",
                          label: <span>Chi tiết</span>,
                          onClick: () => handleOpenOderDetail(item), // Pass the item to the edit handler
                        },
                        {
                          key: "6",
                          label: <span>Huỷ</span>,
                          onClick: () => handleCancel(item), // Pass the item to the delete handler
                        },
                      ];

                      return (
                        <tr className="border-b" key={item.id}>
                          <td className="px-4 h-11">
                            {number * size + index + 1}
                          </td>
                          <td className="px-4 h-11 text-left">{item?.code}</td>
                          <td className="px-4 h-11 text-left">{item?.note}</td>
                          <td className="px-4 h-11 text-left">
                            {item?.receiveName}
                          </td>
                          <td className="px-4 h-11 text-center">
                            {item?.receivePhone}
                          </td>
                          <td className="px-4 h-11 text-left">
                            {formatCurrencyVND(item?.totalPrice)}
                          </td>
                          <td className="px-4 h-11 text-left">
                            {item?.receivedAt}
                          </td>
                          <td className="px-4 h-11">
                            {item.status === "WAITING" && (
                              <Tag color="green">WAITING</Tag>
                            )}
                            {item.status === "CONFIRM" && (
                              <Tag color="blue">CONFIRM</Tag>
                            )}
                            {item.status === "DELIVERY" && (
                              <Tag color="orange">DELIVERY</Tag>
                            )}
                            {item.status === "SUCCESS" && (
                              <Tag color="cyan">SUCCESS</Tag>
                            )}
                            {item.status === "CANCEL" && (
                              <Tag color="red">CANCEL</Tag>
                            )}
                            {item.status === "DENIED" && (
                              <Tag color="magenta">DENIED</Tag>
                            )}
                          </td>
                          <td className="px-4 h-11 text-center ">
                            <Dropdown
                              menu={{
                                items: options,
                              }}
                              placement="bottom"
                              trigger={["click"]}
                            >
                              <Button className="border-none shadow-none focus:shadow-none focus:bg-none">
                                <CiCircleMore className="cursor-pointer text-[24px]" />
                              </Button>
                            </Dropdown>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center ">
                <div>
                  Hiển thị <b>{numberOfElements}</b> trên
                  <b>{totalElements}</b> bản ghi
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-3">
                    <Pagination
                      total={totalElements}
                      pageSize={size}
                      current={number + 1}
                      onChange={handleChangePage}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>Không có sản phẩm chi tiết nào.</div>
          )}
          <UserOrderDetailModalHistory
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            currentOrder={currentOrder}
          />
          {/* <UpdateProductDetailModal
            visible={isModalEditVisible}
            onClose={() => setIsModalEditVisible(false)}
            //product id (not product detail id)
            id={id}
            currentProductUpdate={currentProductUpdate}
          /> */}
        </div>
      </div>
    </>
  );
}
