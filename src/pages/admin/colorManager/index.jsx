import React, { useEffect, useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Image, Input, Pagination, Select, Tag } from "antd";
import { changePageColor } from "../../../redux/slices/colorSlice";
import { deleteColor, getAllColors } from "../../../services/colorService";
import AddColorModal from "./formAddColor";
import UpdateColorModal from "./formUpdateColor";

export default function ColorManager() {
  const { data, status, error, totalElements, number, size, numberOfElements } =
    useSelector((state) => state.colorStore);

  const dispatch = useDispatch();
  //for model add
  const [isModalVisible, setIsModalVisible] = useState(false);
  //for model edit
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [sortOptionsValue, setSortOptionsValue] = useState("none");

  // Fetch product details when component mounts and whenever the page changes
  useEffect(() => {
    dispatch(
      getAllColors({
        page: number,
        size,
        search: searchValue,
        sortOption: sortOptionsValue,
      })
    );
  }, [dispatch, number, size]);

  // Function to handle page change
  const handleChangePage = async (page, pageSize) => {
    console.log("Page changed to:", page);
    dispatch(changePageColor(page - 1)); // Adjusting for 0-based index
  };

  // Function to handle page size change
  const handlePageSizeChange = (value) => {
    console.log("Page size changed to:", value);
    // You may want to dispatch an action to set the page size in your Redux state
  };

  // Handle add product detail inside ProductDetailManager
  const handleAddProductDetail = async (newProductDetail) => {
    // dispatch(addProductDetail(newProductDetail));
    setIsModalVisible(false); // Close modal after success
  };

  // Handle delete product detail
  const handleDelete = async (currentColorDD) => {
    await dispatch(deleteColor(currentColorDD.id));
    // console.log("Product detail deleted successfully");
  };

  const [currentColor, setCurrentColor] = useState(null);
  // Handle edit product detail
  const handleEdit = async (currentColorLL) => {
    setCurrentColor(currentColorLL);
    // await dispatch(deleteProductDetail(productDetail.id));
    setIsModalEditVisible(true);
  };
  return (
    <>
      <div>
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-[24px] font-bold">Danh sách màu</h1>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Thêm mới màu
            </Button>
          </div>
          {/* {status === "pending" ? (
            <>Đang tải dữ liệu...</>
          ) : data && data.length > 0 ? (
            <>Co data</>
          ) : (
            <>ko cos</>
          )} */}

          {data && data.length > 0 ? (
            <>
              <div className="overflow-x-auto max-h-[65vh] overflow-scroll">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 h-11 text-center">STT</th>
                      <th className="px-4 h-11 text-left">Màu</th>
                      <th className="px-4 h-11 text-left">Ngày tạo</th>
                      <th className="px-4 h-11 text-left">Ngày cập nhật</th>
                      <th className="px-4 h-11 text-left">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
                      // Define options dynamically for each item
                      const options = [
                        {
                          key: "4",
                          label: <span>Chỉnh sửa</span>,
                          onClick: () => handleEdit(item), // Pass the item to the edit handler
                        },
                        {
                          key: "5",
                          label: <span>Xóa</span>,
                          onClick: () => handleDelete(item), // Pass the item to the delete handler
                        },
                      ];

                      return (
                        <tr className="border-b" key={item.id}>
                          <td className="px-4 h-11">
                            {number * size + index + 1}
                          </td>
                          <td className="px-4 h-11">{item.color}</td>

                          <td className="px-4 h-11 text-left">
                            {item.created_at}
                          </td>
                          <td className="px-4 h-11 text-left">
                            {item.updated_at}
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
            <div>Không có màu nào</div>
          )}
          <AddColorModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onAdd={handleAddProductDetail}
          />
          <UpdateColorModal
            visible={isModalEditVisible}
            onClose={() => setIsModalEditVisible(false)}
            // product id (not product detail id)
            // id={id}
            currentColor={currentColor}
          />
        </div>
      </div>
    </>
  );
}
