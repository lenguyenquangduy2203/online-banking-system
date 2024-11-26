import React, { useState } from "react";
import "./TransactionHistory.css";

function TransactionHistory({ language }) {
  const translations = {
    en: {
      title: "Transaction History",
      filters: {
        all: "All",
        sent: "Cash Out",
        received: "Cash In",
      },
      tableHeaders: ["Date", "Type", "Amount", "Receiver"],
    },
    vi: {
      title: "Lịch Sử Giao Dịch",
      filters: {
        all: "Tất cả",
        sent: "Gửi đi",
        received: "Nhận vào",
      },
      tableHeaders: ["Ngày", "Loại", "Số Tiền", "Người Nhận"],
    },
  };

  const text = translations[language] || translations.en;

  const [filter, setFilter] = useState({
    type: "",
    startDate: "",
    endDate: "",
  });

  const transactions = [
    { id: 1, type: "sent", date: "2024-11-15", amount: 1000, to: "Person A" },
    { id: 2, type: "received", date: "2024-11-16", amount: 500, to: "Person B" },
    { id: 3, type: "sent", date: "2024-11-17", amount: 1200, to: "Person C" },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const dateValid =
      (!filter.startDate || new Date(transaction.date) >= new Date(filter.startDate)) &&
      (!filter.endDate || new Date(transaction.date) <= new Date(filter.endDate));
    const typeValid = !filter.type || transaction.type === filter.type;
    return dateValid && typeValid;
  });

  return (
    <div className="transaction-history">
      <h2>{text.title}</h2>

      <div className="filters">
        <select value={filter.type} onChange={(e) => setFilter({ ...filter, type: e.target.value })}>
          <option value="">{text.filters.all}</option>
          <option value="sent">{text.filters.sent}</option>
          <option value="received">{text.filters.received}</option>
        </select>
        <input
          type="date"
          value={filter.startDate}
          onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
        />
        <input
          type="date"
          value={filter.endDate}
          onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
        />
      </div>

      <table className="transaction-table">
        <thead>
          <tr>
            {text.tableHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{text.filters[transaction.type]}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.to}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistory;
