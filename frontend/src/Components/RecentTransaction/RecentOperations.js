import React, { useEffect, useState } from "react";
import { getRecentTransactions } from "../../services/apiServices";
import "./RecentOperations.css";

function RecentOperations({ language, getText }) {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getRecentTransactions();
        setTransactions(data);
      } catch (err) {
        setError("Failed to load recent transactions.");
      }
    };

    fetchTransactions();
  }, []);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="recent-operations">
        <h3>{getText("noTransactions")}</h3>
      </div>
    );
  }

  return (
    <div className="recent-operations">
      <h3>{language === "en" ? "Recent Transactions" : "Giao Dịch Gần đây"}</h3>
      {transactions.map((transaction, index) => (
        <div
          key={index}
          className={`operation-item ${transaction.isPositive ? "positive" : "negative"}`}
        >
          <p>{transaction.name}</p>
          <span>{transaction.amount}</span>
        </div>
      ))}
    </div>
  );
}

export default RecentOperations;
