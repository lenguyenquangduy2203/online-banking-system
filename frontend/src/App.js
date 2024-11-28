import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Sidebar from "./Components/Sidebar/Sidebar";
import Overview from "./Components/Overview/Overview";
import Cards from "./Components/Cards/Cards";
import Payments from "./Components/Payments/Payments";
import Setting from "./Components/Setting/Setting";
import TransactionHistory from "./Components/TransactionHistory/TransactionHistory";
import Auth from "./Components/Auth/Auth";

function App() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth" element={<Auth />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <DashboardLayout language={language}>
                <Routes>
                  <Route path="/" element={<Overview language={language} />} />
                  <Route path="/cards" element={<Cards language={language} />} />
                  <Route path="/payments" element={<Payments language={language} />} />
                  <Route
                    path="/transactionhistory"
                    element={<TransactionHistory language={language} />}
                  />
                  <Route
                    path="/setting"
                    element={<Setting onLanguageChange={handleLanguageChange} />}
                  />
                </Routes>
              </DashboardLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

function DashboardLayout({ children, language }) {
  return (
    <div className="dashboard">
      <Sidebar language={language} />
      <div className="content">{children}</div>
    </div>
  );
}

export default App;
