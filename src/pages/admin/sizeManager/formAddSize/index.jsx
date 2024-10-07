import React, { useState } from "react";
import { Button, Input, Modal, Upload } from "antd";
import { useDispatch } from "react-redux";
import { jsonAxios } from "../../../../api";
import { addSize, getAllSize } from "../../../../services/sizeService";

const AddSizeModal = ({ visible, onClose }) => {
  const [sizeValue, setSizeValue] = useState("");

  //validate
  const [isNameFalse, setIsNameFalse] = useState(false);
  const [dataErrorMessage, setDataErrorMessage] = useState("");

  const dispatch = useDispatch();

  const [content, setContent] = useState([]);

  const handleSubmit = async () => {
    try {
      // Wait for the colors to be loaded and get the data directly from loadListColors
      const sizeData = await loadListSizes();

      if (!sizeValue || sizeValue === "") {
        setIsNameFalse(true);
        setDataErrorMessage("Kích cỡ không được để trống");
        return;
      }

      // Check if the color already exists in the loaded sizeData (not content)
      const existingSize = sizeData.find((cl) => cl.size === sizeValue);
      console.log("existingSize: ", existingSize);
      if (existingSize) {
        setIsNameFalse(true);
        setDataErrorMessage("Kích cỡ đã bị trùng");
        return;
      }

      console.log("sizeData: ", sizeValue);
      // Add new color if it doesn't exist
      await dispatch(addSize({ size: sizeValue }));

      // Close modal and refresh the list of colors
      handleClose();
      dispatch(
        getAllSize({ page: 0, size: 2, search: "", sortOption: "none" })
      );
    } catch (error) {
      console.error("Error adding product detail:", error);
    }
  };

  const loadListSizes = async () => {
    try {
      const resp = await jsonAxios.get(`/admin/size`);
      console.log("list: ", resp);
      const data = resp.data.data;
      console.log(data);
      setContent(data); // Update content with color data

      // Return the data directly for immediate use
      return data;
    } catch (err) {
      // Handle error
      console.error("Error loading size list:", err);
      return [];
    }
  };

  // Custom onClose handler
  const handleClose = () => {
    setIsNameFalse(false); // Reset validation error
    setDataErrorMessage("");
    setSizeValue(""); // Reset input value
    onClose(); // Call the original onClose handler
  };

  return (
    <Modal
      title="Thêm mới màu"
      visible={visible}
      onCancel={handleClose}
      footer={[
        <Button key="back" onClick={handleClose}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Thêm
        </Button>,
      ]}
    >
      <div>
        <label className="block font-medium mb-2">Tên</label>
        <Input
          value={sizeValue}
          onChange={(e) => setSizeValue(e.target.value)}
        />
        {isNameFalse && (
          //   <p className="text-red-500">Tên màu không được để trống</p>
          <p className="text-red-500">{dataErrorMessage}</p>
        )}
      </div>
    </Modal>
  );
};

export default AddSizeModal;
