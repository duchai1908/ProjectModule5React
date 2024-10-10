import { Button, Input, Select, Upload } from "antd";
import { IoClose } from "react-icons/io5";
import { UploadOutlined } from "@ant-design/icons";

const AddProductForm = ({
  handleAddProduct,
  productName,
  categoryId,
  file,
  sale,
  handleProductNameChange,
  handleCategoryIdChange,
  handleUpload,
  handleCloseFormAdd,
  handleProductSaleChange,
  isNameFalse,
  isCateFalse,
  isImgFalse,
  cateData,
  handleChangeCateValue,
}) => {
  // const handleChangeCateValue = (value) => {
  //   console.log(`selected ${value}`);
  // };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        className="bg-white px-6 py-5 rounded-lg w-full max-w-md"
        onSubmit={handleAddProduct}
      >
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-4">Thêm sản phẩm</h2>
          <IoClose
            size={24}
            className="cursor-pointer hover:opacity-70"
            onClick={handleCloseFormAdd}
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
            defaultValue={
              cateData && cateData?.length > 0 ? cateData[0].name : undefined
            }
            // style={{
            //   width: 150,
            // }}
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
            onChange={handleProductSaleChange} // Update onChange to handle validation
            className="mb-3"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Ảnh sản phẩm</label>
          <Upload
            action="/api/upload"
            listType="picture"
            file={file}
            onChange={handleUpload}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
          {isImgFalse && <p className="text-red-500">Chưa có file</p>}
        </div>

        <div className="flex justify-end space-x-2">
          <Button htmlType="button" onClick={handleCloseFormAdd}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
