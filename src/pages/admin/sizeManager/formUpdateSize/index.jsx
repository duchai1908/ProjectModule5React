import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Upload } from "antd";
import { useDispatch } from "react-redux";
import {
  addColor,
  getAllColors,
  getAllColorsByNothing,
  updateColor,
} from "../../../../services/colorService";
import { jsonAxios } from "../../../../api";
import { getAllSize, updateSize } from "../../../../services/sizeService";

const UpdateSizeModal = ({ visible, onClose, currentSize }) => {
  const [color, setColor] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    if (currentSize) {
      console.log(currentSize);
      setColor(currentSize.size);
      setId(currentSize.id);
    }
  }, [currentSize]);

  //validate
  const [isNameFalse, setIsNameFalse] = useState(false);
  const [dataErrorMessage, setDataErrorMessage] = useState("");

  const dispatch = useDispatch();

  const [content, setContent] = useState([]);

  const handleSubmit = async () => {
    try {
      // Wait for the colors to be loaded and get the data directly from loadListColors
      const colorData = await loadListColors();

      if (!color || color === "") {
        setIsNameFalse(true);
        setDataErrorMessage("Tên màu không được để trống");
        return;
      }

      // Check if the color already exists in the loaded colorData (not content)
      const existingColor = colorData.find(
        (cl) => cl.color === color && cl.id !== id
      );
      console.log("existingColor: ", existingColor);
      if (existingColor) {
        setIsNameFalse(true);
        setDataErrorMessage("Tên màu đã bị trùng");
        return;
      }

      // update new color if it doesn't exist
      await dispatch(updateSize({ id, size: color }));

      // Close modal and refresh the list of colors
      handleClose();
      dispatch(
        getAllSize({ page: 0, size: 2, search: "", sortOption: "none" })
      );
    } catch (error) {
      console.error("Error adding product detail:", error);
    }
  };

  const loadListColors = async () => {
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
    setColor(""); // Reset input value
    onClose(); // Call the original onClose handler
  };

  return (
    <Modal
      title="Sửa màu"
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
        <Input value={color} onChange={(e) => setColor(e.target.value)} />
        {isNameFalse && (
          //   <p className="text-red-500">Tên màu không được để trống</p>
          <p className="text-red-500">{dataErrorMessage}</p>
        )}
      </div>
    </Modal>
  );
};

export default UpdateSizeModal;
