import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ language }) => {
  const getText = (key) => {
    const text = {
      en: {
        overview: "Overview",
        cards: "Cards",
        payments: "Payments",
        transactionHistory: "Transaction History",
        setting: "Setting",
        logout: "Log out",
      },
      vn: {
        overview: "Tổng quan",
        cards: "Thẻ",
        payments: "Thanh toán",
        transactionHistory: "Lịch sử giao dịch",
        setting: "Cài đặt",
        logout: "Đăng xuất",
      },
    };
    return text[language][key]; // Đổi từ "texts" thành "text"
  };

  return (
    <div className="sidebar">
      <h2>Online Banking</h2>
      <ul>
        <li>
          <Link to="/">{getText("overview")}</Link>
        </li>
        <li>
          <Link to="/cards">{getText("cards")}</Link>
        </li>
        <li>
          <Link to="/payments">{getText("payments")}</Link>
        </li>
        <li>
          <Link to="/transactionhistory">{getText("transactionHistory")}</Link>
        </li>
        <li>
          <Link to="/setting">{getText("setting")}</Link>
        </li>
        <li>
          <Link to="/logout">{getText("logout")}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
