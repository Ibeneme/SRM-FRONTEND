import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineSetting, AiOutlineNotification, AiOutlineFile } from 'react-icons/ai';
import { BsFillChatDotsFill } from 'react-icons/bs';

const BottomNavBar: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSettingsClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bottom-nav">
      <div className="bottom-nav-icons">
        <AiOutlineHome onClick={() => console.log('Navigate to Home page')} />
        <AiOutlineFile onClick={() => console.log('Navigate to Tickets page')} />
        <AiOutlineSetting onClick={handleSettingsClick} />
        <AiOutlineNotification onClick={() => console.log('Navigate to Notifications page')} />
        <BsFillChatDotsFill onClick={() => console.log('Navigate to Chat page')} />
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal" onClick={closeModal}>Close</button>
            <p>Organizational settings, account settings, departments...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomNavBar;
