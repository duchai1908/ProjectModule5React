import {
    Button,
    Dropdown,
    Input,
    Modal,
    Pagination,
    Radio,
    Select,
    Tag,
  } from "antd";
  import { useEffect, useRef, useState } from "react";
  import { FaFilter } from "react-icons/fa";
  import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
  import { IoClose } from "react-icons/io5";
  import { LuRefreshCw } from "react-icons/lu";
  import { jsonAxios } from "../../../api";
  
  const ManagerProduct = () => {
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
  
    const handleOk = async () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    
  
    const [content, setContent] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(0);
    const [searchInput,setSearchInput] = useState("");
    const [numberElements,setNumberElements] = useState(0);
  
     // Create a ref for the Input component
     const searchInputRef = useRef(null);
  
    const [isCreated, setIsCreated] = useState(false);
  
    const onSearch = (value) => {
      console.log(value); // Handle your search logic here
      setSearchInput(value);
    };
  
    useEffect(() => {
      jsonAxios
        .get(`/userss?page=${page}&size=${size}&search=${searchInput}`)
        .then((resp) => {
          console.log(resp);
          const data = resp.data;
          setContent(data.content);
          setTotalElements(data.totalElements);
          setPage(data.number);
          setSize(data.size);
          setNumberElements(data.numberOfElements)
        })
        .catch((err) => console.log(err));
    }, [page,searchInput]);
    const handleChangePage = (page) => {
      setPage(page - 1);
    };
  
    const handleReset = () =>{
      setSearchInput("");
      setPage(0);
      // Clear the input value using the ref
      if (searchInputRef.current && searchInputRef.current.input) {
        searchInputRef.current.input.value = ''; // Clear the input value
      }
    }
  
    const handleOpenFormAdd =() =>{
      setIsCreated(true);
    }
  
    const handleCloseFormAdd = () => {
      setIsCreated(false);
    }
  
    return (
      <>
        <Modal
          title={<h3 className="text-[20px]">Xác nhận xóa</h3>}
          open={false}
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
          <p>Bạn có chắc chắn muốn xóa khách hàng này không?</p>
        </Modal>
  
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="flex items-center justify-between mb-6  ">
            <h1 className="text-[24px] font-bold">Danh sách khách hàng</h1>
            <Button type="primary" onClick={handleOpenFormAdd}>Thêm mới khách hàng</Button>
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
                  <th className="px-4 h-11 text-left">Tên</th>
                  <th className="px-4 h-11 text-left">Giới tính</th>
                  <th className="px-4 h-11 text-left cursor-pointer">
                    Ngày sinh
                  </th>
                  <th className="px-4 h-11 text-left">Email</th>
                  <th className="px-4 h-11 text-left">Địa chỉ</th>
                  <th className="px-4 h-11 text-left">Trạng thái</th>
                  <th className="px-4 h-11 text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr className="border-b"> */}
                {content.map((item, index) => (
                  <tr className="border-b" key={item.id}>
                    <td className="px-4 h-11">{index + 1}</td>
                    <td className="px-4 h-11">{item.name}</td>
                    <td className="px-4 h-11">{item.gender ? `nam` : `nu`}</td>
                    <td className="px-4 h-11">{item.dateOfBirth}</td>
                    <td className="px-4 h-11">{item.email}</td>
                    <td className="px-4 h-11">{item.address}</td>
                    <td className="px-4 h-11">
                      {true ? (
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
                ))}
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
          {isCreated && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <form className="bg-white px-6 py-5 rounded-lg w-full max-w-md">
                <header className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold mb-4">Thêm mới khách hàng</h2>
                  <IoClose
                    size={24}
                    className="cursor-pointer hover:opacity-70"
                    onClick={handleCloseFormAdd}
                  />
                </header>
                <div className="mb-4">
                  <label className="block font-medium mb-2">Tên</label>
                  <Input />
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-2">Giới tính</label>
                  <Radio.Group>
                    <Radio>Nam</Radio>
                    <Radio>Nữ</Radio>
                    <Radio>Khác</Radio>
                  </Radio.Group>
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-2">Ngày sinh</label>
                  <Input type="date" />
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-2">Email</label>
                  <Input />
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-2">Địa chỉ</label>
                  <Input.TextArea />
                </div>
  
                <div className="flex justify-end space-x-2">
                  <Button htmlType="button" onClick={handleCloseFormAdd}>Hủy</Button>
                  <Button type="primary" htmlType="submit">
                    Thêm
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </>
    );
  };
  
  export default ManagerProduct;
  