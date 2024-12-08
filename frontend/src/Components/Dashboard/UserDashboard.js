// src/components/Dashboard/UserDashboard.js
import React, { useState, useEffect } from 'react';
import './UserDashboard.css';

const UserDashboard = () => {
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="user-dashboard">
      <h2>User Dashboard</h2>
      {userData ? (
        <>
          <div className="user-info">
            <p>Welcome, {userData.name}</p>
          </div>

          <div className="cards-section">
            <h3>Your Cards</h3>
            <ul>
              {accounts && accounts.length > 0 ? (
                accounts.map((card, index) => (
                  <li key={index}>
                    Card Type: {card.type} - Card Number: {card.id}
                  </li>
                ))
              ) : (
                <p>No cards available.</p>
              )}
            </ul>
          </div>

          <div className="transactions-section">
            <h3>Transaction History</h3>
            <ul>
              {transactions && transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <li key={index}>
                    {transaction.createdDate} - {transaction.type}: ${transaction.amount}
                  </li>
                ))
              ) : (
                <p>No transactions found.</p>
              )}
            </ul>
          </div>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default UserDashboard;