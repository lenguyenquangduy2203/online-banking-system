import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = ({ language }) => {
  const translations = {
    en: {
      title: "Admin Dashboard",
      noData: "No admin data available.",
      error: "Failed to load admin data.",
    },
    vn: {
      title: "Admin Dashboard",
      noData: "Không có dữ liệu quản trị.",
      error: "Không thể tải dữ liệu quản trị.",
    },
  };

  const text = translations[language] || translations.en;
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("adminData"));
      setAdminData(data);
    } catch (err) {
      setError(text.error);
    }
  }, [text.error]);

  return (
    <div className="admin-dashboard">
      <h3>{text.title}</h3>
      {error && <p className="error-message">{error}</p>}
      {!error && !adminData && <p>{text.noData}</p>}
      {adminData && (
        <div>
          <p>Name: {adminData.name}</p>
          <p>Total Users: {adminData.totalUsers}</p>
          <p>Total Transactions: {adminData.totalTransactions}</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
