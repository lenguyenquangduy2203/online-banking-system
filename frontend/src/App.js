import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import các component
import Sidebar from "./Components/Sidebar/Sidebar";
import Overview from "./Components/Overview/Overview";
import Cards from "./Components/Cards/Cards";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";
import Payments from "./Components/Payments/Payments";
import Setting from "./Components/Setting/Setting";
import TransactionHistory from "./Components/TransactionHistory/TransactionHistory";
//import TransactionSummary from "./components/TransactionSummary/TransactionSummary";
//import RecentOperations from "./components/RecentTransaction/RecentOperations";

function App() {
  const [language, setLanguage] = useState("en");

  // Lưu ngôn ngữ vào localStorage và lấy nó khi trang tải lại
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage); // Lưu ngôn ngữ vào localStorage
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route cho các Components */}
          <Route
            path="/*"
            element={
              <DashboardLayout language={language}>
                <Routes>
                  <Route path="/" element={<Overview language={language} />} />
                  <Route path="/cards" element={<Cards language={language} />} />
                  <Route path="/payments" element={<Payments language={language} />} />
                  <Route path="/transactionshistory" element={<TransactionHistory language={language} />} />
                  <Route path="/setting" element={<Setting onLanguageChange={handleLanguageChange} />} />
                </Routes>
              </DashboardLayout>
            }
          />
          
          {/* Route cho SignIn */}
          <Route path="/signin" element={<SignIn />} />

          {/* Route cho Register */}
          <Route path="/signup" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

// Layout riêng cho Dashboard
function DashboardLayout({ children, language }) {
  return (
    <div className="dashboard">
      <Sidebar language={language} />
      <div className="content">{children}</div>
    </div>
  );
}

export default App;
