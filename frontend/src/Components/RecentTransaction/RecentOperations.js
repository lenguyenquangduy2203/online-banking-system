import React, { useEffect, useState } from "react";
import "./RecentOperations.css";

const RecentOperations = ({ language }) => {
  const translations = {
    en: {
      title: "Recent Transactions",
      noTransactions: "No transactions available.",
      error: "Failed to load recent transactions.",
    },
    vn: {
      title: "Giao Dịch Gần Đây",
      noTransactions: "Không có giao dịch nào.",
      error: "Không thể tải các giao dịch gần đây.",
    },
  };

  const text = translations[language] || translations.en;

  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Fetch data from localStorage for now
        const storedTransactions =
          JSON.parse(localStorage.getItem("recentTransactions")) || [];
        setTransactions(storedTransactions);
      } catch (err) {
        setError(text.error);
      }
    };

    fetchTransactions();
  }, [text.error]);

  return (
    <div className="recent-operations">
      <h3>{text.title}</h3>
      {error && <p className="error-message">{error}</p>}
      {!error && transactions.length === 0 && <p>{text.noTransactions}</p>}
      <div className="operations-list">
        {transactions.map((transaction, index) => (
          <div
            className={`operation-item ${
              transaction.isPositive ? "positive" : "negative"
            }`}
            key={index}
          >
            <p>{transaction.name}</p>
            <span>{transaction.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOperations;
