import React from "react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  formContent: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  formContent,
}) => {
  const modalClassName = isOpen ? "modal-open" : "modal";

  return (
    <div className={modalClassName}>
      <div className="modal-content">
        <div className="white-modal-content">
          <span style={{ display: "none" }} className="close" onClick={onOpen}>
            &times;
          </span>
          <div>{formContent}</div>
          <button style={{ display: "none" }} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
