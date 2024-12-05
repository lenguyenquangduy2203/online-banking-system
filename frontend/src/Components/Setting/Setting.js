import React, { useState, useEffect } from "react";
import "./Setting.css";

const Setting = ({ onLanguageChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("vn");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "vn";
    const savedTheme = localStorage.getItem("theme") || "light";
    setSelectedLanguage(savedLanguage);
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);
  }, []);

  const handleChangeLanguage = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    onLanguageChange(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="setting-container">
      <h2>Settings</h2>
      <div className="language-setting">
        <label htmlFor="language">Choose Language:</label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={handleChangeLanguage}
        >
          <option value="en">English</option>
          <option value="vn">Vietnamese</option>
        </select>
      </div>
      <div className="theme-setting">
        <label>Theme:</label>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </button>
      </div>
    </div>
  );
};

export default Setting;
