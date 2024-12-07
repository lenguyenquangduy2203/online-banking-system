import React from "react";
import "./TransactionSummary.css";

// Dữ liệu tóm tắt giao dịch với các giá trị cho từng ngôn ngữ
const summaryData = {
  en: [
    { label: "This month's income", value: "10,000,000 VND" },
    { label: "This month's expenses", value: "5,000,000 VND" },
    { label: "Remaining balance", value: "5,000,000 VND" },
    { label: "Savings", value: "2,000,000 VND" },
  ],
  vn: [
    { label: "Thu nhập tháng này", value: "10,000,000 VND" },
    { label: "Chi tiêu tháng này", value: "5,000,000 VND" },
    { label: "Số dư còn lại", value: "5,000,000 VND" },
    { label: "Tiết kiệm", value: "2,000,000 VND" },
  ]
};

function TransactionSummary({ language }) {
  return (
    <div className="transaction-summary">
      <h3>{language === 'en' ? "Transaction Summary" : "Tóm tắt giao dịch"}</h3>
      {summaryData[language].map((item, index) => (
        <div key={index} className="summary-item">
          <p>{item.label}:</p>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default TransactionSummary;
