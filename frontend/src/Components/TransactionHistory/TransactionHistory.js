import React, { useEffect, useState } from "react";
import "./TransactionHistory.css";

const TransactionHistory = ({ language }) => {
  const translations = {
    en: {
      title: "Transaction History",
      noData: "No transactions available.",
      error: "Failed to load transaction history.",
    },
    vn: {
      title: "Lịch Sử Giao Dịch",
      noData: "Không có giao dịch nào.",
      error: "Không thể tải lịch sử giao dịch.",
    },
  };

  const text = translations[language] || translations.en;

  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("transactions")) || [];
        setTransactions(data);
      } catch (err) {
        setError(text.error);
      }
    };

    fetchTransactions();
  }, [text.error]);

  return (
    <div className="transaction-history">
      <h3>{text.title}</h3>
      {error && <p className="error-message">{error}</p>}
      {!error && transactions.length === 0 && <p>{text.noData}</p>}
      <table>
        <thead>
          <tr>
            <th>{language === "en" ? "Date" : "Ngày"}</th>
            <th>{language === "en" ? "Type" : "Loại"}</th>
            <th>{language === "en" ? "Amount" : "Số tiền"}</th>
            <th>{language === "en" ? "Recipient" : "Người nhận"}</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.type}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.recipient}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">{text.noData}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
