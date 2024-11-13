import React from "react";
import { Button, Image, Input, Select, Upload } from "antd";
import { IoClose } from "react-icons/io5";
import { UploadOutlined } from "@ant-design/icons";

export default function UpdateProductForm({
  handleUpdateProduct,
  productUpdate,
  handleCloseFormUpdate,
  handleProductNameChange,
  handleCategoryIdChange,
  handleProductSaleChange,
  handleUpload,
  productName,
  categoryId,
  sale,
  file,
  isNameFalse,
  isCateFalse,
  isImgFalse,
  cateData,
  handleChangeCateValue,
}) {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <form
          className="bg-white px-6 py-5 rounded-lg w-full max-w-md"
          onSubmit={handleUpdateProduct}
        >
          <header className="flex items-center justify-between">
            <h2 className="text-2xl font-bold mb-4">
              Sửa {productUpdate.name}
            </h2>
            <IoClose
              size={24}
              className="cursor-pointer hover:opacity-70"
              onClick={handleCloseFormUpdate}
            />
          </header>

          <div className="mb-4">
            <label className="block font-medium mb-2">Tên sản phẩm</label>
            <Input
              placeholder="Nhập tên sản phẩm"
              value={productName}
              onChange={handleProductNameChange}
              className="mb-3"
            />
            {isNameFalse && (
              <p className="text-red-500">Tên không được để trống</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Mã danh mục</label>
            {/* <Input
              placeholder="Nhập mã category"
              value={categoryId}
              onChange={handleCategoryIdChange}
              className="mb-3"
            /> */}
            <Select
              defaultValue={categoryId}
              className="w-full"
              onChange={handleChangeCateValue}
              options={cateData?.map((category) => ({
                value: category?.id,
                label: category?.name,
              }))}
            />
            {isCateFalse && (
              <p className="text-red-500">Id danh mục không được để trống</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Phần trăm giảm giá</label>
            <Input
              placeholder="Nhập phần trăm giảm giá"
              value={sale}
              onChange={handleProductSaleChange}
              className="mb-3"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Ảnh sản phẩm</label>

            {/* Display the current image */}
            {productUpdate.image && !file && (
              <div className="w-full max-h-[170px]">
                <p>Ảnh Cũ</p>
                {/* <img
                  src={productUpdate.image}
                  alt="Current product"
                  className="mb-3 max-w-xs"
                /> */}
                <Image
                  width={150}
                  height={150}
                  src={productUpdate?.image}
                  className="object-cover rounded-md"
                />
              </div>
            )}

            {/* Allow the user to upload a new image */}
            <Upload
              action="/api/upload"
              listType="picture"
              file={file}
              onChange={handleUpload}
              beforeUpload={() => false} // Prevent automatic upload
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
            {isImgFalse && <p className="text-red-500">Chưa có file</p>}
          </div>

          <div className="flex justify-end space-x-2">
            <Button htmlType="button" onClick={handleCloseFormUpdate}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
