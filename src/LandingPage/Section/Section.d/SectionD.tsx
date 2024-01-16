import React, { useState } from "react";
import "./SectionD.css";
import { MdAdd } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
interface FAQ {
  question: string;
  answer: string;
}

const SectionD: React.FC = () => {
  const faqs: FAQ[] = [
    {
      question: "Ticke",
      answer: `To regain access to your Acadaboo account, click on the 'Forgot Password' link on the login page. You'll receive an email with secure instructions on how to reset your password. If you encounter any issues during this process, please contact our customer support team for immediate assistance.`,
    },
    {
      question:
        "I'm having trouble resetting my password on Acadaboo. What should I do?",
      answer: `If you're facing difficulties resetting your password, reach out to our customer support team, and we'll guide you through the process. Your security is our priority, and we're here to help you securely regain access to your Acadaboo account.`,
    },
    {
      question: "Can I update my account information after logging in?",
      answer: `After log˝ging in, account information updates may be possible. If you need assistance or encounter any issues while trying to update your information on Acadaboo, please contact our dedicated customer support team for personalized help.`,
    },
    {
      question: "I'm having trouble logging in. What should I do?",
      answer: `If you're experiencing login issues, please ensure you are using the correct credentials. If the problem persists, contact our customer support team for immediate assistance in resolving any login-related challenges on Acadaboo.`,
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) =>
      prevIndex === index ? null : (index as number)
    );
  };

  return (
    <div data-aos="zoom-in" className="faqs-accordion">
      <div className="faqs-div" data-aos="zoom-in">
        <h2 className="h2-faqs">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div
              className="faq-question"
              onClick={() => toggleAccordion(index)}
            >
              <h3>{faq.question}</h3>
              <span className="span-icons-faqs">
                {activeIndex === index ? <FaMinus /> : <MdAdd />}
              </span>
            </div>
            <div data-aos="zoom-in" className="faq-answer">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionD;
