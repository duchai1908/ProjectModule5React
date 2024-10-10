import { Button, DatePicker, Form, Input, InputNumber, Modal, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { addCoupon, changePageCoupon, deleteCoupon, listCoupon } from "../../../services/coupon";

export default function CounponManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState("");
  const [listDataCoupon, setlistDataCoupon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEleCoupon, setTotalEleCoupon] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  let number = 0;
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [form] = Form.useForm();
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Chỉ cho phép nhập số
    if (/^\d*\.?\d*$/.test(value)) {
      setIsError("");
    } else {
      setIsError("Vui lòng nhập số!");
    }
  };
  useEffect(() => {
    loadingData();
  }, []);
  const loadingData = async () => {
    const listData = await listCoupon();
    setPageSize(listData.data.data.pageable.pageSize);
    setPageNumber(listData.data.data.pageable.pageNumber);
    setTotalEleCoupon(listData.data.data.totalElements);
    setlistDataCoupon(listData.data.data.content);
  };

  const handlePageChange = async (page)=>{
      const changePage = await changePageCoupon(page -1, pageSize);
      setCurrentPage (page);
      setlistDataCoupon(changePage.data.data.content);
  }
  const onFinish = async (values) => {
    if (isError) {
      return;
    } else {
      const startAtMoment = values.start_at; // Lưu giá trị moment
      const endAtMoment = values.end_at; // Lưu giá trị moment

      // Kiểm tra và chuyển đổi
      const startDate =
        startAtMoment && startAtMoment.isValid()
          ? startAtMoment.format("DD-MM-YYYY")
          : null; // Sử dụng format để chuyển đổi
      const endDate =
        endAtMoment && endAtMoment.isValid()
          ? endAtMoment.format("DD-MM-YYYY")
          : null; // Sử dụng format để chuyển đổi
      const percent = parseFloat(values.percent);

      const transformedValues = {
        ...values,
        percent,
        start_at: startDate,
        end_at: endDate,
      };
      const data = await addCoupon(transformedValues);
      loadingData();
      setIsModalOpen(false);
    }
  };
  const handleDelete = async (id) => {
    const deleteCouponData = await deleteCoupon(id);
    loadingData();
  };
  return (
    <>
      <div>
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-[24px] font-bold">Danh sách mã giảm giá</h1>
            <Button type="primary" onClick={showModal}>
              Thêm mã giảm giá
            </Button>
          </div>

          {listDataCoupon && listDataCoupon.length > 0 ? (
            <>
              <div className="overflow-x-auto max-h-[65vh] overflow-scroll">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 h-11 text-center">STT</th>
                      <th className="px-4 h-11 text-left">Mã Giảm Giá</th>
                      <th className="px-4 h-11 text-left">Số lượng</th>
                      <th className="px-4 h-11 text-left">Phần trăm giảm</th>
                      <th className="px-4 h-11 text-left">Ngày tạo</th>
                      <th className="px-4 h-11 text-left">Ngày kết thúc</th>
                      <th className="px-4 h-11 text-left">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listDataCoupon.map((item, index) => {
                      return (
                        <tr className="border-b" key={item.id}>
                          <td className="px-4 h-11">
                            {pageSize * pageNumber + index + 1}
                          </td>
                          <td className="px-4 h-11">{item.sku}</td>
                          <td className="px-4 h-11 text-left">
                            {item.quantity}
                          </td>
                          <td className="px-4 h-11 text-left">
                            {item.percent}
                          </td>
                          <td className="px-4 h-11 text-left">
                            {item.created_at}
                          </td>
                          <td className="px-4 h-11 text-left">{item.end_at}</td>
                          <td className="px-4 h-11 text-center ">
                            <Button
                              color="danger"
                              variant="solid"
                              onClick={() => handleDelete(item.id)}
                            >
                              Xoá
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center ">
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-3">
                    <Pagination
                      current={currentPage}
                      total={totalEleCoupon}
                      pageSize={pageSize}
                      onChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>Không có dữ liệu</div>
          )}
          <Modal
            title="Thêm mới mã giảm giá"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Huỷ
              </Button>,
              <Button key="submit" type="primary" onClick={() => form.submit()}>
                Gửi
              </Button>,
            ]}
          >
            <Form
              name="basic"
              onFinish={onFinish}
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
            >
              <Form.Item
                label="Số lượng"
                name="quantity"
                className="mt-4"
                rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
              >
                <InputNumber min={1} />
              </Form.Item>
              <Form.Item
                label="Phần trăm giảm"
                name="percent"
                className="mt-4"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số phần trăm giảm!",
                  },
                ]}
              >
                <Input onChange={handleInputChange} />
              </Form.Item>
              {isError && <p className="text-red-500 text-center">{isError}</p>}
              <Form.Item
                label="Ngày bắt đầu"
                name="start_at"
                className="mt-4"
                rules={[
                  { required: true, message: "Vui lòng nhập ngày bắt đầu!" },
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Ngày kết thúc"
                name="end_at"
                className="mt-4"
                rules={[
                  { required: true, message: "Vui lòng nhập ngày kết thúc!" },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </>
  );
}
