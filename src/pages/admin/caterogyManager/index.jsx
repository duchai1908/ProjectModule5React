// CategoryManager.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAllCategory } from "../../../services/categoryService";
import { Button, Dropdown, Input, Pagination, Select, Tag } from "antd";
import { FaFilter } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import AddCategoryModal from "../../../components/model/AddCategoryModal";
import "./category.css";
import { formAxios, jsonAxios } from "../../../api";
import { changePageCategory } from "../../../redux/slices/categorySlice";

export default function CategoryManager() {
  const { data, status, error, totalElements, number, size } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(findAllCategory({ page: number, size }));
  }, [dispatch, number]);

  // Thêm danh mục bằng cách dispatch addCategory action
  const handleAddCategory = async (newCategory) => {
    console.log(newCategory);
    dispatch(addCategory(newCategory)); // Dispatch action
    setIsModalVisible(false); // Đóng modal
  };

  const handleChangePage = (page, pageSize) => {
    console.log(page);
    dispatch(changePageCategory(page - 1));
  };

  return (
    <>
      <div>{status === "pending" ? "Loading..." : ""}</div>
      <div>
        {data ? (
          <div className="container mx-auto p-6 max-w-6xl">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-[24px] font-bold">Danh sách danh mục</h1>
              <Button type="primary" onClick={() => setIsModalVisible(true)}>
                Thêm mới
              </Button>
            </div>
            <div className="mb-4 flex justify-between items-center">
              <Dropdown placement="bottom">
                <Button className="border-none shadow-none">
                  <FaFilter
                    size={20}
                    className="cursor-pointer text-gray-500 hover:text-gray-600"
                  />
                </Button>
              </Dropdown>

              <div className="flex items-center gap-3">
                <Input.Search
                  className="w-[300px]"
                  placeholder="Tìm kiếm tài khoản theo tên"
                />
                <LuRefreshCw
                  size={24}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 h-11 text-left">STT</th>
                    <th className="px-4 h-11 text-left">Name</th>
                    <th className="px-4 h-11 text-left">Ảnh</th>
                    <th className="px-4 h-11 text-left">Mô tả</th>
                    <th className="px-4 h-11 text-left">Trạng thái</th>
                    <th className="px-4 h-11 text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr className="border-b" key={item.id}>
                      <td className="px-4 h-11">{number * size + index + 1}</td>
                      <td className="px-4 h-11">{item.name}</td>
                      <td className="px-4 h-11">
                        <img className="category-img" src={item.image} alt="" />
                      </td>
                      <td className="px-4 h-11">{item.description}</td>
                      <td className="px-4 h-11">
                        {true ? (
                          <Tag color="green">Đang hoạt động</Tag>
                        ) : (
                          <Tag color="red">Ngừng hoạt động</Tag>
                        )}
                      </td>
                      <td className="px-4 h-11">
                        <Dropdown placement="bottom" trigger={["click"]}>
                          <Button className="border-none shadow-none focus:shadow-none focus:bg-none">
                            Sửa
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
            <AddCategoryModal
              visible={isModalVisible}
              onClose={() => setIsModalVisible(false)}
              onAdd={handleAddCategory}
            />
          </div>
        ) : (
          <div>Không có danh mục nào.</div>
        )}
      </div>
    </>
  );
}
