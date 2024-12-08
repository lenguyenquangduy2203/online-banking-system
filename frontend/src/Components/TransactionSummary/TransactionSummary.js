import { useState, useEffect } from "react";
import { getTransactionSummary } from "../../services/apiServices";
import "./TransactionSummary.css";

const TransactionSummary = ({ language, userId }) => {
  const translations = {
    en: {
      title: "Transaction Summary",
      loading: "Loading...",
      error: "Error loading summary.",
      noData: "No data available.",
    },
    vn: {
      title: "Tóm tắt giao dịch",
      loading: "Đang tải...",
      error: "Lỗi khi tải dữ liệu.",
      noData: "Không có dữ liệu.",
    },
  };

  const text = translations[language] || translations.en;

  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await getTransactionSummary(userId);
        setSummaryData(response);
      } catch (err) {
        setError(text.error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [userId, text.error]);

  return (
    <div className="transaction-summary">
      <h3>{text.title}</h3>
      {loading && <p>{text.loading}</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && summaryData.length === 0 && <p>{text.noData}</p>}
      {summaryData.length > 0 &&
        summaryData.map((item, index) => (
          <div key={index} className="summary-item">
            <p>{language === "en" ? item.labelEn : item.labelVn}:</p>
            <span>{item.value}</span>
          </div>
        ))}
    </div>
  );
};

export default TransactionSummary;
