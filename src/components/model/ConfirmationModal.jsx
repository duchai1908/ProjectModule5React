// ConfirmationModal.js
import React from "react";
import { Modal } from "antd";

const ConfirmationModal = ({
  visible,
  onConfirm,
  onCancel,
  title,
  content,
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Có"
      cancelText="Không"
    >
      <p>{content}</p>
    </Modal>
  );
};

export default ConfirmationModal;
