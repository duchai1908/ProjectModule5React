import React, { useState } from "react";
import "./order.css";
import { Button, Dropdown, Input, Pagination, Tag } from "antd";
import { FaFilter } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
export default function OrderManager() {
  const options = [
    {
      key: "4",
      label: (
        <div className="category-action">
          <i class="bx bxs-edit"></i>
          <span> Chi tiết</span>
        </div>
      ),
    },
    {
      key: "5",
      label: (
        <div className="category-action">
          <i class="bx bxs-key"></i>
          <span>Thay đổi trang thái</span>
        </div>
      ),
    },
  ];
  const items = [
    {
      key: "1",
      label: <span className="cursor-pointer">Mặc Định</span>,
    },
    {
      key: "2",
      label: <span className="cursor-pointer">Lọc theo tên từ A-Z</span>,
    },
    {
      key: "3",
      label: <span className="cursor-pointer">Lọc theo tên từ Z-A</span>,
    },
  ];
  return (
    <>
      <div>
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-[24px] font-bold">Quản Lý Đặt Hàng</h1>
          </div>
          {/* search */}
          <div className="mb-4 flex justify-between items-center">
            <Dropdown
              menu={{
                items,
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
            {/* search
             */}
            <div className="flex items-center gap-3">
              <Input.Search
                className="w-[300px]"
                placeholder="Tìm kiếm danh mục theo tên"
              />
              <LuRefreshCw
                size={24}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-collapse border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border  border-gray-300 px-4 h-11 text-center">
                    STT
                  </th>
                  <th className="border border-gray-300 px-4 h-11 text-center">
                    Mã
                  </th>
                  <th className="border border-gray-300 px-4 h-11 text-center">
                    Ghi chú
                  </th>
                  <th className="border border-gray-300 px-4 h-11 text-center">
                    Người nhận
                  </th>
                  <th className="border border-gray-300 px-4 h-11 text-center">
                    Giá
                  </th>
                  <th className="border border-gray-300 px-4 h-11 text-center">
                    Ngày nhận dự kiến
                  </th>
                  <th className="border border-gray-300 px-4 h-11 text-center">
                    Trạng thái
                  </th>
                  <th className="border border-gray-300 px-4 h-11 text-center">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className=" ">
                  <td className="border border-gray-300 px-4 h-11 text-center"></td>
                  <td className="border border-gray-300 px-4 h-11 text-center"></td>
                  <td className="border border-gray-300 px-4 h-11 text-center"></td>
                  <td className="border border-gray-300 px-4 h-11 text-center"></td>
                  <td className="border border-gray-300 px-4 h-11 text-center"></td>
                  <td className="border border-gray-300 px-4 h-11 text-center"></td>
                  <td className="border border-gray-300 px-4 h-11 text-center">
                    {true ? ( // Nếu status là false thì bị chặn
                      <Tag color="red">khong hoat dong</Tag>
                    ) : (
                      <Tag color="green">Đang hoạt động</Tag> // Nếu status là true thì đang hoạt động
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 h-11 text-center">
                    <Dropdown
                      menu={{
                        items: options,
                      }}
                      placement="bottom"
                      trigger={["click"]}
                    >
                      <Button className="border-none shadow-none focus:shadow-none focus:bg-none">
                        <PiDotsThreeOutlineFill className="category_active" />
                      </Button>
                    </Dropdown>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between items-center ">
            <div>
              Hiển thị <b>1</b> trên <b>10</b> bản ghi
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3">
                <Pagination
                //   total={totalElements}
                //   pageSize={size}
                //   current={number + 1}
                //   onChange={handleChangePage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
