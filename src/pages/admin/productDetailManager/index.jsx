import {
    Button,
    Dropdown,
    Input,
    Modal,
    Pagination,
    Radio,
    Select,
    Tag,
    Upload,
  } from "antd";
  import { useLocation, Link } from "react-router-dom";
  import { useEffect, useRef, useState } from "react";
  import { FaFilter } from "react-icons/fa";
  import { IoClose } from "react-icons/io5";
  import { LuRefreshCw } from "react-icons/lu";
  import { formAxios, jsonAxios } from "../../../api";
  import { UploadOutlined } from "@ant-design/icons";
import AddProductDetailForm from "./formAddProductDetail";
//   import AddProductForm from "./formAddProduct";
//   import UpdateProductForm from "./formUpdateProduct";
  //   import "./category.css";
  /**
   * Product Detail Manager
   * logic
   * using useEffect to auto reload list product by call api: `/admin/products?page`
   *
   * add product
   *    create and add file image
   *    check file image
   *
   * Created by: Konta
   *
   */
  const ProductDetailManager = () => {
    const location = useLocation();
    const { item } = location.state || {}; // Get item from location.state
    const items = [
      {
        key: "1",
        label: <span>Hủy bỏ bộ lọc</span>,
      },
      {
        key: "2",
        label: <span>Đang hoạt động</span>,
      },
      {
        key: "3",
        label: <span>Ngừng hoạt động</span>,
      },
    ];
  
    const options = [
      {
        key: "4",
        label: <span>Chỉnh sửa</span>,
      },
      {
        key: "5",
        label: <span>Chặn</span>,
      },
      {
        key: "6",
        label: <span>Xóa</span>,
      },
    ];
  
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const [content, setContent] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(0);
    const [searchInput, setSearchInput] = useState("");
    const [numberElements, setNumberElements] = useState(0);
    const [file, setFile] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [productName, setProductName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [sale, setSale] = useState(0);
  
    //validate value
    const [isNameFalse, setIsNameFalse] = useState(false);
    const [isCateFalse, setIsCateFalse] = useState(false);
    const [isImgFalse, setIsImgFalse] = useState(false);
  
    //update product
    const [productUpdate, setProductUpdate] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
  
    //delete product
    const [productDelete, setProductDelete] = useState(null);
  
    // Create a ref for the Input component
    const searchInputRef = useRef(null);
  
    const [isCreated, setIsCreated] = useState(false);
  
    const onSearch = (value) => {
      console.log(value); // Handle your search logic here
      setSearchInput(value);
    };
    // call api
    useEffect(() => {
      jsonAxios
        .get(`/admin/productDetail/product/${item.id}?page=${page}&size=${size}&search=${searchInput}`)
        .then((resp) => {
          const data = resp.data.data;
          setContent(data.content);
          setTotalElements(data.totalElements);
          setPage(data.number);
          setSize(data.size);
          setNumberElements(data.numberOfElements);
        })
        .catch((err) => console.log(err));
    }, [page, searchInput]);
    const handleChangePage = (page) => {
      setPage(page - 1);
    };
  
    const handleReset = () => {
      setSearchInput("");
      setPage(0);
      if (searchInputRef.current && searchInputRef.current.input) {
        searchInputRef.current.input.value = "";
      }
    };
  
    const handleOpenFormAdd = () => {
      setIsCreated(true);
    };
  
    const handleCloseFormAdd = () => {
      setIsCreated(false);
      setProductName("");
      setCategoryId("");
      setFile(null);
      setIsNameFalse(false);
      setIsCateFalse(false);
      setIsImgFalse(false);
      setSale(0);
    };
  
    // Xử lý khi upload file
    // Your Upload handler should already be clearing the image error
    const handleUpload = ({ file }) => {
      setFile(file);
      if (file) {
        setIsImgFalse(false); // Clear the error when a file is selected
      }
      console.log(file);
    };
    const handleAddProduct = (e) => {
      let hasError = false;
  
      // Validate name
      if (!productName) {
        setIsNameFalse(true);
        hasError = true;
        e.preventDefault(); // Prevent form submission
      } else {
        setIsNameFalse(false);
      }
  
      // Validate categoryId
      if (!categoryId) {
        setIsCateFalse(true);
        hasError = true;
        e.preventDefault(); // Prevent form submission
      } else {
        setIsCateFalse(false);
      }
  
      // Validate file (image)
      if (!file) {
        setIsImgFalse(true);
        hasError = true;
        e.preventDefault(); // Prevent form submission
      } else {
        setIsImgFalse(false);
      }
  
      // If any validation fails, return without submitting the form
      if (hasError) return;
  
      // If all fields are valid, proceed with form submission
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", productName);
      formData.append("status", true);
      formData.append("categoryId", categoryId);
      formData.append("sale", sale);
  
      formAxios
        .post(`/admin/products`, formData)
        .then((response) => {
          console.log("Thành công:", response.data);
        })
        .catch((error) => {
          console.error("Lỗi:", error);
        });
    };
    // Input handlers to clear errors when input changes
    const handleProductNameChange = (e) => {
      setProductName(e.target.value);
      if (e.target.value) {
        setIsNameFalse(false); // Clear the error when value is valid
      }
    };
  
    const handleCategoryIdChange = (e) => {
      setCategoryId(e.target.value);
      if (e.target.value) {
        setIsCateFalse(false); // Clear the error when value is valid
      }
    };
  
    // Input handlers to clear errors when input changes
    const handleProductSaleChange = (e) => {
      setSale(e.target.value);
      if (e.target.value < 0) {
        setSale(0);
      }
    };
  
    const handleCloseFormUpdate = () => {
      setIsUpdate(false);
      setProductUpdate(null);
    };
    const handleEdit = (item) => {
      setIsUpdate(true);
      setProductUpdate(item);
      // setFile(item.img);
      setProductName(item.name);
      setCategoryId(item.category.id);
      setSale(item.sale);
    };
  
    // Assuming productUpdate contains the details of the product being edited, including the image URL.
    const handleUpdateProduct = (e) => {
      // Prepare form data
      const formData = new FormData();
  
      // Append new image only if one is uploaded
      if (file) {
        formData.append("image", file);
      }
  
      // Append other product details
      formData.append("name", productName);
      formData.append("status", true);
      formData.append("categoryId", categoryId);
      formData.append("sale", sale);
  
      formAxios
        .put(`/admin/products/${productUpdate.id}`, formData)
        .then((response) => {
          console.log("Thành công:", response.data);
        })
        .catch((error) => {
          console.error("Lỗi:", error);
        });
    };
  
    const handleBlock = (item) => {
      // Logic to handle block action
      console.log("Block item:", item);
    };
  
    //xem reload lai trang
    const handleDelete = (item) => {
      // Logic to handle delete action
      setIsModalOpen(true);
      setProductDelete(item);
    };
    const handleOk = async () => {
      setIsModalOpen(false);
      formAxios
        .delete(`/admin/products/${productDelete.id}`)
        .then((response) => {
          console.log("Thành công:", response.data);
        })
        .catch((error) => {
          console.error("Lỗi:", error);
        });
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return (
      <>
        <Modal
          title={<h3 className="text-[20px]">Xác nhận xóa</h3>}
          open={isModalOpen}
          onCancel={handleCancel}
          maskClosable={false}
          footer={
            <>
              <Button onClick={handleCancel}>Hủy</Button>
              <Button onClick={handleOk} danger type="primary">
                Xóa
              </Button>
            </>
          }
        >
          <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
        </Modal>
  
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="flex items-center justify-between mb-6  ">
            <h1 className="text-[24px] font-bold">Danh sách sản phẩm</h1>
            <Button type="primary" onClick={handleOpenFormAdd}>
              Thêm mới
            </Button>
          </div>
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
  
            <div className="flex items-center gap-3">
              <Input.Search
                className="w-[300px]"
                placeholder="Tìm kiếm tài khoản theo tên"
                onSearch={onSearch}
              />
              <LuRefreshCw
                size={24}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={handleReset}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 h-11 text-left">STT</th>
                  <th className="px-4 h-11 text-left">Tên Sản Phẩm</th>
                  <th className="px-4 h-11 text-left">Ảnh Sản Phẩm</th>
                  <th className="px-4 h-11 text-left">Miêu tả</th>
                  <th className="px-4 h-11 text-left">Kho</th>
                  <th className="px-4 h-11 text-left">Giá</th>
                  <th className="px-4 h-11 text-left">Dung lượng</th>
                  <th className="px-4 h-11 text-left">Ngày Tạo</th>
                  <th className="px-4 h-11 text-left">Ngày Cập Nhật</th>
                  <th className="px-4 h-11 text-left">Trạng Thái</th>
                  <th className="px-4 h-11 text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr className="border-b"> */}
                {content.map((itemss, index) => {
                  // Define options dynamically for each itemss
                  const options = [
                    {
                      key: "4",
                      label: <span>Chỉnh sửa</span>,
                      onClick: () => handleEdit(itemss), // Pass the itemss to the edit handler
                    },
                    {
                      key: "5",
                      label: <span>Chặn</span>,
                      onClick: () => handleBlock(itemss), // Pass the itemss to the block handler
                    },
                    {
                      key: "6",
                      label: <span>Xóa</span>,
                      onClick: () => handleDelete(itemss), // Pass the itemss to the delete handler
                    },
                  ];
  
                  return (
                    <tr className="border-b" key={itemss.id}>
                      <td className="px-4 h-11">{size * page + index + 1}</td>
  
                      <td className="px-4 h-11">
                        <Link
                          to={`/admin/product-detail-manager/${itemss.id}`}
                          state={{ itemss }} // Pass itemss as state
                        >
                          {itemss.name}
                        </Link>
                      </td>
  
                      {/* <td className="px-4 h-11">
                        <img className="max-h-[170px]" src={itemss.image} alt="" />
                      </td> */}
                      <td className="px-4 h-11">{itemss.description}</td>
                      <td className="px-4 h-11">{itemss.stock}</td>
                      <td className="px-4 h-11">{itemss.price}</td>
                      <td className="px-4 h-11">{itemss.color.color}</td>
                      <td className="px-4 h-11">{itemss.size.size}</td>
                      <td className="px-4 h-11">{itemss.created_at}</td>
                      <td className="px-4 h-11">{itemss.updated_at}</td>
                      <td className="px-4 h-11">
                        {itemss.product.status ? (
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
                          <Button className="border-none shadow-none focus:shadow-none focus:bg-none">
                            Sửa
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
              Hiển thị <b>{numberElements}</b> trên <b>{totalElements}</b> bản ghi
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
                  current={page + 1}
                  total={totalElements} // Total number of items
                  pageSize={size} // Items per page
                  onChange={handleChangePage}
                />
              </div>
            </div>
          </div>
          {/* form add */}
          {isCreated && (
            // <></>
            <AddProductDetailForm
              handleAddProduct={handleAddProduct}
              productName={productName}
              categoryId={categoryId}
              sale={sale}
              file={file}
              handleProductNameChange={handleProductNameChange}
              handleCategoryIdChange={handleCategoryIdChange}
              handleUpload={handleUpload}
              handleCloseFormAdd={handleCloseFormAdd}
              handleProductSaleChange={handleProductSaleChange}
              isNameFalse={isNameFalse}
              isCateFalse={isCateFalse}
              isImgFalse={isImgFalse}
            />
          )}
          {/* form edit */}
          {isUpdate ? (
            <>
              {/* <UpdateProductForm
                handleUpdateProduct={handleUpdateProduct}
                productUpdate={productUpdate}
                handleCloseFormUpdate={handleCloseFormUpdate}
                handleProductNameChange={handleProductNameChange}
                handleCategoryIdChange={handleCategoryIdChange}
                handleProductSaleChange={handleProductSaleChange}
                // handleCloseFormUpdate={handleCloseFormUpdate}
                handleUpload={handleUpload}
                productName={productName}
                categoryId={categoryId}
                sale={sale}
                file={file}
                isNameFalse={isNameFalse}
                isCateFalse={isCateFalse}
                isImgFalse={isImgFalse}
              /> */}
            </>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  };
  
  export default ProductDetailManager;
  