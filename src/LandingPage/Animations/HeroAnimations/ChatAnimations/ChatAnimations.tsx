import React, { useState, useEffect } from "react";
import "./ChatAnimations.css";
import emojiReceiver from "../../../../assets/Landingpage/SectionA/memoji/anastasiafrost.png";
import emojiSender from "../../../../assets/Landingpage/SectionA/memoji/yourawesam.png";
import { MdVerified } from "react-icons/md";

const Typewriter: React.FC<{ text: string; speed: number }> = ({
  text,
  speed,
}) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      const nextChar = text[index];
      if (nextChar !== undefined) {
        setDisplayText((prevText) => prevText + nextChar);
        index += 1;
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return <span style={{}}>{displayText}</span>;
};

// ChatAnimations component
const ChatAnimations: React.FC = () => {
  const receiverMessage = "Hi, I can't find my OTP mail in my mailbox";
  const senderMessage = "Good afternoon, please check your spam mails.";
  const lastReceiverMessage = "Wow, thanks! Found it.";
  const lastSenderMessage = "Anytime! 👍";
  const receiverMessageTime = receiverMessage.length * 100;
  const senderMessageTime = senderMessage.length * 100;
  const lastReceiverMessageTime = lastReceiverMessage.length * 100;
  const lastSenderMessageTime = lastSenderMessage.length * 100;

  const [showReceiver, setShowReceiver] = useState(false);
  const [showSender, setShowSender] = useState(false);
  const [showLastReceiver, setShowLastReceiver] = useState(false);
  const [showLastSender, setShowLastSender] = useState(false);

  useEffect(() => {
    const resetChat = () => {
      setShowReceiver(false);
      setShowSender(false);
      setShowLastReceiver(false);
      setShowLastSender(false);

      setTimeout(() => {
        setShowReceiver(true);
        setTimeout(() => setShowSender(true), receiverMessageTime + 1000);
        setTimeout(
          () => setShowLastReceiver(true),
          receiverMessageTime + senderMessageTime + 3000
        );
        setTimeout(
          () => setShowLastSender(true),
          receiverMessageTime +
            senderMessageTime +
            lastReceiverMessageTime +
            20000
        );
      }, 0);
    };

    setTimeout(() => {
      setShowReceiver(true);
      setTimeout(() => setShowSender(true), receiverMessageTime + 1000);
      setTimeout(
        () => setShowLastReceiver(true),
        receiverMessageTime + senderMessageTime + 3000
      );
      setTimeout(
        () => setShowLastSender(true),
        receiverMessageTime +
          senderMessageTime +
          lastReceiverMessageTime +
          20000
      );
      setTimeout(
        resetChat,
        receiverMessageTime +
          senderMessageTime +
          lastReceiverMessageTime +
          lastSenderMessageTime +
          20000
      );
    }, 0);
  }, []);


  useEffect(() => {
    const resetChat = () => {
      setShowReceiver(false);
      setShowSender(false);
      setShowLastReceiver(false);
      setShowLastSender(false);

      setTimeout(() => {
        setShowReceiver(true);
        setTimeout(() => setShowSender(true), receiverMessageTime + 1000);
        setTimeout(
          () => setShowLastReceiver(true),
          receiverMessageTime + senderMessageTime + 3000
        );
        setTimeout(
          () => setShowLastSender(true),
          receiverMessageTime +
            senderMessageTime +
            lastReceiverMessageTime +
            5000
        );
      }, 0);
    };

    const startChatLoop = () => {
      // Reset and start displaying messages again
      resetChat();

      // Set a timeout for the next chat reset
      setTimeout(startChatLoop, receiverMessageTime + senderMessageTime + lastReceiverMessageTime + lastSenderMessageTime +     20000);
    };

    // Initial start of the chat loop
    startChatLoop();
  }, []);




  return (
    <div className="chat-container">
      {showReceiver && (
        <div className="receiver-container">
          <img src={emojiReceiver} alt="Receiver" className="profile-image" />
          <div className="typing-animation">
            <p className="stkeholder-typing-text">Stakeholder</p>
            {receiverMessage && (
              <Typewriter text={receiverMessage} speed={100} />
            )}
          </div>
        </div>
      )}
      {showSender && (
        <div className="sender-container">
          <img src={emojiSender} alt="Sender" className="profile-image" />
          <div className="typing-animation">
            <p className="support-typing-text">
              Support <MdVerified />
            </p>
            {senderMessage && <Typewriter text={senderMessage} speed={100} />}
          </div>
        </div>
      )}
      {showLastReceiver && (
        <div className="receiver-container">
          <img src={emojiReceiver} alt="Receiver" className="profile-image" />
          <div className="typing-animation">
            <p className="stkeholder-typing-text">Stakeholder</p>
            {lastReceiverMessage && (
              <Typewriter text={lastReceiverMessage} speed={100} />
            )}
          </div>
        </div>
      )}
      {showLastSender && (
        <div className="sender-container">
          <img src={emojiSender} alt="Sender" className="profile-image" />

          <div className="typing-animation">
            <p className="support-typing-text">
              Support <MdVerified />
            </p>

            {lastSenderMessage && (
              <Typewriter text={lastSenderMessage} speed={100} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAnimations;
