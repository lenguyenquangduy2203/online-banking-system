import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./index.css";

import Sidebar from "./Components/Sidebar/Sidebar";
import Cards from "./Components/Cards/Cards";
import Payments from "./Components/Payments/Payments";
import Setting from "./Components/Setting/Setting";
import TransactionHistory from "./Components/TransactionHistory/TransactionHistory";
import Auth from "./Components/Auth/Auth";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AccountCreationComponent from "./Components/AccountCreation/AccountCreation";
import UserDashboard from "./Components/Dashboard/UserDashboard";

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
                          <AdminDashboard language={language} />
                        ) : (
                          <UserDashboard language={language} />
                        )
                      }
                    />
                    <Route path="/cards" element={<Cards language={language} />} />
                    <Route path="/payments" element={<Payments language={language} />} />
                    <Route path="/transactionhistory" element={<TransactionHistory language={language} />} />
                    <Route path="/setting" element={<Setting onLanguageChange={handleLanguageChange} />} />
                    {userRole === "user" && <Route path="/create-account" element={<AccountCreationComponent language={language} />} />}
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
      <div className="main-content">{children}</div>
    </div>
  );
}

export default App;
