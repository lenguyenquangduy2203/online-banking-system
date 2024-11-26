import React from "react";
import "./Overview.css";
import RecentOperations from "../RecentTransaction/RecentOperations";
import Cards from "../Cards/Cards";

function Overview({ language }) {
  const getText = (key) => {
    const text = {
      en: {
        accountBalance: "Account Balance",
        transactionSummary: "Transaction Summary",
        income: "Income this month:",
        expenses: "Expenses this month:",
        remainingBalance: "Remaining balance:",
        noTransactions: "No transactions found",
      },
      vn: {
        accountBalance: "Số dư tài khoản",
        transactionSummary: "Tóm tắt giao dịch",
        income: "Thu nhập tháng này:",
        expenses: "Chi tiêu tháng này:",
        remainingBalance: "Số dư còn lại:",
        noTransactions: "Không có giao dịch nào",
      },
    };
    return text[language][key];
  };

  return (
    <div className="overview">
      {/* Số dư tài khoản */}
      <div className="card balance-card">
        <h2>{getText("accountBalance")}</h2>
        <p>100,487,250 VND</p>
      </div>

      {/* Tóm tắt giao dịch */}
      <div className="card summary-card">
        <h2>{getText("transactionSummary")}</h2>
        <p>{getText("income")} 10,000,000 VND</p>
        <p>{getText("expenses")} 5,000,000 VND</p>
        <p>{getText("remainingBalance")} 5,000,000 VND</p>
      </div>

      {/* Giao dịch gần đây */}
      <div className="recent-operations-container">
        <RecentOperations language={language} getText={getText} />
      </div>

      {/* Thẻ ngân hàng */}
      <div className="cards-container">
        <Cards />
      </div>
    </div>
  );
}

export default Overview;
