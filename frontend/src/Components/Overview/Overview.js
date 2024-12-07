import React, { useEffect, useState } from "react";
import { getTransactionSummary } from "../../services/apiServices";
import "./Overview.css";
import RecentOperations from "../RecentTransaction/RecentOperations";
import Cards from "../Cards/Cards";

function Overview({ language }) {
  const [summaryData, setSummaryData] = useState({
    income: 0,
    expenses: 0,
    remainingBalance: 0,
  });

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

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await getTransactionSummary();
        setSummaryData(response.data);
      } catch (error) {
        console.error("Failed to fetch transaction summary", error);
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="overview">
      <div className="card balance-card">
        <h2>{getText("accountBalance")}</h2>
        <p>{summaryData.remainingBalance.toLocaleString()} VND</p>
      </div>

      <div className="card summary-card">
        <h2>{getText("transactionSummary")}</h2>
        <p>{getText("income")} {summaryData.income.toLocaleString()} VND</p>
        <p>{getText("expenses")} {summaryData.expenses.toLocaleString()} VND</p>
        <p>{getText("remainingBalance")} {summaryData.remainingBalance.toLocaleString()} VND</p>
      </div>

      <div className="recent-operations-container">
        <RecentOperations language={language} getText={getText} />
      </div>

      <div className="cards-container">
        <Cards />
      </div>
    </div>
  );
}

export default Overview;