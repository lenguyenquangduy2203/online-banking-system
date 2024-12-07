import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ language, userRole }) {
  const getText = (key) => {
    const text = {
      en: {
        overview: "Overview",
        cards: "Cards",
        payments: "Payments",
        transactionHistory: "Transaction History",
        setting: "Setting",
        adminDashboard: "Admin Dashboard",
        createAccount: "Create Account",
        logOut: "Log out",
      },
      vn: {
        overview: "Tổng quan",
        cards: "Thẻ",
        payments: "Thanh toán",
        transactionHistory: "Lịch sử giao dịch",
        setting: "Cài đặt",
        adminDashboard: "Bảng điều khiển Admin",
        createAccount: "Tạo tài khoản",
        logOut: "Đăng xuất",
      },
    };
    return text[language][key];
  };

  return (
    <div className="sidebar">
      <ul>
        {userRole === "admin" ? (
          <>
            <li>
              <NavLink to="/">{getText("adminDashboard")}</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/overview">{getText("overview")}</NavLink>
            </li>
            <li>
              <NavLink to="/cards">{getText("cards")}</NavLink>
            </li>
            <li>
              <NavLink to="/payments">{getText("payments")}</NavLink>
            </li>
            <li>
              <NavLink to="/transactionhistory">{getText("transactionHistory")}</NavLink>
            </li>
            {/*User*/}
            <li>
              <NavLink to="/create-account">{getText("createAccount")}</NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/setting">{getText("setting")}</NavLink>
        </li>
        <li>
          <NavLink to="/auth">{getText("logOut")}</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;