// CategoryManager.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  findAllCategory,
  updateCategory,
} from "../../../services/categoryService";
import { Button, Dropdown, Input, Pagination, Select, Tag } from "antd";
import { FaFilter } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import AddCategoryModal from "./modelCategory/AddCategoryModal";
import "./category.css";
import { changePageCategory } from "../../../redux/slices/categorySlice";
import UpdateCategory from "./modelCategory/UpdateCategory";

export default function CategoryManager() {
  const options = [
    {
      key: "4",
      label: <span>Chỉnh sửa</span>,
      onClick: () => handleEditCategory(selectedCategory),
    },
    {
      key: "5",
      label: <span>Chặn</span>,
      onClick: () => handleBlockCategory(selectedCategory),
    },
    {
      key: "6",
      label: <span>Xóa</span>,
      onClick: () => handleDeleteCategory(selectedCategory),
    },
  ];
  const { data, status, error, totalElements, number, size } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch(findAllCategory({ page: number, size }));
  }, [dispatch, number, reload]);

  // Thêm danh mục bằng cách dispatch addCategory action
  const handleAddCategory = async (newCategory) => {
    console.log(newCategory);
    dispatch(addCategory(newCategory)); // Dispatch action
    setIsModalVisible(false); // Đóng modal
  };
  // phan trang
  const handleChangePage = (page, pageSize) => {
    console.log(page);
    dispatch(changePageCategory(page - 1));
  };
  // delete
  const handleDeleteCategory = (category) => {
    console.log(category);
    if (window.confirm(`Bạn có chắc muốn xóa danh mục ${category.name}?`)) {
      dispatch(deleteCategory(category.id));
      setReload(!reload);
    }
  };

  //ham init Update lay du lieu len form
  const handleEditCategory = (category) => {
    setSelectedCategory(category); // Đặt danh mục được chọn
    setIsEditModalVisible(true); // Hiển thị modal chỉnh sửa
  };

  //ham update

  const handleSave = (updatedCategoryData) => {
    dispatch(updateCategory(updatedCategoryData)) // Truyền object vào
      .then(() => {
        setIsEditModalVisible(false); // Đóng modal khi cập nhật thành công
        dispatch(findAllCategory({ page: 0, size: 3 })); // Lấy lại danh sách danh mục
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật danh mục:", error);
      });
  };

  // update phan active
  const handleBlockCategory = (category) => {
    if (window.confirm(`Bạn có chắc muốn chặn danh mục ${category.name}?`)) {
      const updatedCategory = { ...category, status: true }; // Giả sử rằng status = false là không hoạt động
      dispatch(updateCategory(updatedCategory)) // Gọi action updateCategory với danh mục đã cập nhật
        .then(() => {
          setReload(!reload); // Reload danh sách danh mục
        })
        .catch((error) => {
          console.error("Lỗi khi chặn danh mục:", error);
        });
    }
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
                        {item.status ? ( // Kiểm tra trạng thái
                          <Tag color="green">Đang hoạt động</Tag>
                        ) : (
                          <Tag color="red">Ngừng hoạt động</Tag>
                        )}
                      </td>
                      <td className="px-4 h-11">
                        <Dropdown
                          menu={{
                            items: options,
                          }}
                          placement="bottom"
                          trigger={["click"]}
                        >
                          <Button
                            className="border-none shadow-none focus:shadow-none focus:bg-none"
                            onClick={() => setSelectedCategory(item)}
                          >
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
            <UpdateCategory
              visible={isEditModalVisible}
              onClose={() => setIsEditModalVisible(false)}
              category={selectedCategory} // Truyền danh mục được chọn vào modal
              onSave={handleSave}
            />
          </div>
        ) : (
          <div>Không có danh mục nào.</div>
        )}
      </div>
    </>
  );
}
