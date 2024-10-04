import React from "react";
import { Modal } from "antd";

const ConfirmationUpdate = ({ visible, onConfirm, onCancel, title }) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Có"
      cancelText="Không"
    >
      <p>Bạn có chắc chắn muốn thực hiện hành động này?</p>
    </Modal>
  );
};

export default ConfirmationUpdate;
