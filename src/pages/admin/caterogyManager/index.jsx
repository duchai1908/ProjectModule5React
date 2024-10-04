// CategoryManager.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  findAllCategory,
  updateCategory,
} from "../../../services/categoryService";
import {
  Button,
  Dropdown,
  Input,
  Pagination,
  Select,
  Tag,
  message,
} from "antd";
import { FaFilter } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import AddCategoryModal from "./modelCategory/AddCategoryModal";
import "./category.css";
import { changePageCategory } from "../../../redux/slices/categorySlice";
import UpdateCategory from "./modelCategory/UpdateCategory";
import ConfirmationModal from "../../../components/model/ConfirmationModal";

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
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [reload, setReload] = useState(false);
  const [actionType, setActionType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(findAllCategory({ page: number, size, searchTerm }));
  }, [dispatch, number, reload, searchTerm]);

  // Thêm danh mục bằng cách dispatch addCategory action
  const handleAddCategory = async (newCategory) => {
    try {
      await dispatch(addCategory(newCategory)); // Dispatch action thêm danh mục
      setIsModalVisible(false); // Đóng modal sau khi thêm
      setSelectedCategory(null); // Reset form
      setReload(!reload);
    } catch (error) {
      message.error("Có lỗi xảy ra khi thêm danh mục."); // Hiển thị thông báo lỗi nếu có
    }
  };

  // phan trang
  const handleChangePage = (page, pageSize) => {
    console.log(page);
    console.log("size", size);
    dispatch(changePageCategory(page - 1));
  };
  // delete
  const handleDeleteCategory = (category) => {
    setSelectedCategory(category);
    setActionType("delete");
    setIsConfirmationVisible(true);
  };

  //ham init Update lay du lieu len form
  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsEditModalVisible(true);
  };

  //ham update

  const handleSave = (updatedCategoryData) => {
    dispatch(updateCategory(updatedCategoryData)) // Truyền object vào
      .then(() => {
        setIsEditModalVisible(false); // Đóng modal khi cập nhật thành công
        setReload(!reload);
        dispatch(findAllCategory({ page: 0, size: 3 })); // Lấy lại danh sách danh mục
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật danh mục:", error);
      });
  };

  //search
  const handleSearch = (e) => {
    e.preventDefault(); // Ngăn chặn gửi form
    setSearchTerm(e.target.value); // Cập nhật giá trị tìm kiếm;
    dispatch(findAllCategory({ page: 0, size: 3, searchTerm: value })); // Gọi API tìm kiếm
  };

  const handleRefresh = () => {
    setSearchTerm("");
    dispatch(findAllCategory({ page: 0, size: 3, searchTerm: "" })); // Làm mới danh sách
  };

  // Thêm vào khi modal thêm danh mục đóng
  const handleCloseAddModal = () => {
    setIsModalVisible(false);
    setSelectedCategory(null);
  };

  // Thêm vào khi modal chỉnh sửa đóng
  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    setSelectedCategory(null);
  };

  const handleConfirmDelete = () => {
    if (selectedCategory) {
      dispatch(deleteCategory(selectedCategory.id));
      setReload(!reload);
    }
    setIsConfirmationVisible(false); // Đóng modal xác nhận
  };

  return (
    <>
      {/* <div>{status === "pending" ? "Loading..." : ""}</div> */}
      <div>
        {data ? (
          <div className="container mx-auto p-6 max-w-6xl">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-[24px] font-bold">Danh sách danh mục</h1>
              <Button type="primary" onClick={() => setIsModalVisible(true)}>
                Thêm mới
              </Button>
            </div>
            {/* search */}
            <div className="mb-4 flex justify-between items-center">
              <Dropdown placement="bottom">
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
                  onSearch={handleSearch} // Gọi hàm khi tìm kiếm
                  value={searchTerm} // Gán giá trị cho input
                  onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị khi nhập
                />
                <LuRefreshCw
                  size={24}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  onClick={handleRefresh} // Gọi hàm làm mới khi nhấn vào icon
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              {/* render du lieu */}
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
                        {true ? ( // Kiểm tra trạng thái
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
              onClose={handleCloseAddModal}
              onAdd={handleAddCategory}
            />
            <UpdateCategory
              visible={isEditModalVisible}
              onClose={handleCloseEditModal} // Dùng hàm reset khi đóng modal
              onSave={handleSave}
            />
          </div>
        ) : (
          <div>Không có danh mục nào.</div>
        )}
      </div>
      <div>
        <ConfirmationModal
          visible={isConfirmationVisible}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsConfirmationVisible(false)}
          title="Xác nhận"
          content={`Bạn có chắc chắn muốn ${
            actionType === "delete" ? "xóa" : "cập nhật"
          } danh mục ${selectedCategory?.name}?`}
        />
      </div>
    </>
  );
}
