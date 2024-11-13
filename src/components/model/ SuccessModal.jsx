// SuccessModal.js
import React from "react";
import { Modal, Button } from "antd";

export default function SuccessModal({ visible, onClose }) {
  return (
    <Modal
      title="Thông báo"
      visible={visible}
      footer={[
        <Button key="ok" type="primary" onClick={onClose}>
          OK
        </Button>,
      ]}
      onCancel={onClose}
    >
      <p>Bạn đã thêm danh mục mới thành công!</p>
    </Modal>
  );
}
