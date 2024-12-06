import React, { useEffect, useState } from "react";
import { getTransactionHistory } from "../../services/apiServices"; // Giả sử đây là API service của bạn
import "./TransactionHistory.css";

const TransactionHistory = ({ language }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({});

  // Lấy danh sách giao dịch
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactionHistory(filters);
        setTransactions(data);
      } catch (err) {
        setError("Failed to load transaction history.");
      }
    };

    fetchTransactions();
  }, [filters]);

  return (
    <div className="transaction-history">
      <h3>{language === "en" ? "Transaction History" : "Lịch Sử Giao Dịch"}</h3>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Recipient</th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.length > 0 ? (
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
              <td colSpan="4">No transactions available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
