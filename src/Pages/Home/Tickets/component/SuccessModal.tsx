import { FC, ReactElement } from "react";
import success_image from "../../../../assets/Illustrations/AuthSuccessImage.png";

interface SuccessModalPopProps {
  title: string;
  message: string;
  buttonText: string;
  onClose: () => void;
}

const SuccessModalPop: FC<SuccessModalPopProps> = ({
  title,
  message,
  buttonText,
  onClose,
}): ReactElement => (
  <div className="form_content_display">
    <div className="form_content-orange-background">
      <img
        className="form_content-orange-background-image"
        src={success_image}
        alt={success_image}
      />
    </div>
    <div>
      <h2 className="form_content-h2">{title}</h2>
      <p className="form_content-p">{message}</p>
    </div>
    <div>
      <button onClick={onClose} className="form_content_button">
        {buttonText}
      </button>
    </div>
  </div>
);

export default SuccessModalPop;
