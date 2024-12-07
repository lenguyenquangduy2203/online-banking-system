import React, { useState, useEffect } from "react";
import "./Setting.css";

const Setting = ({ onLanguageChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("vn");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "vn";
    console.log("Saved language from localStorage:", savedLanguage);
    setSelectedLanguage(savedLanguage);
  }, []);

  const handleChange = (e) => {
    const newLanguage = e.target.value;
    console.log("Language changed to:", newLanguage);
    setSelectedLanguage(newLanguage);
    onLanguageChange(newLanguage);
    localStorage.setItem("language", newLanguage);
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
