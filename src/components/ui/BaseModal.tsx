import React from "react";
import "./BaseModal.css";

type BaseModalProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button className="modal-close-btn" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
