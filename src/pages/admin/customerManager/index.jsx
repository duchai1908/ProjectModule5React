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
import {
  customerStatusChange,
  findAllCustomers,
} from "../../../services/customerService";
import { changePageCustomer } from "../../../redux/slices/customerSlice";
import { PiLockKeyOpen } from "react-icons/pi";
export default function CustomerManager() {
  const items = [
    {
      key: "1",
      label: (
        <span
          onClick={() => handleSort("id", "asc")}
          className="cursor-pointer"
        >
          Mặc Định
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span
          onClick={() => handleSort("username", "asc")}
          className="cursor-pointer"
        >
          Lọc theo tên từ A-Z
        </span>
      ),
    },
    {
      key: "3",
      label: (
        <span
          onClick={() => handleSort("username", "desc")}
          className="cursor-pointer"
        >
          Lọc theo tên từ Z-A
        </span>
      ),
    },
  ];

  const { data, status, error, totalElements, number, size } = useSelector(
    (state) => state.customer
  );

  const [reload, setReload] = useState(false);
  const [keySearch, setKeySearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortField, setSortField] = useState("id");

  const [sortDirection, setSortDirection] = useState("asc");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      findAllCustomers({
        page: number,
        size,
        keySearch,
        sortField,
        sortDirection,
      })
    );
  }, [dispatch, number, reload, keySearch, sortField, sortDirection]);

  // Cập nhật dữ liệu đã sắp xếp khi dữ liệu thay đổi

  const handleChangePage = (page, pageSize) => {
    dispatch(changePageCustomer(page - 1));
  };

  // Hàm xử lý sắp xếp
  const handleSort = (sortField, sortDirection) => {
    setSortField(sortField);
    setSortDirection(sortDirection);
    dispatch(
      findAllCustomers({
        page: number,
        size,
        keySearch,
        sortField,
        sortDirection,
      })
    );
  };
  // Cập nhật dữ liệu đã sắp xếp
  useEffect(() => {
    setSortedData(data);
  }, [data]);

  console.log("data: " + data);
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

  // Change customer status
  const handleStatusChange = (customer) => {
    dispatch(customerStatusChange({ userId: customer.id }))
      .then(() => {
        message.success(
          `Khách hàng ${customer.username} thay đổi trạng thái thành công.`
        );
        setReload((prev) => !prev); // Trigger reload to refresh data
      })
      .catch((error) => {
        message.error(`Có lỗi xảy ra khi thay đổi trạng thái: ${error}`);
      });
  };
  return (
    <>
      {/* {console.log("Dispatching with values:", data)} */}
      <div>
        {data ? (
          <div className="container mx-auto p-6 max-w-6xl">
            <div className="mb-4 flex justify-between items-center">
              {/* sort */}
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
                  {data.map((customer, index) => (
                    <tr className="border-b" key={customer.id}>
                      <td className="px-4 h-16 text-center border border-gray-300">
                        {number * size + index + 1}
                      </td>
                      <td className="px-4 h-16 text-center border border-gray-300">
                        <div className="flex items-center">
                          <div className="w-1/3 text-center border-r border-gray-300">
                            <img
                              className="w-10 h-10 rounded-full mx-auto"
                              src={customer.image}
                              alt="Avatar"
                            />
                          </div>
                          <div className="w-2/3 pl-2">
                            <div className="mb-2 border-b border-gray-300">
                              {customer.phone}
                            </div>
                            <div>{customer.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 h-16 text-center border border-gray-300">
                        {customer.address}
                      </td>
                      <td className="px-4 h-16 text-center border border-gray-300">
                        {customer.roles.map((role) => {
                          return (
                            <span className="whitespace-nowrap">
                              {role.roleName}
                            </span>
                          );
                        })}
                      </td>
                      <td className="px-4 h-16 text-center border border-gray-300">
                        {customer.createdAt}
                      </td>
                      <td className="px-4 h-16 text-center border border-gray-300">
                        {customer.status === false ? (
                          <Tag color="red">Ngừng hoạt động</Tag>
                        ) : (
                          <Tag color="green">Đang hoạt động</Tag>
                        )}
                      </td>
                      <td className="px-4 h-16 text-center border border-gray-300">
                        <Button
                          className="border-none shadow-none focus:shadow-none focus:bg-none"
                          onClick={() => handleStatusChange(customer)}
                        >
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
                Hiển thị <b>{size}</b> trên <b>{totalElements}</b> bản ghi
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
          </div>
        ) : (
          <div>Không có khach hang nao .</div>
        )}
      </div>
    </>
  );
}
