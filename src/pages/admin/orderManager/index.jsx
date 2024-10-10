import React, { useEffect, useState } from "react";
import "./order.css";
import { Button, Dropdown, Input, Modal, Pagination, Tag, message } from "antd";
import { FaFilter } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  findAllOrderByUser,
  updateStatusOrder,
} from "../../../services/adminOrderService";
import { changePageAdminOder } from "../../../redux/slices/adminOrderSlice";

export default function OrderManager() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedData, setSortedData] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  const { data, status, error, totalElements, number, size } = useSelector(
    (state) => state.adminOrder
  );

  useEffect(() => {
    dispatch(
      findAllOrderByUser({
        page: number,
        size,
        searchTerm,
        sortField,
        sortDirection,
      })
    );
  }, [dispatch, number, searchTerm, sortField, sortDirection]);

  // Phân trang
  const handleChangePage = (page) => {
    dispatch(changePageAdminOder(page - 1));
  };

  // Thay đổi trạng thái đơn hàng
  const handleChangeStatus = async (orderId, newStatus) => {
    const order = data.find((o) => o.id === orderId);

    // Kiểm tra điều kiện thay đổi trạng thái
    if (order.status === "SUCCESS") {
      message.error("Trạng thái SUCCESS không thể thay đổi!");
      return;
    }

    if (order.status === "DENIED") {
      message.error("Trạng thái DENIED không thể chuyển sang trạng thái khác!");
      return;
    }

    // Không cho phép chuyển từ WAITING lên DELIVER hoặc SUCCESS
    if (order.status === "WAITING" && newStatus === "DELIVERY") {
      message.error("Không thể chuyển từ trạng thái WAITING lên DELIVER");
      return;
    }

    if (order.status === "WAITING" && newStatus === "SUCCESS") {
      message.error(
        "Không thể chuyển từ trạng thái WAITING lên DELIVER hoặc SUCCESS!"
      );
      return;
    }

    // Không cho phép chuyển từ CONFIRM lên SUCCESS
    if (order.status === "CONFIRM" && newStatus === "SUCCESS") {
      message.error("Không thể chuyển từ trạng thái CONFIRM lên SUCCESS!");
      return;
    }

    // Chỉ cho phép trạng thái WAITING có thể chuyển thành DENIED
    if (order.status !== "WAITING" && newStatus === "DENIED") {
      message.error("Chỉ trạng thái WAITING mới có thể chuyển thành DENIED!");
      return;
    }

    // Kiểm tra các trạng thái không thể quay lại
    if (order.status === "CONFIRM" && newStatus === "WAITING") {
      message.error("Không thể quay về trạng thái WAITING từ CONFIRM!");
      return;
    }

    if (order.status === "DELIVERY" && newStatus === "CONFIRM") {
      message.error("Không thể quay về trạng thái CONFIRM từ DELIVER!");
      return;
    }

    // Sử dụng Modal.confirm để xác nhận
    Modal.confirm({
      title: "Xác nhận thay đổi trạng thái",
      content: "Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng này không?",
      okText: "Có",
      cancelText: "Không",
      onOk: async () => {
        // Gọi hàm cập nhật trạng thái khi xác nhận
        try {
          await dispatch(updateStatusOrder({ orderId, newStatus })).then(() => {
            dispatch(
              findAllOrderByUser({
                page: number,
                size,
                searchTerm,
                sortField,
                sortDirection,
              })
            );
          });
          message.success("Cập nhật trạng thái đơn hàng thành công!");
        } catch (error) {
          message.error("Cập nhật trạng thái đơn hàng thất bại!");
        }
      },
      onCancel() {
        // message.info("Hành động đã bị hủy, trạng thái vẫn giữ nguyên.");
      },
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-[24px] font-bold">Quản Lý Đặt Hàng</h1>
      {/* Tìm kiếm */}
      <div className="mb-4 flex justify-between items-center">
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: <span className="cursor-pointer">Mặc Định</span>,
              },
              {
                key: "2",
                label: (
                  <span className="cursor-pointer">Lọc theo tên từ A-Z</span>
                ),
              },
              {
                key: "3",
                label: (
                  <span className="cursor-pointer">Lọc theo tên từ Z-A</span>
                ),
              },
            ],
          }}
          placement="bottom"
        >
          <Button className="border-none shadow-none">
            <FaFilter
              size={20}
              className="cursor-pointer text-gray-500 hover:text-gray-600"
            />
          </Button>
        </Dropdown>
        <Input.Search
          className="w-[300px]"
          placeholder="Tìm kiếm danh mục theo tên"
          onSearch={(value) => setSearchTerm(value)}
        />
        <LuRefreshCw
          size={24}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-collapse border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 h-14 text-center">
                STT
              </th>
              <th className="border border-gray-300 px-4 h-14 text-center">
                Mã
              </th>
              <th className="border border-gray-300 px-4 h-14 text-center">
                Ghi chú
              </th>
              <th className="border border-gray-300 px-4 h-11 text-center">
                Người nhận
              </th>
              <th className="border border-gray-300 px-4 h-14 text-center">
                Giá
              </th>
              <th className="border border-gray-300 px-4 h-14 text-center">
                Ngày nhận dự kiến
              </th>
              <th className="border border-gray-300 px-4 h-14 text-center">
                Trạng thái
              </th>
              <th className="border border-gray-300 px-4 h-14 text-center">
                Hành động
              </th>
            </tr>
          </thead>
          {console.log(data)}
          <tbody>
            {data?.map((order, index) => (
              <tr key={order.id}>
                <td className="border border-gray-300 px-4 h-14 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 h-14 text-center">
                  {order.code}
                </td>
                <td className="border border-gray-300 px-4 h-14 text-center">
                  {order.note}
                </td>
                <td className="border border-gray-300 px-4 h-14 text-center">
                  {order.receiveName} - {order.receiveAddress} -{" "}
                  {order.receivePhone}
                </td>
                <td className="border border-gray-300 px-4 h-14 text-center">
                  {order.totalPrice.toLocaleString()} VND
                </td>
                <td className="border border-gray-300 px-4 h-14 text-center">
                  {order.receivedAt}
                </td>
                <td className="border border-gray-300 px-4 h-14 text-center">
                  {order.status === "WAITING" && (
                    <Tag color="green">WAITING</Tag>
                  )}
                  {order.status === "CONFIRM" && (
                    <Tag color="blue">CONFIRM</Tag>
                  )}
                  {order.status === "DELIVERY" && (
                    <Tag color="orange">DELIVERY</Tag>
                  )}
                  {order.status === "SUCCESS" && (
                    <Tag color="cyan">SUCCESS</Tag>
                  )}
                  {order.status === "CANCEL" && <Tag color="red">CANCEL</Tag>}
                  {order.status === "DENIED" && (
                    <Tag color="magenta">DENIED</Tag>
                  )}
                </td>
                <td className="border border-gray-300 px-4 h-14 text-center">
                  <div className="order-detail">
                    <i className="bx bxs-edit"></i>
                    <span> Chi tiết</span>
                  </div>
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: "4",
                          label: (
                            <div className="category-action">
                              <button
                                onClick={() =>
                                  handleChangeStatus(order.id, "WAITING")
                                }
                              >
                                WAITING
                              </button>
                            </div>
                          ),
                        },
                        {
                          key: "5",
                          label: (
                            <div className="category-action">
                              <button
                                onClick={() =>
                                  handleChangeStatus(order.id, "CONFIRM")
                                }
                              >
                                CONFIRM
                              </button>
                            </div>
                          ),
                        },
                        {
                          key: "6",
                          label: (
                            <div className="category-action">
                              <button
                                onClick={() =>
                                  handleChangeStatus(order.id, "DELIVERY")
                                }
                              >
                                DELIVERY
                              </button>
                            </div>
                          ),
                        },
                        {
                          key: "7",
                          label: (
                            <div className="category-action">
                              <button
                                onClick={() =>
                                  handleChangeStatus(order.id, "SUCCESS")
                                }
                              >
                                SUCCESS
                              </button>
                            </div>
                          ),
                        },
                        {
                          key: "8",
                          label: (
                            <div className="category-action">
                              <button
                                onClick={() =>
                                  handleChangeStatus(order.id, "DENIED")
                                }
                              >
                                DENIED
                              </button>
                            </div>
                          ),
                        },
                      ],
                    }}
                    placement="bottom"
                  >
                    <Button className="border-none shadow-none">
                      <PiDotsThreeOutlineFill className="category_active" />
                    </Button>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center ">
        <div>
          Hiển thị <b>{size}</b> trên <b>{totalElements}</b> bản ghi
        </div>
        <Pagination
          total={totalElements}
          pageSize={size}
          current={number + 1}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}
