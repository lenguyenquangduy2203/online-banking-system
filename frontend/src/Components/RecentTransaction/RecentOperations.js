import React from "react";
import "./RecentOperations.css";

const transactions = [
  { name: "Nguyễn Văn A", amount: "+ 2,000,000 VND", isPositive: true },
  { name: "Shopee", amount: "- 2,600,000 VND", isPositive: false },
  { name: "Spotify", amount: "- 59,000 VND", isPositive: false },
  { name: "Netflix", amount: "- 180,000 VND", isPositive: false },
  { name: "Grab", amount: "- 50,000 VND", isPositive: false },
];

function RecentOperations({ language, getText }) {
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
