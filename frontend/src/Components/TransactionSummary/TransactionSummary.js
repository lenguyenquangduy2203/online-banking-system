import React, { useEffect, useState } from "react";
import "./TransactionSummary.css";
import axiosInstance from "../axiosConfig/axiosInstance";

function TransactionSummary({ language }) {
  const [summaryData, setSummaryData] = useState({
    income: "",
    expenses: "",
    remainingBalance: "",
    savings: "",
  });

  useEffect(() => {
    axiosInstance.get("/api/transaction-summary")
      .then((response) => setSummaryData(response.data))
      .catch((error) => console.error("Error fetching transaction summary:", error));
  }, []);

  return (
    <div className="transaction-summary">
      <h3>{language === "en" ? "Transaction Summary" : "Tóm tắt giao dịch"}</h3>
      <div className="summary-item">
        <p>{language === "en" ? "This month's income" : "Thu nhập tháng này"}:</p>
        <span>{summaryData.income}</span>
      </div>
      <div className="summary-item">
        <p>{language === "en" ? "This month's expenses" : "Chi tiêu tháng này"}:</p>
        <span>{summaryData.expenses}</span>
      </div>
      <div className="summary-item">
        <p>{language === "en" ? "Remaining balance" : "Số dư còn lại"}:</p>
        <span>{summaryData.remainingBalance}</span>
      </div>
      <div className="summary-item">
        <p>{language === "en" ? "Savings" : "Tiết kiệm"}:</p>
        <span>{summaryData.savings}</span>
      </div>
    </div>
  );
}

export default TransactionSummary;
