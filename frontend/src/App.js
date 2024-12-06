import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Import các component
import Sidebar from "./components/Sidebar/Sidebar";
import Overview from "./components/Overview/Overview";
import Cards from "./components/Cards/Cards";
import Payments from "./components/Payments/Payments";
import Setting from "./components/Setting/Setting";
import TransactionHistory from "./components/TransactionHistory/TransactionHistory";
import Auth from "./components/Auth/Auth";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AccountCreationComponent from "./components/AccountCreation/AccountCreation"; // Import component

function App() {
  const [language, setLanguage] = useState("en");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);

    const userToken = localStorage.getItem("user_token");
    const adminToken = localStorage.getItem("admin_token");

    if (userToken) {
      setUserRole("user");
    } else if (adminToken) {
      setUserRole("admin");
    }
  }, []);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/*"
            element={
              userRole ? (
                <DashboardLayout language={language} userRole={userRole}>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        userRole === "admin" ? (
                          <AdminDashboard />
                        ) : (
                          <Overview language={language} />
                        )
                      }
                    />
                    <Route path="/cards" element={<Cards language={language} />} />
                    <Route path="/payments" element={<Payments language={language} />} />
                    <Route path="/transactionhistory" element={<TransactionHistory language={language} />} />
                    <Route path="/setting" element={<Setting onLanguageChange={handleLanguageChange} />} />
                    {/* Chỉ thêm route Create Account cho User */}
                    {userRole === "user" && <Route path="/create-account" element={<AccountCreationComponent userId="123" />} />}
                  </Routes>
                </DashboardLayout>
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

function DashboardLayout({ children, language, userRole }) {
  return (
    <div className="dashboard">
      <Sidebar language={language} userRole={userRole} />
      <div className="content">{children}</div>
    </div>
  );
}

export default App;
