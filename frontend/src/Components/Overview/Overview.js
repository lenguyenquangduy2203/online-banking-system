import React, { useEffect, useState } from "react";
import { getOverview } from "../../services/apiServices";
import "./Overview.css";

function Overview({ language }) {
  const [overviewData, setOverviewData] = useState({
    accountBalance: "N/A",
    transactionSummary: {
      income: "N/A",
      expenses: "N/A",
      remainingBalance: "N/A",
    },
    recentTransactions: [],
  });

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await getOverview();
        setOverviewData(response.data);
      } catch (error) {
        console.error("Failed to fetch overview data", error);
      }
    };
    fetchOverview();
  }, []);

  return (
    <div className="overview">
      <div className="card balance-card">
        <h2>Account Balance</h2>
        <p>{overviewData.accountBalance}</p>
      </div>
      <div className="card summary-card">
        <h2>Transaction Summary</h2>
        <p>Income: {overviewData.transactionSummary.income}</p>
        <p>Expenses: {overviewData.transactionSummary.expenses}</p>
        <p>Remaining Balance: {overviewData.transactionSummary.remainingBalance}</p>
      </div>
      <div className="recent-operations">
        <h2>Recent Transactions</h2>
        {overviewData.recentTransactions.length > 0 ? (
          <ul>
            {overviewData.recentTransactions.map((transaction) => (
              <li key={transaction.id}>
                {transaction.description}: {transaction.amount}
              </li>
            ))}
          </ul>
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    </div>
  );
}

export default Overview;
