import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { getAdminDashboardData } from "../../services/apiServices";

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalCards: 0,
    totalTransactions: 0,
    recentTransactions: [],
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await getAdminDashboardData();
        setDashboardData(response.data);
      } catch (error) {
        console.error("Failed to fetch admin dashboard data", error);
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="overview-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>{dashboardData.totalUsers}</p>
        </div>
        <div className="card">
          <h3>Total Cards</h3>
          <p>{dashboardData.totalCards}</p>
        </div>
        <div className="card">
          <h3>Total Transactions</h3>
          <p>{dashboardData.totalTransactions}</p>
        </div>
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

export default AdminDashboard;
