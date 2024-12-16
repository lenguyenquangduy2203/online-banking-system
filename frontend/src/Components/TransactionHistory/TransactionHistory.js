import React, { useEffect, useState } from "react";
import { getTransactionHistory } from "../../services/apiServices";
import "./TransactionHistory.css";

const TransactionHistory = ({ language }) => {
  const translations = {
    en: {
      title: "Transaction History",
      noData: "No transactions available.",
      error: "Failed to load transaction history.",
      pagination: {
        nextPage: "Next Page",
      },
    },
    vn: {
      title: "Lịch Sử Giao Dịch",
      noData: "Không có giao dịch nào.",
      error: "Không thể tải lịch sử giao dịch.",
      pagination: {
        nextPage: "Trang Tiếp Theo",
      },
    },
  };

  const text = translations[language] || translations.en;

  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = async (page) => {
    setIsLoading(true);
    try {
      const userId = JSON.parse(localStorage.getItem("customer")).id;
      const transactionData = await getTransactionHistory({
        userId,
        page,
      });

      if (page === 0) {
        setTransactions(transactionData.data); // Nếu là trang đầu, ghi đè danh sách giao dịch
      } else {
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          ...transactionData.data,
        ]); // Nếu không phải trang đầu, ghép thêm giao dịch mới vào danh sách cũ
      }
    } catch (err) {
      setError(text.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage]);

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
                <td>{new Date(transaction.createdDate).toUTCString()}</td>
                <td>{transaction.type}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.fromAccountId || transaction.toAccountId}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">{text.noData}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Nút Next Page */}
      {transactions.length > 0 && transactions.length >= (currentPage + 1) * 10 && !isLoading && (
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={isLoading}
        >
          {text.pagination.nextPage}
        </button>
      )}

      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default TransactionHistory;
