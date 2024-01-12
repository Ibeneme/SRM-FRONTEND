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
      question: "How can I track my order?",
      answer: `To track your order, log in to your account and go to the 'Order History' section. You will find detailed information about your order status, shipping details, and estimated delivery date.`,
    },
    {
      question: "What is your return policy?",
      answer: `Our return policy allows for returns within 30 days of purchase. If you're not satisfied with your purchase, please contact our customer support team for assistance.`,
    },
    {
      question: "How do I reset my password?",
      answer: `To reset your password, click on the 'Forgot Password' link on the login page. You will receive an email with instructions on how to reset your password securely.`,
    },
    {
      question: "Can I change my shipping address after placing an order?",
      answer: `Unfortunately, we cannot modify the shipping address once an order has been placed. Please double-check your shipping information before completing your purchase.`,
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
