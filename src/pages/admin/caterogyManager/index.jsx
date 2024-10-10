// CategoryManager.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryStatusChange,
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
import { PiDotsThreeOutlineFill } from "react-icons/pi";
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
      label: (
        <div className="category-action">
          <i class="bx bxs-edit"></i>
          <span> Chỉnh sửa</span>
        </div>
      ),
      onClick: () => handleEditCategory(catUpdate),
    },
    {
      key: "5",
      label: (
        <div className="category-action">
          <i class="bx bxs-key"></i>
          <span>Thay đổi trang thái</span>
        </div>
      ),

      onClick: () => handleBlockCategory(catUpdate),
    },
    {
      key: "6",
      label: (
        <div className="category-action">
          <i class="bx bx-trash"></i>
          <span>Xoá</span>
        </div>
      ),
      onClick: () => handleDeleteCategory(catUpdate),
    },
  ];
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
          onClick={() => handleSort("name", "asc")}
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
          onClick={() => handleSort("name", "desc")}
          className="cursor-pointer"
        >
          Lọc theo tên từ Z-A
        </span>
      ),
    },
  ];

  const { data, status, error, totalElements, number, size } = useSelector(
    (state) => state.category
  );

  console.log("loi", error);
  console.log("status", status);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [catUpdate, setCatUpdate] = useState(null);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [reload, setReload] = useState(false);
  const [actionType, setActionType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    dispatch(
      findAllCategory({
        page: number,
        size,
        searchTerm,
        sortField,
        sortDirection,
      })
    );
  }, [dispatch, number, reload, searchTerm, sortField, sortDirection]);

  // Thêm danh mục bằng cách dispatch addCategory action
  const handleAddCategory = async (newCategory) => {
    try {
      await dispatch(addCategory(newCategory));
      setIsModalVisible(false);
      dispatch(findAllCategory({ page: number, size, searchTerm }));
      message.success("Thêm danh mục thành công!");
    } catch (error) {
      message.error("Có lỗi xảy ra khi thêm danh mục.");
    }
  };

  // phan trang
  const handleChangePage = (page, pageSize) => {
    dispatch(changePageCategory(page - 1));
  };
  // delete
  const handleDeleteCategory = (category) => {
    setCatUpdate(category);
    setActionType("delete");
    setIsConfirmationVisible(true);
  };

  //ham init Update lay du lieu len form
  const handleEditCategory = (category) => {
    setCatUpdate(category);
    setIsEditModalVisible(true);
    // console.log(category);
  };

  //ham update

  const handleSave = async (updatedCategoryData) => {
    try {
      // Gọi hàm dispatch để cập nhật danh mục
      const resultAction = await dispatch(updateCategory(updatedCategoryData));

      if (updateCategory.fulfilled.match(resultAction)) {
        setIsEditModalVisible(false);
        setReload(!reload);
        dispatch(findAllCategory({ page: 0, size: 3 }));
      } else if (updateCategory.rejected.match(resultAction)) {
        const error = resultAction.payload;
        console.error("Lỗi khi cập nhật danh mục:", error);
        setError(error);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi không xác định:", error);
    }
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
    setCatUpdate(null);
  };

  const handleConfirmDelete = () => {
    if (catUpdate) {
      dispatch(deleteCategory(catUpdate.id));
      setReload(!reload);
    }
    setIsConfirmationVisible(false); // Đóng modal xác nhận
  };

  // change status category
  const handleBlockCategory = (category) => {
    // Đổi trạng thái status
    const formData = { status: category.status === true ? false : true };
    // Gọi action categoryStatusChange
    dispatch(categoryStatusChange({ categoryId: category.id, formData }))
      .then(() => {
        message.success(
          `Danh mục ${category.name} thay đổi trạng thái thành công.`
        );
        setReload(!reload);
      })
      .catch((error) => {
        message.error(`Có lỗi xảy ra khi chặn danh mục: ${error}`);
      });
  };

  // Hàm xử lý sắp xếp
  const handleSort = (sortField, sortDirection) => {
    setSortField(sortField);
    setSortDirection(sortDirection);
    dispatch(
      findAllCategory({
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

  return (
    <>
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
              <table className="w-full table-auto border border-collapse border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border  border-gray-300 px-4 h-11 text-center">
                      STT
                    </th>
                    <th className="border border-gray-300 px-4 h-11 text-center">
                      Name
                    </th>
                    <th className="border border-gray-300 px-4 h-11 text-center">
                      Ảnh
                    </th>
                    <th className="border border-gray-300 px-4 h-11 text-center">
                      Mô tả
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
                  {data?.map((item, index) => (
                    <tr className=" " key={item.id}>
                      <td className="border border-gray-300 px-4 h-11 text-center">
                        {number * size + index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 h-11 text-center">
                        {item.name}
                      </td>
                      <td className="border border-gray-300 px-4 h-11 cat_colum text-center">
                        <img className="category-img" src={item.image} alt="" />
                      </td>
                      <td className="border border-gray-300 px-4 h-11 text-center">
                        {item.description}
                      </td>
                      <td className="border border-gray-300 px-4 h-11 text-center">
                        {item.status === false ? ( // Nếu status là false thì bị chặn
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
                          <Button
                            className="border-none shadow-none focus:shadow-none focus:bg-none"
                            onClick={() => setCatUpdate(item)}
                          >
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
            <AddCategoryModal
              visible={isModalVisible}
              onClose={handleCloseAddModal}
              onAdd={handleAddCategory}
              error={error}
            />
            <UpdateCategory
              visible={isEditModalVisible}
              onClose={handleCloseEditModal}
              onSave={handleSave}
              catUpdate={catUpdate}
              error={error}
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
