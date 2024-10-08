import React, { useEffect, useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Image, Input, Pagination, Select, Tag } from "antd";
import { FaFilter } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import {
  addProductDetail,
  deleteProductDetail,
  findAllProductDetail,
} from "../../../services/productDetailService";
import { changePageProductDetail } from "../../../redux/slices/productDetailSlice";
import { useParams } from "react-router-dom";
import AddProductDetailModal from "./formAddProductDetail";
import UpdateProductDetailModal from "./formUpdateProductDetail";

export default function ProductDetailManager() {
  const { id } = useParams();

  const { data, status, error, totalElements, number, size } = useSelector(
    (state) => state.productDetail
  );
  const {
    data: productCurrentt,
    status: productCurrenttStatus,
    error: productCurrenttError,
  } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  //for model add
  const [isModalVisible, setIsModalVisible] = useState(false);
  //for model edit
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);

  const [currentProductUpdate, setCurrentProductUpdate] = useState(null);

  // Fetch product details when component mounts and whenever the page changes
  useEffect(() => {
    dispatch(findAllProductDetail({ id, page: number, size }));
  }, [dispatch, number, size, id]);

  // Function to handle page change
  const handleChangePage = async (page, pageSize) => {
    console.log("Page changed to:", page);
    dispatch(changePageProductDetail(page - 1)); // Adjusting for 0-based index
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
  const handleDelete = async (productDetail) => {
    await dispatch(deleteProductDetail(productDetail.id));
    console.log("Product detail deleted successfully");
  };

  // Handle edit product detail
  const handleEdit = async (currentProduct) => {
    console.log(currentProduct);
    setCurrentProductUpdate(currentProduct);
    // await dispatch(deleteProductDetail(productDetail.id));
    setIsModalEditVisible(true);
  };

  return (
    <>
      {status === "pending" && <div>Loading...</div>}
      {error && <div>Error fetching data: {error}</div>}
      <div>
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-[24px] font-bold">
              Danh sách sản phẩm chi tiết
            </h1>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Thêm mới sản phẩm
            </Button>
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
                      <th className="px-4 h-11 text-left">Name</th>
                      <th className="px-4 h-11 text-left">Ảnh</th>
                      <th className="px-4 h-11 text-center">Số lượng</th>
                      <th className="px-4 h-11 text-center">Giá</th>
                      <th className="px-4 h-11 text-left">Màu</th>
                      <th className="px-4 h-11 text-center">Dung lượng</th>
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
                          label: <span>Chỉnh sửa</span>,
                          onClick: () => handleEdit(item), // Pass the item to the edit handler
                        },
                        {
                          key: "6",
                          label: <span>Xóa</span>,
                          onClick: () => handleDelete(item), // Pass the item to the delete handler
                        },
                      ];

                      return (
                        <tr className="border-b" key={item.id}>
                          <td className="px-4 h-11">
                            {number * size + index + 1}
                          </td>
                          <td className="px-4 h-11">{item.name}</td>
                          <td className="px-4 h-11">
                            <div className="flex my-3">
                              <Image
                                width={150}
                                height={150}
                                src={item?.product?.image}
                                className="object-cover rounded-md"
                              />
                            </div>
                          </td>
                          <td className="px-4 h-11 text-center">
                            {item.stock}
                          </td>
                          <td className="px-4 h-11 text-center">
                            {item.price}
                          </td>
                          <td className="px-4 h-11 text-left">
                            {item?.color?.color}
                          </td>
                          <td className="px-4 h-11 text-left">
                            {item?.size?.size}
                          </td>
                          <td className="px-4 h-11">
                            {item?.stock > 0 ? (
                              <Tag color="green">Còn hàng</Tag>
                            ) : (
                              <Tag color="red">Hết hàng</Tag>
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
                  Hiển thị <b>{totalElements}</b> trên
                  <b>{size}</b> bản ghi
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
          <AddProductDetailModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onAdd={handleAddProductDetail}
            id={id}
          />
          <UpdateProductDetailModal
            visible={isModalEditVisible}
            onClose={() => setIsModalEditVisible(false)}
            //product id (not product detail id)
            id={id}
            currentProductUpdate={currentProductUpdate}
          />
        </div>
      </div>
    </>
  );
}
