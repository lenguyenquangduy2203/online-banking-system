// src/components/Dashboard/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { testAdminAuth } from '../../services/apiServices';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await testAdminAuth();
        setAdminData(response);
      } catch (error) {
        setError("Failed to load admin data");
        console.error("Admin authorization failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {adminData ? (
        <div className="admin-info">
          <p>Welcome, Admin {adminData.name}</p>
          <p>Total Transactions: {adminData.totalTransactions || 0}</p>
          <p>Registered Users: {adminData.totalUsers || 0}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default AdminDashboard;
