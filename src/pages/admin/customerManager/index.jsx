import React, { useEffect, useState } from "react";
import "./customer.css";
import {
  Button,
  Dropdown,
  Input,
  Pagination,
  Select,
  Tag,
  message,
} from "antd";
// import { PiLockKey } from "react-icons/pi";
import { FaFilter } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { findAllCustomers } from "../../../services/customerService";
import { changePageCustomer } from "../../../redux/slices/customerSlice";
import { PiLockKeyOpen } from "react-icons/pi";
export default function CustomerManager() {
  const { data, status, error, totalElements, number, size } = useSelector(
    (state) => state.customer
  );
  const [reload, setReload] = useState(false);
  const [keySearch, setKeySearch] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findAllCustomers({ page: number, size, keySearch }));
  }, [dispatch, number, reload, keySearch]);

  // phan trang
  const handleChangePage = (page, pageSize) => {
    dispatch(changePageCustomer(page - 1));
  };

  //search
  const handleSearch = (e) => {
    e.preventDefault(); // Ngăn chặn gửi form
    setKeySearch(e.target.value); // Cập nhật giá trị tìm kiếm;
    dispatch(findAllCustomers({ page: 0, size: 3, keySearch: value })); // Gọi API tìm kiếm
  };
  // Làm mới danh sách khi search
  const handleRefresh = () => {
    setSearchTerm("");
    dispatch(findAllCategory({ page: 0, size: 3, keySearch: "" })); // Làm mới danh sách
  };

  return (
    <>
      <div>
        {data ? (
          <div className="container mx-auto p-6 max-w-6xl">
            <div className="mb-4 flex justify-between items-center">
              <Dropdown placement="bottom">
                <Button className="border-none shadow-none">
                  <FaFilter
                    size={20}
                    className="cursor-pointer text-gray-500 hover:text-gray-600"
                  />
                </Button>
              </Dropdown>
              {/* search */}

              <div className="flex items-center gap-3">
                <Input.Search
                  className="w-[300px]"
                  placeholder="Tìm kiếm danh mục theo tên"
                  onSearch={handleSearch} // Gọi hàm khi tìm kiếm
                  value={keySearch} // Gán giá trị cho input
                  onChange={(e) => setKeySearch(e.target.value)} // Cập nhật giá trị khi nhập
                />
                <LuRefreshCw
                  size={24}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  onClick={handleRefresh} // Gọi hàm làm mới khi nhấn vào icon
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 h-11 text-center border border-gray-300">
                      STT
                    </th>
                    <th className="px-4 h-11 text-center border border-gray-300">
                      <div className="flex items-center">
                        <div className="w-1/3 text-center border-r border-gray-300">
                          Avata
                        </div>
                        <div className="w-2/3 pl-2">
                          <div className="mb-2 border-b border-gray-300">
                            Phone
                          </div>
                          <div>UserName</div>
                        </div>
                      </div>
                    </th>
                    <th className="px-4 h-11 text-center border border-gray-300">
                      Địa chỉ
                    </th>
                    <th className="px-4 h-11 text-center border border-gray-300">
                      Role
                    </th>
                    <th className="px-4 h-11 text-center border border-gray-300">
                      Ngày tạo
                    </th>
                    <th className="px-4 h-11 text-center border border-gray-300">
                      Trạng thái
                    </th>
                    <th className="px-4 h-11 text-center border border-gray-300">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr className="border-b" key={item.id}>
                      <td className="px-4 h-16 text-center border border-gray-300">
                        {number * size + index + 1}
                      </td>
                      <td className="px-4 h-16 text-center border border-gray-300">
                        <div className="flex items-center">
                          <div className="w-1/3 text-center border-r border-gray-300">
                            <img
                              className="w-10 h-10 rounded-full mx-auto"
                              src={item.image}
                              alt="Avatar"
                            />
                          </div>
                          <div className="w-2/3 pl-2">
                            <div className="mb-2 border-b border-gray-300">
                              {item.phone}
                            </div>
                            <div>{item.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 h-16 text-center border border-gray-300">
                        {item.address}
                      </td>
                      <td className="px-4 h-16 text-center border border-gray-300">
                        {item.roles.map((role) => {
                          return (
                            <span className="whitespace-nowrap">
                              {role.roleName}
                            </span>
                          );
                        })}
                      </td>
                      <td className="px-4 h-16 text-center border border-gray-300">
                        {item.createdAt}
                      </td>
                      <td className="px-4 h-16 text-center border border-gray-300">
                        {true ? (
                          <Tag color="green">Đang hoạt động</Tag>
                        ) : (
                          <Tag color="red">Ngừng hoạt động</Tag>
                        )}
                      </td>
                      <td className="px-4 h-16 text-center border border-gray-300">
                        <Button className="border-none shadow-none focus:shadow-none focus:bg-none">
                          <PiLockKeyOpen className="text-[20px] font-bold" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-between items-center ">
              <div>
                Hiển thị <b>1</b> trên <b>10</b> bản ghi
              </div>
              <div className="flex items-center gap-5">
                <Select
                  defaultValue="Hiển thị 10 bản ghi / trang"
                  style={{
                    width: 220,
                  }}
                  options={[
                    {
                      value: "10",
                      label: "Hiển thị 10 bản ghi / trang",
                    },
                    {
                      value: "20",
                      label: "Hiển thị 20 bản ghi / trang",
                    },
                    {
                      value: "50",
                      label: "Hiển thị 50 bản ghi / trang",
                    },
                    {
                      value: "100",
                      label: "Hiển thị 100 bản ghi / trang",
                    },
                  ]}
                />
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
          </div>
        ) : (
          <div>Không có khach hang nao .</div>
        )}
      </div>
    </>
  );
}
