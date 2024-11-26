import React, { useState, useEffect } from "react";
import "./Setting.css";

const Setting = ({ onLanguageChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const languages = ["en", "vn"];

  // Đảm bảo giá trị ngôn ngữ ban đầu được đồng bộ với prop từ App.js
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setSelectedLanguage(savedLanguage);
  }, []);

  const handleChange = (e) => {
    setSelectedLanguage(e.target.value);
    onLanguageChange(e.target.value);
    localStorage.setItem("language", e.target.value);  // Lưu ngôn ngữ vào localStorage
  };

  return (
    <div className="setting-container">
      <h2>Settings</h2>
      <div className="language-setting">
        <label htmlFor="language">Choose Language:</label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={handleChange}
        >
          <option value="en">English</option>
          <option value="vn">Vietnamese</option>
        </select>
      </div>
    </div>
  );
};

export default Setting;
