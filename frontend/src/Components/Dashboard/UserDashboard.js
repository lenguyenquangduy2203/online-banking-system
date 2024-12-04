// src/components/Dashboard/UserDashboard.js
import React, { useState, useEffect } from 'react';
import { testUserAuth } from '../../services/apiServices';
import './UserDashboard.css';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await testUserAuth();
        setUserData(response);
      } catch (error) {
        setError("Failed to load user data");
        console.error("User authorization failed:", error);
      } finally {
        setLoading(false);
      }
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
            <p>Your current balance is: ${userData.balance || 0}</p>
          </div>

          <div className="cards-section">
            <h3>Your Cards</h3>
            <ul>
              {userData.cards && userData.cards.length > 0 ? (
                userData.cards.map((card, index) => (
                  <li key={index}>
                    Card Type: {card.type} - Card Number: **** **** **** {card.last4}
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
              {userData.transactions && userData.transactions.length > 0 ? (
                userData.transactions.map((transaction, index) => (
                  <li key={index}>
                    {transaction.date} - {transaction.type}: ${transaction.amount}
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