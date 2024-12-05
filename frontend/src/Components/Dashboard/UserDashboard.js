import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import { getUserDashboardData } from "../../services/apiServices";

function UserDashboard() {
  const [dashboardData, setDashboardData] = useState({
    accountBalance: "N/A",
    cards: [],
    recentTransactions: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserDashboardData();
        setDashboardData(response.data);
      } catch (error) {
        console.error("Failed to fetch user dashboard data", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="user-dashboard">
      <div className="card account-balance">
        <h2>Account Balance</h2>
        <p>{dashboardData.accountBalance} VND</p>
      </div>
      <div className="cards-section">
        <h2>Your Cards</h2>
        {dashboardData.cards.length > 0 ? (
          <ul>
            {dashboardData.cards.map((card) => (
              <li key={card.id}>
                <strong>{card.cardNumber}</strong> ({card.type}): {card.balance} VND
              </li>
            ))}
          </ul>
        ) : (
          <p>No cards found.</p>
        )}
      </div>
      <div className="recent-transactions">
        <h2>Recent Transactions</h2>
        {dashboardData.recentTransactions.length > 0 ? (
          <ul>
            {dashboardData.recentTransactions.map((transaction) => (
              <li key={transaction.id}>
                <strong>{transaction.description}</strong>: {transaction.amount} VND
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent transactions found.</p>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
