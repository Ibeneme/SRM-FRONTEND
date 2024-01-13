import React from "react";
import "./Modal.css";
import { AiFillCloseCircle } from "react-icons/ai";

interface ModalSearchProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  formContent: React.ReactNode;
}

const ModalSearch: React.FC<ModalSearchProps> = ({
  isOpen,
  onOpen,
  onClose,
  formContent,
}) => {
  const modalClassName = isOpen ? "modal-open" : "modal";

  return (
    <div className={modalClassName}>
      <div className="side-modal-content">
        <div className="side-white-modal-content">
          <div onClick={onClose} className="close-modal-icon-div">
            <AiFillCloseCircle />
          </div>
          <span style={{ display: "none" }} className="close" onClick={onOpen}>
            &times;
          </span>
          <div>{formContent}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalSearch;
