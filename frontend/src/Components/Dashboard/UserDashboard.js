import React, { useState, useEffect } from 'react';
import './UserDashboard.css';

const UserDashboard = ({ language }) => {
  const translations = {
    en: {
      title: "User Dashboard",
      welcome: "Welcome",
      yourCards: "Your Cards",
      noCards: "No cards available.",
      transactionHistory: "Recent Transactions",
      noTransactions: "No transactions found.",
      noData: "No data available",
      loading: "Loading...",
    },
    vn: {
      title: "User Dashboard",
      welcome: "Chào mừng",
      yourCards: "Thẻ Ngân Hàng Của Bạn",
      noCards: "Không có thẻ nào.",
      transactionHistory: "Giao Dịch Gần Đây",
      noTransactions: "Không tìm thấy giao dịch.",
      noData: "Không có dữ liệu",
      loading: "Đang tải...",
    }
  };

  const text = translations[language] || translations.en;

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  const transactions = JSON.parse(localStorage.getItem("transactions"));

  useEffect(() => {
    const fetchUserData = async () => {
      setUserData(JSON.parse(localStorage.getItem("customer")));
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>{text.loading}</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="user-dashboard">
      <h2>{text.title}</h2>
      {userData ? (
        <>
          <div className="user-info">
            <p>{text.welcome}, {userData.name}</p>
          </div>

          <div className="cards-section">
            <h3>{text.yourCards}</h3>
            <ul>
              {accounts && accounts.length > 0 ? (
                accounts.map((card, index) => (
                  <li key={index}>
                    {`Card Type: ${card.type} - Card Number: ${card.id}`}
                  </li>
                ))
              ) : (
                <p>{text.noCards}</p>
              )}
            </ul>
          </div>

          <div className="transactions-section">
            <h3>{text.transactionHistory}</h3>
            <ul>
              {transactions && transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <li key={index}>
                    {new Date(transaction.createdDate).toUTCString()} - {transaction.type}: ${transaction.amount}
                  </li>
                ))
              ) : (
                <p>{text.noTransactions}</p>
              )}
            </ul>
          </div>
        </>
      ) : (
        <p>{text.noData}</p>
      )}
    </div>
  );
};

export default UserDashboard;
